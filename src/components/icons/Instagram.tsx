import * as React from "react";

const Instagram = ({
	variant = "gray",
	className = "",
}: {
	variant?: "gray" | "white";
	className?: string;
}) => {
	return (
		<svg
			className={`${className}`}
			width="31"
			height="31"
			viewBox="0 0 31 31"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M15.0776 7.565C16.3276 7.565 17.5176 7.565 18.7676 7.565C19.1376 7.565 19.5776 7.625 19.9576 7.695C21.4576 8.005 22.3976 9.135 22.5876 10.635C22.6476 10.945 22.6476 11.325 22.6476 11.635C22.6476 13.885 22.6476 16.195 22.6476 18.445C22.6476 19.005 22.5876 19.575 22.3976 20.135C21.9576 21.505 20.8976 22.255 19.5276 22.325C17.7776 22.455 16.0276 22.385 14.2776 22.455C13.0876 22.455 11.9676 22.455 10.7776 22.395C9.02756 22.265 7.83756 21.085 7.58756 19.335C7.52756 19.025 7.52756 18.715 7.52756 18.395C7.52756 16.085 7.52756 13.765 7.52756 11.465C7.52756 10.905 7.65756 10.345 7.77756 9.835C8.21756 8.465 9.27756 7.775 10.6476 7.645C11.8376 7.585 13.0876 7.585 14.2676 7.515C14.5876 7.505 14.8276 7.565 15.0776 7.565ZM15.0776 10.125C12.3276 10.125 10.2076 12.315 10.2076 15.065C10.2076 17.755 12.3976 19.945 15.1476 19.875C17.8376 19.875 19.9576 17.685 19.9576 15.005C19.9576 12.325 17.7676 10.125 15.0776 10.125ZM19.9476 11.125C20.5076 11.125 20.9476 10.685 20.9476 10.185C20.9476 9.625 20.5076 9.185 20.0076 9.185C19.4476 9.185 19.0076 9.625 19.0076 10.185C19.0176 10.685 19.4576 11.125 19.9476 11.125Z"
				fill={`${variant === "gray" ? "#605F5F" : "#FFF"}`}
			/>
			<path
				d="M11.9576 15.005C11.9576 13.255 13.3276 11.875 15.0876 11.815C16.8376 11.815 18.2176 13.185 18.2776 14.945C18.2776 16.695 16.9076 18.075 15.1476 18.135C13.3276 18.185 11.9576 16.755 11.9576 15.005Z"
				fill={`${variant === "gray" ? "#605F5F" : "#FFF"}`}
			/>
			<path
				d="M0.0875549 15.005C0.0875549 6.695 6.83755 0.00500107 15.0876 0.00500107C23.3976 0.00500107 30.0876 6.755 30.0876 15.005C30.0876 23.315 23.3376 30.005 15.0876 30.005C6.76756 29.995 0.0875549 23.245 0.0875549 15.005ZM5.82755 15.005C5.82755 16.135 5.76755 17.255 5.82755 18.445C5.82755 18.885 5.82756 19.325 5.88756 19.755C6.13756 21.505 7.01755 22.945 8.69755 23.695C9.57755 24.065 10.4476 24.255 11.3876 24.255C13.6976 24.255 16.0776 24.255 18.3876 24.255C18.8876 24.255 19.3876 24.195 19.8876 24.125C21.7576 23.815 23.1976 22.875 23.8876 20.995C24.1976 20.245 24.3276 19.435 24.3276 18.615C24.3276 16.305 24.3276 13.985 24.3276 11.685C24.3276 11.245 24.3276 10.805 24.2676 10.375C23.9576 8.505 23.0176 7.065 21.2076 6.315C20.4576 6.005 19.6476 5.875 18.8276 5.875C16.3276 5.875 13.8276 5.875 11.3876 5.875C10.3876 5.875 9.38755 6.065 8.44755 6.565C6.75755 7.505 6.00756 9.005 5.88756 10.875C5.76756 12.185 5.82755 13.625 5.82755 15.005Z"
				fill={`${variant === "gray" ? "#605F5F" : "#FFF"}`}
			/>
		</svg>
	);
};

export default Instagram;