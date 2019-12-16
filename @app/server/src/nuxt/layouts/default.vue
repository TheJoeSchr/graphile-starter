<template>
  <Layout>
    <Header>
      <Row type="flex" justify="space-between">
        <Col span="6">
          <NuxtLink to="/">Home</NuxtLink>
        </Col>
        <Col>
          <div v-if="loading">Loading...</div>
          <ul v-else-if="result.currentUser">
            <li>{{ currentUser.id }} {{ currentUser.username }}</li>
          </ul>
          <h3>{{ title }} - {{ projectName }}</h3>
        </Col>
        <Col span="6" style="textAlign: right">
          <DropdownButton v-if="isLoggedIn">
            User
            <Menu slot="overlay">
              <MenuItem>
                <NuxtLink to="/settings">
                  <Warn :okay="false">Settings</Warn>
                </NuxtLink>
              </MenuItem>
              <MenuItem>
                <a onClick="{handleLogout}">Logout</a>
              </MenuItem>
            </Menu>
          </DropdownButton>
          <NLink v-if="!isLoggedIn" to="/login">
            <a class="header-login-button">Sign in</a>
          </NLink>
        </Col>
      </Row>
    </Header>
    <Content>
      <Nuxt />
    </Content>
    <Footer style="display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'">
      <div>
        <div>
          Copyright &copy; {{ new Date().getFullYear() }}
          {{ companyName }}. All rights reserved.
          <span
            v-if="T_AND_C_URL"
          >
            <a :href="T_AND_C_URL">Terms and conditions</a>
          </span>
        </div>
        <div>
          Powered by
          <a
            style="color: '#fff', textDecoration: 'underline'"
            href="https://graphile.org/postgraphile"
          >PostGraphile</a>
        </div>
      </div>
    </Footer>
  </Layout>
</template>

<script lang="ts">
import { Layout, Avatar, Row, Col, Dropdown, Icon, Menu } from "ant-design-vue";
import {
  SetupContext,
  computed,
  createComponent,
  reactive,
  // watch,
  // provide,
  toRefs,
} from "@vue/composition-api";
import {
  useQuery,
  useResult /* , ApolloClients  */,
} from "@vue/apollo-composable";
import gql from "graphql-tag";
//! importing is not working, because of `module: "commonjs"` in @app/config
import { projectName, companyName } from "@app/config"; // TODO: figure out how to properly import without throwing uncaught reference error about "export"
import Warn from "~/components/Warn.vue";

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
    Avatar,
    Col,
    Dropdown,
    DropdownButton: Dropdown.Button,
    Header: Layout.Header,
    Icon,
    Layout,
    Menu,
    MenuItem: Menu.Item,
    Row,
    SubMenu: Menu.SubMenu,
    Warn,
  },
  setup(_props, _context: SetupContext) {
    const { result } = useQuery(SharedLayoutQuery);
    const state = reactive({
      title: "No title",
      projectName: projectName,
      companyName: companyName,
      isLoggedIn: computed(() => false),
      T_AND_C_URL: process.env.T_AND_C_URL,
    });
    // const currentUser = useResult(result, null, data => data.currentUser);

    return { result };
  },
});
</script>
<style lang="less" scoped>
.ant-layout-header {
  background: #fff;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 2px 8px #f0f1f2;
  z-index: 10;
  max-width: 100%;
}
img {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}
</style>
