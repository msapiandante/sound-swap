const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        firstName: String
        lastName: String
        email: String 
        password: String
        uploads: [Upload]
        orders: [Order]
    }

    type Upload {
        _id: ID
        img: String
        album: String
        artist: String 
        price: Float 
        description: String
        genre: Genre
    }

    type Order {
        _id: ID
        purchaseDate: String 
        uploads: [Upload]
    }

    type Genre {
        _id: ID
        name: String 
    }

    type Checkout {
        session: ID
    }

    type Auth {
        token: ID
        user: User
    }

    type Query {
        user: User
        order(_id: ID!): Order
        uploads(album: String, genre: ID): [Upload]
        upload(_id: ID!): Upload
        checkout(uploads: [ID]!): Checkout 
        genre: [Genre]
    }

    type Mutation {
        addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth

        login(email: String!, password: String!): Auth

        addOrder(uploads: [ID]!): Order

        addUpload(img: String!, album: String!, artist: String!, price: Float!, description: String!, genre: ID!): Upload
        
        updateUpload(id: ID!, img: String, album: String, artist: String, price: Float, description: String, genre: ID): Upload
        
        deleteUpload(id: ID!): Upload
        
    }
`;

module.exports = typeDefs;