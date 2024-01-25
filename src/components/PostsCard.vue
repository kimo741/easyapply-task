<template>
  <q-card class="my-card mx-md">
    <q-img :src="postImage" />
    <q-card-section>
      <div class="text-subtitle2">
        by <span class="text-grey-8"> {{ userData?.name }}</span>
      </div>
      <div class="text-subtitle2">
        phone : <span class="text-grey-8"> {{ userData?.phone }}</span>
      </div>
      <div class="text-h6">{{ props.post?.title }}</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      {{ props.post?.body }}
    </q-card-section>
  </q-card>
</template>
<script setup lang="ts">
import { api } from 'src/boot/axios';
import { Users } from 'components/models';
import { computed, onMounted, ref } from 'vue';
// props
const props = defineProps({
  post: {
    require: true,
    type: Object,
  },
});
// state
const userData = ref<Users>();
// methods
const postImage = computed<string>(() => {
  return `https://picsum.photos/600/300/?image=${props.post?.id}`;
});
//
const getUser = async () => {
  const { data } = await api.get(`/users/${props.post?.userId}`);
  return (userData.value = await data);
};
// mounted
onMounted(() => {
  getUser();
});
</script>
