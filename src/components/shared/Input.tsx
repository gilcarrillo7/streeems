import React from "react";

const Input = ({
	type,
	className,
	placeholder,
	onChange,
	refer,
}: {
	type: string;
	className: string;
	placeholder: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	refer?: React.LegacyRef<HTMLInputElement>;
}) => {
	return (
		<input
			ref={refer}
			type={type}
			className={`border-comp1 border w-full px-3 py-3 ${className}`}
			placeholder={placeholder}
			onChange={onChange}
		/>
	);
};

export default Input;
