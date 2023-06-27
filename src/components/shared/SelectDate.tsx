import React, { useState } from "react";
import Button from "./Button";
import SelectArrow from "./SelectArrow";
import { Trans } from "react-i18next";

interface IProps {
	name: string;
}

const SelectDate = ({ name }: IProps) => {
	const [selOptions, setSelOptions] = useState<string[]>([]);
	const [show, setShow] = useState<boolean>(false);

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
	};

	const clickFilter = () => {
		setShow(false);
	};

	return (
		<div className={`relative w-full`}>
			<div
				className="relative w-full border-b border-primary p-2 cursor-pointer"
				onClick={() => setShow(!show)}
			>
				<div className="capitalize pr-12">{name}</div>
				<SelectArrow className="cursor-pointer absolute right-0 top-1/2 -translate-y-1/2" />
			</div>
			{show && (
				<div className="sm:absolute w-full flex flex-col bg-white/85 z-10 top-full text-comp1">
					<div className="overflow-auto px-2">
						<label className="mt-4 block">
							<Trans>von</Trans>
						</label>
						<input
							className="w-full border border-comp1 p-2"
							type="date"
							placeholder="Von"
						/>
						<label className="mt-4 block">
							<Trans>Bis</Trans>
						</label>
						<input className="w-full border border-comp1 p-2" type="date" />
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

export default SelectDate;
