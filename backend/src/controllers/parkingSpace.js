const Parking = require('../models/parking');

module.exports = {
	///////////////////////////////////////////////  creates

	async CreateParkingSpace(req, res) {
		const { value, name, description, id } = req.body;

		const parking = await Parking.findOne({
			_id: id
		});

		parking.parkingSpace.push({
			value,
			name,
			description
		});

		await parking.save();

		return res.json(parking);
	},

	///////////////////////////////////////////////  selects

	async SelectParkingSpace(req, res) {
		const {} = req.body;

		const parkingSpace = await Parking.find({});

		return res.json(parkingSpace);
	}

	///////////////////////////////////////////////  updates

	///////////////////////////////////////////////  removes
};
