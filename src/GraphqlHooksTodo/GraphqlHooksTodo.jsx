import React from 'react';
import {
  Container,
  Segment,
  Grid,
  Dimmer,
  Loader,
  Header
} from 'semantic-ui-react';
import {
  GraphQLClient,
  ClientContext,
  useQuery,
  useMutation
} from 'graphql-hooks';
import memCache from 'graphql-hooks-memcache';

import ListTodos from '../ListTodos/ListTodos';

import aws_config from '../aws-exports';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import AddTodo from '../AddTodo/AddTodo';

const client = new GraphQLClient({
  url: aws_config.aws_appsync_graphqlEndpoint,
  headers: {
    'x-api-key': aws_config.aws_appsync_apiKey
  },
  cache: memCache()
});

export default function GraphqlHooksTodoWithProvider() {
  return (
    <ClientContext.Provider value={client}>
      <GraphqlHooksTodo />
    </ClientContext.Provider>
  );
}

function GraphqlHooksTodo() {
  const { loading, error, data, refetch } = useQuery(queries.listTodos, {
    variables: { limit: 10 }
  });
  const [executeMutation] = useMutation(mutations.createTodo);

  if (loading) {
    return (
      <Dimmer active>
        <Loader />
      </Dimmer>
    );
  } else if (error) {
    return <Header as="h4">Error: {error.message}</Header>;
  }

  return (
    <Container>
      <Grid stackable columns={2}>
        <Grid.Column>
          <Segment>
            {data && data.listTodos && data.listTodos.items && (
              <ListTodos todos={data.listTodos.items} />
            )}
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <AddTodo
              addTodo={executeMutation}
              usesVariables={true}
              refetch={refetch}
            />
          </Segment>
        </Grid.Column>
      </Grid>
    </Container>
  );
}
