const Reservation = require('../models/reservation');

module.exports = {
	///////////////////////////////////////////////  creates

	async CreateCheckInReservation(req, res) {
		const { user_id, name, reserve_id } = req.body;
		const now = Date.now();

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
