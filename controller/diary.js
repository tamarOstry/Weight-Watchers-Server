const diaryService = require('../services/diary')

exports.getDiary = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await diaryService.getDiary(userId);
        res.send(user);
    }
    catch (err) {
        next(err)
    };
}

exports.addDaySummary = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await diaryService.addDaySummary(userId, req.body);
        res.send(user)
    }
    catch (err) {
        next(err)
    };
}

exports.updateDaySummary = async (req, res, next) => {
    try {
        const userId = req.params.idU;
        const dayId = req.params.idD;
        const user = await diaryService.updateDaySummary(userId, dayId, req.body);
        res.send(user)
    }
    catch (err) {
        next(err)
    };
}
exports.deleteDaySummary = async (req, res, next) => {
    try {
        const userId = req.params.idU;
        const dayId = req.params.idD;
        const ans = await diaryService.deleteDaySummary(userId, dayId);
        res.send(ans)
    }
    catch (err) {
        next(err)
    };
}