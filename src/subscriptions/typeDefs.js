import { gql } from 'apollo-server';

const typeDef = gql`
    type Subscription {
        outputAdded: String!
        testResultAdded: String!
    }
`;

export default typeDef;