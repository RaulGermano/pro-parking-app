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

	async SelectClientVehicle(req, res) {
		const {} = req.body;

		const clientVehicle = await Parking.find({});

		return res.json(clientVehicle);
	}

	///////////////////////////////////////////////  updates

	///////////////////////////////////////////////  removes
};
