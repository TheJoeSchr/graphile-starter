<template>
  <section>
    <h1 class="header">Index</h1>
    <div class="cards">
      <CustomCard v-for="person in people" :key="person.id" :person="person"></CustomCard>
    </div>
  </section>
</template>

<script lang="ts">
import {
  SetupContext,
  createComponent,
  reactive,
  toRefs,
} from "@vue/composition-api";

import CustomCard from "~/components/CustomCard.vue";

export default createComponent({
  name: "People",
  components: {
    CustomCard,
  },
  setup(_props, ctx: SetupContext) {
    if (!ctx || !ctx.parent || !ctx.parent.$store.state) return {};

    const state = reactive({
      people: ctx.parent.$store.state.people,
    });

    return { ...toRefs(state) };
  },
});
</script>

<style scoped>
.header {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.cards {
  display: flex;
  flex-wrap: wrap;
}
</style>
