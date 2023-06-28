import * as React from "react";
import { Trans, useTranslation } from "react-i18next";
import Layout from "../components/layout/Layout";
import { HeadFC, PageProps, graphql } from "gatsby";
import Input from "../components/shared/Input";
import Button from "../components/shared/Button";

const Profile: React.FC<PageProps> = () => {
	const { t } = useTranslation();
	return (
		<Layout>
			<div
				className={`md:min-h-[calc(100vh-126px)] text-comp1 flex items-center relative`}
			>
				<div className="container flex flex-col lg:flex-row pt-20 md:pt-0">
					<div className="lg:w-1/2 z-20 lg:pr-20">
						<h1 className="text-primary text-3xl sm:text-4xl font-light mb-6">
							<Trans>profile.t1</Trans>
						</h1>
						<h2 className="text-comp1 text-xl sm:text-2xl font-bold mb-6">
							<Trans>profile.t2</Trans>
						</h2>
						<form className="">
							<div className="flex mb-4">
								<div className="flex items-end w-1/3 text-lg sm:text-xl">
									<Trans>profile.t3</Trans>
								</div>
								<div className="w-2/3">
									<Input
										type={"text"}
										className={"border-0 border-b-2 border-primary"}
										placeholder={""}
									/>
								</div>
							</div>
							<div className="flex mb-4">
								<div className="flex items-end w-1/3 text-lg sm:text-xl">
									<Trans>profile.t4</Trans>
								</div>
								<div className="w-2/3">
									<Input
										type={"text"}
										className={"border-0 border-b-2 border-primary"}
										placeholder={""}
									/>
								</div>
							</div>
							<div className="flex mb-4">
								<div className="flex items-end w-1/3 text-lg sm:text-xl">
									<Trans>profile.t5</Trans>
								</div>
								<div className="w-2/3">
									<Input
										type={"text"}
										className={"border-0 border-b-2 border-primary"}
										placeholder={""}
									/>
								</div>
							</div>
							<div className="flex mt-16 md:mt-8 justify-center">
								<div className="sm:w-1/3"></div>
								<div className="w-4/5 sm:w-2/3">
									<Button variant="primary" className="w-full">
										<Trans>profile.t6</Trans>
									</Button>
								</div>
							</div>
						</form>
					</div>
					<div className="z-10 lg:w-1/2 sm:py-6 mt-12 lg:mt-0 -mx-4 sm:mx-0 px-4 sm:px-0 bg-primary text-white flex items-center">
						<div className="px-4 lg:pl-8 py-8 lg:py-0">
							<p className="text-xl sm:text-2xl">Wallet</p>
							<p className="text-8xl sm:text-9xl text-center my-8">
								46{" "}
								<span className="font-light text-2xl sm:text-5xl">Tokens</span>
							</p>
							<p className="mt-12">
								streeems zielt auf kollektives Wissensmanagement ab: jeder
								Beitrag zur Datenbank macht diese besser und hilf den
								Nutzer*innen. Daher soll Mithilfe belohnt werden. Für jede
								Aktion mit der du zur Datenbank beiträgst, schreiben wir dir
								Tokens gut. Das Anlegen eines Accounts wird mit 30 Tokens
								belohnt. Für das Verlinken einer Publikation erhältst du 3
								Tokens und für Hinweise auf einen fehlerhaften Link 1 Token.
								Weitere Beteiligungsmöglichkeiten werden folgen.
							</p>
							<p className="mt-4">
								Langfristig wollen wir auf streeems auch Services hinzufügen,
								die kostenpflichtig sind. Statt Geld dafür zu zahlen wird es
								dann möglich sein gesammelte Tokens einzulösen.
							</p>
						</div>
					</div>
					<div className="hidden sm:block w-full lg:w-1/2 h-2/3 lg:h-full  bg-primary absolute top-1/2 lg:top-0 left-0 lg:left-1/2 -translate-y-6 lg:translate-y-0 z-0"></div>
				</div>
			</div>
		</Layout>
	);
};

export default Profile;

export const Head: HeadFC = () => <title>Profil</title>;

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
