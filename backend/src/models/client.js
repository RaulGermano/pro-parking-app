const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.set('useCreateIndex', true);

const VehicleSchema = new mongoose.Schema(
	{
		excluded: {
			type: Boolean,
			default: false
		},
		available: {
			type: Boolean,
			default: true,
			require: true
		},
		plate: {
			type: String,
			require: true,
			lowercase: true
		},
		name: {
			type: String,
			lowercase: true
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
			type: String,
			lowercase: true,
			required: true,
			index: {
				unique: true
			}
		},
		email: {
			type: String,
			lowercase: true,
			required: true
		},
		password: {
			type: String,
			select: false,
			required: true
		},
		name: {
			type: String,
			lowercase: true
		},
		sex: {
			type: String,
			lowercase: true
		},
		cpf: {
			type: String,
			required: true
		},
		telephone: {
			ddd: {
				type: Intl,
				required: true
			},
			number: {
				type: String,
				required: true
			}
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
