import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-bulma-components/lib/components/icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faBoxTissue  } from '@fortawesome/free-solid-svg-icons'

class VideoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.play = this.play.bind(this);
    this.state = {
      isPlaying: false
    };
  }

  play() {
    this.setState({ isPlaying: true });
    this.ref.current.play();
  }

  componentDidUpdate(prevProps)
  {
    if (prevProps.answerUrl !== this.props.answerUrl) {
      this.setState({ isPlaying: false });
    }
  }

  render() {
    const { answerUrl, answerThumbnail } = this.props;
 
    return (
      <div style={{display: 'flex', position: 'relative', width: '100%'}}>
        <div style={{display: 'flex', top: 0, left: 0}}>
          <video ref={this.ref} src={answerUrl} poster={answerThumbnail} style={{
            borderRadius: '15px'
          }} controls={this.state.isPlaying}>
          </video>
        </div>
        { this.state.isPlaying ? null : 
          <div style={{display: 'flex', position: 'absolute', top: 0, left: 0, height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#E1E1E1',
                width: '120px',
                height: '120px',
                borderRadius: '100px',
                cursor:'pointer'
            }} onClick={this.play}>
              <Icon>
                <FontAwesomeIcon icon={faPlay} size="4x" color="#4c6ef5"/>
              </Icon>
            </div>
          </div>
        }
      </div>
    );
  }
}

VideoComponent.propTypes = { 
  answerUrl: PropTypes.string,
  answerThumbnail: PropTypes.string,
};

export default VideoComponent;