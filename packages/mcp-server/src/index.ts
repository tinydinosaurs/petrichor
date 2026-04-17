import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

const server = new McpServer({
  name: 'petrichor',
  version: '0.0.1',
});

// Tool registration happens in ./tools/
// Schema reading happens in ./schema-reader.ts

const transport = new StdioServerTransport();
await server.connect(transport);
