import { drumPadsActions } from "./PadsSlice";

export interface AppState {
    bank: number;
    volume: number;
    label: string;
    isOn: boolean;
}

enum AppActionType {
    SetVolume = "SetVolume",
    SetBank = "SetBank",
    SetLabel = "SetLabel",
    SetOnOff = "SetOnOff",
    Reset = "Reset"
}

interface AppAction {
    type: AppActionType;
    data?: number | string | boolean;
}

export const defaultAppState = {
    bank: 0,
    volume: .5,
    label: "",
    isOn: true
};

export const appActions = {
    setVolume(vol: number): AppAction {
        return {
            type: AppActionType.SetVolume,
            data: vol
        }
    },
    setBank(bank: number): AppAction {
        return {
            type: AppActionType.SetBank,
            data: bank
        }
    },
    setLabel(label: string): AppAction {
        return {
            type: AppActionType.SetLabel,
            data: label
        };
    },
    reset(): AppAction {
        return {
            type: AppActionType.Reset
        }
    },
    setOnOff(isOn: boolean) {
        return {
            type: AppActionType.SetOnOff,
            data: isOn
        }
    }
}

export function appReducer(state: AppState = defaultAppState, action: AppAction) {
    switch(action.type) {
        case AppActionType.SetBank:
            drumPadsActions.updateBank(action.data as number);
            return Object.assign({}, state, {bank: action.data as number});
        case AppActionType.SetVolume:
            return Object.assign({}, state, {volume: action.data as number});
        case AppActionType.SetLabel:
            return Object.assign({}, state, {label: action.data as string});
        case AppActionType.SetOnOff: {
            const partial = {isOn: action.data as boolean} as Partial<AppState>;
            if (action.data === false)
                partial.label = "";
            return Object.assign({}, state, partial);
        }
            
        case AppActionType.Reset:
            return Object.assign({}, defaultAppState);
        default:
            return state;
    }
}
