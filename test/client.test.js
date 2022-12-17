const {Client} = require('../beardb-js/client');
const host='127.0.0.1'
const port =8000
const email='teddyoweh@gmail.com'
const secret='42e7398c6fcbd8574cfac72bd5ca01cf584dfeda6b5eb3f27659b80181d9ece4'
const client = new Client(host, port, email, secret);
 
console.log(client.createnewuser('teddyoweh@gmail.com','ggg','sdsd'))

