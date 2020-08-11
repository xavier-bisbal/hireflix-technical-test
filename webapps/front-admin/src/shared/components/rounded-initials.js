import React from 'react';
import PropTypes from 'prop-types';
import { getInitials } from 'utils/string-utils';

const RoundedInitials = ({ name }) => {

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#E1E1E1',
            width: '120px',
            height: '120px',
            borderRadius: '100px',
        }}>
            <h2 className="title">{getInitials(name)}</h2>
        </div>
    );
};

RoundedInitials.propTypes = {
    name: PropTypes.string.isRequired,
};

export default RoundedInitials;