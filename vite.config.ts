import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    headers: {
      "cache-control": "max-age=604800",
    },
  },
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname) }],
  },
});
