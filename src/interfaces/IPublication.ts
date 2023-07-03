export default interface IPublication {
	id: string;
	title: string;
	content: Content;
	date: string;
	week: number;
	month: number;
	type: IType;
	url: string;
	header_image: string;
	pages_number: number;
	institution: IInstitution;
	dossier: string;
	journal: string;
	feedback: unknown;
	created: string;
	modified: string;
	favourite: boolean;
}
export enum Content {
	Tbd = "tbd",
}

export interface IInstitution {
	country: ICountry | null;
	name: string;
	home_page: null | string;
	download_page: null | string;
	abbreviation: null | string;
	is_active: boolean;
}

export enum ICountry {
	De = "DE",
	Deutschland = "Deutschland",
	Eu = "EU",
	Global = "Global",
	Uk = "UK",
}

export enum IType {
	Analyse = "analyse",
	Factsheet = "factsheet",
	Paper = "paper",
	Studie = "studie",
}
