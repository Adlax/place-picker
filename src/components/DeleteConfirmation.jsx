import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";

const timeOut = 3000;

const DeleteConfirmation = ({ onCancel, onConfirm }) => {
	useEffect(() => {
		const pid = setTimeout(() => {
			onConfirm();
		}, timeOut);
		//cleanup fct (executed after function above, or at removal of component):
		return () => {
			clearTimeout(pid);
		};
	}, [onConfirm]);

	return (
		<div id="delete-confirmation">
			<h2>Are you sure?</h2>
			<p>Do you really want to remove this place from the list?</p>
			<div id="confirmation-actions">
				<button onClick={onCancel} className="button-text">
					No
				</button>
				<button onClick={onConfirm} className="button">
					Yes
				</button>
			</div>
			<ProgressBar timeOut={timeOut} />
		</div>
	);
};

export default DeleteConfirmation;
