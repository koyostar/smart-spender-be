const Transfer = require("../../models/transfer");
const User = require("../../models/user");

module.exports = {
  create,
  findAll,
  findByFromUser,
};

async function create(req, res) {
  try {
    const transferDetails = req.body;
    const transfer = await Transfer.create(transferDetails);
    return res.status(201).json(transfer);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function findAll(req, res) {
  try {
    const transfer = await Transfer.find({});
    return res.status(201).json(transfer);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function findByFromUser(req, res) {
  try {
    const { userid } = req.params;
    const transfers = await Transfer.find({ from: userid });

    return res.status(201).json(transfers);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
