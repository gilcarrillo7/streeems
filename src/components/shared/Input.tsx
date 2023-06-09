import React from "react";

const Input = ({
	type,
	className,
	placeholder,
}: {
	type: string;
	className: string;
	placeholder: string;
}) => {
	return (
		<input type={type} className={`border-comp1 border w-full px-3 py-3 ${className}`} placeholder={placeholder} />
	);
};

export default Input;
