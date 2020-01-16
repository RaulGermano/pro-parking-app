const administratorUser = require('../models/administratorUser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

require('dotenv/config');

module.exports = {
	///////////////////////////////////////////////  creates

	async CreateAdministratorUser(req, res) {
		try {
			const administratorUserResult = await administratorUser.create(
				req.body
			);

			return res.json({
				result: administratorUserResult
			});
		} catch (error) {
			return res.status(400).json({
				error: error.errmsg
			});
		}
	},

	///////////////////////////////////////////////  selects

	async AuthenticateAdministrator(req, res) {
		const { login, password } = req.body;

		const administratorUserResult = await administratorUser
			.findOne({
				login
			})
			.select('+password');

		if (!administratorUserResult) {
			return res.status(400).send('Usuário não encontrado!');
		}

		if (
			!(await bcrypt.compare(password, administratorUserResult.password))
		) {
			return res.status(400).send('Usuário não encontrado!');
		}

		administratorUserResult.password = undefined;

		const { _id: id, name } = administratorUserResult;

		const token = await jwt.sign({ id, name }, process.env.JWT_SECRET, {
			expiresIn: 604800
		});

		return res.json({
			result: administratorUserResult,
			token,
			firstAccess: administratorUser.firstAccess
		});
	},

	async SelectAllAdministratorUsersList(req, res) {
		const administratorUsers = await administratorUser.find();

		if (!administratorUsers) {
			return res.json({
				result: false
			});
		}

		return res.json({
			result: administratorUsers
		});
	},

	async SelectSpecificAdministratorUser(req, res) {
		const { administratorUser_id: _id } = req.query;

		const administratorUserInformatins = await administratorUser.findOne({
			_id
		});

		return res.json({
			result: administratorUserInformatins
		});
	},

	async SelectAllAdministratorUsersCounter(req, res) {
		const administratorUserResult = await administratorUser.countDocuments();

		return res.json({
			result: administratorUserResult
		});
	},

	async SelectSpecificExcludedAdministratorUsersCounter(req, res) {
		const { excluded } = req.query;

		const quantity = await administratorUser.countDocuments({
			excluded
		});

		return res.json({
			result: quantity
		});
	},

	async SendEmailAdministratorUserUpdatePassword(req, res) {
		const { email } = req.body;

		const route = 'administrator-user-new-password';

		const userInformations = await administratorUser.findOne({
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
                                            <td bgcolor="#d21d1d" style="background-color: #d21d1d !important; padding: 5px 20px; min-width: 50px; border-radius: 5px;" data-ogsb="rgb(38, 114, 236)" data-ogab="#2672ec">
                                                <a href="http://localhost:3001/${route}/${_id}" target="_blank" style="font-family:'Segoe UI Semibold','Segoe UI Bold','Segoe UI','Helvetica Neue Medium',Arial,sans-serif; font-size:14px; text-align:center; text-decoration:none; font-weight:600; letter-spacing:0.02em; color:#fff">
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

	///////////////////////////////////////////////  updates

	async UpdatePasswordAdministratorUser(req, res) {
		const { _id, password } = req.body;

		newPassword = await bcrypt.hash(password, 1);

		await administratorUser.updateOne(
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

	async UpdateAdministratorUser(req, res) {
		const { user_id: _id, name, sex, excluded } = req.body;

		await administratorUser.updateOne(
			{
				_id
			},
			{
				$set: {
					name,
					sex,
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
