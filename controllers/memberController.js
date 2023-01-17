const Member = require('../models/memberModel');

exports.getAllMembers = async (req, res) => {
    // 取得查詢條件
    const { cName, eName, sex, phone, mail } = req.query;
    // 定義查詢條件
    let conditions = {};
    if (cName) {
        conditions.cName = cName;
    }
    if (eName) {
        conditions.eName = eName;
    }
    if (sex) {
        conditions.sex = sex;
    }
    if (phone) {
        conditions.phone = phone;
    }
    if (mail) {
        conditions.mail = mail;
    }

    if (Object.keys(conditions).length === 0) {
        //沒有查詢條件則預設查詢所有
        conditions = {};
    }
    try {
        const members = await Member.find(conditions);

        res.status(200).json({
            status: 'success',
            results: members.length,
            data: {
                members,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.createMember = async (req, res) => {
    try {
        const newMember = await Member.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                member: newMember,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};
exports.getMember = async (req, res) => {
    try {
        const member = await Member.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: {
                member,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};
exports.updateMember = async (req, res) => {
    try {
        const member = await Member.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            status: 'success',
            dtat: {
                member,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};
exports.deleteMember = async (req, res) => {
    try {
        await Member.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: 'success',
            dtat: null,
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.getTourStats = async (req, res) => {
    try {
        const stats = await Tour.aggregate([
            {
                $match: {
                    ratingsAverage: { $gte: 4.5 },
                },
            },
            {
                $group: {
                    _id: { $toUpper: '$difficulty' },
                    numTours: { $sum: 1 },
                    numRatings: { $sum: '$ratingsQuantity' },
                    avgRatings: { $avg: '$ratingsAverage' },
                    avgPrice: { $avg: '$price' },
                    minPrice: { $min: '$price' },
                    maxPrice: { $max: '$price' },
                },
            },
            {
                $sort: { avgPrice: 1 },
            },
        ]);
        res.status(200).json({
            status: 'success',
            dtat: {
                stats,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};
