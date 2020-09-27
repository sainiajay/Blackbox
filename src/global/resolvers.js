const languages = [
    {
      name: 'java',
      label: 'Java'
    },
    {
      name: 'javascript',
      label: 'Javascript'
    },  
    {
      name: 'golang',
      label: 'Go'
    },
    {
      name: 'python',
      label: 'Python'
    }
];

const resolvers = {
    Query: {
      supportedLanguages: () => languages,
    }
};

export default resolvers;