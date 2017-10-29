/*const Hemera = require('nats-hemera');
const nats = require('nats').connect();

const hemera = new Hemera(nats);*/

const messaging = {
    actAsync(pattern) {
        return new Promise(function callback(resolve, reject) {
            this.act(pattern, function done(err, resp) {
                if (err) {
                    reject(err)
                } else {
                    resolve(resp);
                }
            });
        }.bind(this));
    }
};

Object.setPrototypeOf(messaging, hemera);

module.exports = messaging;
