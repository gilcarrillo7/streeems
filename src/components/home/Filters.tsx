import React, { useEffect, useRef } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../hooks";

import {
	fetchDossiers,
	selectJournals,
} from "../../features/dossiers/DossiersSlice";
import {
	fetchInstitutions,
	selectInstitutionsName,
} from "../../features/institutions/InstitutionsSlice";
import {
	setFilters,
	selectFilters,
} from "../../features/publications/publicationsSlice";
import { selectSearchClicked } from "../../features/ui/uiSlice";
import Lupa from "../icons/Lupa";
import Input from "../shared/Input";
import Button from "../shared/Button";
import Select from "../shared/Select";
import SelectOptions from "../shared/SelectOptions";
import SelectDate from "../shared/SelectDate";

const FilterBox = ({
	closeClick,
	children,
}: {
	closeClick: () => void;
	children: React.ReactNode;
}) => {
	return (
		<div
			className={`flex items-center text-comp1 text-base sm:text-lg p-1 border border-comp1`}
		>
			{children}
			<svg
				className="ml-2 cursor-pointer"
				width="16"
				height="15"
				viewBox="0 0 16 15"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				onClick={closeClick}
			>
				<path
					d="M2 1.5L14 13.5"
					stroke="#605F5F"
					strokeWidth="3"
					strokeLinecap="round"
				/>
				<path
					d="M14 1.5L2 13.5"
					stroke="#605F5F"
					strokeWidth="3"
					strokeLinecap="round"
				/>
			</svg>
		</div>
	);
};

const Filters = () => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();

	const showSearch = useAppSelector(selectSearchClicked);
	const journals = useAppSelector(selectJournals);
	const institutions = useAppSelector(selectInstitutionsName);
	const {
		title: tilteFilter,
		journals: journalFilters,
		institutions: institutionsFilters,
		types: typesFilters,
		langs: langFilters,
		dateFrom,
		dateTo,
	} = useAppSelector(selectFilters);

	const searchRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		dispatch(fetchDossiers());
		dispatch(fetchInstitutions());
	}, []);

	const handleSearch = () => {
		dispatch(setFilters({ title: searchRef.current?.value }));
	};

	const handleJournals = (journals: string[]) => {
		dispatch(setFilters({ journals }));
	};

	const handleInstitutions = (institutions: string[]) => {
		dispatch(setFilters({ institutions }));
	};

	const handleTypes = (types: string[]) => {
		dispatch(setFilters({ types }));
	};

	const handleLangs = (langs: string[]) => {
		dispatch(setFilters({ langs }));
	};

	const handleDateFrom = (dateFrom: string) => {
		dispatch(setFilters({ dateFrom }));
	};

	const handleDateTo = (dateTo: string) => {
		dispatch(setFilters({ dateTo }));
	};

	return (
		<>
			{showSearch && (
				<div className="flex flex-col sm:flex-row gap-4 mx-auto sm:w-2/3 mb-12">
					<div className="w-full sm:w-2/3 flex gap-4">
						<div className=" flex items-center">
							<Lupa />
						</div>
						<Input
							refer={searchRef}
							type={""}
							className={""}
							placeholder={t("search.t1")}
						/>
					</div>
					<Button
						variant="primary"
						className="w-full sm:w-1/3"
						onClick={handleSearch}
					>
						<Trans>search.t2</Trans>
					</Button>
				</div>
			)}
			<div className="flex flex-col sm:flex-row gap-4">
				<div className="sm:w-1/5">
					<Select
						name={t("filter.t1")}
						options={journals}
						activeOptions={journalFilters}
						setActiveOptions={handleJournals}
					/>
				</div>
				<div className="sm:w-1/5">
					<SelectDate
						name={t("filter.t2")}
						activeDateFrom={dateFrom || ""}
						activeDateTo={dateTo || ""}
						setActiveDateFrom={handleDateFrom}
						setActiveDateTo={handleDateTo}
					/>
				</div>
				<div className="sm:w-1/5">
					<Select
						name={t("filter.t3")}
						options={institutions}
						activeOptions={institutionsFilters}
						setActiveOptions={handleInstitutions}
					/>
				</div>
				<div className="sm:w-1/5">
					<SelectOptions
						name={t("filter.t4")}
						options={[
							{ name: t("typ.t1"), value: "studie" },
							{ name: t("typ.t2"), value: "analyse" },
							{ name: t("typ.t3"), value: "paper" },
							{ name: t("typ.t4"), value: "factsheet" },
						]}
						activeOptions={typesFilters}
						setActiveOptions={handleTypes}
					/>
				</div>
				<div className="sm:w-1/5">
					<SelectOptions
						name={t("filter.t5")}
						options={[
							{ name: t("lang.t1"), value: "alle" },
							{ name: t("lang.t2"), value: "de" },
							{ name: t("lang.t3"), value: "global" },
						]}
						activeOptions={langFilters}
						setActiveOptions={handleLangs}
					/>
				</div>
			</div>
			<div className="flex mt-8 mb-4 gap-2">
				{tilteFilter != "" && (
					<FilterBox closeClick={() => dispatch(setFilters({ title: "" }))}>
						{tilteFilter}
					</FilterBox>
				)}
				{dateFrom && (
					<FilterBox closeClick={() => dispatch(setFilters({ dateFrom: "" }))}>
						<Trans>von</Trans>: {dateFrom}
					</FilterBox>
				)}
				{dateTo && (
					<FilterBox closeClick={() => dispatch(setFilters({ dateTo: "" }))}>
						<Trans>bis</Trans>: {dateTo}
					</FilterBox>
				)}
				{journalFilters.map((journal, i) => (
					<FilterBox
						key={`${journal}${i}`}
						closeClick={() => {
							const newarr = [...journalFilters];
							newarr.splice(i, 1);
							dispatch(setFilters({ journals: newarr }));
						}}
					>
						{journal}
					</FilterBox>
				))}
				{institutionsFilters.map((institution, i) => (
					<FilterBox
						key={`${institution}${i}`}
						closeClick={() => {
							const newarr = [...institutionsFilters];
							newarr.splice(i, 1);
							dispatch(setFilters({ institutions: newarr }));
						}}
					>
						{institution}
					</FilterBox>
				))}
				{typesFilters.map((type, i) => (
					<FilterBox
						key={`${type}${i}`}
						closeClick={() => {
							const newarr = [...typesFilters];
							newarr.splice(i, 1);
							dispatch(setFilters({ types: newarr }));
						}}
					>
						{type}
					</FilterBox>
				))}
				{langFilters.map((lang, i) => (
					<FilterBox
						key={`${lang}${i}`}
						closeClick={() => {
							const newarr = [...langFilters];
							newarr.splice(i, 1);
							dispatch(setFilters({ langs: newarr }));
						}}
					>
						{lang}
					</FilterBox>
				))}
			</div>
		</>
	);
};

export default Filters;
