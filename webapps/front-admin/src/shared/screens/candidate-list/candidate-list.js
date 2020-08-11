import React, { useState, useEffect } from 'react';
import api from 'services/api';
import Button from 'react-bulma-components/lib/components/button';
import Container from 'react-bulma-components/lib/components/container';
import Level from 'react-bulma-components/lib/components/level';
import Heading from 'react-bulma-components/lib/components/heading';
import Tile from 'react-bulma-components/lib/components/tile';
import CandidateCard from 'components/candidate-card';
import NewCandidateModal from 'components/candidate-new';

const CandidateList = () => {
  const [position, setPosition] = useState({"name":"","interviews":[]});
  const [isLoaded, setIsLoaded] = useState(false);
  const [isNewCandidateModalOpen, setIsNewCandidateModalOpen] = useState(false);
  const interviewId = "5f2d3c851008eac5153b4601";

  const getInterview = () => {
    console.log("Calling api");
    api({
      endpoint: `/v1/position/${interviewId}`,
    }).then((response) => {
      setPosition(response.position);
    });
  };

  useEffect(() => {
    if (isLoaded && !isNewCandidateModalOpen)
      {getInterview();
    }
  }, [isNewCandidateModalOpen]);

  useEffect(() => {
    if (!isLoaded)
    {
      setIsLoaded(true);
      getInterview();
    }
  });

  if(!position)
  {
    return 'Invalid position';
  }

  return (
    <div style={{ flex: 1, width: '100%', marginTop: '50px' }}>
      <Container fluid>
        <Level renderAs="nav" style={{ marginBottom: '5px' }}>
          <Level.Side align="left">
            <Level.Item>
              <Heading>{position.name}</Heading>
            </Level.Item>
          </Level.Side>
          <Level.Side align="right">
            <Level.Item>
              <Button color="primary" rounded onClick={() => setIsNewCandidateModalOpen(true)}>
                <p style={{paddingLeft: '30px', paddingRight: '30px'}}>
                  Invite a candidate
                </p>
              </Button>
            </Level.Item>
          </Level.Side>
        </Level>
        <hr style={{ marginTop: '0px' }}/>
        <Tile kind="ancestor" style={{ flexWrap: 'wrap' }}>
          {position.interviews.map((interview) => {
            return <CandidateCard key={interview.id} interviewId={interview.id} name={interview.candidate.name} status={interview.status} createdAt={interview.createdAt} thumbnail={interview.thumbnail} />;
          })}
        </Tile>
      </Container>
      <NewCandidateModal interviewId={interviewId} show={isNewCandidateModalOpen} onClose={() => {setIsNewCandidateModalOpen(false)}}/>
    </div>
  );
};

CandidateList.propTypes = {};

export default CandidateList;
