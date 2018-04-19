<template>
  <md-card md-with-hover>
    <md-ripple>
      <md-card-header>
        <div class="md-title">{{ act.title }}</div>
        <div class="md-subhead">Cap. {{ act.chapter }}</div>

      </md-card-header>

      <md-card-content>
        {{ act.description }}

      </md-card-content>

      <md-card-actions>
        <div class="md-subhead">
          Enacted: 13 April 1995<br>
          Last Revision: 13 April 2006
        </div>
      </md-card-actions>
    </md-ripple>
  </md-card>
</template>

<script>
export default{
  props: ['act']
}
</script>

<style lang="scss" scoped>
.md-card {
  margin: 6px;
  flex: 0 0 400px;
  text-align: left;
}
</style>
