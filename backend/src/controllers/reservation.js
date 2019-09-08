const Reservation = require('../models/reservation');
const Parking = require('../models/parking');
const Client = require('../models/client');

module.exports = {
	///////////////////////////////////////////////  creates

	async CreateReservation(req, res) {
		const { _id: parking_id } = req.body.parking;
		const { _id: parkingSpace_id } = req.body.parking.space;
		const { _id: client_id } = req.body.client;
		const { _id: vehicle_id } = req.body.client.vehicle;

		try {
			await Reservation.create(req.body);

			await Parking.updateOne(
				{
					_id: parking_id,
					'parkingSpace._id': parkingSpace_id
				},
				{
					$set: {
						'parkingSpace.$.avalible': false
					}
				}
			);

			await Client.updateOne(
				{
					_id: client_id,
					'vehicle._id': vehicle_id
				},
				{
					$set: {
						'vehicle.$.avalible': false
					}
				}
			);

			return res.status(400).json({
				message: true
			});
		} catch (error) {
			return res.status(400).json({
				error: error
			});
		}
	}

	///////////////////////////////////////////////  selects

	///////////////////////////////////////////////  updates

	///////////////////////////////////////////////  removes
};
