import React, { Component } from "react"
import BookList from "./components/BookList"
import ApolloClient from "apollo-boost"
import { ApolloProvider } from "react-apollo"
import AddBook from "./components/AddBook"
const client = new ApolloClient({
  uri: "http://localhost:8080/graphql",
})
export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>Sample GraphQL</h1>
          <BookList></BookList>
          <AddBook></AddBook>
        </div>
      </ApolloProvider>
    )
  }
}
