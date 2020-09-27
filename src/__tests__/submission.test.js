import { createTestClient } from 'apollo-server-testing';
import fs from 'fs';
import path from 'path';
import { server, channelPromise } from '../main';

const testDataRoot = path.join(__dirname, 'programs');

describe('Submissions', () => {
    const { mutate } = createTestClient(server);

    beforeAll(() => channelPromise);
    
    const mutationString = `{
        mutation SubmitCode($testInput: TestInput!) {
            test(input: $testInput)
        }
    }`;

    const singleProgramTest = (codeString, languageId) => {
        const mutationResponse = mutate({
            mutation: mutationString,
            variables: {
                testInput: {
                    sourceCode: codeString,
                    languageId: languageId
                }
            }
        });
        expect(mutationResponse).toBeTruthy();
    }

    const dirEntries = fs.readdirSync(testDataRoot, {
        withFileTypes: true,
        encoding: 'utf8'
    });
    const directories = dirEntries
        .filter(entry => entry.isDirectory())
        .map(entry => [entry.name]);
    
    test.each(directories)('%s', async (directoryName) => {
        const testDataPath = path.join(testDataRoot, directoryName);
        const dir = await fs.promises.opendir(testDataPath);
        for await (const dirent of dir) {
            if(dirent.isFile() && dirent.name.match(/\.(go|py|java)$/)) {
                const filePath = path.join(testDataPath, dirent.name);
                fs.promises.readFile(filePath, 'utf8').then(singleProgramTest)
            }
        }
    })
})