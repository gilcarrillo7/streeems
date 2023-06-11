import React, { useEffect } from "react";
import {
	fetchDossiers,
	selectDossiers,
	selectError,
	selectStatus,
	selectWidth,
} from "../../features/dossiers/DossiersSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Loader from "../shared/Loader";
import Dossier from "./Dossier";

const Dossiers = () => {
	const dispatch = useAppDispatch();
	const status = useAppSelector(selectStatus);
	const error = useAppSelector(selectError);
	const dossiers = useAppSelector(selectDossiers);

	useEffect(() => {
		dispatch(fetchDossiers());
	}, []);

	return (
		<>
			{status === "loading" ? (
				<Loader />
			) : (
				<>
					{error && (
						<>
							<p className="text-error text-xl text-center">{error}</p>
						</>
					)}
					{!error && (
						<>
							<div className="flex flex-wrap justify-between">
								{dossiers.map((dossier, i) => (
									<Dossier key={`${i}${dossier.name}`} dossier={dossier} />
								))}
							</div>
						</>
					)}
				</>
			)}
		</>
	);
};

export default Dossiers;
