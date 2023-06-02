import * as React from "react";
import Instagram from "../icons/Instagram";
import Linkedin from "../icons/Linkedin";
import Twitter from "../icons/Twitter";
import Button from "../shared/Button";

const Footer = () => {
	return (
		<footer>
			<div className="bg-secundary text-white">
				<div className="container">
					<div className="flex flex-col md:flex-row mb-16">
						<div className="md:w-1/3">
							<h4 className="font-bold text-2xl sm:text-3xl mb-8">Newsletter</h4>
							<p className="text-base sm:text-xl font-light">
								Erhalte immer freitags eine Übersicht zu allen neu verlinkten
								Publikationen auf streeems
							</p>
						</div>
						<div className="md:w-2/3 flex flex-col md:flex-row gap-8 md:items-end mt-12 md:mt-0 md:pl-8">
							<Button variant="white">Email</Button>
							<Button variant="primary">Abonnieren</Button>
						</div>
					</div>
					<div className="py-4 flex flex-col md:flex-row justify-between items-center">
						<div className="flex gap-4 lg:gap-8 md:order-2">
							<Instagram variant="white" />
							<Linkedin variant="white" />
							<Twitter variant="white" />
						</div>
						<p className="my-4 md:my-0 md:order-1">
							©{new Date().getFullYear()} streeems. All Rights Reserved.
						</p>
						<p className="md:order-3">
							Webdesign und Entwicklung von{" "}
							<a href="https://trazovivo.com" target="_blank">
								Trazo Vivo
							</a>
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
