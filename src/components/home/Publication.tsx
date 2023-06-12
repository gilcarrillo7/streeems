import React from "react";
import { Trans, useI18next } from "gatsby-plugin-react-i18next";
import { IPublication } from "../../interfaces";
import { selectLogged } from "../../features/ui/uiSlice";
import { useAppSelector } from "../../hooks";
import { getMonthYear } from "../../utils";

const FavContainer = ({ favorite }: { favorite: boolean }) => {
	return (
		<div className="absolute bottom-0 right-0 cursor-pointer">
			<div className="bg-white w-16 h-16 rounded-full flex items-center justify-center">
				<div className="text-secundary text-6xl font-bold z-10">+</div>
			</div>
			<div className="bg-white w-8 h-8 absolute bottom-0 right-0"></div>
		</div>
	);
};

const Publication = ({ publication }: { publication: IPublication }) => {
	const {
		journal,
		title,
		date,
		pages_number,
		header_image,
		url,
		institution: { name: institutionName },
		dossier,
	} = publication;
	const logged = useAppSelector(selectLogged);
	const { language } = useI18next();
	return (
		<div className={`text-comp1 mb-8 sm:mb-0`}>
			<div className="relative mx-auto h-[300px] relative overflow-hidden border-2 border-secundary">
				<a href={url} target="_blank">
					<img className={`absolute w-full`} src={header_image} />
				</a>
				{logged && <FavContainer favorite={false} />}
			</div>
			<h3 className="text-secundary font-bold my-6 sm:my-8 text-base">
				{journal}
			</h3>
			<p className="text-xl mb-8 sm:mb-16 hover:underline">
				<a href={url} target="_blank" className="">
					{title}
				</a>
			</p>
			<p className="text-secundary text-base font-bold ">{institutionName}</p>
			<p className="taxt-sm">{getMonthYear(date, language)}</p>
			<p className="text-sm mb-4">
				{pages_number} <Trans>publication.pages</Trans>
			</p>
			<span className="px-2 py-1 border border-comp1 text-sm">{dossier}</span>
		</div>
	);
};

export default Publication;
