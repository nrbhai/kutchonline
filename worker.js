export default {
	async fetch(request, env) {
		const host = request.headers.get("host") || "";
		const url = new URL(request.url);

		if (host.startsWith("bhuj.")) {
			// In production, assets are looked up using the primary domain.
			// In local dev, they are looked up using the local hostname (localhost) and port.
			const isLocal = url.port !== "" || host.includes(":");
			url.hostname = isLocal ? "localhost" : "kutchonline.com";
			
			// For production, force HTTPS and strip port
			if (!isLocal) {
				url.protocol = "https:";
				url.port = "";
			}
			
			// Rewrite page requests to /bhuj/ subdirectory
			// Assets (like styles, images, JS, or internal _astro builds) should NOT be rewritten.
			const isAsset = url.pathname.startsWith("/_astro/") || 
			                url.pathname.startsWith("/assets/") || 
			                url.pathname.startsWith("/public/") ||
			                url.pathname === "/favicon.ico" ||
			                url.pathname === "/favicon.svg" ||
			                url.pathname === "/robots.txt";

			if (!isAsset) {
				// Avoid doubling /bhuj/ if it's already present in the request path
				if (!url.pathname.startsWith("/bhuj/")) {
					url.pathname = "/bhuj" + (url.pathname === "/" ? "/" : url.pathname);
				}
			}
			
			return env.ASSETS.fetch(url.toString());
		}

		return env.ASSETS.fetch(request);
	},
};
