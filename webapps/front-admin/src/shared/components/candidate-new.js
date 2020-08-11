import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bulma-components/lib/components/modal';
import Box from 'react-bulma-components/lib/components/box';
import Heading from 'react-bulma-components/lib/components/heading';
import { Input, Field } from 'react-bulma-components/lib/components/form';
import Button from 'react-bulma-components/lib/components/button';
import api from 'services/api';

class NewCandidateModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phone: '',
    };
  }

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }

  inviteCandidate = () => {
    const { onClose, interviewId } = this.props;
    api({
      endpoint: `/v1/invite/${interviewId}/${this.state.name}/${this.state.email}/${this.state.phone}`,
    }).then(() => {
      onClose();
    });
  }

  render() {
    const { show, onClose, interviewId } = this.props;

    return (
      <Modal show={show} onClose={() => { onClose() }}>
        <Modal.Content>
          <Box>
            <Heading>New candidate</Heading>
            <p>Name</p>
            <Field label='Name'>
              <Input type='text' name='name' value={this.state.name} onChange={ this.myChangeHandler } />
            </Field>
            <p>Email</p>
            <Field label='Email'>
              <Input type='email' name='email' value={this.state.email}  onChange={ this.myChangeHandler } />
            </Field>
            <p>Mobile Phone</p>
            <Field label='Mobile Phone'>
              <Input type='text' name='phone' value={this.state.phone}  onChange={ this.myChangeHandler } />
            </Field>
            <div align="middle">
              <Button color="primary" rounded onClick={ this.inviteCandidate } >
                <p style={{ paddingLeft: '30px', paddingRight: '30px' }}>
                  Invite
              </p>
              </Button>
            </div>
          </Box>
        </Modal.Content>
      </Modal>
    );
  }
};

NewCandidateModal.propTypes = {
  interviewId: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default NewCandidateModal;