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

    async function getUserArr() {
      const finalArr = [];
      if (transfers) {
        for (const transfer of transfers) {  
          if (!finalArr.includes(transfer.to)) {
            finalArr.push(transfer.to);
          }
        };
      }
      return finalArr;
    }
    
    const userArr = await getUserArr();

    const users = await User.find({ '_id': { $in: userArr } });

    return res.status(201).json({transfers, users});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}