import type { APIRoute } from "astro";

export const GET: APIRoute = () => {
    return Response.redirect("https://discord.gg/xZYxNJXy4b", 302);
};
