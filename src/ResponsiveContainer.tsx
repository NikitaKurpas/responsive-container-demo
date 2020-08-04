import React, { CSSProperties } from "react";
import { css, cx, Interpolation } from "emotion";
import { keys } from "./utils";
import { RefCallback } from "./types";

export enum Breakpoint {
  XS = ".XS",
  SM = ".SM",
  MD = ".MD",
  LG = ".LG",
  XL = ".XL"
}

export const BREAKPOINTS = [
  Breakpoint.XS,
  Breakpoint.SM,
  Breakpoint.MD,
  Breakpoint.LG,
  Breakpoint.XL
] as const;

/**
 * Determines if the `value` is a valid Breakpoint
 */
export const isBreakpoint = (value: any): value is Breakpoint =>
  BREAKPOINTS.includes(value);

/**
 * Generates a selector to attach responsive styles to the responsive container
 * itself
 */
export const containerBreakpoint = (breakpoint: Breakpoint): string =>
  `&${breakpoint}`;
/**
 * Generates a selector to attach responsive styles to descendents of a resonsive
 * container
 */
export const breakpoint = (breakpoint: Breakpoint): string => `${breakpoint} &`;

/**
 * Generates a class name with specified styles and breakpoint for the responsive
 * container directly
 */
export const containerStyle = (b: Breakpoint, style: Interpolation): string =>
  css({
    [containerBreakpoint(b)]: style
  });
/**
 * Generates a class name with specified styles and breakpoint for descendents
 * of a responsive container
 */
export const childStyle = (b: Breakpoint, style: Interpolation) =>
  css({
    [breakpoint(b)]: style
  });

/**
 * Generates a class name to toggle the display property for a breakpoint for
 * descendents of a responsive container
 */
export const display = (
  bOrValue: Breakpoint | CSSProperties["display"],
  value?: CSSProperties["display"]
): string =>
  isBreakpoint(bOrValue)
    ? css({
        [breakpoint(bOrValue)]: {
          display: value
        }
      })
    : css({ display: bOrValue });

export const DEFAULT_BREAKPOINTS = {
  [Breakpoint.XS]: 0,
  [Breakpoint.SM]: 384,
  [Breakpoint.MD]: 576,
  [Breakpoint.LG]: 768,
  [Breakpoint.XL]: 960
};

/**
 * Creates a responsive container area. Uses a memoized ResizeObserver under
 * the hood to avoid React.
 */
const ResponsiveContainer: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = props => {
  const observer = React.useMemo(
    () =>
      new window.ResizeObserver(entries => {
        const rawBreakpointClasses: Record<Breakpoint, string> = {
          [Breakpoint.XS]: Breakpoint.XS.slice(1),
          [Breakpoint.SM]: Breakpoint.SM.slice(1),
          [Breakpoint.MD]: Breakpoint.MD.slice(1),
          [Breakpoint.LG]: Breakpoint.LG.slice(1),
          [Breakpoint.XL]: Breakpoint.XL.slice(1)
        };

        entries.forEach(entry => {
          keys(DEFAULT_BREAKPOINTS).forEach(breakpoint => {
            const minWidth = DEFAULT_BREAKPOINTS[breakpoint];

            // add the breakpoint when the minimum width was met and remove it otherwise
            if (entry.contentRect.width >= minWidth) {
              entry.target.classList.add(rawBreakpointClasses[breakpoint]);
            } else {
              entry.target.classList.remove(rawBreakpointClasses[breakpoint]);
            }
          });
        });
      }),
    []
  );

  const previousNodeRef = React.useRef<HTMLDivElement>();
  const containerRef: RefCallback<HTMLDivElement> = node => {
    if (node) {
      observer.observe(node);
      // Save the current node to unobserve it later, when the node changes
      previousNodeRef.current = node;
    } else if (previousNodeRef.current) {
      observer.unobserve(previousNodeRef.current);
    }
  };

  React.useEffect(() => {
    return () => observer.disconnect();
  }, [observer]);

  return <div ref={containerRef} {...props} />;
};

export default ResponsiveContainer;
