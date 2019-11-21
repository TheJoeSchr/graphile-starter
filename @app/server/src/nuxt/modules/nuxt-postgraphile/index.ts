import consola from "consola";
import chalk from "chalk";
import { makeApp } from "../../../app";
import { Module } from "@nuxt/types";

const nuxtPostgraphile: Module = async function() {
  // Use this, this.options, this.nuxt
  // Use moduleOptions
  const app = await makeApp();

  const logger = consola.withScope("postgraphile");

  interface options {
    https: string;
    host: string;
    port: string;
  }

  const pgRoute = "/api";

  // Log server infos
  this.nuxt.hook("listen", (_server: string, serverOptions: options) => {
    const { https, host, port } = serverOptions;
    const serverUrl = `http${https ? "s" : ""}://${host}:${port}${pgRoute}`;

    const badgeMessages = this.options!.cli!.badgeMessages;
    const graphQLlog = `${chalk.cyan("GraphQL")}: ${serverUrl}/graphql`;
    logger.info(graphQLlog);
    badgeMessages.push(graphQLlog);
    const config = this.options.postgraphile || {
      options: { graphiql: false },
    };
    if (config.options.graphiql) {
      const graphiQLlog = `${chalk.magenta("GraphiQL")}: ${serverUrl}/graphiql`;
      badgeMessages.push(graphiQLlog);
      logger.info(graphiQLlog);
    }
  });

  // Add server middleware
  // TODO: Use Nuxt workers + watch postgraphile files related to restart own worker
  logger.info(`Connecting PostGraphile `);
  this.addServerMiddleware({
    path: pgRoute,
    handler: app,
  });
};

export default nuxtPostgraphile;
