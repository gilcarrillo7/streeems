import React from "react";
import { FallingLines } from "react-loader-spinner";

const Loader = () => {
	return (
		<div className="w-full flex items-center justify-center">
			<FallingLines color="#227E66" width="50" />
		</div>
	);
};

export default Loader;
