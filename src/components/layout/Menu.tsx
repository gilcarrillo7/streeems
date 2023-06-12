import * as React from "react";
import { Trans } from "gatsby-plugin-react-i18next";
import { navigate } from "gatsby";
import { setMenuOpen } from "../../features/ui/uiSlice";
import { useAppDispatch } from "../../hooks";
import Instagram from "../icons/Instagram";
import Linkedin from "../icons/Linkedin";
import Twitter from "../icons/Twitter";

const Menu = () => {
	const dispatch = useAppDispatch();

	const handleNav = (url: string) => {
		dispatch(setMenuOpen(false));
		navigate(url);
	};
	return (
		<div className="w-screen h-[calc(100vh-84px)] sm:h-[calc(100vh-126px)] bg-primary text-white fixed left-0 top-[84px] sm:top-[126px] z-30 flex items-center text-white font-light">
			<div className="container flex flex-col sm:flex-row">
				<div className="sm:w-1/2 text-3xl sm:text-5xl sm:order-2">
					<div className="flex flex-col gap-4 sm:gap-8 mb-12 sm:mb-0 items-center sm:items-start">
						<a href="#" className="hover:underline">
							<Trans>menu.t2</Trans>
						</a>
						<a
							href="#"
							onClick={() => handleNav("/upload")}
							className="hover:underline"
						>
							<Trans>menu.t3</Trans>
						</a>
						<a href="#" className="hover:underline">
							<Trans>menu.t4</Trans>
						</a>
						<a
							href="#"
							onClick={() => handleNav("/vision")}
							className="hover:underline"
						>
							<Trans>menu.t5</Trans>
						</a>
						<a href="#" className="hover:underline">
							<Trans>menu.t6</Trans>
						</a>
					</div>
				</div>
				<div className="w-full sm:w-1/2 text-xl sm:text-3xl sm:pr-32 flex items-center justify-center sm:order-1">
					<div className="text-center sm:text-left">
						<p className="w-full">
							<Trans>menu.t1</Trans>
						</p>
						<div className="flex gap-8 py-8 justify-center sm:justify-normal">
							<Instagram variant="white" className="scale-150" />
							<Linkedin variant="white" className="scale-150" />
							<Twitter variant="white" className="scale-150" />
						</div>
						<a className="hover:text-underline" href="mailto:mail@streeems.org">
							mail@streeems.org
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Menu;
