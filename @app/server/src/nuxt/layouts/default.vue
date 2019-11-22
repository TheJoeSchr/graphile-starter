<template>
  <Layout>
    <Header>
      <Row type="flex" justify="space-between">
        <Col span="6">
          <NuxtLink to="/">Home</NuxtLink>
        </Col>
        <Col>
          <h3>{{ state.title }} - {{ state.projectName }}</h3>
        </Col>
        <Col span="6" style="textAlign: right">
          <a-dropdown-button>
            Dropdown
            <a-menu slot="overlay">
              <a-menu-item key="1"
                ><a-icon type="user" />1st menu item</a-menu-item
              >
              <a-menu-item key="2"
                ><a-icon type="user" />2nd menu item</a-menu-item
              >
              <a-menu-item key="3"><a-icon type="user" />3rd item</a-menu-item>
            </a-menu>
          </a-dropdown-button>
          <!-- <Dropdown :trigger="['click']">
            <Menu slot="overlay">
              <MenuItem>
                <NuxtLink to="/settings">
                  Settings
                  <!-- <a data-cy="layout-link-settings">
                  <Warn okay="{data.currentUser.isVerified}">Settings</Warn>
                </a>
                </NuxtLink>
              </MenuItem>
              <MenuItem>
                <a onClick="{handleLogout}">Logout</a>
              </MenuItem>
            </Menu>
            <Button>User <Icon type="down" /> </Button>
          </Dropdown> -->
        </Col>
      </Row>
    </Header>
    <Content>
      <Nuxt />
    </Content>
    <Footer
      style="display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'"
    >
      <div>
        <div>
          Copyright &copy; {{ state.companyName }}. All rights reserved.
          <span v-if="state.T_AND_C_URL">
            <a :href="state.T_AND_C_URL">Terms and conditions</a>
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
    </Footer>
  </Layout>
</template>

<script lang="ts">
import { Layout, Avatar, Row, Col, Dropdown, Icon, Menu } from "ant-design-vue";
import { projectName, companyName } from "@app/config";
import { createComponent, reactive } from "@vue/composition-api";

export default createComponent({
  name: "DefaultLayout",
  components: {
    Layout,
    Header: Layout.Header,
    Avatar,
    Row,
    Col,
    Dropdown,
    Icon,
    Menu,
    MenuItem: Menu.Item,
    SubMenu: Menu.SubMenu,
  },
  setup(_props, _ctx) {
    const state = reactive({
      title: "No title",
      projectName: projectName,
      companyName: companyName,
      T_AND_C_URL: process.env.T_AND_C_URL,
    });

    return { state };
  },
});
</script>
<style lang="less" scoped>
img {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}
</style>
