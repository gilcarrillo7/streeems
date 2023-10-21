import { IPublication } from ".";

export default interface IPublicationResponse {
	results: IPublication[];
	count: number;
	next: string | null;
	previous: string | null;
	detail?: string;
}
