const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
} = require("graphql")
const _ = require("lodash")
const books = [
  {
    id: "9781593275846",
    name: "Eloquent JavaScript, Second Edition",
    subtitle: "A Modern Introduction to Programming",
    authorId: "1",
    published: "2014-12-14T00:00:00.000Z",
    publisher: "No Starch Press",
    pages: 472,
    description:
      "JavaScript lies at the heart of almost every modern web application, from social apps to the newest browser-based games. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.",
    website: "http://eloquentjavascript.net/",
  },
  {
    id: "9781449331818",
    name: "Learning JavaScript Design Patterns",
    subtitle: "A JavaScript and jQuery Developer's Guide",
    authorId: "2",
    published: "2012-07-01T00:00:00.000Z",
    publisher: "O'Reilly Media",
    pages: 254,
    description:
      "With Learning JavaScript Design Patterns, you'll learn how to write beautiful, structured, and maintainable JavaScript by applying classical and modern design patterns to the language. If you want to keep your code efficient, more manageable, and up-to-date with the latest best practices, this book is for you.",
    website:
      "http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/",
  },
  {
    id: "9781449365035",
    name: "Speaking JavaScript",
    subtitle: "An In-Depth Guide for Programmers",
    authorId: "2",
    published: "2014-02-01T00:00:00.000Z",
    publisher: "O'Reilly Media",
    pages: 460,
    description:
      "Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who once found himself in the same position.",
    website: "http://speakingjs.com/",
  },
  {
    id: "9781491950296",
    name: "Programming JavaScript Applications",
    subtitle:
      "Robust Web Architecture with Node, HTML5, and Modern JS Libraries",
    authorId: "2",
    published: "2014-07-01T00:00:00.000Z",
    publisher: "O'Reilly Media",
    pages: 254,
    description:
      "Take advantage of JavaScript's power to build robust web-scale or enterprise applications that are easy to extend and maintain. By applying the design patterns outlined in this practical book, experienced JavaScript developers will learn how to write flexible and resilient code that's easier-yes, easier-to work with as your code base grows.",
    website: "http://chimera.labs.oreilly.com/books/1234000000262/index.html",
  },
  {
    id: "9781593277574",
    name: "Understanding ECMAScript 6",
    subtitle: "The Definitive Guide for JavaScript Developers",
    authorId: "5",
    published: "2016-09-03T00:00:00.000Z",
    publisher: "No Starch Press",
    pages: 352,
    description:
      "ECMAScript 6 represents the biggest update to the core of JavaScript in the history of the language. In Understanding ECMAScript 6, expert developer Nicholas C. Zakas provides a complete guide to the object types, syntax, and other exciting changes that ECMAScript 6 brings to JavaScript.",
    website: "https://leanpub.com/understandinges6/read",
  },
  {
    id: "9781449325862",
    name: "Git Pocket Guide",
    subtitle: "A Working Introduction",
    authorId: "6",
    published: "2013-08-02T00:00:00.000Z",
    publisher: "O'Reilly Media",
    pages: 234,
    description:
      "This pocket guide is the perfect on-the-job companion to Git, the distributed version control system. It provides a compact, readable introduction to Git for new users, as well as a reference to common commands and procedures for those of you with Git experience.",
    website: "http://chimera.labs.oreilly.com/books/1230000000561/index.html",
  },
  {
    id: "9781449337711",
    name: "Designing Evolvable Web APIs with ASP.NET",
    subtitle: "Harnessing the Power of the Web",
    authorId: "7",
    published: "2014-04-07T00:00:00.000Z",
    publisher: "O'Reilly Media",
    pages: 538,
    description:
      "Design and build Web APIs for a broad range of clients—including browsers and mobile devices—that can adapt to change over time. This practical, hands-on guide takes you through the theory and tools you need to build evolvable HTTP services with Microsoft’s ASP.NET Web API framework. In the process, you’ll learn how design and implement a real-world Web API.",
    website: "http://chimera.labs.oreilly.com/books/1234000001708/index.html",
  },
]
const authors = [
  { name: "Marijn Haverbeke", id: "1", age: 44 },
  { name: "Addy Osmani", id: "2", age: 45 },
  { name: "Axel Rauschmayer", id: "3", age: 46 },
  { name: "Eric Elliott", id: "4", age: 47 },
  { name: "Nicholas C. Zakas", id: "5", age: 48 },
  { name: "Kyle Simpson", id: "6", age: 49 },
  { name: "Richard E. Silverman", id: "7", age: 50 },
]
const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authorId: parent.id })
      },
    },
  }),
})
const BookType = new GraphQLObjectType({
  name: "Book",
  fields:
    // () => (
    {
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      author: {
        type: AuthorType,
        resolve(parent, args) {
          return _.find(authors, { id: parent.authorId })
        },
      },
      description: { type: GraphQLString },
      subtitle: { type: GraphQLString },
      pages: { type: GraphQLInt },
      website: { type: GraphQLString },
      published: { type: GraphQLString },
    },
  // )
})
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        console.log(`Resolve method is call : ${JSON.stringify(args)}`)
        return _.find(books, { id: args.id })
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        console.log(`Resolve method is call : ${JSON.stringify(args)}`)
        return _.find(authors, { id: args.id })
      },
    },
  },
})
module.exports = new GraphQLSchema({
  query: RootQuery,
})