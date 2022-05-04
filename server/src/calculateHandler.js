export const calculate = async (req, res, next) => {
    try {
        const frameData = req.body
        var historicRolls = frameData.historicRolls
        var frameTotals = frameData.frameTotals
        var currentFrameTotal = 0
        var total = 0

        //Split the historic rolls array into frames:
        for (var i = 0; i < historicRolls.length; i++) {
            currentFrameTotal = 0
            if (i === 20 || i === 19 || i === 18) {
                currentFrameTotal += historicRolls[i]
                frameData.frameTotals.push(currentFrameTotal)
            } else if (i % 2 !== 0) {
                //Frame with strike
                if (historicRolls[i] === 10 || historicRolls[i - 1] === 10) { //B2 of frame n is 10
                    if (historicRolls[i + 1] === 10) { //Consequent strike
                        if ((i + 3) < historicRolls.length) {
                            currentFrameTotal = historicRolls[i - 1] + historicRolls[i] + historicRolls[i + 1] + historicRolls[i + 3]
                            frameData.frameTotals.push(currentFrameTotal)
                        }
                    } else { //Next ball is not a strike
                        if ((i + 2) < historicRolls.length) {
                            currentFrameTotal = historicRolls[i - 1] + historicRolls[i] + historicRolls[i + 1] + historicRolls[i + 2]
                            frameData.frameTotals.push(currentFrameTotal)
                        }
                    }
                } else if (historicRolls[i] < 10 && historicRolls[i - 1] < 10) {
                    if (historicRolls[i] + historicRolls[i - 1] == 10) {
                        //Frame with spare
                        currentFrameTotal = historicRolls[i - 1] + historicRolls[i] + historicRolls[i + 1]
                        frameData.frameTotals.push(currentFrameTotal)
                    } else {
                        //Frame without strike or spare
                        currentFrameTotal = historicRolls[i - 1] + historicRolls[i]
                        frameData.frameTotals.push(currentFrameTotal)
                    }
                }
            }
        }

        //Calculate game total with frame totals array
        for (var j = 0; j < frameTotals.length; j++) {
            total += frameTotals[j]
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
