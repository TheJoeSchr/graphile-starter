<template>
  <v-app>
    <topbar :links="links" />
    <!-- Sizes your content based upon application components -->
    <v-content>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- Content provied by nuxt-router -->
        <Nuxt />
      </v-container>
    </v-content>

    <v-footer absolute class="font-weight-medium">
      <v-col class="text-center" cols="12">
        <div>
          <div>
            Copyright &copy; {{ new Date().getFullYear() }} {{ companyName }}.
            All rights reserved.
            <span v-if="T_AND_C_URL">
              <a :href="T_AND_C_URL">Terms and conditions</a>
            </span>
          </div>
          <div>
            Powered by
            <a
              style="color: '#fff', textDecoration: 'underline'"
              href="https://graphile.org/postgraphile"
              >PostGraphile</a
            >
          </div>
        </div>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import {
  SetupContext,
  // computed,
  createComponent,
  reactive,
  // watch,
  // provide,
  toRefs,
} from "@vue/composition-api";
import { useQuery, useResult } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { Warn, Topbar } from "~/components";
import { User } from "@app/graphql";
import { safeCast } from "../../utils/propHelpers";

const SharedLayoutQuery = gql`
  query SharedLayout {
    currentUser {
      id
      ...SharedLayout_User
    }
  }

  fragment SharedLayout_User on User {
    id
    name
    username
    avatarUrl
    isAdmin
    isVerified
  }
`;

export default createComponent({
  name: "DefaultLayout",
  components: {
    Warn,
    Topbar,
  },
  setup(_props, _context: SetupContext) {
    const { result, loading } = useQuery(SharedLayoutQuery);
    // const currentUser = useResult(result, null, data => data.currentUser);
    const currentUser = safeCast<User>(
      useResult(result, null, data => data.currentUser)
    );

    const state = reactive({
      projectName: process.env.projectName,
      companyName: process.env.companyName,
      T_AND_C_URL: process.env.T_AND_C_URL,
    });
    const links = [
      {
        title: "Home",
        to: `/`,
      },
      {
        title: "About",
        to: `/about`,
      },
      {
        title: "Login",
        to: `/login`,
      },
    ];
    return {
      result,
      currentUser,
      loading,
      links,
      ...toRefs(state),
    };
  },
});
</script>
<style lang="sass" scoped></style>
