import { IPublication } from ".";

export default interface IPublicationResponse {
	count: number;
	next: string | null;
	previous: string | null;
	results: IPublication[];
	detail?: string;
}
