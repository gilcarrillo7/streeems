import React from "react";
import { Trans } from "gatsby-plugin-react-i18next";
import { navigate } from "gatsby";
import { Helmet } from "react-helmet";
import {
  setMenuOpen,
  setSearchClicked,
  selectMenuOpen,
  selectSearchClicked,
} from "../../features/ui/uiSlice";
import {
  setLoginModal,
  selectLoginModal,
  selectLogged,
} from "../../features/auth/AuthSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";

import Logo from "../../images/logo.svg";
import Button from "../shared/Button";
import Instagram from "../icons/Instagram";
import Linkedin from "../icons/Linkedin";
import Twitter from "../icons/Twitter";
import LoginModal from "../login/LoginModal";
import HamburgerMenu from "./HamburgerMenu";
import Lupa from "../icons/Lupa";
import Menu from "./Menu";

const Header = () => {
  const dispatch = useAppDispatch();

  const loginModal = useAppSelector(selectLoginModal);
  const logged = useAppSelector(selectLogged);
  const menuOpen = useAppSelector(selectMenuOpen);
  const searchClicked = useAppSelector(selectSearchClicked);

  return (
    <header>
      <div className="container flex justify-between items-center py-4">
        <a
          href="#"
          onClick={() => {
            dispatch(setMenuOpen(false));
            navigate("/");
          }}
        >
          <img src={Logo} alt="Streeems Logo" className="w-40 sm:w-auto" />
        </a>
        <div className="flex items-center gap-8">
          {logged ? (
            <>
              <div
                className="cursor-pointer"
                onClick={() => dispatch(setSearchClicked(!searchClicked))}
              >
                <Lupa />
              </div>
              <HamburgerMenu />
            </>
          ) : (
            <>
              <Instagram className="hidden md:block" />
              <Linkedin className="hidden md:block" />
              <Twitter className="hidden md:block" />
              <Button
                variant="comp1"
                className="ml-8"
                onClick={() => dispatch(setLoginModal(true))}
              >
                <Trans>login.button</Trans>
              </Button>
            </>
          )}
        </div>
      </div>
      {loginModal && <LoginModal />}
      {menuOpen && (
        <>
          <Menu />
          <Helmet
            bodyAttributes={{
              class: `${menuOpen ? "overflow-hidden" : ""}`,
            }}
          />
        </>
      )}
    </header>
  );
};

export default Header;
