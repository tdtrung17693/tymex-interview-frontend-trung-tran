import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { resolve } from "node:path";

const coverageExclude = [
  "node_modules",
  "dist",
  "public",
  "vite.config.js",
  "eslint.config.js",
  "commitlint.config.js",
  // framework/lib files
  "src/routes/**",
  "src/components/ui/**",
  "src/reportWebVitals.ts",
  "src/main.tsx",
  "src/routeTree.gen.ts",
  "src/tests/**",
  "src/lib/*",
  "mock-server/**",
];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({ autoCodeSplitting: true }),
    viteReact(),
    tailwindcss(),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    watch: false,
    setupFiles: "./src/tests/vitest-setup.ts",
    coverage: {
      exclude: coverageExclude,
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
