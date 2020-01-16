const jwt = require('jsonwebtoken');

require('dotenv/config');

module.exports = (req, res, next) => {
	const authenticateHeader = req.headers.authenticatetoken;

	if (!authenticateHeader) {
		return res.send('Error');
	}

	jwt.verify(authenticateHeader, process.env.JWT_SECRET, (err, decoded) => {
		req.tokenInformations = decoded.id;

		return next();
	});
};
