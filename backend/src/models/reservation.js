const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

const ReservationSchema = new mongoose.Schema(
	{
		status: {
			type: Boolean,
			default: true
		},
		hours: {
			type: Number
		},
		value: {
			type: Number
		},
		client: {
			_id: {
				type: mongoose.Schema.Types.ObjectId
			},
			name: {
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
			vehicle: {
				_id: {
					type: mongoose.Schema.Types.ObjectId
				},
				plate: {
					type: String,
					lowercase: true
				}
			}
		},
		parking: {
			_id: {
				type: mongoose.Schema.Types.ObjectId
			},
			name: {
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
			space: {
				_id: {
					type: mongoose.Schema.Types.ObjectId
				},
				name: {
					type: String,
					lowercase: true
				},
				value: {
					type: Number
				}
			}
		},
		period: {
			check_in: {
				user: {
					_id: {
						type: mongoose.Schema.Types.ObjectId
					},
					name: {
						type: String,
						lowercase: true
					}
				},
				moment: {
					type: Date
				}
			},
			check_out: {
				user: {
					_id: {
						type: mongoose.Schema.Types.ObjectId
					},
					name: {
						type: String,
						lowercase: true
					}
				},
				moment: {
					type: Date
				}
			}
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('Reservation', ReservationSchema);
