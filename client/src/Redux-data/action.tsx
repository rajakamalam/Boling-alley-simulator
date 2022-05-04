import { Dispatch } from "redux"
import axios from 'axios'

import { SelectedRoll, Frame } from "../Types/types"

export function selectedRollValue(frameData: Frame): SelectedRoll {
    return {
        type: "SELECTED_ROLL",
        payload: frameData,
    };
}

export function updateStateValues(frameData: Frame) {
    return async (dispatch: Dispatch) => {
        dispatch(selectedRollValue(frameData))
    }
}

export function getGameTotal(frameData: Frame) {
    return async (dispatch: Dispatch) => {
        axios({
            method: 'POST',
            url: 'http://localhost:5000',
            data: frameData

        }).then(response => {
            let data = response.data
            dispatch(selectedRollValue(data))
        })
    }
}