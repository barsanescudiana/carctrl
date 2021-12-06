const authRouter = require('./auth')
const carRouter = require('./car')
const eventRouter = require('./event')
const mechanicRouter = require('./mechanic')
const placeRouter = require('./place')
const rideRouter = require('./ride')

const router = require('express').Router()

router.use('/auth', authRouter);
router.use('/cars', carRouter);
router.use('/events', eventRouter);
router.use('/mechanic', mechanicRouter);
router.use('/places', placeRouter)
router.use('/rides', rideRouter)

module.exports = router;
