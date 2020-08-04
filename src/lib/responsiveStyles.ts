import { css, Interpolation, ObjectInterpolation } from "emotion";
import { transform } from "src/lib/utils";
import {
  breakpointSelector,
  isBreakpoint,
  Breakpoint,
} from "src/lib/breakpoint";

export interface ResponsiveArrayInterpolation<MP>
  extends Array<ResponsiveObjectInterpolation<MP>> {}

export type ResponsiveObjectInterpolation<MP> = ObjectInterpolation<MP> &
  Partial<Record<Breakpoint, Interpolation<MP>>>;

export type ResponsiveInterpolation<MP = undefined> =
  | ResponsiveObjectInterpolation<MP>
  | ResponsiveArrayInterpolation<MP>;

/**
 * Experimental function to augment standard emotion `css` function with the ability to specify responsive container
 * breakpoints.
 * Usage:
 * ```
 * const className = responsiveCss({
 *    // ... styles that do not change, standard emotion `css` syntax
 *    color: 'red',
 *    [Breakpoint.MD]: {
 *        // ... styles that are specific for the MD breakpoint, again standard emotion `css` syntax
 *        background: 'black',
 *    }
 *    [Breakpoint.LG]: {
 *        // ... styles that are specific for the LG breakpoint, again standard emotion `css` syntax
 *        background: 'blue',
 *    }
 * })
 * ```
 */
export const responsiveCss = (styles: ResponsiveInterpolation): string => {
  const processObjectStyles = (
    objectStyles: ResponsiveObjectInterpolation<any>
  ) =>
    transform(
      objectStyles,
      (result, rule, style) => {
        if (isBreakpoint(rule)) {
          result[breakpointSelector(rule)] = style;
        } else {
          result[rule] = style;
        }
      },
      {} as ObjectInterpolation<any>
    );

  if (Array.isArray(styles)) {
    return css(styles.map(processObjectStyles));
  }

  return css(processObjectStyles(styles));
};
