const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.set('useCreateIndex', true);

const ParkingUserSchema = new mongoose.Schema(
	{
		excluded: {
			type: Boolean,
			default: false
		},
		login: {
			index: {
				unique: true
			},
			lowercase: true,
			type: String
		},
		email: {
			lowercase: true,
			type: String
		},
		password: {
			type: String
		},
		birth: {
			type: Date
		},
		sex: {
			lowercase: true,
			type: String
		},
		cpf: {
			type: String
		},
		name: {
			lowercase: true,
			type: String
		},
		accessLevel: {
			type: Intl
		},
		parking_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Parking'
		}
	},
	{
		timestamps: true
	}
);

ParkingUserSchema.pre('save', async function(next) {
	const hash = await bcrypt.hash(this.password, 1);

	this.password = hash;

	next();
});

module.exports = mongoose.model('ParkingUser', ParkingUserSchema);
