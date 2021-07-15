const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const withLess = require("next-with-less");

module.exports = withBundleAnalyzer(
  withLess({
    lessLoaderOptions: {
      /* ... */
      lessOptions: {
        /* ... */
        // https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
        modifyVars: {
          "primary-color": "hotpink",
          "layout-header-background": "#ffffff",
          "layout-trigger-background": "#ffffff",
          /* ... */
        },
      },
    },
    images: {
      domains: ["images.unsplash.com", "localhost"],
    },
  })
);
