const fastify = require("fastify")({ logger: true });
const routes = require("./routes/routes");

const PORT = process.env.PORT ?? 3000;

fastify.register(routes, { prefix: "index" });

fastify.register(require("./routes/routes"));

fastify.get("/", async (request, reply) => {
  return { message: "Hello world" };
});

const startServer = async () => {
  try {
    await fastify.listen(PORT);
    console.log(`server listening on port ${fastify.server.address().port}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

startServer();
