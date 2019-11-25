import { ApolloError } from "apollo-client";
import { GraphQLError } from "graphql";
import { Context } from "@nuxt/types";
export default (
  error: null | Error | ApolloError | GraphQLError,
  context: Context
) => {
  console.log(error);
  context.error({ statusCode: 304, message: "Server error" });
};
