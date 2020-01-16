const Client = require('../models/client');
const Reservation = require('../models/reservation');
const { Types } = require('mongoose');

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
        try{
            const { client_id: _id } = req.query;

            const clientVehicles = await Client.find(
                {
                    _id,
                    excluded: false
                },
                {
                    vehicle: true
                }
            )
    
            return res.json({
                result: clientVehicles[0]
            });
        } catch (error) {
			return res.status(400).json({
				error
			});
		}
    },
    
    async SelectClientVehicleByPlate(req, res) {
        try{
            const { client_id, vehiclePlate } = req.query;
    
            const clientVehicles = await Client.find(
                {
                    _id: client_id,
                    // 'vehicle.plate': vehiclePlate
                }
            );
    
            return res.json({
                result: clientVehicles[0]
            });
        } catch (error) {
			return res.status(400).json({
				error
			});
		}
	},

	async SelectClientsCounter(req, res) {
		const { parking_id } = req.query;

		await Reservation.distinct(
			'client._id',
			{
				'parking._id': parking_id
			},
			(err, result) => {
				if (err) {
					return res.json({
						result: false
					});
				}

				return res.json({
					result: result.length
				});
			}
		);
	},

	async SelectClientsList(req, res) {
		const { parking_id } = req.query;

		await Reservation.distinct(
			'client._id',
			{
				'parking._id': parking_id
			},
			async (err, result) => {
				if (err) {
					return res.json({
						result: false
					});
				}

				const clientsList = await Client.find({
					_id: { $in: result }
				});

				return res.json({
					result: clientsList
				});
			}
		);
    },

    async selectAvailableClientVehicles(req, res) {
        try{
            const { client_id, available } = req.query;

			const availableValue = available == 'true' ? true : false;

			const specificParkingSpace = await Client.aggregate([
				{
					$match: {
						_id: Types.ObjectId(client_id)
					}
				},
				{
					$unwind: '$vehicle'
				},
				{
					$match: {
						'vehicle.available': availableValue
					}
				},
				{
					$project: {
						vehicle: 1
					}
				}
			]);

			return res.json({
				result: specificParkingSpace
			});
        } catch (error) {
			return res.status(400).json({
				error
			});
		}
    }

	///////////////////////////////////////////////  updates

	///////////////////////////////////////////////  removes
};
