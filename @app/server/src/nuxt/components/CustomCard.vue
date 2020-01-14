<template lang="pug">
  v-card.card
    v-img(:src='\'https://robohash.org/\' + person.first_name + \'_\' + person.last_name')
    v-card-actions
      v-icon mdi-thumb-up
      v-icon mdi-pencil
      v-icon mdi-dots-horizontal
</template>

<script lang="ts">
import { Person } from "~/types";
import { createComponent } from "@vue/composition-api";
import { prop, createDefault } from "~/../utils/propHelpers";

export default createComponent({
  name: "CustomCard",
  props: {
    person: prop<Person>(Object, { required: true }),
  },
  setup(props) {
    // pseudo: let person = safeCast<Person>(props.person, defaultPerson());
    const defaultPerson = createDefault<Person>({ id: 1 });
    let proper = props.person ? props.person : defaultPerson;
    return { proper };
  },
});
</script>

<style scoped>
.card {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
</style>
