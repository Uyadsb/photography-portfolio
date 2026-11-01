import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// VITE_BASE is set by the GitHub Actions workflow to "/<repository-name>/".
// Locally it defaults to "/". Override for manual builds, e.g.:
//   VITE_BASE=/my-repo/ npm run build
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE || '/',
  server: {
    host: true, // listen on all interfaces so Docker can expose the port
    port: 5173,
    watch: { usePolling: process.env.CHOKIDAR_USEPOLLING === 'true' },
  },
});
