const ParkingUser = require('../models/parkingUser');
const bcrypt = require('bcryptjs');

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

		if (parkingUser.firstAccess) {
			return res.status(400).json({
				message: 'Trocar a senha'
			});
		}

		parkingUser.password = undefined;

		return res.json({
			message: parkingUser
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

	///////////////////////////////////////////////  updates

	async UpdatePasswordParkingUser(req, res) {
		const { _id, password } = req.body;

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
	}

	///////////////////////////////////////////////  removes
};
