const Hapi = require("@hapi/hapi");
const Vision = require("@hapi/vision");
const Inert = require("@hapi/inert");

const PORT = process.env.PORT ?? 3000;
const HOSTNAME = process.env.HOSTNAME ?? "localhost";

const path = require("path");
const { handler } = require("@hapi/vision/lib/schemas");

const initialize = async () => {
  const server = Hapi.server({
    port: PORT,
    host: HOSTNAME,
    routes: {
      files: {
        relativeTo: path.join(__dirname, "public"),
      },
    },
  });

  await server.register(Vision);
  await server.register(Inert);

  server.views({
    engines: { ejs: require("ejs") },
    relativeTo: __dirname,
    path: "views",
  });

  server.route({
    method: "GET",
    path: "/{param*}",
    handler: {
      directory: {
        path: ".",
        redirectToSlash: true,
      },
    },
  });

  server.route({
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return h.view("index", { title: "ejs and hapi!" });
    },
  });

  await server.start();
  console.log("Server listening on", server.info.uri);
};

initialize();
