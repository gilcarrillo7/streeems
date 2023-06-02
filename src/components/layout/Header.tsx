import * as React from "react";

import Logo from "../../images/logo.svg";
import Button from "../shared/Button";
import Instagram from "../icons/Instagram";
import Linkedin from "../icons/Linkedin";
import Twitter from "../icons/Twitter";

const Header = () => {
	return (
		<header>
			<div className="container flex justify-between items-center py-4">
				<img src={Logo} alt="Streeems Logo" className="w-40 sm:w-auto" />
				<div className="flex items-center gap-8">
					<Instagram className="hidden md:block" />
					<Linkedin className="hidden md:block" />
					<Twitter className="hidden md:block" />
					<Button variant="comp1" className="ml-8">
						Login
					</Button>
				</div>
			</div>
		</header>
	);
};

export default Header;
