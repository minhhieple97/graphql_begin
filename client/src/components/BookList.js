import React, { Component } from "react"
import { graphql } from "react-apollo"
import { getBooksQuery } from "../queries/queries"
import BookDetail from "./BookDetail"

class BookList extends Component {
  state = {
    selected: null,
  }
  handleClickBookItem(id) {
    this.setState({ selected: id })
  }
  displyBooks() {
    const data = this.props.data
    if (data.loading) {
      return <div>Loading books...</div>
    }
    return data.books.map((book) => (
      <li onClick={this.handleClickBookItem.bind(this, book.id)} key={book.id}>
        {book.name}
      </li>
    ))
  }
  render() {
    return (
      <div>
        <ul id="book-list">{this.displyBooks()}</ul>
        <BookDetail id={this.state.selected}></BookDetail>
      </div>
    )
  }
}
export default graphql(getBooksQuery)(BookList)
