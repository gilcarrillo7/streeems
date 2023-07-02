export default interface IUserInfoResponse {
	id: number;
	auth_token: string;
	email: string;
	first_name: string;
	last_name: string;
	google_id: null;
	profile_image_url: null;
	is_premium: boolean;
	is_reviewer: boolean;
	uid?: string[];
	token?: string[];
}
