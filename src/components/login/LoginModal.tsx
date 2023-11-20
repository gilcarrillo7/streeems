import React, { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import {
  setLoginModal,
  setLogged,
  doSignUp,
  doLogin,
  selectError,
  selectConfirmMail,
  selectStatus,
} from "../../features/auth/AuthSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Modal from "../shared/Modal";
import Button from "../shared/Button";
import Input from "../shared/Input";
import Checkbox from "../shared/Checkbox";
import { ISignupPayload } from "../../interfaces";
import Loader from "../shared/Loader";
import GoogleLogin from "./GoogleLogin";
import { GoogleOAuthProvider } from "@react-oauth/google";
import FacebookLogin from "./FacebookLogin";
import TwitterLogin from "./TwitterLogin";

const LoginModal = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const status = useAppSelector(selectStatus);
  const error = useAppSelector(selectError);
  const confirmMail = useAppSelector(selectConfirmMail);

  const [signin, setSignin] = useState(false);
  const [signinForm, setSigninForm] = useState<ISignupPayload>({
    email: "",
    password: "",
    re_password: "",
  });

  const handleSigninChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSigninForm({ ...signinForm, [e.target.name]: e.target.value });
  };

  const handleSignUpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(doSignUp(signinForm));
  };

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(doLogin(signinForm));
  };

  return (
    <Modal handleClose={() => dispatch(setLoginModal(false))}>
      <div className="text-comp1 py-5 px-4">
        <p className="text-primary font-bold text-2xl text-center mb-4">
          {signin ? <Trans>signin.t1</Trans> : <Trans>signin.t0</Trans>}
        </p>
        <GoogleOAuthProvider clientId="199963887222-onjhk4pshbjtcmm5dmvbhaoijm2gise9.apps.googleusercontent.com">
          <GoogleLogin />
        </GoogleOAuthProvider>
        <FacebookLogin />
        <TwitterLogin />
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
          <>
            {confirmMail ? (
              <p className="text-lg py-4 text-primary">
                <Trans>signin.t10</Trans>
              </p>
            ) : (
              <form onSubmit={handleSignUpSubmit}>
                <Input
                  type={"email"}
                  name="email"
                  className={"mb-4"}
                  placeholder={t("signin.t3")}
                  onChange={handleSigninChange}
                  required={true}
                />
                <Input
                  type={"password"}
                  name="password"
                  className={"mb-4"}
                  placeholder={t("signin.t4")}
                  onChange={handleSigninChange}
                  required={true}
                  min={8}
                />
                <Input
                  type={"password"}
                  name="re_password"
                  className={"mb-4"}
                  placeholder={t("signin.t8")}
                  onChange={handleSigninChange}
                  required={true}
                  min={8}
                />
                {error.length > 0 ? (
                  <div className="text-sm mb-4 text-error">
                    {error.map((error, i) => (
                      <p key={`${error}${i}`} className="">
                        - <Trans>{error}</Trans>
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm mb-4">
                    <Trans>signin.t9</Trans>
                  </p>
                )}
                {status === "idle" ? (
                  <Button type="submit" variant="error" className="!w-full">
                    <Trans>signin.t1</Trans>
                  </Button>
                ) : (
                  <Loader />
                )}
              </form>
            )}
          </>
        ) : (
          <>
            <form onSubmit={handleLoginSubmit}>
              <Input
                type={"email"}
                name="email"
                className={"mb-4"}
                placeholder={t("signin.t3")}
                onChange={handleSigninChange}
                required={true}
              />
              <Input
                type={"password"}
                name="password"
                className={"mb-4"}
                placeholder={t("signin.t4")}
                onChange={handleSigninChange}
                required={true}
                min={8}
              />
              <div className="w-full mb-4 flex justify-between text-sm">
                <label className="">
                  <Checkbox label={t("signin.t5")} />
                </label>
                <a href="#" className="text-primary font-bold hover:underline">
                  <Trans>signin.t6</Trans>
                </a>
              </div>
              {error.length > 0 && (
                <div className="text-sm mb-4 text-error">
                  {error.map((error, i) => (
                    <p key={`${error}${i}`} className="">
                      - <Trans>{error}</Trans>
                    </p>
                  ))}
                </div>
              )}
              {status === "idle" ? (
                <Button type="submit" variant="primary" className="!w-full">
                  <Trans>signin.t0</Trans>
                </Button>
              ) : (
                <Loader />
              )}
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
