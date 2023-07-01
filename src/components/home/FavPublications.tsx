import React, { useEffect, useMemo } from "react";
import { Trans } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
	fetchPublications,
	selectCount,
	selectError,
	selectHomePublications,
	selectStatus,
	selectCurrentPage,
} from "../../features/publications/publicationsSlice";
import Loader from "../shared/Loader";
import Publication from "./Publication";
import Filters from "./Filters";
import Paginator from "./Paginator";

const FavPublications = () => {
	const dispatch = useAppDispatch();
	const status = useAppSelector(selectStatus);
	const error = useAppSelector(selectError);
	const publications = useAppSelector(selectHomePublications);
	const count = useAppSelector(selectCount);
	const currentPage = useAppSelector(selectCurrentPage);

	const firstPub = useMemo(() => (currentPage - 1) * 35 + 1, [currentPage]);
	const lastPub = useMemo(() => firstPub + 34, [firstPub]);

	useEffect(() => {
		dispatch(fetchPublications(1));
	}, []);

	return (
		<>
			{status === "loading" ? (
				<div className="min-h-[400px]">
					<Loader />
				</div>
			) : (
				<>
					{error && <p className="text-error text-xl text-center">{error}</p>}
					{!error && (
						<>
							<Filters />
							<p className="text-primary my-4 sm:my-8 text-lg sm:text-xl">
								<span className="font-bold">
									{firstPub}-{lastPub}
								</span>{" "}
								<Trans>publications.t1</Trans>{" "}
								<span className="font-bold">{count}</span>{" "}
								<Trans>publications.t2</Trans>
							</p>
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:gap-8 md:gap-16 lg:gap-24 xl:gap-32">
								{publications.map((publication) => (
									<Publication key={publication.id} publication={publication} />
								))}
							</div>
							<Paginator />
						</>
					)}
				</>
			)}
		</>
	);
};

export default FavPublications;
