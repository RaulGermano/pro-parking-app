const Reservation = require('../models/reservation');

module.exports = {
	///////////////////////////////////////////////  creates

	async CreateCheckOutReservation(req, res) {
		const { user_id, name, reserve_id } = req.body;
		const now = Date.now();

		const checkIn = await Reservation.findOne({
			_id: reserve_id
		});

		const reservation = await Reservation.updateOne(
			{
				_id: reserve_id
			},
			{
				$set: {
					period: {
						check_in: checkIn.period.check_in,
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

		return res.json(reservation);
	}

	///////////////////////////////////////////////  selects

	///////////////////////////////////////////////  updates

	///////////////////////////////////////////////  removes
};
