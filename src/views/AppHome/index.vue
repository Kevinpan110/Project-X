<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <HomeRecommend></HomeRecommend>
    <HomeRank></HomeRank>
    <HomeLike></HomeLike>
    <HomeFloor v-for="floorList in floorList" :key="floorList.id" :floorList="floorList"></HomeFloor>
    <HomeBrand></HomeBrand>
  </div>
</template>

<script>
import ListContainer from "./ListContainer";
import HomeRecommend from "./HomeRecommend";
import HomeRank from "./HomeRank";
import HomeLike from "./HomeLike";
import HomeFloor from "./HomeFloor";
import HomeBrand from "./HomeBrand";
import { mapState } from "vuex";
export default {
  name: "AppHome",
  components: {
    ListContainer,
    HomeRecommend,
    HomeRank,
    HomeLike,
    HomeFloor,
    HomeBrand,
  },
  computed: {
    ...mapState({
      floorList: (state) => state.Home.floorList,
    }),
  },
  mounted() {
    this.$store.dispatch("reqGetFloor");
  },
};
</script>

<style scoped></style>
