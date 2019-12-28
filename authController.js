'use strict'
const conn = require('./conn')
const jwt = require('jsonwebtoken')
// const bcrypt = require('bcrypt')
// const salt = bcrypt.genSaltSync(7);

exports.login = (req, res) => {
    let username = req.body.username
    let password = req.body.password
    let verifPass = ''
    let id

    const dataEmpty = () => {
        res
        .status(400)
        .send({
            message: "Data can't be empty"
        })
    }

    if(!username || !password){
        dataEmpty()
    }

    let sql = `select * from login where username='${username}'`
    const user = {
        username: username,
        password: password
    }
    console.log(username + password)
    conn.query(sql, async (error, rows, results) => {
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
                    id = item.userID
                )
            })
            console.log(id)
            id = id.toString()
            res.send({
                message: 'login succes',
                id,
                token,
            })
        } else {
            res.send({message: 'Incorrect Email and Password'})
        }
    })
}
