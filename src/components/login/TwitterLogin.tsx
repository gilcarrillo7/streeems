import * as React from "react";

const TwitterLogin = () => {
  return (
    <div className="w-full relative">
      <button
        id="custom-google-btn"
        className="relative w-full p-2 font-bold bg-white border-2 border-[#2CA9E0] text-[#2CA9E0]"
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
            d="M11.7833 0C12.2923 0 12.8014 0 13.3688 0C13.8278 0.0500705 14.2868 0.100141 14.7458 0.208627C21.2215 1.32687 25.7613 7.39374 24.9435 13.9279C24.5345 17.5497 22.7988 20.4538 19.8446 22.5985C17.1909 24.5345 14.1866 25.3023 10.8653 24.8934C8.37012 24.5846 6.12529 23.5665 4.2393 21.8808C2.04454 19.9447 0.717677 17.5497 0.208627 14.6957C0.108486 14.2367 0.0500705 13.7777 0 13.3188C0 12.8097 0 12.3007 0 11.7332C0.0500705 11.4244 0.0500704 11.124 0.100141 10.8152C0.50905 8.11142 1.63564 5.71638 3.57169 3.78032C5.45768 1.89433 7.70251 0.667607 10.3562 0.208627C10.8736 0.100141 11.3326 0.0500705 11.7833 0ZM6.13364 10.8653C6.13364 11.5246 6.34226 12.0837 6.74283 12.6511C7.15174 13.1602 7.66078 13.469 8.32839 13.6692V13.7193C7.96955 13.7193 7.56064 13.7193 7.16008 13.7193C7.36871 14.3285 7.66913 14.7875 8.17818 15.1463C8.63716 15.5052 9.19628 15.7054 9.86389 15.7555C8.58709 16.7235 7.21015 17.0824 5.683 16.9238C5.78314 17.024 5.89163 17.024 5.9417 17.0824C6.90973 17.6415 7.92783 18.0003 9.05441 18.1506C10.9905 18.3592 12.7763 18.0504 14.412 16.9822C16.9572 15.2965 18.1839 12.9015 18.234 9.89727C18.234 9.73871 18.2841 9.63857 18.3926 9.53843C18.7514 9.17959 19.1102 8.82075 19.4607 8.42019C19.5108 8.37012 19.5108 8.32005 19.5609 8.26163C19.0518 8.42019 18.5928 8.52033 18.0838 8.67054V8.62047C18.6429 8.26163 19.0018 7.75258 19.202 7.19346C18.693 7.40209 18.1339 7.5523 17.6165 7.75258C17.4579 7.80265 17.3578 7.75258 17.2576 7.65244C16.3897 6.88469 15.3716 6.68441 14.2951 7.09332C13.227 7.50223 12.6094 8.3117 12.4592 9.43829C12.4091 9.74706 12.4592 10.0975 12.4592 10.4063C10.0642 10.2478 8.12811 9.23801 6.60096 7.39374C6.24212 8.053 6.14198 8.72061 6.29219 9.48836C6.45075 10.206 6.85131 10.7652 7.41043 11.2241L7.36036 11.2742C6.89304 11.0656 6.5342 10.9654 6.13364 10.8653Z"
            fill="#2CA9E0"
          />
        </svg>
        Sign in with Twitter
      </button>
    </div>
  );
};

export default TwitterLogin;