import React, { useMemo } from "react";
import { Trans } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../hooks";

import {
	selectCurrentPage,
	selectCount,
	setCurrentPage,
	fetchPublications,
} from "../../features/publications/publicationsSlice";

const LeftArrow = () => (
	<svg
		width="17"
		height="29"
		viewBox="0 0 17 29"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M15.5 27L3 14.5L15.5 2"
			stroke="#227E66"
			strokeWidth="3"
			strokeLinecap="round"
		/>
	</svg>
);

const RightArrow = () => (
	<svg
		width="17"
		height="29"
		viewBox="0 0 17 29"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M2 2L14.5 14.5L2 27"
			stroke="#227E66"
			strokeWidth="3"
			strokeLinecap="round"
		/>
	</svg>
);

const Paginator = () => {
	const dispatch = useAppDispatch();
	const currentPage = useAppSelector(selectCurrentPage);
	const count = useAppSelector(selectCount);
	const maxPages = useMemo(() => Math.ceil(count / 35), [count]);
	const pages = useMemo(() => {
		const pags = [];
		let min = 0;
		let max = 0;
		if (currentPage <= 10) {
			min = 1;
			max = 10;
		} else if (currentPage + 10 > maxPages) {
			min = maxPages - 10;
			max = maxPages;
		} else {
			min = currentPage - 9;
			max = currentPage;
		}
		for (let i = min; i <= max; i++) {
			pags.push(i);
		}
		return pags;
	}, [currentPage, maxPages]);

	const handleChangePage = (page: number) => {
		dispatch(setCurrentPage(page));
		dispatch(fetchPublications(page));
	};

	return (
		<div className="mt-12 flex justify-between text-lg sm:text-3xl">
			<div
				className={`text-primary flex items-center gap-2 sm:gap-4 ${
					currentPage === 1
						? "pointer-events-none opacity-50"
						: "cursor-pointer"
				}`}
				onClick={() => handleChangePage(currentPage - 1)}
			>
				<LeftArrow />
				<span className="hidden sm:block">
					<Trans>paginator.t1</Trans>
				</span>
			</div>
			<div className="flex gap-2 items-center cursor-pointer text-base sm:text-xl">
				{pages.map((page) => (
					<div
						key={`page${page}`}
						className={`${
							page === currentPage ? "text-primary" : ""
						} hover:font-bold`}
						onClick={() => handleChangePage(page)}
					>
						{page}
					</div>
				))}
			</div>
			<div
				className={`text-primary flex items-center gap-2 sm:gap-4 ${
					currentPage === maxPages
						? "pointer-events-none opacity-50"
						: "cursor-pointer"
				}`}
				onClick={() => handleChangePage(currentPage + 1)}
			>
				<span className="hidden sm:block">
					<Trans>paginator.t2</Trans>
				</span>
				<RightArrow />
			</div>
		</div>
	);
};

export default Paginator;
