import React, { useEffect } from "react";
import {
	fetchPublications,
	selectCount,
	selectError,
	selectHomePublications,
	selectStatus,
} from "../../features/publications/publicationsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Loader from "../shared/Loader";
import Publication from "./Publication";
import { Trans } from "react-i18next";

const Publications = () => {
	const dispatch = useAppDispatch();
	const status = useAppSelector(selectStatus);
	const error = useAppSelector(selectError);
	const publications = useAppSelector(selectHomePublications);
	const count = useAppSelector(selectCount);

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
