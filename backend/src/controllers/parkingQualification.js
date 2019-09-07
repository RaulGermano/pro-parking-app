const Parking = require('../models/parking');

module.exports = {
	///////////////////////////////////////////////  creates

	async CreateParkingQualification(req, res) {
		const { value, description, client, parking_id } = req.body;

		const parking = await Parking.findOne({
			_id: parking_id
		});

		parking.qualification.push({
			value,
			description,
			client
		});

		await parking.save();

		return res.json(parking);
	},

	///////////////////////////////////////////////  selects

	async SelectParkingQualification(req, res) {
		const {} = req.body;

		const qualification = await Parking.find({});

		return res.json(qualification);
	}

	///////////////////////////////////////////////  updates

	///////////////////////////////////////////////  removes
};
