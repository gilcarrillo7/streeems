import * as React from "react";
import { HeadFC, PageProps, graphql } from "gatsby";
import Layout from "../components/layout/Layout";
import Publications from "../components/home/Publications";

const LibraryPage: React.FC<PageProps> = () => {
	return (
		<Layout>
			<div className="container text-comp1 py-12">
				<Publications />
			</div>
		</Layout>
	);
};

export default LibraryPage;

export const Head: HeadFC = () => <title>Home Page</title>;

export const query = graphql`
	query ($language: String!) {
		locales: allLocale(filter: { language: { eq: $language } }) {
			edges {
				node {
					ns
					data
					language
				}
			}
		}
	}
`;
