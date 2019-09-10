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

	async SelectTotalParkingSpaces(req, res) {
		try {
			const { parking_id } = req.query;

			const totalParkingSpaces = await Parking.find({
				_id: parking_id
			});

			const quantity = totalParkingSpaces[0].parkingSpace.length;

			return res.json({
				message: quantity
			});
		} catch (error) {
			return res.status(400).json({
				error: error
			});
		}
	},

	async SelectActiveParkingSpaces(req, res) {
		try {
			const { parking_id } = req.query;

			const parkingSpaces = await Parking.aggregate([
				{
					$project: {
						count: { $size: '$parkingSpace' }
					}
				}
			]);

			const activeParkingSpaces = parkingSpaces.filter(item => {
				return item._id == parking_id;
			});

			if (activeParkingSpaces[0]) {
				return res.json({
					message: activeParkingSpaces[0].count
				});
			}

			return;
		} catch (error) {
			return res.status(400).json({
				error: error
			});
		}
	}

	///////////////////////////////////////////////  updates

	///////////////////////////////////////////////  removes
};
