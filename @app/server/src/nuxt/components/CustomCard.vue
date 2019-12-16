<template>
  <card class="card">
    <img
      :src="
        'https://robohash.org/' + person.first_name + '_' + person.last_name
      "
    />
    <template class="ant-card-actions" slot="actions">
      <icon type="like" />
      <icon type="edit" />
      <icon type="ellipsis" />
    </template>
    <!-- <Button>I like it!</Button> -->
  </card>
</template>

<script lang="ts">
import { Button, Card, Icon } from "ant-design-vue";
import { Person } from "~/types";
import { createComponent } from "@vue/composition-api";
import { prop, createDefault } from "~/../utils/propHelpers";

export default createComponent({
  name: "CustomCard",
  components: {
    Button,
    Card,
    Icon,
  },
  // props: ({ person: Object } as any) as Props,
  props: {
    person: prop<Person>(Object, { required: true }),
  },
  setup(props) {
    // let person = safeCast<Person>(props.person, defaultPerson());
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
