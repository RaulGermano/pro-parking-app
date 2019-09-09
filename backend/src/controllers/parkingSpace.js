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
		try {
			const { parking_id } = req.query;

			const registeredParkingSpaces = await Parking.aggregate([
				{ $unwind: '$parkingSpace' },
				{ $match: { 'parkingSpace.excluded': false } },
				{
					$group: {
						_id: parking_id,
						total: { $sum: 1 }
					}
				}
			]);

			return res.json({
				message: registeredParkingSpaces
			});
		} catch (error) {
			return res.status(400).json({
				error: error
			});
		}
	}

	///////////////////////////////////////////////  updates

	///////////////////////////////////////////////  removes
};
