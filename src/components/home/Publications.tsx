import React, { useMemo } from "react";
import { Trans } from "react-i18next";
import { useAppSelector } from "../../hooks";
import {
	selectCount,
	selectError,
	selectStatus,
	selectCurrentPage,
	selectFavourites,
} from "../../features/publications/publicationsSlice";
import { selectLogged } from "../../features/auth/AuthSlice";
import Loader from "../shared/Loader";
import Publication from "./Publication";
import Filters from "./Filters";
import Paginator from "./Paginator";
import { IPublication } from "../../interfaces";

const Publications = ({
	publications,
	isInFavourite = false,
}: {
	publications: IPublication[];
	isInFavourite?: boolean;
}) => {
	const status = useAppSelector(selectStatus);
	const error = useAppSelector(selectError);
	const favourites = useAppSelector(selectFavourites);
	const count = useAppSelector(selectCount);
	const logged = useAppSelector(selectLogged);
	const currentPage = useAppSelector(selectCurrentPage);

	const firstPub = useMemo(() => (currentPage - 1) * 35 + 1, [currentPage]);
	const lastPub = useMemo(() => firstPub + 34, [firstPub]);

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
							{logged && <Filters isInFavourite={isInFavourite} />}
							{logged ? (
								<p className="text-primary my-4 sm:my-8 text-lg sm:text-xl">
									{isInFavourite ? (
										<>
											<span className="font-bold">{count}</span>{" "}
											<Trans>publications.t2</Trans>
										</>
									) : (
										<>
											<span className="font-bold">
												{firstPub}-{lastPub}
											</span>{" "}
											<Trans>publications.t1</Trans>{" "}
											<span className="font-bold">{count}</span>{" "}
											<Trans>publications.t2</Trans>
										</>
									)}
								</p>
							) : (
								<p className="text-comp1 my-4 sm:my-8 text-lg sm:text-xl">
									<span className="font-bold">1-9</span>{" "}
									<Trans>publications.t1</Trans>{" "}
									<span className="font-bold">{count}</span>{" "}
									<Trans>publications.t2</Trans>
								</p>
							)}
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:gap-8 md:gap-16 lg:gap-24 xl:gap-32">
								{publications.map((publication) => (
									<Publication
										key={publication.guid}
										publication={publication}
										favourite={favourites.includes(publication.guid)}
										isInFavourite={isInFavourite}
									/>
								))}
							</div>
							{logged && <Paginator />}
						</>
					)}
				</>
			)}
		</>
	);
};

export default Publications;
