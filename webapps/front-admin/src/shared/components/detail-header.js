import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Level from 'react-bulma-components/lib/components/level';
import Icon from 'react-bulma-components/lib/components/icon';
import Heading from 'react-bulma-components/lib/components/heading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft  } from '@fortawesome/free-solid-svg-icons'

const DetailHeader = ({ title }) => {
  const history = useHistory()

  return (
    <>
      <Level renderAs="nav" style={{ marginBottom: '5px' }}>
        <Level.Side align="left">
          <Level.Item>
            <Icon>
              <FontAwesomeIcon icon={faArrowLeft} size="lg" style={{cursor:'pointer'}} onClick={() => {history.goBack()}}/>
            </Icon>
            <Heading style={{ marginLeft: '10px'}}>{title}</Heading>
          </Level.Item>
        </Level.Side>
      </Level>
      <hr style={{ marginTop: '0px' }}/>
    </>
  );
};

DetailHeader.defaultProps = {
  title: '',
};

DetailHeader.propTypes = {
  title: PropTypes.string,
};

export default DetailHeader;