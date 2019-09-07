const Client = require('../models/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
	///////////////////////////////////////////////  creates

	async CreateClient(req, res) {
		try {
			const response = await Client.create(req.body);

			return res.json({
				message: response
			});
		} catch (error) {
			return res.status(400).json({
				error: error.errmsg
			});
		}
	},

	///////////////////////////////////////////////  selects

	async AuthenticateClient(req, res) {
		const { login, password } = req.body;

		try {
			const user = await Client.findOne({
				login
			});

			if (!user) {
				return res.status(400).send('Usuário não encontrado!');
			}

			if (!(await bcrypt.compare(password, user.password))) {
				return res.status(400).send('Senha incorreta!');
			}

			return res.json(user);
		} catch (error) {
			return res.status(400).send('Usuário não encontrado!');
		}
	},

	///////////////////////////////////////////////  updates

	///////////////////////////////////////////////  removes

	async RemoveClient(req, res) {
		const { name } = req.body;

		return res.json({
			message: name
		});
	}
};
