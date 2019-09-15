const Client = require('../models/client');

module.exports = {
	///////////////////////////////////////////////  creates

	async CreateClientVehicle(req, res) {
		const { plate, name, client_id } = req.body;

		try {
			const result = await Client.updateOne(
				{ _id: client_id, 'vehicle.plate': { $ne: plate } },
				{
					$push: {
						vehicle: { plate, name }
					}
				}
			);

			return res.json({
				message: result
			});
		} catch (error) {
			return res.status(400).json({
				error
			});
		}
	},

	///////////////////////////////////////////////  selects

	async SelectClientVehicles(req, res) {
		const { client_id: _id } = req.query;

		const clientVehicles = await Client.find(
			{
				_id
			},
			{
				vehicle: true
			}
		);

		return res.json({
			message: clientVehicles
		});
	}

	///////////////////////////////////////////////  updates

	///////////////////////////////////////////////  removes
};
