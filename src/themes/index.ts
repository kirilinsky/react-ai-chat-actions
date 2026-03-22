import { defineThemes } from "var-th";
import { palettes } from "./data";

export const { toCSS, toTypes, getVarths, themeNames } = defineThemes({
  prefix: "ca",
  tokens: [
    "barBg",
    "barShadow",
    "barBorder",
    "barRadius",
    "btnColor",
    "btnHoverBg",
    "btnActiveBg",
    "btnActiveColor",
    "btnActiveGlow",
    "btnRadius",
    "dividerColor",
    "tooltipBg",
    "tooltipColor",
  ] as const,
  themes: palettes,
});
