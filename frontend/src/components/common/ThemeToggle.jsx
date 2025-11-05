import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useThemeMode } from "../../theme/ThemeProvider";

const ThemeToggle = () => {
  const { mode, toggleTheme } = useThemeMode();

  return (
    <Tooltip
      title={mode === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
    >
      <IconButton
        onClick={toggleTheme}
        sx={{
          color: mode === "light" ? "primary.main" : "#e63946",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "rotate(180deg)",
          },
        }}
      >
        {mode === "light" ? <Brightness4 /> : <Brightness7 />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
