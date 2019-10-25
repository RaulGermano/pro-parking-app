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

		return res.json({
			parking
		});
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

			if (registeredParkingSpaces.length === 0) {
				return res.json({
					total: 0
				});
			}
			return res.json(registeredParkingSpaces[0]);
		} catch (error) {
			return res.status(400).json({
				error
			});
		}
	},

	async SelectActiveParkingSpaces(req, res) {
		try {
			const { parking_id, excluded } = req.query;

			const excludedValue = excluded == 'true' ? true : false;

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
						'parkingSpace.excluded': excludedValue
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

			if (registeredParkingSpaces.length === 0) {
				return res.json({
					total: 0
				});
			}
			return res.json(registeredParkingSpaces[0]);
		} catch (error) {
			return res.status(400).json({
				error
			});
		}
	},

	async SelectAvailableParkingSpaces(req, res) {
		try {
			const { parking_id, available } = req.query;

			const availableValue = available == 'true' ? true : false;

			const availableParkingSpaces = await Parking.aggregate([
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
						'parkingSpace.available': availableValue
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

			if (availableParkingSpaces.length === 0) {
				return res.json({
					total: 0
				});
			}
			return res.json(availableParkingSpaces[0]);
		} catch (error) {
			return res.status(400).json({
				error
			});
		}
	},

	async SelectPendingCheckOutParkingSpaces(req, res) {
		try {
			const { parking_id, available } = req.query;

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

			if (registeredParkingSpaces.length === 0) {
				return res.json({
					total: 0
				});
			}

			return res.json(registeredParkingSpaces[0]);
		} catch (error) {
			return res.status(400).json({
				error
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
				result: specificParkingSpace
			});
		} catch (error) {
			return res.status(400).json({
				error
			});
		}
	},

	async SelectAllParkingSpaces(req, res) {
		try {
			const { parking_id: _id } = req.query;

			const registeredParkingSpaces = await Parking.find(
				{
					_id
				},
				{
					parkingSpace: true
				}
			);

			return res.json({
				result: registeredParkingSpaces[0].parkingSpace
			});
		} catch (error) {
			return res.status(400).json({
				error
			});
		}
	},

	///////////////////////////////////////////////  updates

	async UpdateParkingSpace(req, res) {
		const {
			value,
			name,
			description,
			excluded,
			parking_id,
			parkingSpace_id
		} = req.body;

		const result = await Parking.updateOne(
			{
				_id: parking_id,
				'parkingSpace._id': parkingSpace_id
			},
			{
				$set: {
					'parkingSpace.$.name': name,
					'parkingSpace.$.value': value,
					'parkingSpace.$.excluded': excluded,
					'parkingSpace.$.description': description
				}
			}
		);

		return res.json({
			return: result
		});
	}

	///////////////////////////////////////////////  removes
};
