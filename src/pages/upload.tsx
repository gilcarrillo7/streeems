import React, { useEffect } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useAppSelector, useAppDispatch } from "../hooks";
import {
	fetchDossiers,
	selectJournals,
} from "../features/dossiers/DossiersSlice";
import {
	fetchInstitutions,
	selectInstitutionsName,
} from "../features/institutions/InstitutionsSlice";
import Layout from "../components/layout/Layout";
import { HeadFC, PageProps, graphql } from "gatsby";
import Input from "../components/shared/Input";
import Button from "../components/shared/Button";

import Img from "../images/upload.png";
import Select from "../components/shared/Select";

const Upload: React.FC<PageProps> = () => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();

	const journals = useAppSelector(selectJournals);
	const institutions = useAppSelector(selectInstitutionsName);

	useEffect(() => {
		dispatch(fetchDossiers());
		dispatch(fetchInstitutions());
	}, []);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(e);
	};

	return (
		<Layout>
			<div
				className={`sm:min-h-[calc(100vh-126px)] text-comp1 flex items-center relative`}
			>
				<div className="container flex py-20 sm:py-0">
					<div className="sm:w-1/2 z-20 sm:pr-8 lg:pr-20 bg-white sm:py-12">
						<h1 className="text-primary text-3xl sm:text-4xl font-light mb-6">
							<Trans>upload.t1</Trans>
						</h1>
						<form className="" onSubmit={handleSubmit}>
							<Input
								type={"text"}
								className={"mb-4"}
								placeholder={t("upload.t2")}
								name="url"
							/>
							<Input
								type={"text"}
								className={"mb-4"}
								placeholder={t("upload.t3")}
								name="title"
							/>
							<label
								id="fileInput"
								className="cursor-pointer mb-12 min-h-[44px] sm:!w-64 block bg-primary text-white text-center font-bold py-2"
							>
								<Trans>upload.t4</Trans>
								<input id="fileInput" type="file" className="hidden" name="" />
							</label>
							<Select
								name={t("upload.t5")}
								options={journals}
								propName="journal"
							/>
							<div className="my-4"></div>
							<Select
								name={t("upload.t6")}
								options={institutions}
								propName="institution"
							/>
							<Input
								type={"date"}
								className={"my-4"}
								placeholder={t("upload.t7")}
								name="date"
							/>
							<Button
								variant="primary"
								className="w-full sm:!w-64"
								type="submit"
							>
								<Trans>upload.t8</Trans>
							</Button>
						</form>
					</div>
					<div className="hidden sm:block w-1/2 absolute top-0 left-0 bg-white z-10 min-h-full"></div>
					<img
						src={Img}
						className="hidden sm:block absolute top-0 right-0 z-0 min-h-[calc(100vh-126px)]"
					/>
				</div>
			</div>
		</Layout>
	);
};

export default Upload;

export const Head: HeadFC = () => <title>Publikation hinzufügen</title>;

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
