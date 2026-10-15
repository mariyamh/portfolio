import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Cache Components is off: every route here is fully static, and with it on
     an unknown /work/<slug> streams a 200 shell before notFound() resolves.
     partialPrefetching depends on it, so that goes too. */
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
