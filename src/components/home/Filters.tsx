import React, { useEffect } from "react";
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
import { selectSearchClicked } from "../../features/ui/uiSlice";
import Lupa from "../icons/Lupa";
import Input from "../shared/Input";
import Button from "../shared/Button";
import Select from "../shared/Select";
import SelectOptions from "../shared/SelectOptions";
import SelectDate from "../shared/SelectDate";

const Filters = () => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();

	const showSearch = useAppSelector(selectSearchClicked);
	const journals = useAppSelector(selectJournals);
	const institutions = useAppSelector(selectInstitutionsName);

	useEffect(() => {
		dispatch(fetchDossiers());
		dispatch(fetchInstitutions());
	}, []);

	return (
		<>
			{showSearch && (
				<div className="flex flex-col sm:flex-row gap-4 mx-auto sm:w-2/3 mb-12">
					<div className="w-full sm:w-2/3 flex gap-4">
						<div className=" flex items-center">
							<Lupa />
						</div>
						<Input type={""} className={""} placeholder={t("search.t1")} />
					</div>
					<Button variant="primary" className="w-full sm:w-1/3">
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
		</>
	);
};

export default Filters;
