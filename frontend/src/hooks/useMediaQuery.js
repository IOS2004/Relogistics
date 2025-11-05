import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

/**
 * Custom hooks for responsive breakpoints
 * Provides easy-to-use hooks for checking screen sizes
 */

// Mobile: < 600px
export const useIsMobile = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down("sm"));
};

// Tablet: 600px - 960px
export const useIsTablet = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.between("sm", "md"));
};

// Desktop: > 960px
export const useIsDesktop = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.up("md"));
};

// Large Desktop: > 1280px
export const useIsLargeDesktop = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.up("lg"));
};

// Extra Large Desktop: > 1920px
export const useIsXLargeDesktop = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.up("xl"));
};

// Combined hook that returns all breakpoints
export const useResponsive = () => {
  const theme = useTheme();
  return {
    isMobile: useMediaQuery(theme.breakpoints.down("sm")),
    isTablet: useMediaQuery(theme.breakpoints.between("sm", "md")),
    isDesktop: useMediaQuery(theme.breakpoints.up("md")),
    isLargeDesktop: useMediaQuery(theme.breakpoints.up("lg")),
    isXLargeDesktop: useMediaQuery(theme.breakpoints.up("xl")),
  };
};

export default useResponsive;
