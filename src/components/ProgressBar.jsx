import React, { useEffect, useState } from "react";

const ProgressBar = ({ timeOut }) => {
	const [remainingTime, setRemainingTime] = useState(timeOut);

	useEffect(() => {
		const pid = setInterval(() => {
			// console.log("INTERVAL");
			setRemainingTime((oldState) => oldState - 100);
		}, 100);
		return () => {
			// console.log("STOP INTERVAL");
			clearInterval(pid);
		};
	}, []);

	return <progress value={remainingTime} max={timeOut} />;
};

export default ProgressBar;
