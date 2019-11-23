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
          <DropdownButton>
            User
            <Menu slot="overlay">
              <MenuItem>
                <NuxtLink to="/settings">
                  <Warn :okay="false">
                    Settings
                  </Warn>
                </NuxtLink>
              </MenuItem>
              <MenuItem>
                <a onClick="{handleLogout}">Logout</a>
              </MenuItem>
            </Menu>
          </DropdownButton>
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
import Warn from "~/components/Warn.vue";

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
