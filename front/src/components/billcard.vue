<template>
  <md-card md-with-hover>
    <md-ripple>
      <md-card-header>
        <div class="md-title">{{ bill.title }}</div>
        <div class="md-subhead">Cap. {{ acts[bill.actId].chapter }}</div>

      </md-card-header>

      <md-card-content>
        {{ bill.comments }}
        <div class="md-subhead">
          Proposed: 4/13/1995<br>
          Last Revision: 4/13/2006<br>
          Effective Date: {{ new Date(bill.dateOfEffect.$date).toLocaleDateString() }}
        </div>

      </md-card-content>

      <md-card-actions>
        <!-- <md-button class="md-dense md-raised">VOTE <md-icon>thumb_down</md-icon></md-button> -->
        <!-- <md-button class="md-dense md-raised">VOTE <md-icon>thumb_up</md-icon></md-button> -->
      </md-card-actions>
    </md-ripple>
  </md-card>
</template>

<script>
export default{
  props: ['bill'],
  computed: {
    acts () {
      return this.$store.state.acts
    }
  }
}
</script>

<style lang="scss" scoped>
.md-card {
  margin: 6px;
  flex: 0 0 400px;
  text-align: left;
}
</style>
