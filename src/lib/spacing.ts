import { CEM_VAR_NAME } from "src/components/ContainerRemRoot";

export type SpacingValue = number | "auto";
/**
 * Values can either be simple multipliers (currently implemented), or
 *  a point on the modular scale. In the latter case some convertion
 * is needed from the point on the scale to the actual multiplier values.
 */
export const spacing = (
  v1: SpacingValue,
  v2?: SpacingValue,
  v3?: SpacingValue,
  v4?: SpacingValue
): string =>
  [v1, v2, v3, v4]
    .filter(Boolean)
    .map((v) =>
      typeof v === "string" ? v : `calc(${v!} * var(--${CEM_VAR_NAME}))`
    )
    .join(" ");
