export type ScreenSizeT = "xs" | "sm" | "md" | "lg";

// Tailwind CSS default breakpoints, for use in JS
export const breakpoints: Record<ScreenSizeT, number> = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
};

export function withBreakpoint(
  className: string,
  breakpoint: Exclude<ScreenSizeT, "xs">,
) {
  return className
    .trim()
    .split(/\s+/)
    .map((c) => `${breakpoint}:${c}`)
    .join(" ");
}
