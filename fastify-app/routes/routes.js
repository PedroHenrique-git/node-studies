module.exports = async function routes(fastify) {
  fastify.get("/plugin", async (request, reply) => {
    return { message: "This is a plugin" };
  });
};
