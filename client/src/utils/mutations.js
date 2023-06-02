import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String! 
    $lastName: String! 
    $email: String! 
    $password: String!
  ) {
    addUser(
      firstName: $firstName 
      lastName: $lastName
      email: $email
      password: $password
    ) {
    token
    user {
      _id
    }
  }
}
`;

export const ADD_ORDER = gql`
  mutation addOrder($uploads:[ID]!) {
  addOrder(uploads: $uploads) {
    purchaseDate
    uploads {
      _id
      img
      album
      artist
      price
      description 
      genre {
        name
      }
    }
  }
}
`;

export const ADD_UPLOAD = gql`
  mutation addUpload(
    $img: String!
    $album: String!
    $artist: String!
    $price: Float!
    $description: String!
    $genre:ID!
  ) {
    addUpload(
      img: $img
      album: $album
      artist: $artist
      price: $price
      description: $description
      genre: $genre
    ) {
      img
      album
      artist
      price
      description
      genre
    }
}
`;
export const UPDATE_UPLOAD = gql`
  mutation updateUpload(
    $id: ID
    $img: String
    $album: String
    $artist: String
    $price: Float
    $description: String
    $genre: ID
  ) {
    updateUpload(
      id: $id
      img: $img
      album: $album
      artist: $artist
      price: $price
      description: $description
      genre: $genre
    ) {
        _id
        img
        album
        artist
        price
        description
        genre
    }
}
`;
export const DELETE_UPLOAD = gql`
  mutation deleteUpload($id: ID!) {
    deleteUpload(id: $id) {
        _id
    }
}
`;
export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token 
        user {
          _id
        }
    }
}
`;
