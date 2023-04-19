const path = require("path");

module.exports = {
	output: 'export',
	trailingSlash: true,
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			issuer: {
				test: /\.(js|ts)x?$/,
			},
			use: ["@svgr/webpack"],
		});
		return config;
	},
	sassOptions: {
		includePaths: [path.join(__dirname, "styles")],
	},
	images: {
		loader: "imgix",
		path: "https://deinhausmann.com/",
	},
	exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
		return {
			"/": { page: "/" },
			"/support": { page: "/support" },
			"/claim": { page: "/claim" },
			"/privacy": { page: "/privacy" },
			"/terms": { page: "/terms" },
			"/category-services": { page: "/category-services" },
			"/client-dashboard": { page: "/client-dashboard" },
			"/inbox": { page: "/inbox" },
			"/handyman-registration": { page: "/handyman-registration" },
			"/payments": { page: "/payments" },
			"/handyman-dashboard": { page: "/handyman-dashboard" },
			"/my-services": { page: "/my-services" },
			"/add-gig": { page: "/add-gig" },
			"/archive": { page: "/archive" },
			"/earnings": { page: "/earnings" },
			"/share-gig": { page: "/share-gig" },
		}
	},
};
