const Transfer = require('../../models/transfer');
const User = require('../../models/user');

module.exports = {
    create,
    findAll,
};

async function create(req, res) {
    try {
        const transferDetails = req.body;
        const transfer = await Transfer.create(transferDetails);
        return res.status(201).json(transfer);
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

async function findAll(req, res) {
    try {
        const transfer = await Transfer.find({}); 
        return res.status(201).json(transfer);
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}