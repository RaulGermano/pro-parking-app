const Parking = require('../models/parking');
const { Types } = require('mongoose');

module.exports = {
	///////////////////////////////////////////////  creates

	async CreateParkingQualification(req, res) {
		const { value, description, client, parking_id } = req.body;

		const parking = await Parking.findOne({
			_id: parking_id
		});

		// console.log(parking.qualification);

		// return;

		parking.qualification.push({
			value,
			description,
			client
		});

		await parking.save();

		return res.json(parking);
	},

	///////////////////////////////////////////////  selects

	async SelectParkingQualificationAverage(req, res) {
		const { parking_id: _id, parking_id } = req.query;

		// const qualification = await Parking.find(
		// 	{
		// 		_id
		// 	},
		// 	{
		// 		qualification: true
		// 	}
		// );
		// qualification[0].qualification.length

		const qualificationResult = await Parking.aggregate([
			{
				$match: {
					_id: Types.ObjectId(parking_id)
				}
			},
			{
				$unwind: '$qualification'
			},
			{
				$group: {
					_id: '$_id',
					total: {
						$sum: 1
					},
					average: {
						$avg: '$qualification.value'
					}
				}
			}
		]);

		return res.json({
			result: qualificationResult[0]
		});
	}

	///////////////////////////////////////////////  updates

	///////////////////////////////////////////////  removes
};
