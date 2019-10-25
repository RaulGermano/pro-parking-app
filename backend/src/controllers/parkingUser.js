const ParkingUser = require('../models/parkingUser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

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

		const { _id: id, name, parking_id: parking } = parkingUser;

		const token = await jwt.sign(
			{ id, name, parking },
			process.env.JWT_SECRET,
			{
				expiresIn: 604800
			}
		);

		// if (parkingUser.firstAccess) {
		// 	return res.status(400).json({
		// 		result: 'Trocar a senha'
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
			result: parkingUser
		});
	},

	async SelectSpecificParkingUsers(req, res) {
		const { parking_id } = req.query;

		const parkingUsers = await ParkingUser.find({
			parking_id
		});

		if (!parkingUsers) {
			return res.json({
				result: false
			});
		}

		return res.json({
			result: parkingUsers
		});
	},

	async SelectCounterSpecificParkingUsers(req, res) {
		const { parking_id } = req.query;

		const response = await ParkingUser.countDocuments({
			parking_id
		});

		return res.json({
			result: response
		});
	},

	async SelectCounterEnableDesableSpecificParkingUsers(req, res) {
		const { parking_id, excluded } = req.query;

		const quantity = await ParkingUser.countDocuments({
			parking_id,
			excluded
		});

		return res.json({
			result: quantity
		});
	},

	async SendEmailUpdatePassword(req, res) {
		const { email } = req.body;

		const route = 'new-password';

		const userInformations = await ParkingUser.findOne({
			email
		});

		if (!userInformations) {
			return res.json({
				response: false
			});
		} else {
			const { _id, name } = userInformations;

			let transporter = nodemailer.createTransport({
				service: 'gmail',
				auth: {
					user: 'proparkinggroup@gmail.com',
					pass: 'proparking'
				}
			});

			let mailOptions = {
				from: '"PRO Parking" <proparkinggroup@gmail.com>',
				to: email,
				subject: 'Alterar senha',
				text: 'Clique aqui para alterar sua senha.',
				html: `
            <div class="rps_26af">
    
                <br />
                <br />
    
                <table>
                    <tbody>
                        <tr>
                            <td style="padding: 0px; font-family: &quot;Segoe UI Semibold&quot;, &quot;Segoe UI Bold&quot;, &quot;Segoe UI&quot;, &quot;Helvetica Neue Medium&quot;, Arial, sans-serif; font-size: 17px; color: rgb(179, 179, 179) !important;" data-ogsc="rgb(112, 112, 112)">
                                Conta do PRO Parking
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 0px; font-family: &quot;Segoe UI Light&quot;, &quot;Segoe UI&quot;, &quot;Helvetica Neue Medium&quot;, Arial, sans-serif; font-size: 41px; color: rgb(122, 168, 255) !important;" data-ogsc="rgb(38, 114, 236)">
                                Alteração de senha
                            </td>
                        </tr>
    
                        <tr>
                            <td style="padding: 25px 0px 0px; font-family: &quot;Segoe UI&quot;, Tahoma, Verdana, Arial, sans-serif; font-size: 14px; color: rgb(227, 227, 227) !important;" data-ogsc="rgb(42, 42, 42)">
                                <table border="0" cellspacing="0">
                                    <tbody>
                                        <tr>
                                            <td bgcolor="#2572EC" style="background-color: rgb(37, 114, 236) !important; padding: 5px 20px; min-width: 50px; border-radius: 5px;" data-ogsb="rgb(38, 114, 236)" data-ogab="#2672ec">
                                                <a href="http://localhost:3000/${route}/${_id}" target="_blank" style="font-family:'Segoe UI Semibold','Segoe UI Bold','Segoe UI','Helvetica Neue Medium',Arial,sans-serif; font-size:14px; text-align:center; text-decoration:none; font-weight:600; letter-spacing:0.02em; color:#fff">
                                                    Desejo prosseguir com a alteração
                                                </a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
    
                        <tr>
                            <td style="padding: 25px 0px 0px; font-family: &quot;Segoe UI&quot;, Tahoma, Verdana, Arial, sans-serif; font-size: 14px; color: rgb(227, 227, 227) !important;" data-ogsc="rgb(42, 42, 42)">
                                Obrigado,
                            </td>
                        </tr>
                        
                        <tr>
                            <td style="padding: 0px; font-family: &quot;Segoe UI&quot;, Tahoma, Verdana, Arial, sans-serif; font-size: 14px; color: rgb(227, 227, 227) !important;" data-ogsc="rgb(42, 42, 42)">
                                Equipe PRO Parking
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>`
			};

			transporter.sendMail(mailOptions, (err, data) => {
				if (err) {
					return res.json({
						response: false,
						error: err
					});
				}
				return res.json({
					response: true
				});
			});
		}
	},

	async NewPasswordParkingUser(req, res) {
		const { parking_id, password } = req.params;

		const teste = await ParkingUser.updateOne(
			{
				parking_id
			},
			{ $set: { password } }
		);

		return res.json({
			teste
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
			result: true
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
			result: true
		});
	},

	async UpdateParkingUserInformations(req, res) {
		const {
			parking_id,
			user_id: _id,
			name,
			sex,
			accessLevel,
			excluded
		} = req.body;

		await ParkingUser.updateOne(
			{
				parking_id,
				_id
			},
			{
				$set: {
					name,
					sex,
					accessLevel,
					excluded
				}
			}
		);

		return res.json({
			result: true
		});
	}

	///////////////////////////////////////////////  removes
};
