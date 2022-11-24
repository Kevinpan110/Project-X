<template>
  <div id="app">
    <AppHeader></AppHeader>
    <router-view></router-view>
    <AppFooter v-show="$route.meta.show"></AppFooter>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'
import AppFooter from '@/components/AppFooter'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
  },
  mounted() {
     this.$store.dispatch("categoryList");
  },
}
</script>

<style>
</style>
