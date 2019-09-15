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
			type: String,
			lowercase: true,
			required: true,
			index: {
				unique: true
			}
		},
		password: {
			type: String,
			select: false,
			required: true
		},
		email: {
			type: String,
			lowercase: true,
			required: true
		},
		sex: {
			type: String,
			lowercase: true
		},
		document: {
			type: String
		},
		name: {
			type: String,
			lowercase: true
		},
		accessLevel: {
			type: Intl
		},
		firstAccess: {
			type: Boolean,
			default: true
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
