import * as React from "react";

const FacebookLogin = () => {
  return (
    <div className="w-full relative my-4">
      <button
        id="custom-google-btn"
        className="relative w-full p-2 font-bold bg-white border-2 border-[#157DC3] text-[#157DC3]"
      >
        <svg
          className="absolute left-2 top-2"
          width="26"
          height="25"
          viewBox="0 0 26 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.5757 0C5.63088 0 0 5.63088 0 12.5757C0 18.8519 4.59883 24.0541 10.6094 24.9977L10.6118 16.2124H7.41776V12.5757H10.6118V9.80337C10.6118 6.65129 12.4895 4.91101 15.362 4.91101C16.7389 4.91101 18.1786 5.15795 18.1786 5.15795V8.25179H16.5921C15.0289 8.25179 14.542 9.22095 14.542 10.2157V12.5757H18.0272L17.4704 16.2124H14.5397L14.5373 25C20.5503 24.0588 25.1514 18.8543 25.1514 12.5757C25.1514 5.63088 19.5205 0 12.5757 0Z"
            fill="#157DC3"
          />
        </svg>
        Sign in with Facebook
      </button>
    </div>
  );
};

export default FacebookLogin;
