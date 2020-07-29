import axios from 'axios';
import config from 'config';

export default ({ method = 'get', endpoint = '/', data = undefined, jwt = undefined, options = {} }) => {
  const { headers, ...otherOptions } = options || {};
  return axios({
    url: `${config.api.url}${endpoint}`,
    method,
    data,
    ...otherOptions,
    headers: {
      ...(jwt && { authorization: `Bearer ${jwt}` }),
      ...(config.api.key && { 'x-api-key': config.api.key }),
      ...headers,
    },
  }).then((res) => res.data);
};
