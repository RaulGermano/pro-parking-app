const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

const ContactForm = new mongoose.Schema(
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
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('ContactForm', ContactForm);
