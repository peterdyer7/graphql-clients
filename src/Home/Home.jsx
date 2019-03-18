import React from 'react';
import { Header, Container } from 'semantic-ui-react';

export default function Home() {
  return (
    <Container>
      <Header as="h2">Graphal Client Examples</Header>
      <p>Select a tab to see data rendered by a different Graphql Client</p>
    </Container>
  );
}
