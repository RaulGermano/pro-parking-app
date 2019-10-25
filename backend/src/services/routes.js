const express = require('express');
const authenticateMiddleware = require('../middlewares/Authenticate');

const {
	CreateClient,
	AuthenticateClient,
	SelectClientInformations
} = require('../controllers/client');

const {
	CreateParkingQualification,
	SelectParkingQualificationAverage
} = require('../controllers/parkingQualification');

const {
	CreateParkingUser,
	DesableParkingUser,
	AuthenticateParking,
	NewPasswordParkingUser,
	SendEmailUpdatePassword,
	SelectSpecificParkingUser,
	UpdatePasswordParkingUser,
	SelectSpecificParkingUsers,
	UpdateParkingUserInformations,
	SelectCounterSpecificParkingUsers,
	SelectCounterEnableDesableSpecificParkingUsers
} = require('../controllers/parkingUser');

const {
	CreateCheckInReservation
} = require('../controllers/checkInReservation');

const {
	CreateCheckOutReservation
} = require('../controllers/checkOutReservation');

const {
	CreateParkingSpace,
	UpdateParkingSpace,
	SelectAllParkingSpaces,
	SelectTotalParkingSpaces,
	SelectActiveParkingSpaces,
	SelectSpecificParkingSpace,
	SelectAvailableParkingSpaces,
	SelectPendingCheckOutParkingSpaces
} = require('../controllers/parkingSpace');

const {
	CreateReservation,
	SelectReservation,
	SelectTodayReservations,
	SelectMonthReservations,
	SelectClientReservations,
	SelectSpecificReservationId,
	SelectTodayCountReservations,
	SelectTodayTicketReservations,
	SelectCheckInPendingReservation,
	CreateReservationUndefinedClient,
	SelectVehicleClientReservations,
	SelectCheckOutPendingReservation,
	SelectCheckInPendingReservationList
} = require('../controllers/reservation');

const {
	CreateClientVehicle,
	SelectClientVehicles,
	SelectClientsCounter,
	SelectClientsList
} = require('../controllers/clientVehicle');

const {
	CreateParking,
	SelectParkings,
	SelectAllParkings,
	SelectSpecificParkings,
	UpdateParkingTelephone,
	SelectAllParkingsCounter
} = require('../controllers/parking');

const routes = express.Router();

//////////////////////// client

routes.post('/auth-client', AuthenticateClient);

routes.post('/create-client', CreateClient);

routes.get('/auth-client', (req, res) => {
	res.json({
		response: true
	});
});

routes.get('/select-client-informations', SelectClientInformations);

routes.post(
	'/create-checkout-reservation',
	authenticateMiddleware,
	CreateCheckOutReservation
);

//////////////////////// client vehicle

routes.post(
	'/create-client-vehicle',
	authenticateMiddleware,
	CreateClientVehicle
);

routes.get('/select-clients-list', authenticateMiddleware, SelectClientsList);

routes.get(
	'/select-client-vehicles',
	authenticateMiddleware,
	SelectClientVehicles
);

routes.get(
	'/select-clients-counter',
	authenticateMiddleware,
	SelectClientsCounter
);

//////////////////////// parking

routes.get(
	'/select-parkings',
	// authenticateMiddleware,
	SelectParkings
);

routes.get('/select-all-parkings', authenticateMiddleware, SelectAllParkings);

routes.get(
	'/select-all-parkings-counter',
	authenticateMiddleware,
	SelectAllParkingsCounter
);

routes.get(
	'/select-specific-parkings',
	authenticateMiddleware,
	SelectSpecificParkings
);

routes.put(
	'/update-parking-telephone',
	authenticateMiddleware,
	UpdateParkingTelephone
);

routes.post('/create-parking', CreateParking);

//////////////////////// parking user

routes.get(
	'/select-counter-specific-parking-users',
	authenticateMiddleware,
	SelectCounterSpecificParkingUsers
);

routes.get(
	'/select-counter-excluded-specific-parking-users',
	authenticateMiddleware,
	SelectCounterEnableDesableSpecificParkingUsers
);

routes.get(
	'/select-specific-parking-user',
	authenticateMiddleware,
	SelectSpecificParkingUser
);

routes.get(
	'/select-specific-parking-users',
	authenticateMiddleware,
	SelectSpecificParkingUsers
);

routes.put('/new-password-parking-user', NewPasswordParkingUser);

routes.post('/auth-parking-user', AuthenticateParking);

routes.post('/send-email-update-password', SendEmailUpdatePassword);

routes.post(
	'/create-parking-user',
	// authenticateMiddleware,
	CreateParkingUser
);

routes.put(
	'/update-parking-user-informations',
	authenticateMiddleware,
	UpdateParkingUserInformations
);

routes.put('/update-password-parking-user', UpdatePasswordParkingUser);

routes.put('/desable-parking-user', authenticateMiddleware, DesableParkingUser);

//////////////////////// parking space

routes.get(
	'/select-pending-checkout-parking-spaces',
	authenticateMiddleware,
	SelectPendingCheckOutParkingSpaces
);

routes.get(
	'/select-all-parking-spaces',
	authenticateMiddleware,
	SelectAllParkingSpaces
);

routes.get(
	'/select-available-parking-spaces',
	authenticateMiddleware,
	SelectAvailableParkingSpaces
);

routes.get(
	'/select-specific-parking-space',
	authenticateMiddleware,
	SelectSpecificParkingSpace
);

routes.get(
	'/select-total-parking-spaces',
	authenticateMiddleware,
	SelectTotalParkingSpaces
);

routes.get(
	'/select-active-parking-spaces',
	authenticateMiddleware,
	SelectActiveParkingSpaces
);

routes.post(
	'/create-parking-space',
	authenticateMiddleware,
	CreateParkingSpace
);

routes.put('/update-parking-space', authenticateMiddleware, UpdateParkingSpace);

//////////////////////// parking qualification

routes.post(
	'/create-parking-qualification',
	// authenticateMiddleware,
	CreateParkingQualification
);

routes.get(
	'/select-specific-parking-qualification-average',
	authenticateMiddleware,
	SelectParkingQualificationAverage
);

//////////////////////// reservation

routes.get(
	'/select-checkin-pending-reservation',
	authenticateMiddleware,
	SelectCheckInPendingReservation
);

routes.get(
	'/select-checkin-pending-reservation-list',
	authenticateMiddleware,
	SelectCheckInPendingReservationList
);

routes.get(
	'/select-checkout-pending-reservation',
	authenticateMiddleware,
	SelectCheckOutPendingReservation
);

routes.get(
	'/select-vehicle-client-reservations',
	authenticateMiddleware,
	SelectVehicleClientReservations
);

routes.get(
	'/select-client-reservations',
	authenticateMiddleware,
	SelectClientReservations
);

routes.get(
	'/select-today-count-reservations',
	authenticateMiddleware,
	SelectTodayCountReservations
);

routes.get(
	'/select-today-ticket-reservations',
	authenticateMiddleware,
	SelectTodayTicketReservations
);

routes.get(
	'/select-today-reservations',
	authenticateMiddleware,
	SelectTodayReservations
);

routes.get(
	'/select-month-reservations',
	authenticateMiddleware,
	SelectMonthReservations
);

routes.get(
	'/select-specific-reservation-id',
	authenticateMiddleware,
	SelectSpecificReservationId
);

routes.get('/select-reservation', authenticateMiddleware, SelectReservation);

routes.post('/create-reservation', authenticateMiddleware, CreateReservation);

routes.post(
	'/create-checkin-reservation-undefined-client',
	authenticateMiddleware,
	CreateReservationUndefinedClient
);

routes.post(
	'/create-checkin-reservation',
	authenticateMiddleware,
	CreateCheckInReservation
);

routes.post(
	'/create-checkout-reservation',
	authenticateMiddleware,
	CreateCheckOutReservation
);

module.exports = routes;
