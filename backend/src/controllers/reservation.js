const Reservation = require('../models/reservation');
const Parking = require('../models/parking');
const Client = require('../models/client');
const { Types } = require('mongoose');
const moment = require('moment-timezone');

const dateLessADay = moment()
	.utc()
	.subtract(1, 'day')
	.format('YYYY-MM-DD');

const dateLessAMonth = moment()
	.utc()
	.subtract(1, 'month')
	.format('YYYY-MM-DD');

const dateToday = moment()
	.utc()
	.add(1, 'day')
	.format('YYYY-MM-DD');

const dateNow = moment()
	.utc()
	.format();

console.log(dateNow);

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

	async CreateReservationUndefinedClient(req, res) {
		const { _id: parking_id } = req.body.parking;
		const { _id: parkingSpace_id } = req.body.parking.space;

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
				finished: true
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

	async SelectSpecificReservationId(req, res) {
		try {
			const { reserve_id: _id } = req.query;

			const reserve = await Reservation.findOne({
				_id
			});

			if (!reserve) {
				res.json({
					result: false
				});
			} else {
				res.json({
					result: reserve
				});
			}
		} catch (error) {
			res.status(400).json({
				result: error
			});
		}
	},

	async SelectCheckInPendingReservation(req, res) {
		try {
			const { parking_id } = req.query;

			const checkInPending = await Reservation.countDocuments({
				'parking._id': parking_id,
				period: { $exists: false },
				finished: false
			});

			return res.json({
				result: checkInPending
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
				$and: [
					{ 'period.check_in': { $exists: true } },
					{ 'period.check_out': { $exists: false } }
				],
				finished: false
			});

			return res.json({
				result: checkInPending
			});
		} catch (error) {
			return res.status(400).json({
				error: error
			});
		}
	},

	async SelectCheckInPendingReservationList(req, res) {
		try {
			const { parking_id } = req.query;

			const checkInPending = await Reservation.find({
				'parking._id': parking_id,
				'period.check_in': { $exists: false },
				finished: false
			});

			return res.json({
				result: checkInPending
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

			const todayReservations = await Reservation.countDocuments({
				'parking._id': parking_id,
				createdAt: {
					$lt: dateToday,
					$gte: dateLessADay
				}
			});

			return res.json({
				result: todayReservations
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

			const todayReservations = await Reservation.find({
				'parking._id': parking_id,
				createdAt: {
					$lt: dateToday,
					$gte: dateLessADay
				}
			});

			return res.json({
				result: todayReservations
			});
		} catch (error) {
			return res.status(400).json({
				error: error
			});
		}
	},

	async SelectMonthReservations(req, res) {
		try {
			const { client_id } = req.query;

			const monthReservations = await Reservation.find({
				'client._id': client_id,
				createdAt: {
					$lt: dateToday,
					$gte: dateLessAMonth
				}
			});

			return res.json({
				message: monthReservations
			});
		} catch (error) {
			return res.status(400).json({
				error: error
			});
		}
	},

	async SelectClientReservations(req, res) {
		try {
			const { client_id } = req.query;

			const reservations = await Reservation.find({
				'client._id': client_id
			});

			return res.json({
				message: reservations
			});
		} catch (error) {
			return res.status(400).json({
				error: error
			});
		}
	},

	async SelectVehicleClientReservations(req, res) {
		try {
			const { parking_id, vehicle_plate } = req.query;

			const reservations = await Reservation.findOne({
				'parking._id': parking_id,
				'client.vehicle.plate': vehicle_plate,
				'period.check_in': { $exists: false },
				'period.check_out': { $exists: false },
				finished: false
			});

			console.log(123);

			console.log(reservations);

			if (reservations) {
				const {
					_id: reservation_id,
					parking: {
						space: { _id: parkingSpace_id, name: parkingSpace_name }
					}
				} = reservations;

				return res.json({
					status: 1,
					reservation_id,
					parking: {
						space: {
							_id: parkingSpace_id,
							name: parkingSpace_name
						}
					}
				});
			} else {
				return res.json({
					status: 2
				});
			}
		} catch (error) {
			return res.status(400).json({
				error: error
			});
		}
	},

	async SelectTodayTicketReservations(req, res) {
		try {
			const { parking_id } = req.query;

			const todayReservations = await Reservation.aggregate([
				{
					$match: {
						'period.check_out': {
							$exists: true
						},
						createdAt: {
							$lt: new Date('2019-09-25'),
							$gte: new Date('2019-09-25')
						}
					}
				},
				{
					$unwind: '$parking'
				},
				{
					$match: {
						'parking._id': Types.ObjectId(parking_id)
					}
				},
				{
					$group: {
						_id: Types.ObjectId(parking_id),
						total: {
							$sum: '$value'
						}
					}
				}
			]);

			if (todayReservations.length == 0) {
				result = 0;
			} else {
				result = todayReservations[0].total;
			}

			return res.json({
				result
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
