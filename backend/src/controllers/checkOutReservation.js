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

			const checkInMoment = new Date(Reserve.period.check_in.moment);
			const now = new Date();

			const hours = now.setHours(checkInMoment.getHours() + 2);

			const value = hours * Reserve.parking.space.value;

			console.log(hours, value);

			return;

			await Reservation.updateOne(
				{
					_id: reserve_id
				},
				{
					$set: {
						status: false,
						hours,
						value,
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
						'parkingSpace.$.available': true
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
						'vehicle.$.available': true
					}
				}
			);

			return res.json({
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
