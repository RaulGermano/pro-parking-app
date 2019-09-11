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
						'parkingSpace.$.available': false
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
						'vehicle.$.available': false
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
	},

	///////////////////////////////////////////////  selects

	async SelectReservation(req, res) {
		try {
			const { vehicle_plate, parking_id } = req.query;

			const reserve = await Reservation.findOne({
				'parking._id': parking_id,
				'client.vehicle.plate': vehicle_plate,
				status: true
			});

			if (!reserve) {
				res.json({
					message: false
				});
			} else {
				res.json({
					message: reserve.parking.space.name
				});
			}
		} catch (error) {
			res.status(400).json({
				message: error
			});
		}
	},

	async SelectCheckInPendingReservation(req, res) {
		try {
			const { parking_id } = req.query;

			const checkInPending = await Reservation.countDocuments({
				'parking._id': parking_id,
				period: { $exists: false },
				status: true
			});

			return res.json({
				message: checkInPending
			});
		} catch (error) {
			return res.status(400).json({
				error: error
			});
		}
	},

	async SelectCheckOutPendingReservation(req, res) {
		try {
			const { parking_id } = req.query;

			const checkInPending = await Reservation.find({
				'parking._id': parking_id,
				'period.check_in': { $exists: true },
				'period.check_out': { $exists: false },
				status: true
			});

			return res.json({
				message: checkInPending
			});
		} catch (error) {
			return res.status(400).json({
				error: error
			});
		}
	},

	async SelectTodayCountReservations(req, res) {
		try {
			const { parking_id } = req.query;

			const datetime = new Date();

			const today = new Date(
				new Date().setDate(new Date().getDate() - 1)
			);

			const todayReservations = await Reservation.countDocuments({
				'parking._id': parking_id,
				createdAt: {
					$lt: datetime,
					$gte: today
				}
			});

			return res.json({
				message: todayReservations
			});
		} catch (error) {
			return res.status(400).json({
				error: error
			});
		}
	},

	async SelectTodayReservations(req, res) {
		try {
			const { parking_id } = req.query;

			const datetime = new Date();

			const today = new Date(
				new Date().setDate(new Date().getDate() - 1)
			);

			const todayReservations = await Reservation.find({
				'parking._id': parking_id,
				createdAt: {
					$lt: datetime,
					$gte: today
				}
			});

			return res.json({
				message: todayReservations
			});
		} catch (error) {
			return res.status(400).json({
				error: error
			});
		}
	}

	///////////////////////////////////////////////  updates

	///////////////////////////////////////////////  removes
};
