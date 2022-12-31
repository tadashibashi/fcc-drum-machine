import { Bank, Pad, padBanks, copyBank } from "./PadBanks";



export interface DrumPadsState {
    bank: Bank
}

enum DrumPadsActionType {
    UpdateBank = "UpdateBank",
    UpdatePad = "UpdatePad",
}

interface DrumPadsAction {
    type: DrumPadsActionType;
    data?: Bank | { index: number, pad: Pad };
}

export const drumPadsActions = {
    updateBank(bankIndex: number): DrumPadsAction {
        return {
            type: DrumPadsActionType.UpdateBank,
            data: padBanks[bankIndex]
        };
    },
    updatePad(index: number, pad: Pad): DrumPadsAction {
        return {
            type: DrumPadsActionType.UpdatePad,
            data: {
                index, pad
            }
        };
    }
};


export const defaultPadState: DrumPadsState = {
    bank: padBanks[0]
};


export function padsReducer(state: DrumPadsState = defaultPadState, action: DrumPadsAction) {
    switch(action.type) {
        case DrumPadsActionType.UpdateBank:
            return {
                bank: action.data as Bank
            };

        case DrumPadsActionType.UpdatePad: {
            const bank = copyBank(state.bank);
            const data = action.data as { index: number, pad: Pad };
            bank.pads[data.index] = data.pad;

            return {
                bank
            };
        }

        default:
            return state;
    }
}
