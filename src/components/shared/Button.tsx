import * as React from "react";

interface IProps {
	variant: "primary" | "white" | "comp1";
	className?: string;
	children: React.ReactNode;
}

const Button = ({ variant, className = "", children }: IProps) => {
	return (
		<>
			{variant === "comp1" && (
				<button
					className={`${className} text-comp1 font-bold border-2 border-comp1 py-2 px-8 sm:px-20 h-12 hover:bg-comp1 hover:text-white`}
				>
					{children}
				</button>
			)}
			{variant === "white" && (
				<button
					className={`${className} text-white font-bold border-2 border-white py-2 px-8 sm:px-20 h-12 hover:bg-white hover:text-secundary`}
				>
					{children}
				</button>
			)}
			{variant === "primary" && (
				<button
					className={`${className} text-white font-bold border-2 border-primary bg-primary py-2 px-8 sm:px-20 h-12 hover:bg-white hover:text-primary`}
				>
					{children}
				</button>
			)}
		</>
	);
};

export default Button;
