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
		});

		if (!parkingUser) {
			return res.status(400).send('Usuário não encontrado!');
		}

		if (!(await bcrypt.compare(password, parkingUser.password))) {
			return res.status(400).send('Senha incorreta!');
		}

		parkingUser.password = undefined;

		return res.json(parkingUser);
	},

	async SelectSpecificParkingUser(req, res) {
		const { parkingUser_id: _id } = req.query;

		const parkingUser = await ParkingUser.findOne({
			_id
		});

		return res.json({
			message: parkingUser
		});
	}

	///////////////////////////////////////////////  updates

	///////////////////////////////////////////////  removes
};
