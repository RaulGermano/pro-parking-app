const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.set('useCreateIndex', true);

const VehicleSchema = new mongoose.Schema(
	{
		excluded: {
			type: Boolean,
			default: false
		},
		avalible: {
			type: Boolean,
			default: true,
			require: true
		},
		plate: {
			require: true,
			lowercase: true,
			type: String
		},
		name: {
			lowercase: true,
			type: String
		}
	},
	{
		timestamps: true
	}
);

const ClientSchema = new mongoose.Schema(
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
		name: {
			lowercase: true,
			type: String
		},
		birth: {
			type: Date
		},
		sex: {
			type: String
		},
		cpf: {
			type: String
		},
		telephone: {
			ddd: Intl,
			number: String
		},
		vehicle: [VehicleSchema]
	},
	{
		timestamps: true
	}
);

ClientSchema.pre('save', async function(next) {
	const hash = await bcrypt.hash(this.password, 1);

	this.password = hash;

	next();
});

module.exports = mongoose.model('Client', ClientSchema);
