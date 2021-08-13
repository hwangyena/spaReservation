const withLess = require("next-with-less")

/** @type {import('next').NextConfig} */
module.exports = withLess({
  reactStrictMode: true,
  lessLoaderOptions: {
    lessOptions: {
      // https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
      modifyVars: {
        "primary-color": "black",
      },
    },
  },
  images: {
    domains: ["images.unsplash.com", "localhost"],
  },
})
