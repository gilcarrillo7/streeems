import React, { useEffect } from "react";
import { Trans, useTranslation } from "react-i18next";
import {
	fetchPublications,
	selectCount,
	selectError,
	selectHomePublications,
	selectStatus,
} from "../../features/publications/publicationsSlice";
import { selectSearchClicked } from "../../features/ui/uiSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Loader from "../shared/Loader";
import Publication from "./Publication";
import Lupa from "../icons/Lupa";
import Input from "../shared/Input";
import Button from "../shared/Button";

const Publications = () => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const status = useAppSelector(selectStatus);
	const error = useAppSelector(selectError);
	const publications = useAppSelector(selectHomePublications);
	const count = useAppSelector(selectCount);
	const showSearch = useAppSelector(selectSearchClicked);

	useEffect(() => {
		dispatch(fetchPublications(1));
	}, []);

	return (
		<>
			{status === "loading" ? (
				<Loader />
			) : (
				<>
					{error && <p className="text-error text-xl text-center">{error}</p>}
					{!error && (
						<>
							{showSearch && (
								<div className="flex flex-col sm:flex-row gap-4 mx-auto sm:w-2/3">
									<div className="w-full sm:w-2/3 flex gap-4">
										<div className=" flex items-center">
											<Lupa />
										</div>
										<Input
											type={""}
											className={""}
											placeholder={t("search.t1")}
										/>
									</div>
									<Button variant="primary" className="w-full sm:w-1/3">
										<Trans>search.t2</Trans>
									</Button>
								</div>
							)}
							<p className="text-comp1 my-4 sm:my-8 text-lg sm:text-xl">
								<span className="font-bold">1-9</span>{" "}
								<Trans>publications.t1</Trans>{" "}
								<span className="font-bold">{count}</span>{" "}
								<Trans>publications.t2</Trans>
							</p>
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:gap-8 md:gap-16 lg:gap-24 xl:gap-32">
								{publications.map((publication) => (
									<Publication key={publication.id} publication={publication} />
								))}
							</div>
						</>
					)}
				</>
			)}
		</>
	);
};

export default Publications;
