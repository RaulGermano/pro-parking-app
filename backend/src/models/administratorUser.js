const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.set('useCreateIndex', true);

const AdministratorUserSchema = new mongoose.Schema(
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
			type: Intl,
			required: true
		},
		document: {
			type: String,
			required: true
		},
		name: {
			type: String,
			lowercase: true
		},
		firstAccess: {
			type: Boolean,
			default: true
		}
	},
	{
		timestamps: true
	}
);

AdministratorUserSchema.pre('save', async function(next) {
	const hash = await bcrypt.hash(this.password, 1);

	this.password = hash;

	next();
});

module.exports = mongoose.model('AdministratorUser', AdministratorUserSchema);
