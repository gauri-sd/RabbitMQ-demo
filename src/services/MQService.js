var amqp = require('amqplib/callback_api');

exports.receive = () => {
    var queue = 'demo';
    amqp.connect('amqp://localhost', function(error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1;
            }
            
            channel.assertQueue(queue, {
                durable: false
            });

            console.log(" [*] Waiting for messages in %s.", queue);

            channel.consume(queue, function(msg) {
                console.log(" [x] Received %s", msg.content.toString());
                channel.ack(msg);
                return msg;
            }, {
                noAck: false
            });
        });
    });
}

exports.pQueue = async(queue,data) => {
    try{
        channel.sendToQueue(queue, Buffer.from(data), {persistent: true});

        console.log(" [x] Sent %s", data);
    }
    catch(err){
        console.log(err);
    }

}

process.on('exit',(code) => {
    channel.close();
    console.log(`Closing rabbitmq channel`);
});