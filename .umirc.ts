import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "homePage/index" },
    // { path: "/docs", component: "docs" },
  ],
  npmClient: 'yarn',
});
