<template>
  <q-page>
    <!-- ///// -->
    <!-- posts -->
    <!-- ///// -->
    <div class="cards-container">
      <posts-card
        class="cards-container__card"
        v-for="(post, i) in displayedPosts"
        :key="i"
        :post="post"
      />
    </div>
    <!-- ////////// -->
    <!-- pagination -->
    <!-- ////////// -->
    <div class="q-pa-lg row justify-center items-center">
      <div class="q-gutter-md">
        <q-pagination
          v-model="current"
          :max="totalPages"
          input
          @update:model-value="scrollToTop"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { Posts } from 'components/models';
import { api } from 'src/boot/axios';
import PostsCard from 'src/components/PostsCard.vue';
import { computed, onMounted, ref } from 'vue';
const postsPerPage = ref<number>(10);
const postsData = ref<Posts[]>([]);
const current = ref<number>(1);
// computed
// totalPosts for pagination
const totalPosts = computed<number>(() => {
  return postsData.value.length;
});
// totalPages for pagination
const totalPages = computed<number>(() => {
  return Math.ceil(totalPosts.value / postsPerPage.value);
});
// displayedPosts for pagination
const displayedPosts = computed<Posts[]>(() => {
  const startIndex = (current.value - 1) * postsPerPage.value;
  const endIndex = startIndex + postsPerPage.value;
  return postsData.value.slice(startIndex, endIndex);
});
//methods
const getPosts = async () => {
  const { data } = await api.get('/posts');
  return (postsData.value = data);
};
const scrollToTop = () => {
  window.scroll({ top: 0, left: 0, behavior: 'smooth' });
};
// mounted
onMounted(() => {
  getPosts();
});
</script>
<style lang="scss" scoped>
.cards-container {
  width: 50%;
  margin: 15px auto;
  &__card {
    margin: 30px auto;
  }
}
</style>
