// app.config.js
import "dotenv/config";

export default {
	expo: {
		name: "yanyan-store",
		slug: "yanyan-store",
		extra: {
			apiUrl: process.env.API_URL,
		},
	},
};
