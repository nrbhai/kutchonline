export default {
	async fetch(request, env) {
		const host = request.headers.get("host") || "";
		const url = new URL(request.url);

		if (host.startsWith("bhuj.")) {
			url.hostname = "kutchonline.com";
			url.pathname = "/bhuj/";
			return env.ASSETS.fetch(url.toString());
		}

		return env.ASSETS.fetch(request);
	},
};
