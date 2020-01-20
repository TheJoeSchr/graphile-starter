<template lang="pug">
  v-badge(:value='shouldWarn' :color='warning' dot)
    slot
</template>

<script lang="ts">
import { computed, createComponent } from "@vue/composition-api";
import { getThemeColor } from "../../utils/themeHelpers";

export default createComponent({
  name: "Warn",
  props: { okay: Boolean },

  setup(props, ctx) {
    const warning = getThemeColor("warning", ctx);
    const shouldWarn = computed(() => (props.okay ? false : true));
    return { shouldWarn, warning };
  },
});
</script>
