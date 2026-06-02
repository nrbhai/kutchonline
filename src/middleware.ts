import type { MiddlewareHandler } from "astro";

export const onRequest: MiddlewareHandler = async (context, next) => {
	const host = context.request.headers.get("host")?.toLowerCase() ?? "";
	if (host.startsWith("bhuj.") && context.url.pathname !== "/bhuj") {
		return context.rewrite("/bhuj");
	}
	return next();
};
