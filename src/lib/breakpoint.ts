import { Interpolation, css } from "emotion";
import { CSSProperties } from "react";

export enum Breakpoint {
  XS = ".XS",
  SM = ".SM",
  MD = ".MD",
  LG = ".LG",
  XL = ".XL",
}

export const BREAKPOINTS = [
  Breakpoint.XS,
  Breakpoint.SM,
  Breakpoint.MD,
  Breakpoint.LG,
  Breakpoint.XL,
] as const;

/**
 * Determines if the `value` is a valid Breakpoint
 */
export const isBreakpoint = (value: any): value is Breakpoint =>
  BREAKPOINTS.includes(value);

/**
 * Generates a selector to attach responsive styles to the responsive container itself
 */
export const containerBreakpointSelector = (breakpoint: Breakpoint): string =>
  `&${breakpoint}`;

/**
 * Generates a selector to attach responsive styles to descendent of a responsive container
 */
export const breakpointSelector = (breakpoint: Breakpoint): string =>
  `${breakpoint} &`;

/**
 * Generates a class name with specified styles and breakpoint for the responsive container directly
 */
export const containerStyle = (b: Breakpoint, style: Interpolation): string =>
  css({
    [containerBreakpointSelector(b)]: style,
  });

/**
 * Generates a class name with specified styles and breakpoint for descendent of a responsive container
 */
export const childStyle = (b: Breakpoint, style: Interpolation) =>
  css({
    [breakpointSelector(b)]: style,
  });

/**
 * Generates a class name to toggle the display property for a breakpoint for descendents of a responsive container
 * Usage:
 * ```
 * // Display this div only in XS and SM containers
 * <div className={cx(display(Breakpoint.MD, "none"))}>
 *   ... content ...
 * </div>
 * // Display this div only in LG and XL containers
 * <div className={cx(display("none"), display(Breakpoint.LG, "block"))}>
 *   ... content ...
 * </div>
 * ```
 */
export const display = (
  breakpointOrValue: Breakpoint | CSSProperties["display"],
  value?: CSSProperties["display"]
): string =>
  isBreakpoint(breakpointOrValue)
    ? css({
        [breakpointSelector(breakpointOrValue)]: {
          display: value,
        },
      })
    : css({ display: breakpointOrValue });
export const d = display;
