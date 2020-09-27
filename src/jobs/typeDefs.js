import { gql } from 'apollo-server';

const typeDef = gql`
    input ExecJobInput {
        sourceCode: String!
        languageId: String!
        memoryLimit: Int
        stackLimit: Int
        stdin: String
    }

    input TestJobInput {
        sourceCode: String!
        languageId: String!
        testSuiteId: Int!
        memoryLimit: Int
        stackLimit: Int
    }

    type TestResult {
        status: String!
        processOutput: ProcessOutput!
    }

    type ProcessOutput {
        stderr: String
        stdout: String
        exitCode: Int!
    }

    type Mutation {
        exec(input: ExecJobInput!): String!
        test(input: TestJobInput!): String!
    }
`;

export default typeDef;


