const ContactForm = require('../models/ContactForm');

module.exports = {
	///////////////////////////////////////////////  creates

	async CreateContactForm(req, res) {
		const response = await ContactForm.create(req.body);

		return res.json({
			result: response[0]
		});
	},

	///////////////////////////////////////////////  selects

	async SelectAllContactFormList(req, res) {
		const allContactFormResult = await ContactForm.find();

		return res.json({
			result: allContactFormResult
		});
	},

	async SelectSpecificStatusContactFormList(req, res) {
		const { status } = req.query;

		const specificStatusContactFormResult = await ContactForm.find({
			status: Number(status)
		});

		return res.json({
			result: specificStatusContactFormResult
		});
	},

	async SelectAllContactFormCounter(req, res) {
		const allContactFormCounterResult = await ContactForm.countDocuments();

		return res.json({
			result: allContactFormCounterResult
		});
	},

	async SelectSpecificStatusContactFormCounter(req, res) {
		const { status } = req.query;

		const specificStatusContactFormCounterResult = await ContactForm.countDocuments(
			{
				status: Number(status)
			}
		);

		return res.json({
			result: specificStatusContactFormCounterResult
		});
	},

	///////////////////////////////////////////////  updates

	async UpdateSpecificContactForm(req, res) {
		const { parking_id: _id, telephone } = req.body;

		await ContactForm.updateOne(
			{
				_id
			},
			{
				$set: { telephone }
			}
		);

		return res.json({
			result: true
		});
	}

	///////////////////////////////////////////////  removes
};
