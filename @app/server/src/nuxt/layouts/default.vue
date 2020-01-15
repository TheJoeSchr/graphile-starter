<template>
  <v-app>
    <v-app-bar
      short
      dense
      dark
      elevate-on-scroll
      src="https://picsum.photos/1920/1080?random"
      fade-img-on-scroll
      scroll-target="#scrolling-techniques-4"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>

      <v-spacer></v-spacer>
      <v-toolbar-title>Title</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-menu bottom left>
        <template v-slot:activator="{ on }">
          <v-btn icon color="yellow" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="(item, i) in [{ title: 'menu list' }]" :key="i">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-sheet id="scrolling-techniques-4" class="overflow-y-auto">
      <v-container>
        <Nuxt />
      </v-container>
    </v-sheet>

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
  computed,
  createComponent,
  reactive,
  // watch,
  // provide,
  toRefs,
} from "@vue/composition-api";
import { useQuery, useResult } from "@vue/apollo-composable";
import gql from "graphql-tag";
import Warn from "~/components/Warn.vue";
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
      isLoggedIn: computed(() => (currentUser ? true : false)),
      T_AND_C_URL: process.env.T_AND_C_URL,
    });
    return {
      result,
      currentUser,
      loading,
      ...toRefs(state),
    };
  },
});
</script>
<style lang="sass" scoped></style>
