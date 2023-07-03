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
	setFavFilters,
	selectFilters,
	selectFavFilters,
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

const Filters = ({ isInFavourite }: { isInFavourite: boolean }) => {
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
	} = useAppSelector(isInFavourite ? selectFavFilters : selectFilters);

	const searchRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		dispatch(fetchDossiers());
		dispatch(fetchInstitutions());
	}, []);

	const handleSearch = () => {
		dispatch(
			isInFavourite
				? setFavFilters({ title: searchRef.current?.value })
				: setFilters({ title: searchRef.current?.value })
		);
	};

	const handleJournals = (journals: string[]) => {
		dispatch(
			isInFavourite ? setFavFilters({ journals }) : setFilters({ journals })
		);
	};

	const handleInstitutions = (institutions: string[]) => {
		dispatch(
			isInFavourite
				? setFavFilters({ institutions })
				: setFilters({ institutions })
		);
	};

	const handleTypes = (types: string[]) => {
		dispatch(isInFavourite ? setFavFilters({ types }) : setFilters({ types }));
	};

	const handleLangs = (langs: string[]) => {
		dispatch(isInFavourite ? setFavFilters({ langs }) : setFilters({ langs }));
	};

	const handleDateFrom = (dateFrom: string) => {
		dispatch(
			isInFavourite ? setFavFilters({ dateFrom }) : setFilters({ dateFrom })
		);
	};

	const handleDateTo = (dateTo: string) => {
		dispatch(
			isInFavourite ? setFavFilters({ dateTo }) : setFilters({ dateTo })
		);
	};

	const clearTitle = () => {
		dispatch(
			isInFavourite ? setFavFilters({ title: "" }) : setFilters({ title: "" })
		);
	};

	const clearDateFrom = () => {
		dispatch(
			isInFavourite
				? setFavFilters({ dateFrom: "" })
				: setFilters({ dateFrom: "" })
		);
	};

	const clearDateTo = () => {
		dispatch(
			isInFavourite ? setFavFilters({ title: "" }) : setFilters({ title: "" })
		);
	};

	const clearJournal = (i: number) => {
		const newarr = [...journalFilters];
		newarr.splice(i, 1);
		dispatch(
			isInFavourite
				? setFavFilters({ journals: newarr })
				: setFilters({ journals: newarr })
		);
	};

	const clearInstitutions = (i: number) => {
		const newarr = [...institutionsFilters];
		newarr.splice(i, 1);
		dispatch(
			isInFavourite
				? setFavFilters({ institutions: newarr })
				: setFilters({ institutions: newarr })
		);
	};

	const clearTypes = (i: number) => {
		const newarr = [...typesFilters];
		newarr.splice(i, 1);
		dispatch(
			isInFavourite
				? setFavFilters({ types: newarr })
				: setFilters({ types: newarr })
		);
	};

	const clearLangs = (i: number) => {
		const newarr = [...langFilters];
		newarr.splice(i, 1);
		dispatch(
			isInFavourite
				? setFavFilters({ langs: newarr })
				: setFilters({ langs: newarr })
		);
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
					<FilterBox closeClick={clearTitle}>{tilteFilter}</FilterBox>
				)}
				{dateFrom && (
					<FilterBox closeClick={clearDateFrom}>
						<Trans>von</Trans>: {dateFrom}
					</FilterBox>
				)}
				{dateTo && (
					<FilterBox closeClick={clearDateTo}>
						<Trans>bis</Trans>: {dateTo}
					</FilterBox>
				)}
				{journalFilters.map((journal, i) => (
					<FilterBox key={`${journal}${i}`} closeClick={() => clearJournal(i)}>
						{journal}
					</FilterBox>
				))}
				{institutionsFilters.map((institution, i) => (
					<FilterBox
						key={`${institution}${i}`}
						closeClick={() => clearInstitutions(i)}
					>
						{institution}
					</FilterBox>
				))}
				{typesFilters.map((type, i) => (
					<FilterBox key={`${type}${i}`} closeClick={() => clearTypes(i)}>
						{type}
					</FilterBox>
				))}
				{langFilters.map((lang, i) => (
					<FilterBox key={`${lang}${i}`} closeClick={() => clearLangs(i)}>
						{lang}
					</FilterBox>
				))}
			</div>
		</>
	);
};

export default Filters;
