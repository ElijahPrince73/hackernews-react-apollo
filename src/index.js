import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./components/App";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-boost";

import { BrowserRouter } from "react-router-dom";


// Pass your GraphQL endpoint to uri
const client = new ApolloClient({
  uri: "http://localhost:4000/",
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
