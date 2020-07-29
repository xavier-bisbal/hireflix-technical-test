import axios from 'axios';
import config from 'config';

if (!config.api.key) {
  console.log('----------------------------------------------------------------------');
  console.log('-                                                                    -');
  console.log('-                                                                    -');
  console.log('-         MISSING API KEY, SET HIREFLIX_API_KEY ENV VARIABLE         -');
  console.log('-                                                                    -');
  console.log('-                                                                    -');
  console.log('----------------------------------------------------------------------');
}

const api = ({ endpoint = '/', data = undefined, options = {} }) => {
  const { headers, ...otherOptions } = options || {};
  return axios({
    url: `${config.api.url}${endpoint}`,
    method: 'post',
    data,
    ...otherOptions,
    headers: {
      ...(config.api.key && { 'x-api-key': config.api.key }),
      ...headers,
    },
  }).then((res) => res.data);
};

const getPositionInfo = (positionId) => {
  return api({
    endpoint: '/me',
    data: {
      variables: JSON.stringify({ positionId }),
      query: `
        query getPosition($positionId: String!) {
          position(id: $positionId) {
            name
            interviews {
              id
              status
              createdAt
              candidate {
                name                
              }
            }
          }
        }
      `,
    },
  }).then((response) => {
    return response.data.position;
  });
};

const getInterview = (interviewId) => {
  console.log(`search on api details of interview ${interviewId}`);
  return Promise.resolve({});
};

const inviteCandidate = (positionId, name, email, phone) => {
  return api({
    endpoint: '/me',
    data: {
      variables: JSON.stringify({ positionId, candidate: { name, email, phone } }),
      query: `
        mutation invite($positionId: String, $candidate: inputCandidate) {
          Position(id: $positionId) {
              invite(candidate: $candidate) {
                id
                status
                createdAt
                thumbnail
                candidate {
                  name
                }
              }
          }
        }
      `,
    },
  }).then((response) => {
    return response.data.Position.invite;
  });
};

export { getPositionInfo, getInterview, inviteCandidate };
