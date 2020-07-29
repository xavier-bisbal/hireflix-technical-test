import React, { useState } from 'react';
import api from 'services/api';
import Button from 'react-bulma-components/lib/components/button';

const CandidateList = () => {
  const [version, setVersion] = useState();
  const getApiVersion = async () => {
    const response = await api({
      endpoint: '/v1/version',
    });
    setVersion(response.version);
  };
  return (
    <div>
      <div>Update this component to display the list of candidates by a given position.</div>
      <div>{version ? `Current Version: ${version}` : <Button onClick={getApiVersion}>Get Api Version</Button>}</div>
    </div>
  );
};

CandidateList.propTypes = {};

export default CandidateList;
