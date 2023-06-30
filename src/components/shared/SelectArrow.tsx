import * as React from "react";

const SelectArrow = ({
	className,
	onClick,
}: {
	className: string;
	onClick?: () => void;
}) => (
	<svg
		className={className}
		width="19"
		height="13"
		viewBox="0 0 19 13"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		onClick={onClick}
	>
		<path
			d="M17.5 2L9.5 10L1.5 2"
			stroke="#605F5F"
			strokeWidth="3"
			strokeLinecap="round"
		/>
	</svg>
);
export default SelectArrow;
