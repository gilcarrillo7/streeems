import { GoogleLogin as Google } from "@react-oauth/google";
import React from "react";
import { useAppDispatch } from "../../hooks";
import { googleAuth } from "../../features/auth/AuthSlice";

const GoogleLogin = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="w-full relative">
      <button
        id="custom-google-btn"
        className="relative w-full p-2 font-bold bg-white border-2 border-error text-error"
      >
        <svg
          className="absolute left-2 top-2"
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.5012 10.2271V15.0677H19.228C18.933 16.624 18.0457 17.9433 16.7171 18.8283L20.7749 21.9756C23.1372 19.7946 24.5007 16.5914 24.5007 12.7844C24.5007 11.8971 24.4217 11.0447 24.273 10.2271H12.5012Z"
            fill="#EE695D"
          />
          <path
            d="M5.49577 14.8799L4.5806 15.5814L1.34033 18.1016C3.39831 22.1804 7.61182 25.0002 12.4989 25.0002C15.8739 25.0002 18.7031 23.8876 20.7726 21.9783L16.7171 18.8286C15.6045 19.5789 14.1829 20.0341 12.5013 20.0341C9.2517 20.0341 6.48992 17.8414 5.50042 14.8869L5.49577 14.8799Z"
            fill="#EE695D"
          />
          <path
            d="M1.34024 6.89648C0.487781 8.57817 0 10.4759 0 12.499C0 14.5221 0.487781 16.4199 1.34024 18.1015C1.34024 18.1132 5.50032 14.8752 5.50032 14.8752C5.24947 14.125 5.10313 13.3306 5.10313 12.499C5.10313 11.6675 5.25179 10.8731 5.50032 10.1228L1.34024 6.89648Z"
            fill="#EE695D"
          />
          <path
            d="M12.5012 4.9777C14.3431 4.9777 15.9784 5.61414 17.2861 6.84056L20.8655 3.26117C18.696 1.23804 15.8762 0 12.5012 0C7.61406 0 3.39823 2.80591 1.34258 6.89863L5.50266 10.125C6.48984 7.1704 9.25161 4.9777 12.5012 4.9777Z"
            fill="#EE695D"
          />
        </svg>
        Sign in with Google
      </button>
      <div className="absolute top-0 left-0 opacity-0 w-full">
        <Google
          onSuccess={(credentialResponse: any) => {
            dispatch(googleAuth(credentialResponse.credential));
          }}
          onError={() => {
            console.log("Login Failed");
          }}
          size="large"
        />
      </div>
    </div>
  );
};

export default GoogleLogin;
