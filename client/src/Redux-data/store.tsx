import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { InitialState } from "../Types/types";

import rollDetails from "./reducer";

function saveToLocalStorage(state: InitialState) {
    const localStorageState = JSON.stringify(state);
    localStorage.setItem("state", localStorageState);
}

function loadFromLocalStorage() {
    const localStorageState = localStorage.getItem("state");
    if (localStorageState === null) return undefined;
    return JSON.parse(localStorageState);
}

//Redux store with middleware
const storeFactory = () => {
    const middleware = [thunk];
    const reduxStore = createStore(
        rollDetails,
        loadFromLocalStorage(),
        applyMiddleware(...middleware)
    );
    reduxStore.subscribe(() => saveToLocalStorage(reduxStore.getState()));
    return reduxStore;
}

export default storeFactory
