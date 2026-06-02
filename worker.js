export default {
  async fetch(request, env) {
    const host = request.headers.get("host") || "";

    if (host.startsWith("bhuj.")) {
      return env.ASSETS.fetch("https://kutchonline.com/bhuj/");
    }

    // www and root both serve the main page
    return env.ASSETS.fetch("https://kutchonline.com/");
  },
};
