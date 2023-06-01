import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($firstName: String!, $lastName: String! $email: String! $password: String!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
    token
    user{_id}
  }
}
`;
export const UPDATE_USER = gql`
    mutation updateUser($firstName: String!, $lastName: String!, $email: String!) {
    updateUser(firstName: $firstName, lastName: $lastName, email: $email) {
        firstName
        lastName
        email
    }
}
`;
export const ADD_ORDER = gql`
  mutation addOrder($uploads: [ID]!) {
  addOrder(uploads: $uploads) {
    uploads 
  }
}
`;
  export const DELETE_ORDER = gql`
    mutation deleteOrder($uploads: [ID]!) {
    deleteOrder(uploads: $uploads) {
        uploads
    }
}
`;
export const ADD_UPLOAD = gql`
  mutation addUpload($img: String!, $album: String!, $artist: String!, $price: Float!, $description: String!, $genre: ID!) {
    addUpload(img: $img, album: $album, artist: $artist, price: $price, description: $description, genre: $genre) {
    img
    album
    artist
    price
    description
    }
}
`;
export const UPDATE_UPLOAD = gql`
  mutation updateUpload($id: ID!, $img: String, $album: String, $artist: String, $price: Float, $description: String, $genre: ID) {
    updateUpload(ID: $id, img: $img, album: $album, artist: $artist, price: $price, description: $description, genre: $genre) {
        ID
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
    deleteUpload(ID: $id) {
        ID
    }
}
`;
export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        email
        password
    }
}
`;
export const DELETE_WISHLIST = gql`
  mutation deleteWishlist($upload: [ID]!) {
  deleteWishlist(uploads: $uploads) {
    uploads
  }
}
`;
export const ADD_TO_WISHLIST = gql`
  mutation addToWishlist($wishlist_id: ID!, $upload_id: ID!) {
    addToWishlist(wishlist_id: $wishlist_id, upload_id: $upload_id) {
        wishlist_id
        upload_id
    }
}
`;
export const DELETE_FROM_WISHLIST = gql`
    mutation deleteFromWishlist($wishlist_id: ID!, $upload_id: ID!) {
  deleteFromWishList(wishlist_id: $wishlist_id, upload_id: $upload_id) {
    wishlist_id
    upload_id
  }
}
`;