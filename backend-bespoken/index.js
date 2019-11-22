const path = require('path')
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const config = require('./config');
const mediasoup = require('mediasoup');
const publicPath = path.join(__dirname, '..', 'build');

const port = process.env.PORT || 3001;

const app = express();

const server = http.createServer(app);

const io = socketIO(server);

const mediaServer = mediasoup.Server({
    numWorkers: null, // Use as many CPUs as available.
    logLevel: config.mediasoup.logLevel,
    logTags: config.mediasoup.logTags,
    rtcIPv4: config.mediasoup.rtcIPv4,
    rtcIPv6: config.mediasoup.rtcIPv6,
    rtcAnnouncedIPv4: config.mediasoup.rtcAnnouncedIPv4,
    rtcAnnouncedIPv6: config.mediasoup.rtcAnnouncedIPv6,
    rtcMinPort: config.mediasoup.rtcMinPort,
    rtcMaxPort: config.mediasoup.rtcMaxPort
});

const rooms = new Map();
const chatMessages = {};
const users = {};

io.on("connection", (socket) => {
    console.log(" New connection", socket.handshake.query);
    let room = null;

    let mediaPeer = null;

    const { roomId, peerName } = socket.handshake.query;

    if (rooms.has(roomId)) {
        room = rooms.get(roomId);
        users[roomId]++;
    } else {
        users[roomId] = 1;
        room = mediaServer.Room(config.mediasoup.mediaCodecs);
        rooms.set(roomId, room);
        room.on('close', () => {
            console.log("closing room!!!!")
            delete chatMessages[roomId];
            rooms.delete(roomId);
        })

        chatMessages[roomId] = [];
    }

    if (chatMessages[roomId]) {
        socket.emit('messages-sent', chatMessages[roomId]);
    }

    socket.on('mediasoup-request', (request, cb) => {
        console.log(request)
        switch (request.method) {

            case 'queryRoom':
                room.receiveRequest(request)
                    .then((response) => cb(null, response))
                    .catch((error) => cb(error.toString()));
                break;

            case 'join':
                console.log('join request')
                room.receiveRequest(request)
                    .then((response) => {
                        // Get the newly created mediasoup Peer
                        mediaPeer = room.getPeerByName(peerName);

                        handleMediaPeer(mediaPeer);

                        // Send response back
                        cb(null, response);
                    })
                    .catch((error) => cb(error.toString()));
                break;

            default:
                if (mediaPeer) {
                    mediaPeer.receiveRequest(request)
                        .then((response) => cb(null, response))
                        .catch((error) => cb(error.toString()));
                }
        }
    });

    socket.on('mediasoup-notification', (notification) => {
        console.debug('Got notification from client peer', notification);
        if (!mediaPeer) {
            console.error('Cannot hand;e mediasoup notification, no mediasoup peer');
            return;
        }

        mediaPeer.receiveNotification(notification);
    });

    socket.on('message-added', (message) => {
        socket.broadcast.emit('message-sent', message);
        chatMessages[roomId] = [...chatMessages[roomId], message];
    })

    socket.on('disconnect', () => {
        if (mediaPeer) {
            mediaPeer.close();
        }
        users[roomId]--;
        if (users[roomId] === 0) {
            room.close();
        }


    });

    const handleMediaPeer = (mediaPeer) => {
        mediaPeer.on('notify', (notification) => {
            console.log('new notification for mediaPeer received:', notification);
            socket.emit('mediasoup-notification', notification);
        });

        mediaPeer.on('newtransport', (transport) => {
            console.log(' New mwdiaPeer transport:', transport.direction);
            transport.on('close', (originator) => {
                console.log('Transport closed from originator:', originator);
            })
        });

        mediaPeer.on('newproducer', (producer) => {
            console.log('New mediaPeer producer:', producer.kind);
            producer.on('close', (originator) => {
                console.log('Producer closed from originator:', originator);
            });
        });

        mediaPeer.on('newconsumer', (consumer) => {
            console.log('New mediaPeer consumer:', consumer.kind);
            consumer.on('close', (originator) => {
                console.log('Consumer closed from originator', originator);
            });
        });

        // Also handle already existing Consumers.
        mediaPeer.consumers.forEach((consumer) => {
            console.log('mediaPeer existing consumer:', consumer.kind);
            consumer.on('close', (originator) => {
                console.log('Existing consumer closed from originator', originator);
            });
        });
    }
});

app.use(express.static(publicPath));
app.use("/room:id", express.static(publicPath));




server.listen(port, () => console.log(`Listening on port ${port}`));