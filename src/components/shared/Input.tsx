import React from "react";

const Input = ({
	type,
	name,
	className,
	placeholder,
	onChange,
	refer,
	required,
	min,
}: {
	type: string;
	name?: string;
	className: string;
	placeholder: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	refer?: React.LegacyRef<HTMLInputElement>;
	required?: boolean;
	min?: number;
}) => {
	return (
		<input
			ref={refer}
			type={type}
			name={name}
			className={`border-comp1 border w-full px-3 py-3 ${className}`}
			placeholder={placeholder}
			onChange={onChange}
			required={required}
			min={min}
		/>
	);
};

export default Input;
