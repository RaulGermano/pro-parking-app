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
				error
			});
		}
	},

	///////////////////////////////////////////////  selects

	async AuthenticateClient(req, res) {
        const { login, password } = req.body;
        
        console.log({ login, password })

		try {
			const user = await Client.findOne({
				login
			}).select('+password');

			if (!user) {
				return res.status(400).send('Usuário não encontrado!');
			}

			if (!(await bcrypt.compare(password, user.password))) {
				return res.status(400).send('Usuário não encontrado!');
			}

			user.password = undefined;

			return res.json(user);
		} catch (error) {
			return res.status(400).send('Usuário não encontrado!');
		}
	},

	async SelectClientInformations(req, res) {
        const { client_id: _id } = req.query;
        
        console.log(_id)

		try {
			const user = await Client.find({
				_id
			});

			return res.json(user);
		} catch (error) {
			return res.status(400).send('Usuário não encontrado!');
		}
	},

	///////////////////////////////////////////////  updates

	async UpdateClientInformations(req, res) {
		const { _id, name, sex, telephone } = req.body;

		try {
			await Client.updateOne(
				{
					_id
				},
				{
					$set: {
						name,
						sex,
						telephone
					}
				}
			);

			return res.json({
				message: true
			});
		} catch (error) {
			return res.status(400).send('Usuário não encontrado!');
		}
	}

	///////////////////////////////////////////////  removes
};
