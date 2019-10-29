const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.set('useCreateIndex', true);

const ParkingQualificationSchema = new mongoose.Schema(
	{
		value: {
			type: Intl
		},
		description: {
			type: String,
			lowercase: true
		},
		client: {
			_id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Parking'
			},
			login: {
				type: String,
				lowercase: true
			},
			email: {
				type: String,
				lowercase: true
			}
		}
	},
	{
		timestamps: true
	}
);

const ParkingSpaceSchema = new mongoose.Schema(
	{
		excluded: {
			type: Boolean,
			default: false
		},
		available: {
			type: Boolean,
			default: true
		},
		value: {
			type: Number
		},
		name: {
			type: String,
			lowercase: true,
			required: true
		},
		description: {
			accessibility: {
				type: Boolean,
				default: false
			},
			covered: {
				type: Boolean,
				default: false
			},
			services: {
				type: Boolean,
				default: false
			}
		}
	},
	{
		timestamps: true
	}
);

const ParkingSchema = new mongoose.Schema(
	{
		excluded: {
			type: Boolean,
			default: false
		},
		name: {
			type: String,
			lowercase: true
		},
		cnpj: {
			type: String,
			lowercase: true
		},
		telephone: {
			ddd: {
				type: Intl
			},
			number: {
				type: String
			}
		},
		address: {
			zip_code: {
				type: String
			},
			state: {
				type: String,
				lowercase: true
			},
			city: {
				type: String,
				lowercase: true
			},
			neighborhood: {
				type: String,
				lowercase: true
			},
			street: {
				type: String,
				lowercase: true
			},
			number_house: {
				type: String
			},
			coordinates: {
				latitude: {
					type: Number
				},
				longitude: {
					type: Number
				}
			}
		},
		parkingSpace: [ParkingSpaceSchema],
		qualification: [ParkingQualificationSchema]
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('Parking', ParkingSchema);
