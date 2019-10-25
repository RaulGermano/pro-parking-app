const Client = require('../models/client');
const Reservation = require('../models/reservation');
const { Types } = require('mongoose');

module.exports = {
	///////////////////////////////////////////////  creates

	async CreateClientVehicle(req, res) {
		const { plate, name, client_id } = req.body;

		try {
			const result = await Client.updateOne(
				{ _id: client_id, 'vehicle.plate': { $ne: plate } },
				{
					$push: {
						vehicle: { plate, name }
					}
				}
			);

			return res.json({
				message: result
			});
		} catch (error) {
			return res.status(400).json({
				error
			});
		}
	},

	///////////////////////////////////////////////  selects

	async SelectClientVehicles(req, res) {
		const { client_id: _id } = req.query;

		const clientVehicles = await Client.find(
			{
				_id
			},
			{
				vehicle: true
			}
		);

		return res.json({
			message: clientVehicles
		});
	},

	async SelectClientsCounter(req, res) {
		const { parking_id } = req.query;

		await Reservation.distinct(
			'client._id',
			{
				'parking._id': parking_id
			},
			(err, result) => {
				if (err) {
					return res.json({
						result: false
					});
				}

				return res.json({
					result: result.length
				});
			}
		);
	},

	async SelectClientsList(req, res) {
		const { parking_id } = req.query;

		await Reservation.distinct(
			'client._id',
			{
				'parking._id': parking_id
			},
			async (err, result) => {
				if (err) {
					return res.json({
						result: false
					});
				}

				const clientsList = await Client.find({
					_id: { $in: result }
				});

				return res.json({
					result: clientsList
				});
			}
		);
	}

	///////////////////////////////////////////////  updates

	///////////////////////////////////////////////  removes
};
