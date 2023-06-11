import React, { useRef, useEffect } from "react";

const Modal = ({
	children,
	handleClose,
}: {
	children: React.ReactNode;
	handleClose: () => void;
}) => {
	const modalRef = useRef<any>(null);

	useEffect(() => {
		const closeModal = (e: MouseEvent) => {
			e.stopPropagation();
			if (modalRef.current && !modalRef.current.contains(e.target)) {
				handleClose();
			}
		};
		document.addEventListener("mousedown", closeModal);
		return () => {
			document.removeEventListener("mousedown", closeModal);
		};
	}, [modalRef]);

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
