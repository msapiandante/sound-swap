import { gql } from '@apollo/client';

export const QUERY_UPLOADS = gql`
query getUploads($genre: ID) {
    uploads(genre: $genre) { 
      _id
      album
      description
      price
      artist
      img
      genre {
        _id
      }
    }
  }
`;
 
export const QUERY_CHECKOUT = gql`
  query getCheckout($uploads: [ID]!) {
    checkout(uploads: $uploads) {
      session
    }
  }
`;

export const QUERY_ALL_UPLOADS = gql`
  {
    uploads {
      _id
      album
      artist
      description
      img
      price
      genre {
        _id
        name
      }
    }
  }
`;

export const QUERY_GENRE = gql`
  {
    genre {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      orders {
        _id
        purchaseDate
      }
     uploads {
          _id
          album
          artist
          description
          price
          img
        
      }
    }
  }
`;

export const QUERY_ORDER = gql`
  query getOrder($orderId: ID!) {
    order(orderId: $orderId) {
      _id
      purchaseDate
      uploads {
        _id
        album
        artist
        description
        price
        img
        genre {
          _id
          name
        }
      }
    }
  }
`;