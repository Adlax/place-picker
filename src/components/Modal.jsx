import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children, open, onClose }) => {
	const dialog = useRef();

	// need useEffect here, because we dont have the dialog DOM initially. So, need to init render first :
	useEffect(() => {
		if (open) {
			dialog.current.showModal();
		} else {
			dialog.current.close();
		}
	}, [open]);

	return createPortal(
		<dialog ref={dialog} onClose={onClose}>
			{children}
		</dialog>,
		document.getElementById("modal")
	);
};

export default Modal;
