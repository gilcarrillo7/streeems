import * as React from "react";

const Arrow = ({
	direction,
	className,
}: {
	direction: string;
	className: string;
}) => {
	return (
		<>
			{direction === "down" ? (
				<svg
					className={`cursor-pointer ${className}`}
					width="29"
					height="17"
					viewBox="0 0 29 17"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M27 1.75L14.5 14.25L2 1.75"
						stroke="white"
						strokeWidth="3"
						strokeLinecap="round"
					/>
				</svg>
			) : (
				<svg
					className={`cursor-pointer ${className}`}
					width="29"
					height="17"
					viewBox="0 0 29 17"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M2 14.75L14.5 2.25L27 14.75"
						stroke="white"
						strokeWidth="3"
						strokeLinecap="round"
					/>
				</svg>
			)}
		</>
	);
};

export default Arrow;
