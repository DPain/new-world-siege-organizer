<template>
  <div id="app">
    <div id="container">
      <div id="nav">
        <router-link to="/">Home</router-link>
        |
        <router-link to="/about">About</router-link>
      </div>
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
@import '@/style/variables.scss';

body {
  height: 100vh;
  background-color: $dark;
  overflow-y: scroll;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $light;
  background-color: $dark;
  min-height: 100%;
  height: auto;
  padding-bottom: 50px;
}

#nav {
  padding: 30px;
  text-align: center;

  a {
    font-weight: bold;
    color: map-get($theme_map, 'primary-dark');
    &.router-link-exact-active {
      color: map-get($theme_map, 'primary');
    }
  }
}

/* responsive, form small screens */
@include media-breakpoint-down(sm) {
  #container {
    margin-left: auto;
    margin-right: auto;
    width: 90%;
  }
}

@include media-breakpoint-between(sm, md) {
  #container {
    margin-left: auto;
    margin-right: auto;
    width: 80%;
  }
}

@include media-breakpoint-between(md, lg) {
  #container {
    margin-left: auto;
    margin-right: auto;
    width: 75%;
  }
}

@include media-breakpoint-between(lg, xl) {
  #container {
    margin-left: auto;
    margin-right: auto;
    width: 60%;
  }
}

@include media-breakpoint-up(xl) {
  #container {
    margin-left: auto;
    margin-right: auto;
    width: 50%;
  }
}
</style>
