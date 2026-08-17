import { breakpoints, ScreenSizeT } from "@/lib/tailwind";
import { useWindowSize } from "@react-hookz/web";

export function useScreenSize(): ScreenSizeT {
  const { width } = useWindowSize();

  if (width < breakpoints.sm) return "xs";
  if (width < breakpoints.md) return "sm";
  if (width < breakpoints.lg) return "md";
  return "lg";
}
