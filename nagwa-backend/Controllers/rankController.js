const scoresList = require("../Model/TestData.json");
const scores = [...scoresList.scoresList];

function claculatRank(score) {
    let num = 0;
    scores.forEach(number => {
        if (score > number) {
            num++
        }
    });
    console.log(num, " num")
    let rank = (num / scores.length) * 100;
    if (rank % 1 === 0) {
        return rank + "%"
    }

    return rank.toFixed(2);
}

exports.getRank = (req, res) => {
    console.log(req.body)
    const rank = claculatRank(req.body.score)
    res.status(201).json({ message: `your Rank is ${rank}` })
}