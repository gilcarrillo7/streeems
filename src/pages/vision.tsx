import React from "react";
import { HeadFC, PageProps, graphql } from "gatsby";
import Layout from "../components/layout/Layout";

import VisionImg from "../images/vision.png";
import VisionMobImg from "../images/visionMob.png";
import { Trans } from "react-i18next";

const Vision: React.FC<PageProps> = () => {
	return (
		<Layout>
			<div className={`relative`}>
				<div className="hidden md:block h-full bg-primary md:w-2/3 lg:w-1/2 absolute z-10 left-0 top-0"></div>
				<div className="bg-primary md:bg-transparent md:absolute w-full h-full z-20 top-0 left-0 flex items-center">
					<div className="container">
						<div className="w-full md:w-2/3 lg:w-1/2 flex text-white items-center">
							<div className="py-12 md:py-0 md:pr-8">
								<p className="text-4xl md:text-5xl mb-4">
									<Trans>vision.t1</Trans>
								</p>
								<p className="font-light text-base md:text-lg">
									<Trans>vision.t2</Trans>
								</p>
							</div>
						</div>
						<div className="w-full md:w-1/2 "></div>
					</div>
				</div>
				<img src={VisionImg} className="hidden md:block w-full z-0" />
				<img src={VisionMobImg} className="md:hidden w-full z-0" />
			</div>
			<div className="container w-full py-12 font-light text-comp1">
				<div className="flex flex-col md:flex-row">
					<div className="w-full md:w-1/2 md:pr-32">
						<h1 className="text-2xl md:text-3xl text-primary mb-4">
							<Trans>vision.t3</Trans>
						</h1>
						<p className="mb-8">
							<Trans>vision.t4</Trans>
						</p>
						<h1 className="text-2xl md:text-3xl text-primary mb-4">
							<Trans>vision.t5</Trans>
						</h1>
						<p className="">
							<Trans>vision.t6</Trans>
						</p>
					</div>
					<div className="w-full md:w-1/2">
						<p className="mb-4">
							<Trans>vision.t7</Trans>
						</p>
						<p className="mb-4">
							<Trans>vision.t8</Trans>
						</p>
						<p className="mb-4">
							<Trans>vision.t9</Trans>
						</p>
					</div>
				</div>
				<div className="">
					<h1 className="text-2xl md:text-3xl mb-4">
						<Trans>vision.t11</Trans>
					</h1>
					<p className="mb-4">
						<span className="text-primary">streeems</span> - Mischinger &
						Richard GbR
						<br />
						Zionskirchstraße 63
						<br />
						10119 Berlin
					</p>
					<p className="mb-4">
						<span className="text-primary">
							<Trans>vision.t12</Trans>
						</span>
						<br />
						Stefan Mischinger & Philipp Richard
					</p>
					<p className="mb-4">
						<span className="text-primary">
							<Trans>vision.t13</Trans>
						</span>{" "}
						0151/15349054
						<br />
						<span className="text-primary">
							<Trans>vision.t14</Trans>
						</span>{" "}
						<a href="mailto:info@streeems.com" className="hover:underline">
							info@streeems.com
						</a>
						<br />
						<span className="text-primary">
							<Trans>vision.t15</Trans>
						</span>{" "}
						Stefan Mischinger
					</p>
				</div>
			</div>
		</Layout>
	);
};

export default Vision;

export const Head: HeadFC = () => <title>Vision</title>;

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
