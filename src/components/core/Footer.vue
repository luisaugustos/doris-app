<template>
  <v-footer height="70" class="d-block text-center">
    <v-flex>
      <img
        src="/assets/campus_logo.png"
        style="max-height: 35px; margin-right: 15px"
      />
      <img src="/assets/sas_logo.png" style="max-height: 35px" />
    </v-flex>
    <div>DORIS v{{ appVersion }}</div>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
  computed: {
    appVersion() {
      return this.$store.getters.appVersion
    }
  }
}
</script>
