import mysql, { Connection } from 'mysql'

var global_connection: Connection

export function mysql_client() {
    return new Promise<Connection>((resolve, reject) => {
        if (global_connection && global_connection.state == 'connected') {
            resolve(global_connection)
        } else {
            global_connection = mysql.createConnection({
                host: "127.0.0.1",
                port: 3306,
                user: "info-miner",
                password: "info-miner"
            })
            global_connection.connect(err => {
                if (err) {
                    return reject(err)
                }
                resolve(global_connection)
            })
        }
    })
}