import { writeFileSync } from "fs";
import { toTypes, toCSS } from "../src/themes";

const formatCSS = (css: string) =>
  css
    .split("\n")
    .map((line) => (line.startsWith("--") ? `  ${line}` : line))
    .join("\n")
    .trimEnd() + "\n";

writeFileSync("./src/theme.d.ts", toTypes());
writeFileSync("./src/styles/themes.css", formatCSS(toCSS()));
