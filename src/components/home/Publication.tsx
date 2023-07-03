import React, { useEffect, useState } from "react";
import { Trans, useI18next } from "gatsby-plugin-react-i18next";
import { IPublication } from "../../interfaces";
import { selectLogged, selectToken } from "../../features/auth/AuthSlice";
import {
	postFavourite,
	deleteFavourite,
} from "../../features/publications/publicationsSlice";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { getMonthYear } from "../../utils";

const FavContainer = ({
	favorite,
	onClick,
}: {
	favorite: boolean;
	onClick: () => void;
}) => {
	return (
		<div className="absolute bottom-0 right-0 cursor-pointer" onClick={onClick}>
			<div
				className={`${
					favorite ? "bg-secundary" : "bg-white"
				} w-16 h-16 rounded-full flex items-center justify-center`}
			>
				<div
					className={`${
						favorite ? "text-white" : "text-secundary"
					} text-6xl font-bold z-10`}
				>
					+
				</div>
			</div>
			<div
				className={`${
					favorite ? "bg-secundary" : "bg-white"
				} w-8 h-8 absolute bottom-0 right-0`}
			></div>
		</div>
	);
};

const Publication = ({
	publication,
	favourite: favouriteProp,
	isInFavourite,
}: {
	publication: IPublication;
	favourite: boolean;
	isInFavourite: boolean;
}) => {
	const {
		id,
		journal,
		title,
		date,
		pages_number,
		header_image,
		url,
		institution: { name: institutionName },
		dossier,
	} = publication;

	const dispatch = useAppDispatch();
	const token = useAppSelector(selectToken);
	const logged = useAppSelector(selectLogged);

	const { language } = useI18next();

	const [favourite, setFavourite] = useState(false);
	const [hide, setHide] = useState(false);

	useEffect(() => {
		setFavourite(favouriteProp);
	}, [favouriteProp]);

	const handleFavourite = (publication: string) => {
		if (favourite) {
			dispatch(deleteFavourite({ publication, token }));
			setFavourite(false);
			setHide(isInFavourite);
		} else {
			dispatch(postFavourite({ publication, token }));
			setFavourite(true);
		}
	};

	return (
		<>
			{!hide && (
				<div className={`flex flex-col text-comp1 mb-8 sm:mb-0`}>
					<div className="relative mx-auto w-full h-[300px] relative overflow-hidden border-2 border-secundary">
						<a href={url} target="_blank">
							<img className={`absolute w-full`} src={header_image} />
						</a>
						{logged && (
							<FavContainer
								favorite={favourite}
								onClick={() => handleFavourite(id)}
							/>
						)}
					</div>
					<h3 className="text-secundary font-bold my-6 sm:my-8 text-base">
						{journal}
					</h3>
					<p className="text-xl mb-8 hover:underline">
						<a href={url} target="_blank" className="">
							{title}
						</a>
					</p>
					<div className="mt-auto">
						<p className="text-secundary text-base font-bold ">
							{institutionName}
						</p>
						<p className="taxt-sm">{getMonthYear(date, language)}</p>
						<p className="text-sm mb-4">
							{pages_number} <Trans>publication.pages</Trans>
						</p>
						<span className="px-2 py-1 border border-comp1 text-sm">
							{dossier}
						</span>
					</div>
				</div>
			)}
		</>
	);
};

export default Publication;
