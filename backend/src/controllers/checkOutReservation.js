const Reservation = require('../models/reservation');
const Parking = require('../models/parking');
const Client = require('../models/client');
const moment = require('moment-timezone');

module.exports = {
	///////////////////////////////////////////////  creates

	async CreateCheckOutReservation(req, res) {
		try {
			const { user_id, user_name, reserve_id } = req.body;

			const Reserve = await Reservation.findOne(
				{
					_id: reserve_id
				},
				{
					period: true,
					parking: true,
					client: true
				}
			);

			const dateNow = moment().utc();

			const checkInMoment = moment(Reserve.period.check_in.moment).utc();

			const checkOutMoment = dateNow.diff(checkInMoment, 'minutes');

			const minuteReserveValue = Reserve.parking.space.value / 60;

			const reserveValue = parseFloat(
				(minuteReserveValue * checkOutMoment).toFixed(2)
			);

			const reserveHours = parseFloat((checkOutMoment / 60).toFixed(2));

			await Reservation.updateOne(
				{
					_id: reserve_id
				},
				{
					$set: {
						finished: true,
						hours: reserveHours,
						value: reserveValue,
						period: {
							check_in: Reserve.period.check_in,
							check_out: {
								user: {
									_id: user_id,
									name: user_name
								},
								moment: dateNow
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
