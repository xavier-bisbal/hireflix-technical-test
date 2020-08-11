import React from 'react';
import PropTypes from 'prop-types';

class VideoComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { answerUrl, answerThumbnail } = this.props;

    return (
      <div>
        <video src={answerUrl} poster={answerThumbnail} style={{
          borderRadius: '15px',
          height: '100%',
          width: '100%',
        }} controls>
        </video>
      </div>
    );
  }
}

VideoComponent.propTypes = { 
  answerUrl: PropTypes.string,
  answerThumbnail: PropTypes.string,
};

export default VideoComponent;