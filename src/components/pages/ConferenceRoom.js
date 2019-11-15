import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import openSocket from "socket.io-client";
import { Room } from "mediasoup-client";
import Chat from "../ui/Chat";
import VideoEl from "../ui/VideoEl";
import AudioEl from "../ui/AudioEl";

const Main = styled.div`  
  width: 100%;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 150px 1rem 1rem 2rem;
  background: #f5f5f5;

  @media(max-width: 768px) {
    padding: 100px 0 0 0;
  }
`;
const Grid = styled.div`
  height: 80vh;
  width: 100%;
  padding: 1rem;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 3fr);
  grid-template-rows: minmax(0, 1fr);
  overflow: hidden;
  grid-gap: 1rem;
  
  @media(max-width: 1024px) {
    height: 100vh
  }

  @media (max-width: 768px) {
    height: auto;
    display: flex;
    flex-direction: column;
    padding: 0;
  }
`;
const VideoElement = styled.video`
  background-color: #ddd;
  place-self: center;
  width: 300px;
`;

const InteractionPanel = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  @media (max-width: 768px) {
    order: 2;
  }
`;

const VideoContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gird-template-rows: minmax(0,1fr) minmax(0,1fr);
  height: 100%;
  background: black;

   div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media (max-width: 768px) {
    order: 1;
  }
`;

class ConferenceRoom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      peers: [],
      socket: null,
      localStream: null,
      videoProducer: null,
      audioProducer: null,
      incomingVideo: [],
      incomingAudio: []
    };

    this.myVideo = React.createRef();
    this.recvTransport = null;
    this.room = null;
  }

  componentDidMount() {
    const roomId = this.props.match.params.id;
    const peerName = this.props.username;

    const socket = openSocket("http://178.128.222.66:3001", {
      query: { roomId, peerName }
    });

    this.setState({ socket });
    let sendTransport;
    this.room = new Room();

    this.room.join(peerName).then(peers => {
      this.setState({ peers });
      sendTransport = this.room.createTransport("send");
      this.recvTransport = this.room.createTransport("recv");

      peers.forEach(peer => this.handlePeer(peer));
    })
      .then(() => {
        return navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true
        });
      })
      .then(stream => {
        const audioTrack = stream.getAudioTracks()[0];
        const videoTrack = stream.getVideoTracks()[0];
        const localStream = new MediaStream([videoTrack]);
        this.setState({localStream});
        this.myVideo.current.srcObject = localStream;
        const audioProducer = this.room.createProducer(audioTrack);
        const videoProducer = this.room.createProducer(videoTrack);
        this.setState({
          audioProducer,
          videoProducer
        });

        // Send our audio.
        audioProducer.send(sendTransport);
        videoProducer.send(sendTransport);
      });

    this.room.on("newpeer", peer => {
      console.log("A new Peer joined the Room:", peer.name);
      this.handlePeer(peer);
    });

    this.room.on("request", (request, callback, errback) => {
      socket.emit("mediasoup-request", request, (err, response) => {
        if (!err) {
          // Success response, so pass the mediasoup response to the local Room.
          callback(response);
        } else {
          errback(err);
        }
      });
    });

    // Be ready to send mediaSoup client notifications to our remote mediaSoup Peer
    this.room.on("notify", notification => {
      console.log("New notification from local room:", notification);
      socket.emit("mediasoup-notification", notification);
    });

    // Handle notifications from server, as there might be important info, that affects stream
    socket.on("mediasoup-notification", notification => {
      console.log("New notification came from server:", notification);
      this.room.receiveNotification(notification);
    });
  }

  componentWillUnmount() {
    this.state.socket.disconnect();
    this.handleStopTransmitStream();
  }

  handlePeer(peer) {
    // Handle all the Consumers in the Peer.
    peer.consumers.forEach(consumer => this.handleConsumer(consumer));
    peer.on("close", (peer) => {
      console.log("Remote Peer closed", peer);
    });

    // Event fired when the remote Peer sends a new media to mediasoup server.
    peer.on("newconsumer", consumer => {
      console.log("Got a new remote Consumer");

      this.handleConsumer(consumer);
    });
  }

  handleConsumer(consumer) {
    consumer.receive(this.recvTransport).then(track => {
      const stream = new MediaStream();
      stream.addTrack(track);
      stream.consumerId = consumer.id;
      
      if (consumer.kind === "video") {  
        const arr = [...this.state.incomingVideo, stream];
        this.setState({ incomingVideo: arr }, () => {
        })
      }
      if (consumer.kind === "audio") {
        const arr = [...this.state.incomingAudio, stream];
        this.setState({ incomingAudio: arr })
      }
      consumer.on("close", () => {
        if (consumer.kind === "video") {
          const streamsArr = this.state.incomingVideo.filter((stream) => stream.consumerId !== consumer.id);
          console.log("id comparison", consumer.id)
          this.setState({ incomingVideo: streamsArr })
        }
        if (consumer.kind === "audio") {
          const streamsArr = this.state.incomingAudio.filter((stream) => stream.consumerId !== consumer.id);
          this.setState({ incomingAudio: streamsArr })
        }
      })
    });
  }

  handleStopTransmitStream = () => {
    this.state.localStream.getTracks().forEach(track => {
      console.log(track);
      track.stop();
    });
    this.sendTransport = null;
    this.state.audioProducer.close();
    this.state.videoProducer.close();
  };

  render() {
    console.log(this.state.incomingVideo)
    return (
      <Main>
        <Grid>
          <InteractionPanel>
            <div style={{ height: "100%" }}>
              <Chat
                socket={this.state.socket}
              />
            </div>
          </InteractionPanel>
          <VideoContainer>
            <VideoElement
              ref={this.myVideo}
              autoPlay
              playsInline
            />
            {
              this.state.incomingVideo.map(stream => 
                   <VideoEl key={stream.id} stream={stream} />
              )
            }
            {
              this.state.incomingAudio.map(stream => 
                <AudioEl key={stream.id} stream={stream}/>
              )
            }
          </VideoContainer>
        </Grid>
      </Main>
    );
  }
}
const mapStateToProps = state => ({
  username: state.user
});

export default connect(mapStateToProps)(ConferenceRoom);
