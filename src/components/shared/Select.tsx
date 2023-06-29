import React, { useState, useEffect } from "react";
import Button from "./Button";
import SelectArrow from "./SelectArrow";
import useOutsideClick from "../../hooks/useOutsideClick";

interface IProps {
	name: string;
	options: string[];
	activeOptions: string[];
	setActiveOptions: (activeOptions: string[]) => void;
}

const Select = ({ name, options, activeOptions, setActiveOptions }: IProps) => {
	const [selOptions, setSelOptions] = useState<string[]>([]);
	const [filterOptions, setFilterOptions] = useState<string[]>(options);
	const [show, setShow] = useState<boolean>(false);

	const selectRef = useOutsideClick(() => setShow(false));

	const handleOption = (opt: string) => {
		let selected = [...selOptions];
		const index = selected.findIndex((sel) => sel === opt);
		if (index === -1) {
			selected = [...selected, opt];
			selected.sort();
		} else {
			selected.splice(index, 1);
		}
		setSelOptions([...selected]);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value;
		setFilterOptions(options.filter((option) => option.includes(val)));
	};

	const clickFilter = () => {
		setActiveOptions(selOptions);
		setShow(false);
	};

	useEffect(() => {
		setSelOptions(activeOptions);
	}, [activeOptions]);

	return (
		<div className={`relative w-full`}>
			<div
				className="relative w-full border-b border-primary p-2 cursor-pointer"
				onClick={() => setShow(!show)}
			>
				<input
					className="capitalize placeholder:text-comp1"
					placeholder={name}
					onChange={handleChange}
				/>
				<SelectArrow className="cursor-pointer absolute right-0 top-1/2 -translate-y-1/2" />
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
									selOptions.includes(option) ? "font-bold" : ""
								}`}
								onClick={() => handleOption(option)}
							>
								{option}
							</div>
						))}
					</div>
					<div className="px-6 pt-8 pb-12 w-full">
						<Button
							variant={"primary"}
							className="!w-full !px-0 !min-w-full"
							onClick={clickFilter}
						>
							Filter
						</Button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Select;
