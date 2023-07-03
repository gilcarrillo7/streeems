import React, { useEffect } from "react";
import { HeadFC, PageProps, graphql } from "gatsby";
import { useAppSelector, useAppDispatch } from "../hooks";
import { selectToken } from "../features/auth/AuthSlice";
import {
	fetchFavouriteList,
	selectFavFilterPublications,
} from "../features/publications/publicationsSlice";
import Layout from "../components/layout/Layout";
import Publications from "../components/home/Publications";

const LibraryPage: React.FC<PageProps> = () => {
	const dispatch = useAppDispatch();
	const token = useAppSelector(selectToken);
	const publications = useAppSelector(selectFavFilterPublications);

	useEffect(() => {
		if (token) dispatch(fetchFavouriteList({ token, page: 1 }));
	}, [token]);

	return (
		<Layout>
			<div className="container text-comp1 py-12">
				<Publications publications={publications} isInFavourite={true} />
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
