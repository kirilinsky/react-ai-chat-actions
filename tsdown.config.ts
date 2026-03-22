import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["./src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  outExtensions: () => ({
    dts: ".d.ts",
  }),
  external: ["react", "react-dom"],
  minify: true,
  sourcemap: false,
  css: {
    inject: true,
    minify: true,
  },
});
