import React from "react";
import styled, { css } from "styled-components";
import { connect } from "react-redux";
import openSocket from "socket.io-client";
import { Room } from "mediasoup-client";
import { resetUser } from "../../actions/user";
import Chat from "../ui/Chat";
import VideoEl from "../ui/VideoEl";
import AudioEl from "../ui/AudioEl";

const Main = styled.div` 
  width: 100%;
  background: white;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  padding: 60px 1rem 1rem 2rem;
  background: #f5f5f5;

  @media(max-width: 1024px){
    padding: 60px 0.5rem 0.5rem 0.5rem;
  }
  
  @media(max-width: 768px) {
    padding: 0 ;
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
    height: 100%;
  }

  @media (max-width: 768px) {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding: 0;
  }

  @media (max-width: 768px) and (orientation: landscape){
    flex-direction: row;
    height: 100vh;
    
  }
`;
const VideoElement = styled.video`
  background-color: #ddd;
  place-self: center;
  width: 200px;
  z-index: 5;
  ${({ count }) => count && css`position: absolute; top: 0; right: 0;`}
  @media (max-width: 768px) {
    width: ${({ count }) => count ? `20%` : `100%`};
  }
`;

const InteractionPanel = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  @media (max-width: 768px) {
    order: 2;
    width: 100%;
  }
`;

const VideoContainer = styled.div`
  position: relative;
  display: ${props => props.count ? 'block' : 'grid'};
  grid-template-columns: 1fr 1fr;
  // grid-template-rows: minmax(0,1fr) minmax(0,1fr);
  height: 100%;
  background: #313639;

   div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media (max-width: 768px) {
    order: 1;
    height: auto;
    display: ${props => props.count ? 'block' : 'grid'};
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
    const socket = openSocket("https://bespoken.live", {
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
          video: { facingMode: "user" }
        });
      })
      .then(stream => {
        const audioTrack = stream.getAudioTracks()[0];
        const videoTrack = stream.getVideoTracks()[0];
        const localStream = new MediaStream([videoTrack]);
        this.setState({ localStream });
        this.myVideo.current.srcObject = localStream;
        const audioProducer = this.room.createProducer(audioTrack);
        const videoProducer = this.room.createProducer(videoTrack);
        this.setState({
          audioProducer,
          videoProducer
        });
        // Send our audio and video
        audioProducer.send(sendTransport);
        videoProducer.send(sendTransport);
      });

    this.room.on("newpeer", peer => {
      this.handlePeer(peer);
    });

    this.room.on("request", (request, callback, errback) => {
      socket.emit("mediasoup-request", request, (err, response) => {
        if (!err) {
          // Success response, so pass the mediasoup response to the local Room.
          callback(response);
        } else {
          alert("That name is taken is in use in this room. Please choose a different name");
          this.props.history.push('/');
        }
      });
    });

    // Be ready to send mediaSoup client notifications to our remote mediaSoup Peer
    this.room.on("notify", notification => {
      socket.emit("mediasoup-notification", notification);
    });

    // Handle notifications from server, as there might be important info, that affects stream
    socket.on("mediasoup-notification", notification => {
      this.room.receiveNotification(notification);
    });
  }

  componentWillUnmount() {
    this.state.socket.disconnect();
    this.handleStopTransmitStream();
    this.props.resetUser();
  }

  handlePeer(peer) {
    // Handle all the Consumers in the Peer.
    peer.consumers.forEach(consumer => this.handleConsumer(consumer));
    peer.on("close", (peer) => {
    });

    // Event fired when the remote Peer sends a new media to mediasoup server.
    peer.on("newconsumer", consumer => {
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

    if (this.state.localStream) {
      this.state.localStream.getTracks().forEach(track => {
        track.stop();
      });
    }
    this.sendTransport = null;
    if (this.state.audioProducer && this.state.videoProducer) {
      this.state.audioProducer.close();
      this.state.videoProducer.close();
    }
  };

  render() {
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
          <VideoContainer count={this.state.incomingVideo.length < 2}>
            <VideoElement
              ref={this.myVideo}
              autoPlay
              playsInline
              count={this.state.incomingVideo.length < 2}
            />
            {
              this.state.incomingVideo.map(stream =>
                <VideoEl key={stream.id} stream={stream} count={this.state.incomingVideo.length < 2} />
              )
            }
            {
              this.state.incomingAudio.map(stream =>
                <AudioEl key={stream.id} stream={stream} />
              )
            }
          </VideoContainer>
        </Grid>
      </Main>
    );
  }
}
const mapStateToProps = state => ({
  username: state.user.username
});

const mapDispatchToProps = dispatch => ({
  resetUser: () => dispatch(resetUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(ConferenceRoom);
