const sequelize = require('../db');

module.exports.status = async (req, res, next) => {
    try {
        const totalantrian = await sequelize.query(`SELECT count('int') total FROM antriansoal WHERE kodepoli = '${req.params.kode_poli}' AND tglpriksa = '${req.params.tanggalperiksa}'`)        
        const totalbelumdipanggil = await sequelize.query(`SELECT count('int') total FROM antriansoal WHERE kodepoli = '${req.params.kode_poli}' AND tglpriksa = '${req.params.tanggalperiksa}' AND statusdipanggil = 0`)        
        const antreansekarang = await sequelize.query(`SELECT nomorantrean, namapoli FROM antriansoal WHERE kodepoli = '${req.params.kode_poli}' AND tglpriksa = '${req.params.tanggalperiksa}' AND statusdipanggil = 0 ORDER BY "int" ASC LIMIT 1`)        
        return res.status(200).json({
            status: true,
            data:{
              response:{
                namapoli:antreansekarang[0][0].namapoli,
                totalantrean:totalantrian[0][0].total,
                sisaantrean:totalbelumdipanggil[0][0].total,
                antreandipanggil:antreansekarang[0][0].nomorantrean,
                keterangan:""
              }  
            },
            metadata:{
                message: "ok",
                status:200
            }
        })
    } catch (error) {
        return next(error)
    }
}

module.exports.sisaantrean = async (req, res, next) => {
    try {
        const totalbelumdipanggil = await sequelize.query(`SELECT count('int') total FROM antriansoal WHERE kodepoli = '${req.params.kode_poli}' AND tglpriksa = '${req.params.tanggalperiksa}' AND statusdipanggil = 0`)        
        const antreansekarang = await sequelize.query(`SELECT nomorantrean, namapoli FROM antriansoal WHERE kodepoli = '${req.params.kode_poli}' AND tglpriksa = '${req.params.tanggalperiksa}' AND statusdipanggil = 0 ORDER BY "int" ASC LIMIT 1`)        
        const antreanuser = await sequelize.query(`SELECT nomorantrean FROM antriansoal WHERE kodepoli = '${req.params.kode_poli}' AND tglpriksa = '${req.params.tanggalperiksa}' AND nomorkartu = '${req.params.nomorkartu_jkn}' AND statusdipanggil = 0 ORDER BY "int" ASC LIMIT 1`)        
        return res.status(200).json({
            data:{
              response:{
                nomorantrean:antreanuser[0][0].nomorantrean,
                namapoli:antreansekarang[0][0].namapoli,
                sisaantrean:totalbelumdipanggil[0][0].total,
                antreandipanggil:antreansekarang[0][0].nomorantrean,
                keterangan:""
              }  
            },
            metadata:{
                message: "ok",
                status:200
            }
        })
    } catch (error) {
        return next(error)
    }
}

module.exports.batal = async (req, res, next) => {
    try {
        await sequelize.query(`DELETE FROM antriansoal WHERE nomorkartu = '${req.body.nomorkartu}' AND kodepoli = '${req.body.kodepoli}' AND tglpriksa = '${req.body.tanggalperiksa}'`)        
        return res.status(200).json({
            metadata:{
                message: "ok",
                status:200
            }
        })
    } catch (error) {
        return next(error)
    }
}