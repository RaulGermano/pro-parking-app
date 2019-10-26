const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

const ContactForm = new mongoose.Schema(
	{
		name: {
			type: String,
			lowercase: true,
			required: true
		},
		email: {
			type: String,
			lowercase: true,
			required: true
		},
		status: {
			type: Intl,
			default: 0
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
				type: String,
				required: true
			},
			state: {
				type: String,
				lowercase: true,
				required: true
			},
			city: {
				type: String,
				lowercase: true,
				required: true
			}
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('ContactForm', ContactForm);
