const Parking = require('../models/parking');
const { Types } = require('mongoose');

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

			const registeredParkingSpaces = await Parking.aggregate([
				{
					$match: {
						_id: Types.ObjectId(parking_id)
					}
				},
				{
					$unwind: '$parkingSpace'
				},
				{
					$match: {
						'parkingSpace.excluded': {
							$in: [false, true]
						}
					}
				},
				{
					$group: {
						_id: parking_id,
						total: {
							$sum: 1
						}
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
	},

	async SelectActiveParkingSpaces(req, res) {
		try {
			const { parking_id } = req.query;

			const registeredParkingSpaces = await Parking.aggregate([
				{
					$match: {
						_id: Types.ObjectId(parking_id)
					}
				},
				{
					$unwind: '$parkingSpace'
				},
				{
					$match: {
						'parkingSpace.excluded': false
					}
				},
				{
					$group: {
						_id: parking_id,
						total: {
							$sum: 1
						}
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
	},

	async SelectPendingCheckOutParkingSpaces(req, res) {
		try {
			const { parking_id } = req.query;

			const registeredParkingSpaces = await Parking.aggregate([
				{
					$match: {
						_id: Types.ObjectId(parking_id)
					}
				},
				{
					$unwind: '$parkingSpace'
				},
				{
					$match: {
						'parkingSpace.available': false
					}
				},
				{
					$group: {
						_id: Types.ObjectId(parking_id),
						total: {
							$sum: 1
						}
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
	},

	async SelectSpecificParkingSpace(req, res) {
		try {
			const { parking_id, parkingSpace_id } = req.query;

			const specificParkingSpace = await Parking.aggregate([
				{
					$match: {
						_id: Types.ObjectId(parking_id)
					}
				},
				{
					$unwind: '$parkingSpace'
				},
				{
					$match: {
						'parkingSpace._id': Types.ObjectId(parkingSpace_id)
					}
				},
				{
					$project: {
						parkingSpace: 1
					}
				}
			]);

			return res.json({
				message: specificParkingSpace
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
