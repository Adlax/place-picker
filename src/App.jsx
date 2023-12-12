import React, { useRef, useState } from "react";
import Places from "./components/Places";
import Modal from "./components/Modal";
import DeleteConfirmation from "./components/DeleteConfirmation";
import { AVAILABLE_PLACES } from "./data";
import logoImg from "./assets/logo.png";

const App = () => {
	const modal = useRef();
	const selectedPlace = useRef();
	const [pickedPlaces, setPickedPlaces] = useState([]);

	const handleRemovePlaceStart = (id) => {
		modal.current.open();
		selectedPlace.current = id;
	};

	const handleRemovePlaceStop = () => {
		modal.current.close();
	};

	const addPlace = (id) => {
		setPickedPlaces((oldState) => {
			if (oldState.some((place) => place.id === id)) {
				return;
			}
			const place = AVAILABLE_PLACES.find((place) => place.id === id);
			return [...oldState, place];
		});
	};

	const removePlace = () => {
		setPickedPlaces((oldState) => oldState.filter((place) => place.id !== selectedPlace.current));
		modal.current.close();
	};

	return (
		<>
			<Modal ref={modal}>
				<DeleteConfirmation onCancel={handleRemovePlaceStop} onConfirm={removePlace} />
			</Modal>
			<header>
				<img src={logoImg} alt="globe" />
				<h1>PlacePicker</h1>
				<p>Where would you like to go?</p>
			</header>
			<main>
				<Places
					title="I'd like to visit..."
					places={pickedPlaces}
					onSelectPlace={handleRemovePlaceStart}
					fallbackText={"Select the places you would like to visit below"}
				/>
				<Places title="Available places" places={AVAILABLE_PLACES} onSelectPlace={addPlace} />
			</main>
		</>
	);
};

export default App;
