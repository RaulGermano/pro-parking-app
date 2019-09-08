const Reservation = require('../models/reservation');

module.exports = {
	///////////////////////////////////////////////  creates

	async CreateReservation(req, res) {
		try {
			const reservation = await Reservation.create(req.body);

			return res.json(reservation);
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
