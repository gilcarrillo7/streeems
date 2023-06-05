import React from "react";
import { IPublication } from "../../interfaces";
import { Trans, useI18next } from "gatsby-plugin-react-i18next";
import { getMonthYear } from "../../utils";

const Publication = ({ publication }: { publication: IPublication }) => {
	const {
		journal,
		title,
		date,
		pages_number,
		header_image,
		url,
		institution: { name: institutionName },
	} = publication;
	const { language } = useI18next();
	return (
		<div className={`text-comp1 mb-8 sm:mb-0`}>
			<a href={url} target="_blank">
				<div className="mx-auto h-[300px] relative overflow-hidden border-2 border-secundary">
					<img className={`absolute w-full`} src={header_image} />
				</div>
			</a>
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
			<p className="text-sm">
				{pages_number} <Trans>publication.pages</Trans>
			</p>
		</div>
	);
};

export default Publication;
