const mysql = require('../config')

exports.allUsers = (req, res) => {
    mysql.getConnection((error, conn) => {

        if (error) return res.send(error)

        conn.query('select * from usuarios', (error, resultado) => {
            conn.release();
            if (error) return res.status(500).send(error)
            res.send(resultado);
        })
    })
}

exports.insertOneUser = (req, res) => {

    mysql.getConnection((error, conn) => {

        let { nome, email, senha } = req.body

        if (error) {
            return res.send(error)
        }

        let sql = `INSERT INTO usuarios (nome , email , senha) values (? , ? , ?)`

        conn.query(sql, [nome, email, senha], (error, result) => {
            conn.release();

            if (error) {
                return res.send(error)
            } else {
                res.send(`cadastrado o usuário de ID ${result.insertId} com sucesso!`)
            }

        })
    })
}

exports.insertMultipleUsersV1 = (req, res) => {

    mysql.getConnection((error, conn) => {

        let users = [];

        for (let i = 0; i < req.body.length; i++) {
            let user = "('" + req.body[i].nome + "','" + req.body[i].email + "')";
            users.push(user)
        }
        console.log(users);

        if (error) {
            return res.send(error)
        }

        let sql = `INSERT INTO usuarios (nome , email) values ?`

        conn.query(sql, [users], (error, result) => {
            conn.release();

            if (error) {
                return res.send(error)
            } else {
                res.send(`cadastrado ${result.affectedRows} novos registros`)
            }

        })
    })
}

exports.insertMultipleUsersV2 = (req, res) => {

    let users = req.body.map((u) => [
        u.nome,
        u.senha
    ])

    console.log(users);

    mysql.getConnection((error, conn) => {

        if (error) return res.send(error)

        const sql = `INSERT INTO usuarios (nome , senha)  VALUES ?`

        conn.query(sql, [users], (error, result) => {
            conn.release();

            if (error) return res.json(error)

            const response = {
                message: 'Criado com sucesso',
                Inseridos: req.body.map(u => {
                    return { user: u.nome }
                })
            }
            res.send(response)
        })
    })
}
