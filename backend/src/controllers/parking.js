const Parking = require('../models/parking');
const bcrypt = require('bcryptjs');

module.exports = {
	///////////////////////////////////////////////  creates

	async CreateParking(req, res) {
		const response = await Parking.create(req.body);

		return res.json({
			message: response
		});
	},

	///////////////////////////////////////////////  selects

	async SelectParking(req, res) {
		const {} = req.body;

		const parking = await Parking.find({});

		return res.json(parking);
	}

	///////////////////////////////////////////////  updates

	///////////////////////////////////////////////  removes
};
