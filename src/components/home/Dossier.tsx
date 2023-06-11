import React, { useState } from "react";
import { selectWidth } from "../../features/dossiers/DossiersSlice";
import { useAppSelector } from "../../hooks";
import { IDossier } from "../../interfaces";
import Arrow from "../shared/Arrow";
import { getDossierColor } from "../../utils";

const Dossier = ({ dossier }: { dossier: IDossier }) => {
	const { name, journals } = dossier;
	const width = useAppSelector(selectWidth);

	const [open, setOpen] = useState(false);

	return (
		<div className={`text-sm break-all w-full md:w-[11%] mb-2 md:mb-0`}>
			<div
				className={`relative p-2 text-white font-bold h-14 flex items-center cursor-pointer md:cursor-auto`}
				style={{ backgroundColor: getDossierColor(name) }}
				onClick={() => setOpen(!open)}
			>
				{name}
				<Arrow
					direction={open ? "up" : "down"}
					className="md:hidden absolute right-4 top-1/2 -translate-y-1/2"
				/>
			</div>
			{journals.map((journal, i) => (
				<div
					key={`${i}${journal.name}`}
					className={`my-2 p-2 border-2 border-comp1 text-comp1 font-medium h-14 flex items-center overflow-hidden ${
						open ? "" : "hidden md:flex"
					}`}
				>
					{journal.name}
				</div>
			))}
		</div>
	);
};

export default Dossier;
