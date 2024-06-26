import { gql } from "@apollo/client";

export const GET_CHARACTERS_BY_NAME = gql`
  query GetCharactersByName($page: Int!, $name: String!) {
    characters(page: $page, filter: { name: $name }) {
      info {
        count
        pages
        next
        prev
      }
      results {
        name
        image
        status
        id
      }
    }
  }
`;

export const GET_CHARACTER_INFO_BY_ID = gql`
  query GetCharacterInfo($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      origin {
        name
        dimension
        residents {
          id
          name
          status
          species
          type
          gender
          image
          episode {
            id
            name
            air_date
            episode
          }
        }
      }
      location {
        name
        dimension
        residents {
          name
          id
        }
      }
      image
      created
      episode {
        id
        name
        air_date
        episode
        characters {
          id
          name
          status
          species
          type
          gender
          image
          episode {
            id
            name
            air_date
            episode
          }
        }
      }
    }
  }
`;
