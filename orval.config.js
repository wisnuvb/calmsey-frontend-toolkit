module.exports = {
  api: {
    input: {
      // TODO: Replace with your OpenAPI/Swagger spec URL or path
      target: './openapi.json', // or 'https://api.example.com/swagger.json'
    },
    output: {
      mode: 'tags-split',
      target: './src/services/api/endpoints',
      schemas: './src/services/api/model',
      client: 'react-query',
      mock: false,
      clean: true,
      prettier: true,
      override: {
        mutator: {
          path: './src/lib/axios.ts',
          name: 'customInstance',
        },
        query: {
          useQuery: true,
          useMutation: true,
          signal: true,
          shouldExportMutatorHooks: true,
          shouldExportHttpClient: true,
        },
      },
    },
    hooks: {
      afterAllFilesWrite: 'prettier --write',
    },
  },
};
