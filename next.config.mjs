/** @type {import('next').NextConfig} */
const nextConfig = {
  //   future: {
  //     // by default, if you customize webpack config, they switch back to version 4.
  //     // Looks like backward compatibility approach.
  //     webpack5: true
  //   },

  //   webpack(config) {
  //     config.resolve.fallback = {
  //       // if you miss it, all the other options in fallback, specified
  //       // by next.js will be dropped.
  //       ...config.resolve.fallback,

  //       fs: false // the solution
  //     };

  //     return config;
  //   },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "journey-prod.s3.ap-southeast-1.amazonaws.com",
        port: "",
        pathname: "/**" // Adjust the pathname if your images are in a different folder
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**" // Adjust the pathname if your images are in a different folder
      }
    ]
  },

  async rewrites() {
    return [
      {
        source: "/api/amplitude/:path*",
        destination: "https://api.amplitude.com/2/httpapi:path*"
      },
      {
        source: "/api/mix-panel/:path*",
        destination: "https://api.mixpanel.com/:path*"
      }
    ];
  }
};

export default nextConfig;
