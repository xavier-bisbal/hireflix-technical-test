import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bulma-components/lib/components/card';
import Heading from 'react-bulma-components/lib/components/heading';

const QuestionSelector = ({ questions, onSelect }) => {
  const [selectedQuestion, setSelectedQuestion] = useState({});

  return (
    <Card style={{ flex: '1', borderRadius: '15px', minWidth: '300px' }}>
      <div style={{ flex: '1', display: 'flex', justifyContent: 'center', marginBottom: '20px'}}>
        <Heading>Questions</Heading>
      </div>
      <ul style={{marginBottom: '20px'}}>
        {questions.map((question, index) => {
          var listyle = {
              cursor: 'pointer'
          };
          var pstyle = {}
          if (question.id === selectedQuestion.id || (!selectedQuestion.id && index===0))
          {
              listyle.backgroundColor = '#4c6ef5';
              pstyle.color = 'white';
          }
          return (
            <li key={index} style={listyle} onClick={() => { setSelectedQuestion(question); onSelect(question); }}>
            <div style={{display: 'flex'}}>
              <div id="question-card" style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80px',
                width: '120px',
                minHeight: '80px',
                minWidth: '120px',
                borderRadius: '15px',
                backgroundImage: `url(${(question.answer || {}).thumbnail})`,
                backgroundPosition: 'center center',
                backgroundSize: '100% 100%',
                backgroundRepeat: 'false',
                margin: '10px'
              }}
              />
              <div style={{margin: '10px', minWidth: '150px'}}>
                <p style={pstyle}><b>{question.title}</b></p>
                <p style={pstyle}>{question.description}</p>
              </div>
            </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
};

QuestionSelector.propTypes = {
  questions: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default QuestionSelector;