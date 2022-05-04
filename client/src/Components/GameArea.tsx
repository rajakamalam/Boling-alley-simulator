import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import Card from 'react-bootstrap/Card'

import './Styles/GameArea.css'
import { getGameTotal, updateStateValues } from '../Redux-data/action'
import { InitialState } from '../Types/types'

export default function GameArea() {
    localStorage.clear();
    const dispatch = useDispatch()

    const [numberOfRolls, setNumberOfRolls] = useState({ disableButtonCount: 10, rollCount: 1 });

    const frameValues = useSelector((state: InitialState) => state)

    var index = frameValues.frameData.historicRolls.length

    const isDisabled = (buttonValue: number) => {
        const historicRollArr = frameValues.frameData.historicRolls
        // Disabling roll buttons for last frame.
        if (numberOfRolls.rollCount === 19) {
            if (historicRollArr[historicRollArr.length - 1] !== 10) {
                // When frame 10 roll-1 is 10, ignore diabling the buttons.
                if (historicRollArr[historicRollArr.length - 2] === 10) {
                    return false
                }
                // When frame 10 roll-1 is not 10, disable all the buttons.
                return true
            } else if (historicRollArr[historicRollArr.length] === 10) {
                // When frame 10 roll-2 is 10, ignore diabling the buttons.
                return false
            }
        } else if (numberOfRolls.rollCount === 20) {
            // When frame 10 roll-2 is 10, ignore diabling the buttons.
            if (historicRollArr[historicRollArr.length - 1] === 10) {
                return false
            }
            // When frame 10 roll-2 is not 10, disable all the buttons.
            return true
        } else if (numberOfRolls.rollCount === 21) {
            // Disable all buttons on the last chance.
            return true
        }

        // Disabling buttons for frames [1 - 9].
        if (numberOfRolls.rollCount % 2 !== 0) {
            return false
        }

        // Disable buttons after first roll of each frame until frame 9.
        if (buttonValue > numberOfRolls.disableButtonCount) return true

        return false
    }

    const selectRollValue = (rollValue: number) => {
        if (rollValue < 10 && index < 19) {
            // Populate the data when frame [1 - 9] and frame 10 roll-1.
            frameValues.frameData.rollIndex = index + 1
            frameValues.frameData.strike = false
            frameValues.frameData.currentRoll = rollValue
            frameValues.frameData.historicRolls = frameValues.frameData.historicRolls
            frameValues.frameData.historicRolls.push(rollValue)
            frameValues.frameData.frameTotals = frameValues.frameData.frameTotals
            frameValues.frameData.gameTotal = frameValues.frameData.gameTotal
        } else if (rollValue === 10 && index < 19) {
            // Populate the data when frame [1 - 9] and frame 10 roll-1.
            frameValues.frameData.rollIndex = index + 2
            frameValues.frameData.strike = false
            frameValues.frameData.currentRoll = rollValue
            frameValues.frameData.historicRolls = frameValues.frameData.historicRolls
            frameValues.frameData.historicRolls.push(rollValue)
            // Add a roll when its a strike.
            frameValues.frameData.historicRolls.push(0)
            frameValues.frameData.frameTotals = frameValues.frameData.frameTotals
            frameValues.frameData.gameTotal = frameValues.frameData.gameTotal
        } else if (index === 19) {
            // Populate the data when frame is 10 and roll-2.
            frameValues.frameData.rollIndex = index + 2
            frameValues.frameData.strike = false
            frameValues.frameData.currentRoll = rollValue
            frameValues.frameData.historicRolls = frameValues.frameData.historicRolls
            frameValues.frameData.historicRolls.push(rollValue)
            frameValues.frameData.frameTotals = frameValues.frameData.frameTotals
            frameValues.frameData.gameTotal = frameValues.frameData.gameTotal
        } else if (index === 20) {
            // Populate the data when frame is 10 and roll-3.
            frameValues.frameData.rollIndex = index + 1
            frameValues.frameData.strike = false
            frameValues.frameData.currentRoll = rollValue
            frameValues.frameData.historicRolls = frameValues.frameData.historicRolls
            frameValues.frameData.historicRolls.push(rollValue)
            frameValues.frameData.frameTotals = frameValues.frameData.frameTotals
            frameValues.frameData.gameTotal = frameValues.frameData.gameTotal
        }
        dispatch(updateStateValues(frameValues.frameData))
    }

    const scoreCalculation = () => {
        dispatch(getGameTotal(frameValues.frameData))
    }

    return (
        <div className="divBody">
            <Card className="cardBody">

                <h4>Click to select the number of pins down:</h4>

                <button className="btn" disabled={isDisabled(0)} onClick={() => {
                    setNumberOfRolls({ disableButtonCount: 10, rollCount: frameValues.frameData.rollIndex })
                    selectRollValue(0)
                }} >0</button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button className="btn" disabled={isDisabled(1)} onClick={() => {
                    setNumberOfRolls({ disableButtonCount: 9, rollCount: frameValues.frameData.rollIndex })
                    selectRollValue(1)
                }} >1</button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button className="btn" disabled={isDisabled(2)} onClick={() => {
                    setNumberOfRolls({ disableButtonCount: 8, rollCount: frameValues.frameData.rollIndex })
                    selectRollValue(2)
                }} >2</button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button className="btn" disabled={isDisabled(3)} onClick={() => {
                    setNumberOfRolls({ disableButtonCount: 7, rollCount: frameValues.frameData.rollIndex })
                    selectRollValue(3)
                }} >3</button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button className="btn" disabled={isDisabled(4)} onClick={() => {
                    setNumberOfRolls({ disableButtonCount: 6, rollCount: frameValues.frameData.rollIndex })
                    selectRollValue(4)
                }} >4</button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button className="btn" disabled={isDisabled(5)} onClick={() => {
                    setNumberOfRolls({ disableButtonCount: 5, rollCount: frameValues.frameData.rollIndex })
                    selectRollValue(5)
                }} >5</button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button className="btn" disabled={isDisabled(6)} onClick={() => {
                    setNumberOfRolls({ disableButtonCount: 4, rollCount: frameValues.frameData.rollIndex })
                    selectRollValue(6)
                }} >6</button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button className="btn" disabled={isDisabled(7)} onClick={() => {
                    setNumberOfRolls({ disableButtonCount: 3, rollCount: frameValues.frameData.rollIndex })
                    selectRollValue(7)
                }} >7</button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button className="btn" disabled={isDisabled(8)} onClick={() => {
                    setNumberOfRolls({ disableButtonCount: 2, rollCount: frameValues.frameData.rollIndex })
                    selectRollValue(8)
                }} >8</button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button className="btn" disabled={isDisabled(9)} onClick={() => {
                    setNumberOfRolls({ disableButtonCount: 1, rollCount: frameValues.frameData.rollIndex })
                    selectRollValue(9)
                }} >9</button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button className="btn" disabled={isDisabled(10)} onClick={() => {
                    setNumberOfRolls({ disableButtonCount: 0, rollCount: frameValues.frameData.rollIndex + 1 })
                    selectRollValue(10)
                }} >10</button>

                <br></br>
                <br></br>

                <table key={index}>
                    <thead>
                        <tr>
                            <th>Frame 1</th>
                            <th>Frame 2</th>
                            <th>Frame 3</th>
                            <th>Frame 4</th>
                            <th>Frame 5</th>
                            <th>Frame 6</th>
                            <th>Frame 7</th>
                            <th>Frame 8</th>
                            <th>Frame 9</th>
                            <th style={{ width: '135px' }}>Frame 10</th>
                        </tr>
                    </thead>
                </table>

                <table>
                    <tbody>
                        <tr>
                            {frameValues.frameData.historicRolls.map((roll) => (
                                <td style={{ width: '45px' }}>{roll.toString()}</td>
                            ))}
                        </tr>
                    </tbody>
                </table>

                <br></br>
                <br></br>
                <button className="btn_final_score" onClick={() => {
                    scoreCalculation()
                }} >Final score</button>
                <br></br>
                <br></br>
                <p className="p_total_score">{`Total score is : ${frameValues.frameData.gameTotal}`}</p>
            </Card>
        </div >
    )
}
