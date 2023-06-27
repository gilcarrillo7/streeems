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
	const { title: tilteFilter } = useAppSelector(selectFilters);

	const searchRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		dispatch(fetchDossiers());
		dispatch(fetchInstitutions());
	}, []);

	const handleSearch = () => {
		dispatch(setFilters({ title: searchRef.current?.value }));
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
					<Select name={t("filter.t1")} options={journals} />
				</div>
				<div className="sm:w-1/5">
					<SelectDate name={t("filter.t2")} />
				</div>
				<div className="sm:w-1/5">
					<Select name={t("filter.t3")} options={institutions} />
				</div>
				<div className="sm:w-1/5">
					<SelectOptions
						name={t("filter.t4")}
						options={[t("typ.t1"), t("typ.t2"), t("typ.t3"), t("typ.t4")]}
					/>
				</div>
				<div className="sm:w-1/5">
					<SelectOptions
						name={t("filter.t5")}
						options={[t("lang.t1"), t("lang.t2"), t("lang.t3")]}
					/>
				</div>
			</div>
			<div className="flex my-4">
				{tilteFilter != "" && (
					<FilterBox closeClick={() => dispatch(setFilters({ title: "" }))}>
						{tilteFilter}
					</FilterBox>
				)}
			</div>
		</>
	);
};

export default Filters;
