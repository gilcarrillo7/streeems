import React from "react";
import { Trans } from "gatsby-plugin-react-i18next";
import { showLoginModal, selectLoginModal } from "../../features/ui/uiSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";

import Logo from "../../images/logo.svg";
import Button from "../shared/Button";
import Instagram from "../icons/Instagram";
import Linkedin from "../icons/Linkedin";
import Twitter from "../icons/Twitter";
import { Link } from "gatsby";
import LoginModal from "../login/LoginModal";

const Header = () => {
	const dispatch = useAppDispatch();

	const loginModal = useAppSelector(selectLoginModal);

	return (
		<header>
			<div className="container flex justify-between items-center py-4">
				<Link to="/">
					<img src={Logo} alt="Streeems Logo" className="w-40 sm:w-auto" />
				</Link>
				<div className="flex items-center gap-8">
					<Instagram className="hidden md:block" />
					<Linkedin className="hidden md:block" />
					<Twitter className="hidden md:block" />
					<Button
						variant="comp1"
						className="ml-8"
						onClick={() => dispatch(showLoginModal())}
					>
						<Trans>login.button</Trans>
					</Button>
				</div>
			</div>
			{loginModal && <LoginModal />}
		</header>
	);
};

export default Header;
