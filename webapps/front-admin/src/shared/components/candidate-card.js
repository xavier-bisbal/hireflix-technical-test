import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";
import Tile from 'react-bulma-components/lib/components/tile';
import Card from 'react-bulma-components/lib/components/card';
import Image from 'react-bulma-components/lib/components/image';
import Media from 'react-bulma-components/lib/components/media';
import RoundedInitials from 'components/rounded-initials';
import { getStringDateFromUnix } from 'utils/date-utils';

const CandidateCard = ({ interviewId, name, status, createdAt, thumbnail }) => {

  const history = useHistory();
  var cardStyle = { 
    flex: '1', 
    borderRadius: '15px',
  };

  var onClick = () => {};
  
  if (status === "completed")
  {
    cardStyle.cursor = 'pointer';
    onClick = () => {history.push(`/interview/${interviewId}`)};
  }

  return (
    <Tile kind="parent" style={{ flex: '0 0 25%' }}>
      <Card style={cardStyle} onClick={onClick}>
        <div id="candidate-card" style={{ padding: '15px' }}>
          {(
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#CCCCCC',
              height: '150px',
              minWidth: '230px',
              borderRadius: '15px',
            }}
            >
              {!thumbnail ? (
                <RoundedInitials name={name} />
              ) : (
                  <Image src={thumbnail} style={{ width: '200px', height: '150px' }} />
                )
              }
            </div>
          )}
        </div>
        <Card.Content>
          <Media>
            <Media.Item>
              <p>{name}</p>
              <p>Status: <b>{status}</b></p>
              <p>Invited: {getStringDateFromUnix(createdAt)}</p>
            </Media.Item>
          </Media>
        </Card.Content>
      </Card>
    </Tile>
  );
};

CandidateCard.defaultProps = {
  name: '',
  status: '',
  createdAt: 0,
  thumbnail: '',
};

CandidateCard.propTypes = {
  interviewId: PropTypes.string.isRequired,
  name: PropTypes.string,
  status: PropTypes.string,
  createdAt: PropTypes.number, 
  thumbnail: PropTypes.string,
};

export default CandidateCard;