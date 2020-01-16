const express = require("express");
const authenticateMiddleware = require("../middlewares/Authenticate");

const {
    CreateClient,
    AuthenticateClient,
    SelectClientInformations
} = require("../controllers/client");

const {
    CreateParkingQualification,
    SelectParkingQualificationAverage
} = require("../controllers/parkingQualification");

const {
    UpdateAdministratorUser,
    CreateAdministratorUser,
    AuthenticateAdministrator,
    UpdatePasswordAdministratorUser,
    SelectAllAdministratorUsersList,
    SelectSpecificAdministratorUser,
    SelectAllAdministratorUsersCounter,
    SendEmailAdministratorUserUpdatePassword,
    SelectSpecificExcludedAdministratorUsersCounter
} = require("../controllers/administratorUser");

const {
    CreateParkingUser,
    AuthenticateParking,
    SendEmailUpdatePassword,
    SelectSpecificParkingUser,
    UpdatePasswordParkingUser,
    SelectSpecificParkingUsers,
    UpdateParkingUserInformations,
    SelectCounterSpecificParkingUsers,
    SelectCounterEnableDisabledSpecificParkingUsers
} = require("../controllers/parkingUser");

const {
    CreateCheckInReservation
} = require("../controllers/checkInReservation");

const {
    CreateCheckOutReservation
} = require("../controllers/checkOutReservation");

const {
    CreateParkingSpace,
    UpdateParkingSpace,
    SelectAllParkingSpaces,
    SelectTotalParkingSpaces,
    SelectActiveParkingSpaces,
    SelectSpecificParkingSpace,
    SelectAvailableParkingSpaces,
    SelectPendingCheckOutParkingSpaces
} = require("../controllers/parkingSpace");

const {
    CreateReservation,
    SelectReservation,
    SelectTodayReservations,
    SelectMonthReservations,
    SelectActiveReservations,
    SelectClientReservations,
    SelectSpecificReservationId,
    SelectTodayCountReservations,
    selectReservationsByFinished,
    SelectTodayTicketReservations,
    SelectCheckInPendingReservation,
    CreateReservationUndefinedClient,
    SelectVehicleClientReservations,
    SelectCheckOutPendingReservation,
    SelectCheckInPendingReservationList,
    SelectClientVehicleReservationsByPlate,
    selectSpecificReservationByVehicleNotAvailable,
} = require("../controllers/reservation");

const {
    SelectClientsList,
    CreateClientVehicle,
    SelectClientVehicles,
    SelectClientsCounter,
    SelectClientVehicleByPlate,
    selectAvailableClientVehicles
} = require("../controllers/clientVehicle");

const {
    CreateParking,
    SelectParkings,
    SelectAllParkings,
    SelectSpecificParkings,
    UpdateParkingTelephone,
    SelectAllParkingsCounter,
    UpdateParkingInformations,
    SelectSpecificExcludedParkingsCounter
} = require("../controllers/parking");

const {
    CreateContactForm,
    SelectAllContactFormList,
    UpdateSpecificContactForm,
    SelectAllContactFormCounter,
    SelectSpecificContactFormItem,
    UpdateSpecificContactFormStart,
    UpdateSpecificContactFormFinish,
    SelectSpecificStatusContactFormList,
    SelectSpecificStatusContactFormCounter
} = require("../controllers/contactForm");

const routes = express.Router();

//////////////////////// client

routes.post("/authenticate-client", AuthenticateClient);

routes.post("/create-client", CreateClient);

routes.get("/select-client-informations", SelectClientInformations);

routes.post(
    "/create-checkout-reservation",
    authenticateMiddleware,
    CreateCheckOutReservation
);

//////////////////////// client vehicle

routes.post("/create-client-vehicle", CreateClientVehicle);

routes.get("/select-clients-list", authenticateMiddleware, SelectClientsList);

routes.get("/select-available-client-vehicles-list", selectAvailableClientVehicles);

routes.get("/select-client-vehicles", SelectClientVehicles);

routes.get(
    "/select-clients-counter",
    authenticateMiddleware,
    SelectClientsCounter
);

//////////////////////// parking

routes.get(
    "/select-parkings",
    SelectParkings
);

routes.get("/select-specific-client-vehicle-by-plate", SelectClientVehicleByPlate);

routes.get("/select-all-parkings", authenticateMiddleware, SelectAllParkings);

routes.get(
    "/select-all-parkings-counter",
    authenticateMiddleware,
    SelectAllParkingsCounter
);

routes.get(
    "/select-specific-excluded-parkings-counter",
    authenticateMiddleware,
    SelectSpecificExcludedParkingsCounter
);

routes.get("/select-specific-parkings", SelectSpecificParkings);

routes.put(
    "/update-parking-telephone",
    authenticateMiddleware,
    UpdateParkingTelephone
);

routes.put(
    "/update-parking-informations",
    authenticateMiddleware,
    UpdateParkingInformations
);

routes.post("/create-parking", CreateParking);

//////////////////////// parking administrator

routes.get(
    "/select-all-administrator-users-list",
    SelectAllAdministratorUsersList,
    AuthenticateAdministrator
);

routes.get(
    "/select-all-administrator-users-counter",
    SelectAllAdministratorUsersCounter,
    AuthenticateAdministrator
);

routes.get(
    "/select-specific-administrator-user-informations",
    SelectSpecificAdministratorUser,
    AuthenticateAdministrator
);

routes.get(
    "/select-specific-excluded-administrator-users-counter",
    SelectSpecificExcludedAdministratorUsersCounter,
    AuthenticateAdministrator
);

routes.post("/auth-administrator-user", AuthenticateAdministrator);

routes.post("/create-administrator-user", CreateAdministratorUser);

routes.post(
    "/send-email-administrator-user-update-password",
    SendEmailAdministratorUserUpdatePassword
);

routes.put(
    "/update-password-administrator-user",
    UpdatePasswordAdministratorUser
);

routes.put(
    "/update-administrator-user-informations",
    authenticateMiddleware,
    UpdateAdministratorUser
);

//////////////////////// parking user

routes.get(
    "/select-counter-specific-parking-users",
    authenticateMiddleware,
    SelectCounterSpecificParkingUsers
);

routes.get(
    "/select-counter-excluded-specific-parking-users",
    authenticateMiddleware,
    SelectCounterEnableDisabledSpecificParkingUsers
);

routes.get(
    "/select-specific-parking-user",
    authenticateMiddleware,
    SelectSpecificParkingUser
);

routes.get(
    "/select-specific-parking-users",
    authenticateMiddleware,
    SelectSpecificParkingUsers
);

// routes.put('/new-password-parking-user', NewPasswordParkingUser);

routes.post("/auth-parking-user", AuthenticateParking);

routes.post("/send-email-update-password", SendEmailUpdatePassword);

routes.post("/create-parking-user", CreateParkingUser);

routes.put(
    "/update-parking-user-informations",
    authenticateMiddleware,
    UpdateParkingUserInformations
);

routes.put("/update-password-parking-user", UpdatePasswordParkingUser);

//////////////////////// parking space

routes.get(
    "/select-pending-checkout-parking-spaces",
    authenticateMiddleware,
    SelectPendingCheckOutParkingSpaces
);

routes.get(
    "/select-all-parking-spaces",
    authenticateMiddleware,
    SelectAllParkingSpaces
);

routes.get(
    "/select-available-parking-spaces",
    authenticateMiddleware,
    SelectAvailableParkingSpaces
);

routes.get("/select-specific-parking-space", SelectSpecificParkingSpace);

routes.get(
    "/select-total-parking-spaces",
    authenticateMiddleware,
    SelectTotalParkingSpaces
);

routes.get(
    "/select-active-parking-spaces",
    authenticateMiddleware,
    SelectActiveParkingSpaces
);

routes.post(
    "/create-parking-space",
    authenticateMiddleware,
    CreateParkingSpace
);

routes.put("/update-parking-space", authenticateMiddleware, UpdateParkingSpace);

//////////////////////// parking qualification

routes.post("/create-parking-qualification", CreateParkingQualification);

routes.get(
    "/select-specific-parking-qualification-average",
    authenticateMiddleware,
    SelectParkingQualificationAverage
);

//////////////////////// reservation

routes.get("/select-reservations-by-finished", selectReservationsByFinished);

routes.get("/select-specific-reservation-by-vehicle-not-available", selectSpecificReservationByVehicleNotAvailable);

routes.get(
    "/select-checkin-pending-reservation",
    authenticateMiddleware,
    SelectCheckInPendingReservation
);

routes.get(
    "/select-checkin-pending-reservation-list",
    authenticateMiddleware,
    SelectCheckInPendingReservationList
);

routes.get(
    "/select-client-vehicle-reservations-by-plate-list",
    SelectClientVehicleReservationsByPlate
);

routes.get(
    "/select-checkout-pending-reservation",
    authenticateMiddleware,
    SelectCheckOutPendingReservation
);

routes.get(
    "/select-vehicle-client-reservations",
    authenticateMiddleware,
    SelectVehicleClientReservations
);

routes.get("/select-client-reservations", SelectClientReservations);

routes.get(
    "/select-today-count-reservations",
    authenticateMiddleware,
    SelectTodayCountReservations
);

routes.get(
    "/select-today-ticket-reservations",
    authenticateMiddleware,
    SelectTodayTicketReservations
);

routes.get(
    "/select-today-reservations",
    authenticateMiddleware,
    SelectTodayReservations
);

routes.get(
    "/select-month-reservations",
    SelectMonthReservations
);

routes.get(
    "/select-active-reservations",
    SelectActiveReservations
);

routes.get(
    "/select-specific-reservation-id",
    authenticateMiddleware,
    SelectSpecificReservationId
);

routes.get("/select-reservation", authenticateMiddleware, SelectReservation);

routes.post("/create-reservation", CreateReservation);

routes.post(
    "/create-checkin-reservation-undefined-client",
    authenticateMiddleware,
    CreateReservationUndefinedClient
);

routes.post(
    "/create-checkin-reservation",
    authenticateMiddleware,
    CreateCheckInReservation
);

routes.post(
    "/create-checkout-reservation",
    authenticateMiddleware,
    CreateCheckOutReservation
);

//////////////////////// contact form

routes.post("/create-contact-form", CreateContactForm);

routes.get(
    "/select-all-contact-form",
    authenticateMiddleware,
    SelectAllContactFormList
);

routes.get(
    "/select-all-contact-form-counter",
    authenticateMiddleware,
    SelectAllContactFormCounter
);

routes.get(
    "/select-specific-status-contact-form-counter",
    authenticateMiddleware,
    SelectSpecificStatusContactFormCounter
);

routes.get(
    "/select-specific-status-contact-form-list",
    authenticateMiddleware,
    SelectSpecificStatusContactFormList
);

routes.get(
    "/select-specific-contact-form-item",
    authenticateMiddleware,
    SelectSpecificContactFormItem
);

routes.put(
    "/update-specific-contact-form",
    authenticateMiddleware,
    UpdateSpecificContactForm
);

routes.put(
    "/update-specific-contact-form-start",
    authenticateMiddleware,
    UpdateSpecificContactFormStart
);

routes.put(
    "/update-specific-contact-form-finish",
    authenticateMiddleware,
    UpdateSpecificContactFormFinish
);

module.exports = routes;
