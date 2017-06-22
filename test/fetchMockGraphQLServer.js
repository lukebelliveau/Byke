import fetchMock from 'fetch-mock';
import { mockServer } from 'graphql-tools';
import schema from '../src/divvySchema';

const fetchGQL = (serverURL, schema, mocks) => {
  const server = mockServer(schema, mocks);

  fetchMock.mock(`begin:${serverURL}`, url => {
    const query = url.replace(serverURL, '');
    return queryMockServer(query);
  });

  const queryMockServer = query => server.query(query);
};

export default (url, mocks) => fetchGQL(url, schema, mocks);
