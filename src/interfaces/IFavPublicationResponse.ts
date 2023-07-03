import IFavResult from "./IFavResult";

export default interface IFavPublicationResponse {
	count: number;
	next: string | null;
	previous: string | null;
	results: IFavResult[];
	detail?: string;
}
