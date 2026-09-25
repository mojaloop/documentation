<template>
  <div id="banner" class='can-hide' v-if="isPrPreview">
      <p>
        🔍 This is a preview of PR #{{ prNumber }}. <a :href="prUrl" target="_blank">View the PR on GitHub</a>
      </p>
  </div>
</template>

<script>
export default {
  name: 'PreviewBanner',
  computed: {
    isPrPreview() {
      return this.$site.themeConfig.isPrPreview === true;
    },
    prNumber() {
      return this.$site.themeConfig.prNumber || '';
    },
    prUrl() {
      return `https://github.com/mojaloop/documentation/pull/${this.prNumber}`;
    }
  }
}
</script>

<style type="text/css" media="screen">
  div#banner { 
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #00a3ff; 
    margin: 0;
    padding: 0.5px 6px;
    font-size: 11px;
    text-align: center;
    color: white;
    z-index: 1000;
    box-sizing: border-box;
  }
</style>

<style lang="stylus">
  #banner p a
    color: white
    text-decoration: underline;
    font-weight: bold;
</style>