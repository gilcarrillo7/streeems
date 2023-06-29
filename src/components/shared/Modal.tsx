import React from "react";
import useOutsideClick from "../../hooks/useOutsideClick";

const Modal = ({
	children,
	handleClose,
}: {
	children: React.ReactNode;
	handleClose: () => void;
}) => {
	const modalRef = useOutsideClick(handleClose);

	return (
		<div className="bg-black/50 w-screen h-screen fixed top-0 left-0 z-50">
			<div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
				<div className="relative my-6 mx-auto max-w-3xl">
					<div ref={modalRef} className="bg-white w-[330px]">
						{children}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
