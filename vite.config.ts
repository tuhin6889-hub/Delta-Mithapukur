// vite.config.ts
export default defineConfig(() => {
  return {
    base: './', // Enforces relative asset paths for GitHub Pages
    plugins: [react(), tailwindcss()],
    // ...
  };
});
