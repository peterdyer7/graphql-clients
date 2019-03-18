import React from 'react';
import {
  Header,
  Container,
  Dimmer,
  Loader,
  Segment,
  Grid
} from 'semantic-ui-react';
import AWSAppSyncClient from 'aws-appsync';
import { Rehydrated } from 'aws-appsync-react';
import { ApolloProvider, Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import ListTodos from '../ListTodos/ListTodos';
import AddTodo from '../AddTodo/AddTodo';

import aws_config from '../aws-exports';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';

const client = new AWSAppSyncClient({
  url: aws_config.aws_appsync_graphqlEndpoint,
  region: aws_config.aws_appsync_region,
  auth: {
    type: aws_config.aws_appsync_authenticationType,
    apiKey: aws_config.aws_appsync_apiKey
  }
});

export default function AppSyncTodoWithProvider() {
  return (
    <ApolloProvider client={client}>
      <Rehydrated>
        <AppSyncTodo />
      </Rehydrated>
    </ApolloProvider>
  );
}

function AppSyncTodo() {
  return (
    <Container>
      <Grid stackable columns={2}>
        <Grid.Column>
          <Segment>
            <Query
              query={gql(queries.listTodos)}
              variables={{ limit: 10 }}
              fetchPolicy={'cache-and-network'}
            >
              {({ loading, error, data }) => {
                if (loading)
                  return (
                    <Dimmer active>
                      <Loader />
                    </Dimmer>
                  );
                if (error)
                  return <Header as="h4">Error: {error.message}</Header>;
                if (!data || !data.listTodos || !data.listTodos.items)
                  return <Header as="h4">No todos</Header>;
                return <ListTodos todos={data.listTodos.items} />;
              }}
            </Query>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <Mutation
              mutation={gql(mutations.createTodo)}
              refetchQueries={[
                { query: gql(queries.listTodos), variables: { limit: 10 } }
              ]}
            >
              {(createTodo) => (
                <AddTodo addTodo={createTodo} usesVariables={true} />
              )}
            </Mutation>
          </Segment>
        </Grid.Column>
      </Grid>
    </Container>
  );
}
