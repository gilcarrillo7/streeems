import React, { useState, useEffect } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import SelectArrow from "./SelectArrow";

interface IProps {
	name: string;
	options: string[];
	propName: string;
	required: boolean;
}
const Select = ({ name, options, propName, required }: IProps) => {
	const [selOption, setSelOption] = useState<string>("");
	const [filterOptions, setFilterOptions] = useState<string[]>(options);
	const [show, setShow] = useState<boolean>(false);

	const selectRef = useOutsideClick(() => setShow(false));

	const handleOption = (opt: string) => {
		setShow(false);
		setSelOption(opt);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value;
		setFilterOptions(options.filter((option) => option.includes(val)));
		setSelOption(val);
	};

	useEffect(() => {
		setFilterOptions(options);
	}, [options]);

	return (
		<div className={`relative w-full`}>
			<div
				className="relative w-full border border-comp1 px-3 py-3 cursor-pointer"
				onClick={() => setShow(!show)}
			>
				<input
					className="capitalize text-comp1 placeholder-comp1 w-full"
					placeholder={name}
					onChange={handleChange}
					value={selOption}
					name={propName}
					required={required}
				/>
				<SelectArrow
					className={`cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 ${
						show ? "rotate-180" : ""
					}`}
				/>
			</div>
			{show && (
				<div
					ref={selectRef}
					className="sm:absolute w-full flex flex-col bg-white/85 z-10 top-full color-comp1"
				>
					<div className="max-h-60 overflow-auto ">
						{filterOptions.map((option, i) => (
							<div
								key={`${option}${i}`}
								className={`p-2 cursor-pointer hover:font-bold capitalize ${
									selOption === option ? "font-bold" : ""
								}`}
								onClick={() => handleOption(option)}
							>
								{option}
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default Select;
