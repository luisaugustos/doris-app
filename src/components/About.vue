<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 text-xs-center mt-5 mx-16>
        <h2 class="font-weight-bold">{{ $t('about.TITLE') }}</h2>
      </v-flex>
      <v-flex xs12 mb-2 mt-5 mx-16 text-justify>
        <p class="font-weight-light">
          {{ $t('about.DESCRIPTION') }}
        </p>
      </v-flex>
    </v-layout>

    <v-flex text-xs-center mt-5 mb-5 self-align="center">
      <img
        alt="Servicio de Asuntos Sociales"
        src="/assets/sas_logo.png"
        style="max-height: 70px; margin-right: 15px"
      />

      <img
        alt="Campus Sostenibles"
        src="/assets/campus_logo.png"
        style="max-height: 90px"
      />
    </v-flex>

    <v-flex text-xs-center mt-8 mb-3 fill-height>
      <img
        src="/assets/goals/S-WEB-Goal-09-150x150.png"
        height="150"
        class="mx-3"
      />
      <img
        src="/assets/goals/S-WEB-Goal-11-150x150.png"
        height="150"
        class="mx-3"
      />
      <img
        src="/assets/goals/S-WEB-Goal-13-150x150.png"
        height="150"
        class="mx-3"
      />
    </v-flex>
  </v-container>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('about.TITLE')} - %s`
    }
  }
}
</script>
