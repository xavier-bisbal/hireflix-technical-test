import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from 'services/api';
import Container from 'react-bulma-components/lib/components/container';
import Heading from 'react-bulma-components/lib/components/heading';
import Tile from 'react-bulma-components/lib/components/tile';
import VideoComponent from 'components/video-component';
import DetailHeader from 'components/detail-header';
import QuestionSelector from 'components/question-selector';

const CandidateDetail = () => {
  const params = useParams();
  const interviewId = params.interviewId;

  const [interview, setInterview] = useState({"candidate": {"name": ""},"position": {"name": ""}, "questions": []});
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState({});

  useEffect(() => {
    if (!isLoaded)
    {
      api({
        endpoint: `/v1/interview/${interviewId}`,
      }).then((response) => {
        setIsLoaded(true);
        setInterview(response.interview);
        setSelectedQuestion(response.interview.questions[0])
      });
    }
  });

  if(!interview)
  {
    return 'Invalid interview';
  }

  return (
    <div style={{ flex: 1, width: '100%', marginTop: '50px' }}>
      <Container fluid>
        <DetailHeader title={`${interview.candidate.name} - ${interview.position.name}`}/>
        <Tile kind="ancestor">
          <Tile>
            <Tile kind="parent" size={5}>
              <QuestionSelector questions={interview.questions} onSelect={(question) => { setSelectedQuestion(question) }} />
              
            </Tile>
            <Tile kind="parent" size={7}>
              <div id="interview-video" style={{ paddingLeft: '100px' }}>
                  <VideoComponent answerUrl={(selectedQuestion.answer || {}).url} answerThumbnail={(selectedQuestion.answer || {}).thumbnail} />
                <div>
                  <Heading size={3}>{selectedQuestion.description}</Heading>
                </div>
              </div>
            </Tile>
          </Tile>
        </Tile>
      </Container>
    </div>
  );
};

CandidateDetail.propTypes = { };

export default CandidateDetail;