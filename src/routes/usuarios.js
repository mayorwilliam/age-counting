const { Router } = require('express')
const { performAgeCounting} = require('../controllers/performAgeCounting')

const router = Router()

router.get('/age-counting', performAgeCounting);











module.exports = router