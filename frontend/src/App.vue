<template>
  <div class="min-h-screen bg-gray-900 text-white py-10 px-4">
    <div class="container mx-auto">
      <h1 class="text-4xl font-bold mb-6 text-center">🎓 Student Task & Notes Hub</h1>
      <NoteList />
    </div>
  </div>
</template>

<script>
import NoteList from './components/NoteList.vue';

export default {
  name: 'App',
  components: {
    NoteList,
  },
};
</script>

<style>
/* Optional global styles */
</style>
