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
  }).then((res) => res.data).catch((error) => {
    // Error 😨
    if (error.response) {
        /*
         * The request was made and the server responded with a
         * status code that falls out of the range of 2xx
         */
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) {
        /*
         * The request was made but no response was received, `error.request`
         * is an instance of XMLHttpRequest in the browser and an instance
         * of http.ClientRequest in Node.js
         */
        console.log(error.request);
    } else {
        // Something happened in setting up the request and triggered an Error
        console.log('Error', error.message);
    }
    console.log(error.config);
  });
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
  }).then((res) => {
    return res.data.position;
  });
};

const getInterview = (interviewId) => {
  console.log(`search on api details of interview ${interviewId}`);
  return api({
    endpoint: '/me',
    data: {
      variables: JSON.stringify({ interviewId }),
      query: `
        query getInterview($interviewId: String!) {
          interview(id: $interviewId) {
            id
            status
            createdAt
            updatedAt
            thumbnail
            candidate {
              name
              email
              phone
            }
            inviteSource
            externalLink {
              id
              expires
            }
            timeToThink
            timeToAnswer
            notes
            questions {
              id
              title
              description
              notes
              answered
              score
              media {
                thumbnail
                url
              }
              answer {
                thumbnail
                url
                meta {
                  duration
                }
              }
            }
          }
        }
      `,
    },
  }).then((res) => {
    return res.data.interview;
  });
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
