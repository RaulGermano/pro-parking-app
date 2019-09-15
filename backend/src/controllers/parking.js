const Parking = require('../models/parking');

module.exports = {
	///////////////////////////////////////////////  creates

	async CreateParking(req, res) {
		const response = await Parking.create(req.body);

		return res.json({
			message: response
		});
	},

	///////////////////////////////////////////////  selects

	async SelectParkings(req, res) {
		const { status: excluded } = req.query;

		const parking = await Parking.find({
			excluded
		});

		return res.json({
			message: parking
		});
	},

	async SelectSpecificParkings(req, res) {
		const { parking_id: _id } = req.query;

		const parking = await Parking.find({
			_id
		});

		return res.json({
			message: parking
		});
	}

	///////////////////////////////////////////////  updates

	///////////////////////////////////////////////  removes
};
