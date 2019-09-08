const Reservation = require('../models/reservation');
const Parking = require('../models/parking');
const Client = require('../models/client');

module.exports = {
	///////////////////////////////////////////////  creates

	async CreateCheckOutReservation(req, res) {
		const { user_id, name, reserve_id } = req.body;
		const now = Date.now();

		try {
			const Reserve = await Reservation.findOne({
				_id: reserve_id
			});

			await Reservation.updateOne(
				{
					_id: reserve_id
				},
				{
					$set: {
						period: {
							check_in: Reserve.period.check_in,
							check_out: {
								user: {
									_id: user_id,
									name: name
								},
								moment: now
							}
						}
					}
				}
			);

			await Parking.updateOne(
				{
					_id: Reserve.parking._id,
					'parkingSpace._id': Reserve.parking.space._id
				},
				{
					$set: {
						'parkingSpace.$.avalible': true
					}
				}
			);

			await Client.updateOne(
				{
					_id: Reserve.client._id,
					'vehicle._id': Reserve.client.vehicle._id
				},
				{
					$set: {
						'vehicle.$.avalible': true
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
