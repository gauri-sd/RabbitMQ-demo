var amqp = require('amqplib/callback_api');

// var queue = 'demo';
// var msg = 'msg';
// exports.receive = () => {
//     console.log('hi');
//    
//     amqp.connect('amqp://localhost', function(error0, connection) {
//         if (error0) {
//             throw error0;
//         }
//         connection.createChannel(function(error1, channel) {
//             if (error1) {
//                 throw error1;
//             }
            
//             channel.assertQueue(queue, {
//                 durable: false
//             });

//             console.log(" [*] Waiting for messages in %s.", queue);

//             channel.consume(queue, function(msg) {
//                 console.log(" [x] Received %s", msg.content.toString());
//                 channel.ack(msg);
                
//             }, {
//                 noAck: false
//             });
//         });
//     });
//     console.log(msg);
//     return msg;
// }

// exports.pQueue = (queue,data) => {
//     try{
//         console.log(queue,data);
//         console.log('Hi1');
//         channel.sendToQueue(queue, Buffer.from(data), {persistent: true});
//         console.log('Hi2');
//         console.log(" [x] Sent %s", data);
//     }
//     catch(err){
//         console.log(err);
//     }

// }

// process.on('exit',(code) => {
//     channel.close();
//     console.log(`Closing rabbitmq channel`);
// });


exports.receive = () => {
    console.log('Hello');
    console.log('hi');
    var queue = 'demo';
    var msg = 'welcome';
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
                
            }, {
                noAck: false
            });
        });
    });
    console.log(msg);
    return msg;
}

exports.pQueue = (queue,data) => {
    try{
        channel.assertQueue(queue, {
            durable: false
        });
        console.log(queue,data);
        console.log('Hi1');
        channel.sendToQueue(queue, Buffer.from(data), {persistent: true});
        console.log('Hi2');
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
    