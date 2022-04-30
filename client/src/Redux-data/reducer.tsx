import { SelectedRoll, InitialState } from "../Types/types"

const initialState: InitialState = {
    frameData: {
        currentRoll: 0,
        historicRolls: [],
        rollIndex: 0,
        strike: false,
        frameTotals: [],
        gameTotal: 0
    }
}

export default function rollDetails(state = initialState, action: SelectedRoll): InitialState {
    switch (action.type) {
        case "SELECTED_ROLL": {
            const frameData = action.payload
            return {
                ...state,
                frameData: frameData,
            };
        }
        default:
            return state;
    }
}