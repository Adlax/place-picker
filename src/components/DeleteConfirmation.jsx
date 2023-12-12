import React, { useEffect, useState } from "react";

const timeOut = 3000;

const DeleteConfirmation = ({ onCancel, onConfirm }) => {
	const [remainingTime, setRemainingTime] = useState(timeOut);

	useEffect(() => {
		const pid1 = setInterval(() => {
			setRemainingTime((oldState) => oldState - 10);
		}, 10);
		return () => {
			clearInterval(pid1);
		};
	}, []);

	useEffect(() => {
		const pid2 = setTimeout(() => {
			onConfirm();
		}, timeOut);
		//cleanup fct (executed after function above, or at removal of component):
		return () => {
			clearTimeout(pid2);
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
			<progress value={remainingTime} max={timeOut} />
		</div>
	);
};

export default DeleteConfirmation;
