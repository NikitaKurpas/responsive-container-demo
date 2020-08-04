import { css, Interpolation, ObjectInterpolation } from "emotion";
import { Breakpoint, BREAKPOINTS } from "./ResponsiveContainer";
import { keys } from "./utils";

export interface ResponsiveArrayInterpolation<MP>
  extends Array<ResponsiveObjectInterpolation<MP>> {}

export type ResponsiveObjectInterpolation<MP> = ObjectInterpolation<MP> &
  Partial<Record<Breakpoint, Interpolation<MP>>>;

export type ResponsiveInterpolation<MP = undefined> =
  | ResponsiveObjectInterpolation<MP>
  | ResponsiveArrayInterpolation<MP>;

/**
 * Experimental function to augment standard emtion `css` function with the
 * ability to specify responsive container breakpoints.
 * Usage:
 * ```
 * const className = useResponsiveContainerStyles({
 *    // ... standard styles that do not change, standard emotion `css` syntax
 *    [Breakpoint.MD]: {
 *        // ... styles that are specific for the MD breakpoint, again standard emotion `css` syntax
 *    }
 *    [Breakpoint.LG]: {
 *        // ... styles that are specific for the LG breakpoint, again standard emotion `css` syntax
 *    }
 * })
 * ```
 */
export const useResponsiveContainerStyles = (
  styles: ResponsiveInterpolation
): string => {
  const processObjectStyles = (
    objectStyles: ResponsiveObjectInterpolation<any>
  ) =>
    keys(objectStyles).reduce(
      (result, rule) => {
        if (BREAKPOINTS.find(breakpoint => breakpoint === rule)) {
          const breakpoint = rule as Breakpoint;
          result[`${breakpoint} &`] = objectStyles[breakpoint];
          return result;
        } else {
          result[rule] = objectStyles[rule];
        }

        return result;
      },
      {} as ObjectInterpolation<any>
    );

  if (Array.isArray(styles)) {
    return css(styles.map(processObjectStyles));
  }

  return css(processObjectStyles(styles));
};
