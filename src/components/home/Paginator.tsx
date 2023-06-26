import * as React from "react";

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
			stroke-width="3"
			stroke-linecap="round"
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
			stroke-width="3"
			stroke-linecap="round"
		/>
	</svg>
);

const Paginator = () => {
	return (
		<div className="mt-12 flex justify-between text-lg sm:text-3xl">
			<div className="text-primary flex items-center gap-2 sm:gap-4 cursor-pointer">
				<LeftArrow />
				Vorherige
			</div>
			<div className="flex gap-2 text-xl items-center cursor-pointer">
				<div className="text-primary hover:font-bold">1</div>
				<div className="hover:font-bold">2</div>
				<div className="hover:font-bold">3</div>
				<div className="hover:font-bold">4</div>
				<div className="hover:font-bold">5</div>
				<div className="hover:font-bold">6</div>
			</div>
			<div className="text-primary flex items-center gap-2 sm:gap-4 cursor-pointer">
				Nächste
				<RightArrow />
			</div>
		</div>
	);
};

export default Paginator;
