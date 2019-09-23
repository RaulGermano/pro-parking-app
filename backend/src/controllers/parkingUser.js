const ParkingUser = require('../models/parkingUser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv/config');

module.exports = {
	///////////////////////////////////////////////  creates

	async CreateParkingUser(req, res) {
		try {
			const parkingUser = await ParkingUser.create(req.body);

			return res.json(parkingUser);
		} catch (error) {
			return res.status(400).json({
				error: error.errmsg
			});
		}
	},

	///////////////////////////////////////////////  selects

	async AuthenticateParking(req, res) {
		const { login, password } = req.body;

		const parkingUser = await ParkingUser.findOne({
			login
		}).select('+password');

		if (!parkingUser) {
			return res.status(400).send('Usuário não encontrado!');
		}

		if (!(await bcrypt.compare(password, parkingUser.password))) {
			return res.status(400).send('Usuário não encontrado!');
		}

		parkingUser.password = undefined;

		const token = await jwt.sign(
			{ id: parkingUser._id },
			process.env.JWT_SECRET,
			{
				expiresIn: 3600
			}
		);

		// if (parkingUser.firstAccess) {
		// 	return res.status(400).json({
		// 		message: 'Trocar a senha'
		// 	});
		// }

		return res.json({
			parkingUser,
			token,
			firstAccess: parkingUser.firstAccess
		});
	},

	async SelectSpecificParkingUser(req, res) {
		const { parkingUser_id: _id } = req.query;

		const parkingUser = await ParkingUser.findOne({
			_id
		});

		return res.json({
			message: parkingUser
		});
	},

	async SelectSpecificParkingUsers(req, res) {
		const { parking_id } = req.query;

		const parkingUsers = await ParkingUser.find({
			parking_id
		});

		return res.json({
			message: parkingUsers
		});
	},

	async SelectCounterSpecificParkingUsers(req, res) {
		const { parking_id } = req.query;

		const teste = await ParkingUser.countDocuments({
			parking_id
		});

		return res.json({
			message: teste
		});
	},

	async SelectCounterEnableDesableSpecificParkingUsers(req, res) {
		const { parking_id, excluded } = req.query;

		const quantity = await ParkingUser.countDocuments({
			parking_id,
			excluded
		});

		return res.json({
			message: quantity
		});
	},

	///////////////////////////////////////////////  updates

	async UpdatePasswordParkingUser(req, res) {
		const { _id, password } = req.body;

		console.log(req.body);

		newPassword = await bcrypt.hash(password, 1);

		await ParkingUser.updateOne(
			{
				_id
			},
			{
				$set: {
					password: newPassword,
					firstAccess: false
				}
			}
		);

		return res.json({
			message: true
		});
	},

	async DesableParkingUser(req, res) {
		const { parking_id, user_id: _id } = req.body;

		await ParkingUser.updateOne(
			{
				parking_id,
				_id
			},
			{
				$set: {
					excluded: true
				}
			}
		);

		return res.json({
			message: true
		});
	},

	async UpdateParkingUserInformations(req, res) {
		const { parking_id, user_id: _id, name, sex } = req.body;

		await ParkingUser.updateOne(
			{
				parking_id,
				_id
			},
			{
				$set: {
					name,
					sex
				}
			}
		);

		return res.json({
			message: true
		});
	}

	///////////////////////////////////////////////  removes
};
