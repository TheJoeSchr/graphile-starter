<template>
  <div>
    <div>Manually Fetched Apollo Message "{{ state.manualMessage }}"</div>
    <div>Subscribed Apollo Message "{{ apolloState.data && apolloState.data.data }}"</div>
    <button @click="manuallyReadApolloMessage">Refetch Apollo Message from Cache</button>

    <button @click="manuallySetApolloMessage">Manually Mutate Apollo Cache With Form Input</button>

    <label>
      Local Message
      <input v-model="state.formMessage" />
      {{ state }}
    </label>
  </div>
</template>

<script>
import { reactive, onMounted } from "@vue/composition-api";
import gql from "graphql-tag";
import useQuery from "~/libs/useQuery";
const getMessageGql = gql`
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

export default {
  setup(props, context) {
    const state = reactive({
      manualMessage: "",
      formMessage: "",
    });

    function manuallySetApolloMessage() {
      context.root.$apollo.writeData({
        data: { message: state.formMessage },
      });
    }

    const { state: apolloState } = useQuery({
      query: getMessageGql,
      context,
    });

    function manuallyReadApolloMessage() {
      context.root.$apollo
        .query({
          query: getMessageGql,
        })
        .then(data => {
          state.manualMessage = data.data.currentUser;
        });
    }

    onMounted(manuallyReadApolloMessage);

    return {
      state,
      apolloState,
      manuallySetApolloMessage,
      manuallyReadApolloMessage,
    };
  },
};
</script>

<style>
button {
  display: block;
  background-color: #00c48d;
  color: white;
  height: 50px;
  border-radius: 5px;
  font-size: 20px;
  margin-top: 10px;
}
input {
  display: block;
  height: 50px;
  margin: 10px;
}
</style>
