import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
	siteMetadata: {
		title: `streeems`,
		siteUrl: `https://www.yourdomain.tld`,
	},
	// More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
	// If you use VSCode you can also use the GraphQL plugin
	// Learn more at: https://gatsby.dev/graphql-typegen
	graphqlTypegen: true,
	plugins: [
		"gatsby-plugin-sass",
		"gatsby-plugin-postcss",
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/locales`,
				name: `locale`,
			},
		},
		{
			resolve: `gatsby-plugin-react-i18next`,
			options: {
				localeJsonSourceName: `locale`, // name given to `gatsby-source-filesystem` plugin.
				languages: [`de`, `en`],
				defaultLanguage: `de`,
				siteUrl: `https://www.streeems.com/`,
				trailingSlash: "always",
				i18nextOptions: {
					interpolation: {
						escapeValue: false,
					},
					keySeparator: false,
					nsSeparator: false,
				},
				pages: [],
			},
		},
	],
};

export default config;
