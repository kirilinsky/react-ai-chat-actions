import { writeFileSync } from "fs";
import { toTypes, toCSS } from "../src/themes";

writeFileSync("./src/theme.d.ts", toTypes());
writeFileSync("./src/styles/index.css", toCSS());
