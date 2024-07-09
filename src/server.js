// Load environment variables from .env file
require('dotenv').config();

// Import Hapi framework
const Hapi = require('@hapi/hapi');

// Import plugins for albums and songs endpoints
const albums = require('./api/albums');
const songs = require('./api/songs');

// Import PostgreSQL services for albums and songs
const AlbumsService = require('./services/postgres/AlbumsService');
const SongsService = require('./services/postgres/SongsService');

// Import validators for albums and songs payloads
const { AlbumsValidator, SongsValidator } = require('./validator');
const ClientError = require('./exceptions/ClientError'); // Import ClientError class

// Function to initialize the Hapi server
const init = async () => {
  // Create instances of AlbumsService and SongsService
  const albumsService = new AlbumsService();
  const songsService = new SongsService();

  // Create a new Hapi server instance
  const server = Hapi.server({
    port: process.env.PORT || 5000, // Set server port from environment variable or default to 5000
    host: process.env.HOST || 'localhost', // Set server host from environment variable or default to 'localhost'
    routes: {
      cors: {
        origin: ['*'], // Enable CORS for all origins
      },
    },
  });

  // Register plugins for albums and songs endpoints with options
  await server.register([
    {
      plugin: albums,
      options: {
        service: albumsService, // Pass AlbumsService instance to albums plugin
        validator: AlbumsValidator, // Pass AlbumsValidator to handle payload validation
      },
    },
    {
      plugin: songs,
      options: {
        service: songsService, // Pass SongsService instance to songs plugin
        validator: SongsValidator, // Pass SongsValidator to handle payload validation
      },
    },
  ]);

  // Intercept response to handle errors before sending to client
  server.ext('onPreResponse', (request, h) => {
    // Get the response context from the request
    const { response } = request;
    if (response instanceof Error) {
      // Handle client error internally
      if (response instanceof ClientError) {
        const newResponse = h.response({
          status: 'fail',
          message: response.message,
        });
        newResponse.code(response.statusCode);
        return newResponse;
      }
      // Preserve client error handling by Hapi natively, such as 404, etc.
      if (!response.isServer) {
        return h.continue;
      }
      // Handle server error as needed
      const newResponse = h.response({
        status: 'error',
        message: 'There was a failure on our servers',
      });
      newResponse.code(500);
      return newResponse;
    }
    // If not an error, proceed with the previous response (without intervention)
    return h.continue;
  });

  // Start the server
  await server.start();
  console.log(`Server running at: ${server.info.uri}`); // Log server URI on successful start
};

// Call the init function to start the server
init();
