import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
	site: "https://kutchonline.com",
	output: "server",
	adapter: cloudflare({ sessions: false }),
});
