import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import Layout from "../components/layout/Layout";
import Button from "../components/shared/Button";

const IndexPage: React.FC<PageProps> = () => {
	return (
		<Layout>
			<div
				className={`min-h-[calc(100vh-126px)] bg-secundary text-white flex items-center`}
			>
				<div className="container">
					<p className="font-zen text-3xl sm:text-5xl sm:w-1/2">
						Entdecke und teile Publikationen zu Energiewende und Klimawandel!
					</p>
					<div className="flex justify-between flex-col sm:flex-row mt-12 sm:mt-24">
						<Button variant="white" className="sm:order-2">
							Vision Statement
						</Button>
						<div className="flex sm:order-1 justify-center mt-8 sm:mt-0">
							<p className="font-light">Neuste Publikationen</p>
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
		</Layout>
	);
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
