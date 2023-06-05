import * as React from "react";
import { HeadFC, PageProps, graphql } from "gatsby";
import Layout from "../components/layout/Layout";
import Button from "../components/shared/Button";
import { Trans } from "gatsby-plugin-react-i18next";
import Publications from "../components/home/Publications";
import Dossiers from "../components/home/Dossiers";
import CircleChart from "../components/home/CircleChart";

const IndexPage: React.FC<PageProps> = () => {
	return (
		<Layout>
			<div
				className={`min-h-[calc(100vh-126px)] bg-secundary text-white flex items-center`}
			>
				<div className="container">
					<p className="font-zen text-3xl sm:text-5xl sm:w-1/2">
						<Trans>home.t1</Trans>
					</p>
					<div className="flex justify-between flex-col sm:flex-row mt-12 sm:mt-24">
						<Button variant="white" className="sm:order-2">
							<Trans>home.button1</Trans>
						</Button>
						<div className="flex sm:order-1 justify-center mt-8 sm:mt-0">
							<p className="font-light">
								<Trans>home.t2</Trans>
							</p>
							<div className="relative w-8 sm:w-14 ml-4 sm:ml-8 mt-4">
								<div
									className={`border-b-[3px] border-white w-8 sm:w-14 absolute top-0`}
								></div>
								<div
									className={`border-l-[3px] border-white h-4 sm:h-6 absolute right-0`}
								></div>
								<div
									className={`border-b-[3px] border-l-[3px] border-white h-4 sm:h-6 w-4 sm:w-6 -rotate-45 absolute -right-2 sm:-right-3 top-2`}
								></div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="container text-comp1">
				<p className="my-8 sm:my-16 text-xl sm:text-3xl font-light">
					<Trans>home.t3</Trans>
				</p>
				<Publications />
				<div className="flex flex-col sm:flex-row items-center">
					<p className="my-8 sm:my-16 text-xl sm:text-3xl font-light sm:w-2/3">
						<Trans>home.t4</Trans>
					</p>
					<div className="w-full sm:w-1/3 flex sm:justify-end">
						<Button variant="comp1">
							<Trans>login.button</Trans>
						</Button>
					</div>
				</div>
				<p className="my-8 sm:my-16 text-xl sm:text-3xl font-light text-primary">
					<Trans>home.t5</Trans>
				</p>
				<Dossiers />
				<div className="lg:w-2/3 flex flex-col items-center mx-auto">
					<p className="my-8 sm:my-16 text-xl sm:text-3xl font-light">
						<Trans>home.t6</Trans>
					</p>
					{/* <CircleChart /> */}
				</div>
				<div className="flex flex-col sm:flex-row items-center pb-8 sm:pb-16">
					<p className="my-8 sm:my-16 text-xl sm:text-3xl font-light md:w-2/3">
						<Trans>home.t7</Trans>
					</p>
					<div className="w-full md:w-1/3 flex sm:justify-end">
						<Button variant="primary">
							<Trans>home.button2</Trans>
						</Button>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default IndexPage;

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
