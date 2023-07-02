import React, { useEffect } from "react";
import { HeadFC, PageProps, graphql, navigate } from "gatsby";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
	doActivation,
	selectLogged,
	selectError,
	selectStatusActivation,
} from "../../features/auth/AuthSlice";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/shared/Loader";

const Activate: React.FC<PageProps> = ({ location }) => {
	const dispatch = useAppDispatch();
	const logged = useAppSelector(selectLogged);
	const status = useAppSelector(selectStatusActivation);
	const error = useAppSelector(selectError);

	useEffect(() => {
		const params = location.pathname.split("/");
		let token = "";
		let uid = "";

		if (params[params.length - 1] === "") {
			token = params[params.length - 2];
			uid = params[params.length - 3];
		} else {
			token = params[params.length - 1];
			uid = params[params.length - 2];
		}
		dispatch(
			doActivation({
				token,
				uid,
			})
		);
	}, [location]);

	useEffect(() => {
		if (status === "idle" && error.length === 0) navigate("/");
	}, [status, error]);

	return (
		<Layout>
			<div className="min-h-[400px] flex items-center justify-center">
				{status === "loading" ? (
					<Loader />
				) : (
					<>
						<div className="text-lg mb-4 text-error">
							{error.map((error, i) => (
								<p key={`${error}${i}`} className="mb-4">
									{error}
								</p>
							))}
						</div>
					</>
				)}
			</div>
		</Layout>
	);
};

export default Activate;

export const Head: HeadFC = () => <title>Activate</title>;

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
