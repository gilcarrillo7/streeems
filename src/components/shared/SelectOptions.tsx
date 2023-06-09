import React, { useState, useEffect, useRef } from "react";
import Button from "./Button";
import SelectArrow from "./SelectArrow";
import Checkbox from "./Checkbox";
import useOutsideClick from "../../hooks/useOutsideClick";

interface IProps {
	name: string;
	options: { name: string; value: string }[];
	activeOptions: string[];
	setActiveOptions: (activeOptions: string[]) => void;
}

const SelectOptions = ({
	name,
	options,
	activeOptions,
	setActiveOptions,
}: IProps) => {
	const [selOptions, setSelOptions] = useState<string[]>([]);
	const [filterOptions, setFilterOptions] =
		useState<{ name: string; value: string }[]>(options);
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

	const clickFilter = () => {
		setActiveOptions(selOptions);
		setShow(false);
	};

	useEffect(() => {
		setFilterOptions(options);
	}, [options]);

	useEffect(() => {
		setSelOptions(activeOptions);
	}, [activeOptions]);

	return (
		<div className={`relative w-full`}>
			<div
				className="relative w-full border-b border-primary p-2 cursor-pointer"
				onClick={() => setShow(!show)}
			>
				<div className="capitalize">{name}</div>
				<SelectArrow
					className={`cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 ${
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
							<Checkbox
								key={`${option}${i}`}
								className="p-2 cursor-pointe"
								label={option.name}
								onChange={() => handleOption(option.value)}
								checked={selOptions.includes(option.value)}
							/>
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

export default SelectOptions;
