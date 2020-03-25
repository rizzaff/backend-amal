'use strict'
const conn = require('./conn')
const jwt = require('jsonwebtoken')
// const bcrypt = require('bcrypt')
// const salt = bcrypt.genSaltSync(7);

exports.login = async function (req, res) {
    let username = req.body.username
    let password = req.body.password
    let verifPass = ''
    let level
    let id
    let nama

    const dataEmpty = () => {
        res
            // .status(400)
            .send({
                message: "Data Tidak Boleh Kosong"
            })
    }

    if (!username || !password) {
        dataEmpty()
    }
    else {

        let sql = `select * from user where email=? or no_telpon =?`
        const user = {
            username: username,
            password: password
        }
        // console.log(username)
        conn.query(sql, [username, username], function (error, rows, fields) {
            rows.map((item) => {
                (
                    verifPass = item.password
                )
            })
            // let decrypt = await bcrypt.compare(password, verifPass)
            // console.log(verifPass)
            // console.log(decrypt)
            if (verifPass === password) {
                const token = jwt.sign({ user }, 'privateKey', { expiresIn: '3600s' })
                rows.map((item) => {
                    (
                        id = item.user_id,
                        level = item.level,
                        nama=item.nama
                    )
                })
                // console.log(id)
                id = id.toString()
                level = level.toString()
                res.send({
                    message: 'Berhasil Masuk',
                    id,
                    level,
                    token,
                    nama
                })
            } else {
                res.send({ message: 'Email dan Password tidak cocok' })
            }
        })
    }
}
