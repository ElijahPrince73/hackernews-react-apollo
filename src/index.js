import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./components/App";

import { ApolloClient, ApolloLink, InMemoryCache, HttpLink } from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import { BrowserRouter } from "react-router-dom";
import { AUTH_TOKEN } from "./constants";

const httpLink = new HttpLink({ uri: "http://localhost:4000/" });

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  const token = localStorage.getItem(AUTH_TOKEN);

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      Authorization: token ? `Bearer ${token}` : ""
    }
  });

  // Call the next link in the middleware chain.
  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink), // Chain it with the HttpLink
  cache: new InMemoryCache()
});

const ApolloApp = AppComponent => (
  <BrowserRouter>
    <ApolloProvider client={client}>
      <AppComponent />
    </ApolloProvider>
  </BrowserRouter>
);


ReactDOM.render(ApolloApp(App), document.getElementById("root"));
