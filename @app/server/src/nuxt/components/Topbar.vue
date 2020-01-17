<!-- Inspired from: https://github.com/vuetifyjs/theme-blog/blob/f4006eb24b214f09b17e1838e188421939fd66b8/src/components/core/Toolbar.vue -->
<template lang="pug">
v-app-bar(dense flat)
  v-container(fluid)
    v-row
      //- Logo
      v-img.mr-1(:src="require('@/assets/logo.png')" contain height="48" width="48" max-width="48" @click="$vuetify.goTo(0)")
      v-spacer
      //- Links
      v-btn.mr-1.mt-1.hidden-sm-and-down(v-for="(link, i) in links" :key="i" :to="link"  @click="onClick($event, item)" text) {{ link.title }}
      v-spacer
      //- Icons
      v-btn(icon)
        v-icon mdi-magnify
      v-btn(icon)
        v-icon mdi-heart
      //- User-Menu
      template(v-if="!isLoggedIn" )
        v-btn.mr-1.mt-1(to="/login" text) Sign in

      template(v-else)
        v-menu(bottom left)
          template(v-slot:activator="{ on }")
            v-list
              v-list-item
                v-list-item-title Menu
</template>

<script lang="ts">
import { computed, createComponent, SetupContext } from "@vue/composition-api";

export default createComponent({
  name: "Topbar",
  props: { links: Array, currentUser: Object },

  setup(props, ctx: SetupContext) {
    function onClick(e: any, item: any) {
      e.stopPropagation();
      if (item.to || !item.href) return;
      ctx.root.$vuetify.goTo(item.href);
    }

    const isLoggedIn = computed(() => (props.currentUser ? true : false));
    return { onClick, isLoggedIn, loading: true };
  },
});
</script>
