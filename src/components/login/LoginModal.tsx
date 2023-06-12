import React, { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { setLoginModal, setLogged } from "../../features/ui/uiSlice";
import { useAppDispatch } from "../../hooks";
import Modal from "../shared/Modal";
import Button from "../shared/Button";
import Input from "../shared/Input";

const LoginModal = () => {
	const dispatch = useAppDispatch();
	const { t } = useTranslation();

	const [signin, setSignin] = useState(false);

	return (
		<Modal handleClose={() => dispatch(setLoginModal(false))}>
			<div className="text-comp1 py-5 px-4">
				<p className="text-primary font-bold text-2xl text-center">
					{signin ? <Trans>signin.t1</Trans> : <Trans>signin.t0</Trans>}
				</p>
				<div className="flex py-2">
					<div className="relative w-2/5">
						<div className="absolute border-primary border-2 w-full top-1/2 -translate-y-1/2"></div>
					</div>
					<div className="w-1/5 text-center">
						<Trans>signin.t2</Trans>
					</div>
					<div className="relative w-2/5">
						<div className="absolute border-primary border-2 w-full top-1/2 -translate-y-1/2"></div>
					</div>
				</div>
				{signin ? (
					<form>
						<Input
							type={"mail"}
							className={"mb-4"}
							placeholder={t("signin.t3")}
						/>
						<Input
							type={"password"}
							className={"mb-4"}
							placeholder={t("signin.t4")}
						/>
						<Input
							type={"password"}
							className={"mb-4"}
							placeholder={t("signin.t8")}
						/>
						<Button type="submit" variant="error" className="!w-full">
							<Trans>signin.t1</Trans>
						</Button>
					</form>
				) : (
					<>
						<form onSubmit={(e) => e.preventDefault()}>
							<Input
								type={"mail"}
								className={"mb-4"}
								placeholder={t("signin.t3")}
							/>
							<Input
								type={"password"}
								className={"mb-4"}
								placeholder={t("signin.t4")}
							/>
							<div className="w-full mb-4 flex justify-between text-sm">
								<label className="">
									<input
										type="checkbox"
										name="remember"
										className="mr-2 rounded-full"
									/>
									<span>
										<Trans>signin.t5</Trans>
									</span>
								</label>
								<a href="#" className="text-primary font-bold hover:underline">
									<Trans>signin.t6</Trans>
								</a>
							</div>
							<Button
								type="submit"
								variant="primary"
								className="!w-full"
								onClick={() => dispatch(setLogged(true))}
							>
								<Trans>signin.t0</Trans>
							</Button>
						</form>
						<p className="text-sm my-4">
							<Trans>signin.t7</Trans>
						</p>
						<Button
							type="submit"
							variant="error"
							className="!w-full"
							onClick={() => setSignin(true)}
						>
							<Trans>signin.t1</Trans>
						</Button>
					</>
				)}
			</div>
		</Modal>
	);
};

export default LoginModal;
