export const calculate = async (req, res, next) => {
    try {
        const frameData = req.body
        var historicRolls = frameData.historicRolls
        var total = 0

        //Calculate game total:
        for (var i = 0; i < historicRolls.length; i++) {
            if (i < historicRolls.length - 3) {
                //Strike
                if (historicRolls[i] == 10) {
                    if (historicRolls[i + 2] == 10) {
                        total += historicRolls[i] + historicRolls[i + 2] + historicRolls[i + 3] + historicRolls[i + 4]
                    }
                    else {
                        total += historicRolls[i] + historicRolls[i + 2] + historicRolls[i + 3]
                    }
                }
                //Regular
                else if (historicRolls[i] < 10) {
                    total += historicRolls[i]
                }
                //Spare
                // else if (i != 0 && i % 2 != 0 && (historicRolls[i] + historicRolls[i - 1]) == 10) {
                //     total += historicRolls[i] + historicRolls[i + 1]
                // }
            }
            else {
                if (historicRolls[i] == 10) {
                    total += historicRolls[i]
                }

            }
        }
        frameData.gameTotal = total
        res.json(frameData)
    } catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new BadRequestError('Invalid Request', error))
        } else {
            next(error)
        }
    }
}







/*
        var currentRoll = frameData.currentRoll
        var historicRolls = frameData.historicRolls
        var strike = frameData.strike
        var rollIndex = frameData.rollIndex //nth ball rolled
 
        //1. Frame total if no bonus points involved
        if (historicRolls.length % 2 == 0 && !strike) { //calculate frame total for every second ball
            if (historicRolls[rollIndex - 3] == 10) {
                //Bonus calculation
                frameData.currentFrameTotal = historicRolls[rollIndex - 2] + currentRoll
                frameData.previousframeTotal = historicRolls[rollIndex - 3] + historicRolls[rollIndex - 2] + currentRoll
                frameData.frameTotals.push(frameData.currentFrameTotal)
                frameData.frameTotals.push(frameData.previousframeTotal)
            }
            else if (historicRolls[rollIndex - 2] + currentRoll == 10) {
 
            }
            else {
                frameData.currentFrameTotal = historicRolls[rollIndex - 2] + currentRoll
                frameData.frameTotals.push(frameData.currentFrameTotal)
            }
        }
 
 
 
        /*
                //Enter on every 2nd ball
                if (frameData.historicRolls.length % 2 != 0) {
                    if (currentRoll < 10) {
                        //Push the value into array
                        historicRoll.push(currentRoll)
                        //Calculate frame total and bonus points
                        if (historicRoll[historicRoll.length - 2] == 10) {
                            previousFrameTotal = historicRoll[historicRoll.length - 2] + historicRoll[historicRoll.length - 1] + historicRoll[historicRoll.length]
                            currentFrameTotal = historicRoll[historicRoll.length - 1] + historicRoll[historicRoll.length]
                        }
                        else if (historicRoll[historicRoll.length - 3] + historicRoll[historicRoll.length - 2] == 10) {
                            previousFrameTotal = historicRoll[historicRoll.length - 3] + historicRoll[historicRoll.length - 2] + historicRoll[historicRoll.length - 1]
                            currentFrameTotal = historicRoll[historicRoll.length - 1] + historicRoll[historicRoll.length]
                        }
                        else {
                            currentFrameTotal = historicRoll[historicRoll.length - 1] + historicRoll[historicRoll.length]
                        }
                    }
                }
                else if (currentFrameBall == 10) {
                    finalTotal = 0
                    for (let i = 0; i < historicRoll.length; i++) {
                        finalTotal += historicRoll[i];
                    }
                }
                else {
                    if (currentRoll < 10) {
                        //Push the value into array
                        historicRoll.push(currentRoll)
                    }
                    else if (currentRoll == 10) {
                        historicRoll.push(0)
                        historicRoll.push(10)
                        console.log(historicRoll)
                    }
                }*/
