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

	async SelectAllParkings(req, res) {
		const parkings = await Parking.find();

		return res.json({
			result: parkings
		});
	},

	async SelectAllParkingsCounter(req, res) {
		const parkings = await Parking.countDocuments();

		return res.json({
			result: parkings
		});
	},

	async SelectParkings(req, res) {
		const { excluded } = req.query;

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
			result: parking[0]
		});
	},

	///////////////////////////////////////////////  updates

	async UpdateParkingTelephone(req, res) {
		const { parking_id: _id, telephone } = req.body;

		await Parking.updateOne(
			{
				_id
			},
			{
				$set: { telephone }
			}
		);

		return res.json({
			result: true
		});
	}

	///////////////////////////////////////////////  removes
};
