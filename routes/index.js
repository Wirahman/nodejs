const { Router } = require('express')
const router = Router()

const {
    validateLogin,
} = require('../middlewares/token')


const authController = require('../controller/AuthController')
const AntreanController = require('../controller/AntreanController')

router.get('/auth', authController.auth)

router.get('/antrean/status/:kode_poli/:tanggalperiksa', validateLogin, AntreanController.status)
router.get('/antrean/sisapeserta/:nomorkartu_jkn/:kode_poli/:tanggalperiksa', validateLogin, AntreanController.sisaantrean)
router.put('/antrean/batal', validateLogin, AntreanController.batal)

module.exports = router