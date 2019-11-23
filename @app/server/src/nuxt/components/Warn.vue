<template>
  <span>
    <Badge :status="warning" :dot="!okay">
      <slot></slot>
    </Badge>
  </span>
</template>

<script lang="ts">
import { Badge } from "ant-design-vue";
import { computed, createComponent } from "@vue/composition-api";

export default createComponent({
  name: "DefaultLayout",
  components: {
    Badge,
  },
  props: { okay: Boolean },
  setup(props) {
    const warning = computed(() => (props.okay ? "" : "warning"));
    return { warning };
  },
});
</script>

<style lang="less" scoped></style>
