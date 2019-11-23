<template>
  <div>
    <span v-if="state.okay"> <slot></slot> </span>
    <span v-else>
      <Badge :dot="true">
        <slot></slot>
      </Badge>
    </span>
  </div>
</template>

<script lang="ts">
import { Badge } from "ant-design-vue";
import { createComponent, reactive } from "@vue/composition-api";

export default createComponent({
  name: "DefaultLayout",
  components: {
    Badge,
  },
  props: { okay: Boolean },
  setup(props) {
    const state = reactive({
      okay: props.okay,
    });

    return { state };
  },
});
</script>

<style lang="less" scoped></style>
