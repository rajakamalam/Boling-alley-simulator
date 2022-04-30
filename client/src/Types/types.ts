export type Frame = {
    currentRoll: Number,
    historicRolls: Number[],
    rollIndex: number,
    strike: Boolean,
    frameTotals: Number[],
    gameTotal: Number,
}

export type InitialState = {
    frameData: Frame,
}

export type SelectedRoll = {
    type: "SELECTED_ROLL",
    payload: Frame,
}