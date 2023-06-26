import * as React from "react";

interface IProps {
	variant: "primary" | "white" | "comp1" | "error";
	className?: string;
	onClick?: () => void;
	children: React.ReactNode;
	type?: "button" | "submit" | "reset";
}

const Button = ({
	variant,
	className = "",
	onClick,
	type = "button",
	children,
}: IProps) => {
	return (
		<>
			{variant === "comp1" && (
				<button
					type={type}
					className={`${className} text-comp1 font-bold border-2 border-comp1 py-2 px-8  hover:bg-comp1 hover:text-white sm:w-auto mx-auto sm:min-w-[220px] `}
					onClick={onClick}
				>
					{children}
				</button>
			)}
			{variant === "white" && (
				<button
					type={type}
					className={`${className} text-white font-bold border-2 border-white py-2 px-8  hover:bg-white hover:text-secundary sm:w-auto mx-auto sm:min-w-[220px] `}
					onClick={onClick}
				>
					{children}
				</button>
			)}
			{variant === "primary" && (
				<button
					type={type}
					className={`${className} text-white font-bold border-2 border-primary bg-primary py-2 px-8  hover:bg-white hover:text-primary sm:w-auto mx-auto sm:min-w-[220px] `}
					onClick={onClick}
				>
					{children}
				</button>
			)}
			{variant === "error" && (
				<button
					type={type}
					className={`${className} text-white font-bold border-2 border-error bg-error py-2 px-8  hover:bg-white hover:text-error sm:w-auto mx-auto sm:min-w-[220px] `}
					onClick={onClick}
				>
					{children}
				</button>
			)}
		</>
	);
};

export default Button;
