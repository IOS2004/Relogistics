import React, { useState } from "react";
import { Box } from "@mui/material";
import { Phone, Visibility, Delete, Edit } from "@mui/icons-material";
import { useThemeMode } from "../../theme/ThemeProvider";

/**
 * Swipeable Card Wrapper
 * Provides swipe-to-action functionality on mobile
 * Swipe left reveals action buttons (call, view, edit, delete)
 */
const SwipeableCard = ({
  children,
  onCall,
  onView,
  onEdit,
  onDelete,
  showActions = true,
}) => {
  const { mode } = useThemeMode();
  const isDark = mode === "dark";
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const maxSwipe = -120; // Width of action buttons

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
    setIsSwiping(true);
  };

  const handleTouchMove = (e) => {
    if (!isSwiping) return;

    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;

    // Only allow left swipe (negative values)
    if (diff < 0 && diff >= maxSwipe) {
      setTranslateX(diff);
    }
  };

  const handleTouchEnd = () => {
    setIsSwiping(false);

    // If swiped more than 60px, open actions
    if (translateX < -60) {
      setTranslateX(maxSwipe);
      setIsOpen(true);
    } else {
      setTranslateX(0);
      setIsOpen(false);
    }
  };

  const handleAction = (callback) => {
    // Close swipe and execute action
    setTranslateX(0);
    setIsOpen(false);
    if (callback) callback();
  };

  const actionButtons = [
    { icon: Phone, color: "#4caf50", onClick: onCall, label: "Call" },
    { icon: Visibility, color: "#2196f3", onClick: onView, label: "View" },
    { icon: Edit, color: "#ff9800", onClick: onEdit, label: "Edit" },
    { icon: Delete, color: "#f44336", onClick: onDelete, label: "Delete" },
  ].filter((btn) => btn.onClick); // Only show buttons with callbacks

  if (!showActions) {
    return <>{children}</>;
  }

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        touchAction: "pan-y", // Allow vertical scrolling
      }}
    >
      {/* Action Buttons Background */}
      <Box
        sx={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          display: "flex",
          alignItems: "stretch",
          width: Math.abs(maxSwipe),
        }}
      >
        {actionButtons.map((btn, index) => {
          const Icon = btn.icon;
          return (
            <Box
              key={index}
              onClick={() => handleAction(btn.onClick)}
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: btn.color,
                color: "#fff",
                cursor: "pointer",
                transition: "all 0.2s",
                "&:active": {
                  opacity: 0.8,
                  transform: "scale(0.95)",
                },
              }}
            >
              <Icon sx={{ fontSize: 20 }} />
            </Box>
          );
        })}
      </Box>

      {/* Swipeable Content */}
      <Box
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        sx={{
          transform: `translateX(${translateX}px)`,
          transition: isSwiping ? "none" : "transform 0.3s ease",
          position: "relative",
          zIndex: 1,
          bgcolor: isDark ? "#1a1d29" : "#fff",
        }}
      >
        {children}
      </Box>

      {/* Tap outside to close */}
      {isOpen && (
        <Box
          onClick={() => {
            setTranslateX(0);
            setIsOpen(false);
          }}
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
            bgcolor: "transparent",
          }}
        />
      )}
    </Box>
  );
};

export default SwipeableCard;
