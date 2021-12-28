<template>
  <div id="home">
    <b-jumbotron class="banner" header-level="5">
      <template #header>New World Siege Organizer</template>

      <template #lead>
        Lets you visually organize your raid compositions by player roles.
      </template>

      <hr class="my-4" />

      <p>Powered by Node.js, Firebase, Vue.js.</p>

      <b-button
        variant="primary-dark"
        href="https://github.com/DPain/new-world-siege-organizer"
        target="_blank"
      >
        Github
      </b-button>
    </b-jumbotron>
    <div id="news-section">
      <div id="menu" class="p-2">
        <h2>Rosters</h2>
        <b-button-group id="add">
          <b-button variant="primary-dark">Create</b-button>
          <b-button variant="danger">Delete</b-button>
        </b-button-group>
      </div>
      <News
        v-for="(el, i) in news"
        :key="i"
        :title="el.title"
        :msg="el.msg"
        class="mb-3"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import News from '@/components/News.vue';

@Component({
  components: {
    News,
  },
})
export default class Home extends Vue {
  private news: News[] = [];

  created() {
    this.loadNews();
  }

  loadNews(): void {
    for (let i = 0; i < 4; i++) {
      const entry: News = new News({
        propsData: {
          title: `title: ${i} wow`,
          msg: 'msg',
        },
      });
      this.news.push(entry);
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/style/variables.scss';

.banner {
  background-color: get_overlay('primary', '4dp') !important;
}

#news-section {
  text-align: left;
}

#add {
  margin-top: auto;
  margin-bottom: auto;
}

#menu {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
