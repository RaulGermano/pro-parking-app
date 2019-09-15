const Reservation = require('../models/reservation');
const moment = require('moment-timezone');

module.exports = {
	///////////////////////////////////////////////  creates

	async CreateCheckInReservation(req, res) {
		const { user_id, user_name, reserve_id } = req.body;

		const dateNow = moment().utc();

		const reservation = await Reservation.updateOne(
			{
				_id: reserve_id
			},
			{
				$set: {
					period: {
						check_in: {
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

		return res.json({
			reservation
		});
	}

	///////////////////////////////////////////////  selects

	///////////////////////////////////////////////  updates

	///////////////////////////////////////////////  removes
};
