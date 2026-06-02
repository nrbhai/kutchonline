export default {
  async fetch(request, env) {
    const host = request.headers.get("host") || "";
    const url = new URL(request.url);

    if (host.startsWith("bhuj.")) {
      url.pathname = "/bhuj/";
      return env.ASSETS.fetch(new Request(url.toString(), request));
    }

    return env.ASSETS.fetch(request);
  },
};
