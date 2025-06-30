const eventRules = {
    'Wedding' : { minGuests: 50, maxGuests: 1000, minBookingDays: 60, maxBookingDays: 300 },
    'Anniversary': { minGuests: 50, maxGuests: 1000, minBookingDays: 30, maxBookingDays: 300 },
    'Birthday-party': { minGuests: 50, maxGuests: 400, minBookingDays: 10, maxBookingDays: 100 },
    'Seminar': { minGuests: 50, maxGuests: 250, minBookingDays: 10, maxBookingDays: 100 },
    'Expo': { minGuests: 50, maxGuests: 700, minBookingDays: 30, maxBookingDays: 100 },
    'Session': { minGuests: 20, maxGuests: 100, minBookingDays: 10, maxBookingDays: 50 },
    'Other': { minGuests: 30, maxGuests: 200, minBookingDays: 10, maxBookingDays: 50 },
};

module.exports = eventRules;