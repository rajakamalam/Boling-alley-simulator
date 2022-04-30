import { useDispatch, useSelector } from "react-redux"
import React, { useState } from "react"
import Card from 'react-bootstrap/Card'

import './Styles/gameArea.css'
import { getGameTotal, updateStateValues } from '../Redux-data/action'
import { InitialState } from '../Types/types'

export default function GameArea() {
    localStorage.clear();
    const dispatch = useDispatch()

    //1. Eliminate the buttons based on current value
    const [numberOfRolls, setNumberOfRolls] = useState({ roll: 10, count: 1 });
    const isDisabled = (element: number) => {
        // console.log(numberOfRolls)
        if (numberOfRolls.count % 2 != 0) {
            return false
        }

        if (element > numberOfRolls.roll) return true

        return false
    }

    const frameValues = useSelector((state: InitialState) => state)

    var index = frameValues.frameData.historicRolls.length

    //Choosing number of pins down
    const selectRollValue = (rollValue: number) => {
        if (index == 21) return

        //3. Check for strike - formulate and send data to node
        if (rollValue < 10 && index <= 22) {
            frameValues.frameData.rollIndex = index + 1
            frameValues.frameData.strike = false
            frameValues.frameData.currentRoll = rollValue
            frameValues.frameData.historicRolls = frameValues.frameData.historicRolls
            frameValues.frameData.historicRolls.push(rollValue)
            //Unchanged until the end
            frameValues.frameData.frameTotals = frameValues.frameData.frameTotals
            frameValues.frameData.gameTotal = frameValues.frameData.gameTotal
        }
        else if (rollValue === 10 && index <= 22) {
            frameValues.frameData.rollIndex = index + 2
            frameValues.frameData.strike = false
            frameValues.frameData.currentRoll = rollValue
            frameValues.frameData.historicRolls = frameValues.frameData.historicRolls
            frameValues.frameData.historicRolls.push(rollValue)
            frameValues.frameData.historicRolls[frameValues.frameData.historicRolls.length] = 0
            //Unchanged until the end
            frameValues.frameData.frameTotals = frameValues.frameData.frameTotals
            frameValues.frameData.gameTotal = frameValues.frameData.gameTotal
        }
        // console.log(frameData)
        dispatch(updateStateValues(frameValues.frameData))
    }

    const scoreCalculation = () => {
        console.log(frameValues.frameData)
        dispatch(getGameTotal(frameValues.frameData))
    }

    return (
        <div className="divBody">
            <Card className="cardBody">

                <h4>Click to select the number of pins down:</h4>

                <button className="btn" disabled={isDisabled(0)} onClick={() => {
                    setNumberOfRolls({ roll: 10, count: frameValues.frameData.rollIndex })
                    selectRollValue(0)
                }} >0</button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button className="btn" disabled={isDisabled(1)} onClick={() => {
                    setNumberOfRolls({ roll: 9, count: frameValues.frameData.rollIndex })
                    selectRollValue(1)
                }} >1</button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button className="btn" disabled={isDisabled(2)} onClick={() => {
                    setNumberOfRolls({ roll: 8, count: frameValues.frameData.rollIndex })
                    selectRollValue(2)
                }} >2</button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button className="btn" disabled={isDisabled(3)} onClick={() => {
                    setNumberOfRolls({ roll: 7, count: frameValues.frameData.rollIndex })
                    selectRollValue(3)
                }} >3</button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button className="btn" disabled={isDisabled(4)} onClick={() => {
                    setNumberOfRolls({ roll: 6, count: frameValues.frameData.rollIndex })
                    selectRollValue(4)
                }} >4</button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button className="btn" disabled={isDisabled(5)} onClick={() => {
                    setNumberOfRolls({ roll: 5, count: frameValues.frameData.rollIndex })
                    selectRollValue(5)
                }} >5</button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button className="btn" disabled={isDisabled(6)} onClick={() => {
                    setNumberOfRolls({ roll: 4, count: frameValues.frameData.rollIndex })
                    selectRollValue(6)
                }} >6</button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button className="btn" disabled={isDisabled(7)} onClick={() => {
                    setNumberOfRolls({ roll: 3, count: frameValues.frameData.rollIndex })
                    selectRollValue(7)
                }} >7</button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button className="btn" disabled={isDisabled(8)} onClick={() => {
                    setNumberOfRolls({ roll: 2, count: frameValues.frameData.rollIndex })
                    selectRollValue(8)
                }} >8</button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button className="btn" disabled={isDisabled(9)} onClick={() => {
                    setNumberOfRolls({ roll: 1, count: frameValues.frameData.rollIndex })
                    selectRollValue(9)
                }} >9</button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button className="btn" disabled={isDisabled(10)} onClick={() => {
                    selectRollValue(10)
                }} >10</button>

                <br></br>
                <br></br>
                <table>
                    <thead>
                        <tr >
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
                            {
                                frameValues.frameData.historicRolls.map((roll) => (
                                    <td style={{ width: '45px' }}>{roll.toString()}</td>
                                ))
                            }
                        </tr>
                    </tbody>
                </table>

                <br></br>
                <br></br>
                <button onClick={() => {
                    scoreCalculation()
                }} >Final score</button>
                <p>{`Total score is : ${frameValues.frameData.gameTotal}`}</p>
            </Card>
        </div >
    )
}
