// file: src/queries.ts

import { gql } from '@apollo/client';

export const GET_BOOKS = gql`
  query GetBooks {
    getBooks {
      _id
      title
      author
      publishedYear
    }
  }
`;
