import { gql } from 'apollo-server';

const typeDefs = gql`
    type Language {
        name: String!
        label: String!
    }
    
    type Query {
        supportedLanguages: [Language]
    }
`;

export default typeDefs;