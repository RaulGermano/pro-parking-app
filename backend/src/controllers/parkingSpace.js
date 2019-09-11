const Parking = require('../models/parking');

module.exports = {
	///////////////////////////////////////////////  creates

	async CreateParkingSpace(req, res) {
		const { value, name, description, id } = req.body;

		const parking = await Parking.findOne({
			_id: id
		});

		parking.parkingSpace.push({
			value,
			name,
			description
		});

		await parking.save();

		return res.json(parking);
	},

	///////////////////////////////////////////////  selects

	async SelectTotalParkingSpaces(req, res) {
		try {
			const { parking_id } = req.query;

			const totalParkingSpaces = await Parking.find({
				_id: parking_id
			});

			const quantity = totalParkingSpaces[0].parkingSpace.length;

			return res.json({
				message: quantity
			});
		} catch (error) {
			return res.status(400).json({
				error: error
			});
		}
	},

	async SelectActiveParkingSpaces(req, res) {
		try {
			const { parking_id } = req.query;

			// const parkingSpaces = await Parking.aggregate([
			// 	{
			// 		$project: {
			// 			count: { $size: '$parkingSpace' }
			// 		}
			// 	}
			// ]);

			// const parkingSpaces = await Parking.aggregate([
			// 	{
			// 		$match: {
			// 			stock: {
			// 				$elemMatch: {
			// 					$and: [
			// 						{ country: '01' },
			// 						{ 'warehouse.code': '02' }
			// 					]
			// 				}
			// 			}
			// 		}
			// 	},
			// 	{
			// 		$project: {
			// 			article_code: 1,
			// 			description: 1,
			// 			stock: {
			// 				$filter: {
			// 					input: '$stock',
			// 					as: 'stock',
			// 					cond: {
			// 						$and: [
			// 							{ $eq: ['$$stock.country', '01'] },
			// 							{
			// 								$eq: [
			// 									'$$stock.warehouse.code',
			// 									'02'
			// 								]
			// 							}
			// 						]
			// 					}
			// 				}
			// 			}
			// 		}
			// 	}
			// ]);

			const registeredParkingSpaces = await Parking.aggregate([
				{ $unwind: '$parkingSpace' },
				{ $match: { 'parkingSpace.excluded': false } },
				{
					$group: {
						_id: parking_id,
						total: { $sum: 1 }
					}
				}
			]);

			// .find({
			// 	_id: parking_id,
			// 	'parkingSpace.excluded': false
			// });

			// const activeParkingSpaces = parkingSpaces.filter(item => {
			// 	return item._id == parking_id;
			// });

			// console.log(activeParkingSpaces);

			// if (activeParkingSpaces[0]) {
			// 	return res.json({
			// 		message: activeParkingSpaces[0].count
			// 	});
			// }

			return res.json({
				message: registeredParkingSpaces
			});

			return;
		} catch (error) {
			return res.status(400).json({
				error: error
			});
		}
	}

	///////////////////////////////////////////////  updates

	///////////////////////////////////////////////  removes
};
