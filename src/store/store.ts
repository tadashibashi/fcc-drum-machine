import { configureStore } from "@reduxjs/toolkit";
import { padsReducer, defaultPadState, DrumPadsState } from "./PadsSlice";
import { appReducer, AppState, defaultAppState } from "./AppSlice";

export interface FullState {
    app: AppState;
    pads: DrumPadsState
}

const defaultState: FullState = {
    app: defaultAppState,
    pads: defaultPadState
};

export const store = configureStore({
    reducer: {
        app: appReducer, 
        pads: padsReducer
    },
    preloadedState: defaultState
});