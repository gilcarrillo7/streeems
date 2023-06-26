import * as React from "react";
import { useTranslation } from "gatsby-plugin-react-i18next";
import Instagram from "../icons/Instagram";
import Linkedin from "../icons/Linkedin";
import Twitter from "../icons/Twitter";
import Button from "../shared/Button";
import { Trans } from "gatsby-plugin-react-i18next";

const Footer = () => {
	const { t } = useTranslation();

	return (
		<footer>
			<div className="bg-secundary text-white">
				<div className="container">
					<div className="flex flex-col md:flex-row mb-16 pt-4 sm:pt-8">
						<div className="md:w-1/3">
							<h4 className="font-bold text-2xl sm:text-3xl mb-8">
								<Trans>footer.t1</Trans>
							</h4>
							<p className="text-base sm:text-xl font-light">
								<Trans>footer.t2</Trans>
							</p>
						</div>
						<div className="md:w-2/3 flex flex-col md:flex-row gap-8 md:items-end mt-12 md:mt-0 md:pl-8">
							<div className="flex flex-col sm:flex-row">
								<input
									placeholder={t("footer.button1") || ""}
									className="mb-4 sm:mb-0 sm:mr-12 sm:min-w-[300px] bg-transparent text-white border-b-2 font-bold border-white placeholder-white text-center p-2"
								/>
								<Button variant="primary">
									<Trans>footer.button2</Trans>
								</Button>
							</div>
						</div>
					</div>
					<div className="py-4 flex flex-col md:flex-row justify-between items-center">
						<div className="flex gap-4 lg:gap-8 md:order-2">
							<Instagram variant="white" />
							<Linkedin variant="white" />
							<Twitter variant="white" />
						</div>
						<p className="my-4 md:my-0 md:order-1">
							©{new Date().getFullYear()} <Trans>footer.t3</Trans>
						</p>
						<p className="md:order-3">
							<Trans>footer.t4</Trans>
							<a
								href="https://trazovivo.com"
								target="_blank"
								className="underline"
							>
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
