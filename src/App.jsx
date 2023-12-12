import React, { useCallback, useEffect, useRef, useState } from "react";
import Places from "./components/Places";
import Modal from "./components/Modal";
import DeleteConfirmation from "./components/DeleteConfirmation";
import { AVAILABLE_PLACES } from "./data";
import logoImg from "./assets/logo.png";
import { sortPlacesByDistance } from "./loc";

// refetch/read the local storage first (sync code):
const storagePlacesIDs = JSON.parse(localStorage.getItem("pickedPlaces")) || [];
const storagePlaces = storagePlacesIDs.map((storedId) => AVAILABLE_PLACES.find((place) => place.id === storedId));

const App = () => {
	const selectedPlace = useRef();
	const [openModal, setOpenModal] = useState(false);
	const [pickedPlaces, setPickedPlaces] = useState(storagePlaces);
	const [availablePlaces, setAvailablePlaces] = useState(AVAILABLE_PLACES);

	// Declare get users loc (Async/SideEffect) and sort the places according to this location :
	const getSortedPlaces = () => {
		navigator.geolocation.getCurrentPosition((position) => {
			const sortedPlaces = sortPlacesByDistance(AVAILABLE_PLACES, position.coords.latitude, position.coords.longitude);
			setAvailablePlaces(sortedPlaces);
		});
	};

	// handle the side effect/async just above :
	useEffect(() => {
		getSortedPlaces();
	}, []);

	const handleRemovePlaceStart = (id) => {
		setOpenModal(true);
		selectedPlace.current = id;
	};

	const handleRemovePlaceStop = () => {
		setOpenModal(false);
	};

	const addPlace = (id) => {
		setPickedPlaces((oldState) => {
			if (oldState.some((place) => place.id === id)) {
				return [...oldState];
			}
			const place = AVAILABLE_PLACES.find((place) => place.id === id);
			return [...oldState, place];
		});
		const storagePlacesIDs = JSON.parse(localStorage.getItem("pickedPlaces")) || [];
		if (storagePlacesIDs.indexOf(id) === -1) {
			localStorage.setItem("pickedPlaces", JSON.stringify([id, ...storagePlacesIDs]));
		}
	};

	// re-render shield the function below :
	// const removePlace = useCallback(function removePlace() {
	// 	setPickedPlaces((oldState) => oldState.filter((place) => place.id !== selectedPlace.current));
	// 	setOpenModal(false);
	// 	const storagePlacesIDs = JSON.parse(localStorage.getItem("pickedPlaces")) || [];
	// 	localStorage.setItem("pickedPlaces", JSON.stringify(storagePlacesIDs.filter((id) => id !== selectedPlace.current)));
	// }, []);

	const removePlace = () => {
		setPickedPlaces((oldState) => oldState.filter((place) => place.id !== selectedPlace.current));
		setOpenModal(false);
		const storagePlacesIDs = JSON.parse(localStorage.getItem("pickedPlaces")) || [];
		localStorage.setItem("pickedPlaces", JSON.stringify(storagePlacesIDs.filter((id) => id !== selectedPlace.current)));
	};

	return (
		<>
			<Modal open={openModal} onClose={handleRemovePlaceStop}>
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
				<Places title="Available places" places={availablePlaces} onSelectPlace={addPlace} fallbackText={"Fetching data..."} />
			</main>
		</>
	);
};

export default App;
