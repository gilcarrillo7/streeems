import React from "react";
import { setMenuOpen, selectMenuOpen } from "../../features/ui/uiSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";

const HamburgerMenu = () => {
	const dispatch = useAppDispatch();
	const menuOpen = useAppSelector(selectMenuOpen);

	return (
		<button
			className={`relative z-50 w-10 h-10 focus:outline-none bg-transparent transition duration-200 ease-in-out ${
				menuOpen ? "text-white" : "text-black"
			}`}
			onClick={() => dispatch(setMenuOpen(!menuOpen))}
		>
			<span className="sr-only bg-gray">Menu</span>
			<div className="block w-8 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
				<span
					aria-hidden="true"
					className={`block absolute h-1 w-8 transform transition duration-500 ease-in-out bg-comp1 ${
						menuOpen ? "-rotate-45" : `-translate-y-3`
					}`}
				></span>
				<span
					aria-hidden="true"
					className={`block absolute h-1 w-8 bg-comp1 ${
						menuOpen ? "opacity-0" : ""
					} transform transition duration-500 ease-in-out `}
				></span>
				<span
					aria-hidden="true"
					className={`block absolute h-1 w-8 transform  transition duration-500 ease-in-out bg-comp1 ${
						menuOpen ? "rotate-45" : `translate-y-3`
					}`}
				></span>
			</div>
		</button>
	);
};

export default HamburgerMenu;
