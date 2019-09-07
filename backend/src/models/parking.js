const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.set('useCreateIndex', true);

const ParkingQualificationSchema = new mongoose.Schema(
	{
		value: {
			type: Intl
		},
		description: {
			lowercase: true,
			type: String
		},
		client: {
			_id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Parking'
			},
			login: {
				lowercase: true,
				type: String
			},
			email: {
				lowercase: true,
				type: String
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
		avalible: {
			type: Boolean,
			default: true
		},
		value: {
			type: Number
		},
		name: {
			lowercase: true,
			type: String
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
			vehicle_type: {
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
			lowercase: true,
			type: String
		},
		cnpj: {
			lowercase: true,
			type: String
		},
		telephone: {
			ddd: Intl,
			number: String
		},
		address: {
			createdAt: {
				type: Date,
				default: Date.now
			},
			zip_code: {
				type: String
			},
			state: {
				lowercase: true,
				type: String
			},
			city: {
				lowercase: true,
				type: String
			},
			neighborhood: {
				type: String
			},
			street: {
				type: String
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
