const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql")
const Author = require("../models/author")
const Book = require("../models/event")
const _ = require("lodash")
const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({ authorId: parent.id })
      },
    },
  }),
})
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return Author.findById(parent.authorId)
      },
    },
    genre: { type: GraphQLString },
    description: { type: GraphQLString },
    subtitle: { type: GraphQLString },
    pages: { type: GraphQLInt },
    website: { type: GraphQLString },
    published: { type: GraphQLString },
  }),
})
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, { id }) {
        return Book.findById(id)
      },
    },
  author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, { id }) {
        return Author.findById(id)
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({})
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return Author.find({})
      },
    },
  },
})
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, { name, age }) => {
        const author = new Author({ name, age })
        return author.save()
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: (parent, { name, genre, authorId }) => {
        const book = new Book({ name, genre, authorId })
        return book.save()
      },
    },
  },
})
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
})
