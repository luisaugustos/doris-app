<template>
  <v-container fluid>
    <v-layout row wrap>
      <div class="text-center">
        <v-dialog v-model="showVerifyDialog" width="500" persistent>
          <v-card>
            <v-card-title
              class="headline grey lighten-2 black--text dlgVerifyAccount"
              primary-title
            >
              <v-icon class="orange--text">mdi-information</v-icon>
              &nbsp;{{ $t('home.VERIFY_YOUR_ACCOUNT') }}
            </v-card-title>
            <v-card-text class="mt-4">
              {{ $t('home.VERIFY_YOUR_ACCOUNT_DESCRIPTION') }}
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                text
                @click="showVerifyDialog = false"
                class="btnClose"
                >{{ $t('home.CLOSE') }}</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <v-layout row wrap>
        <v-col cols="8">
          <div style="height: 350px">
            <l-map
              style="height: 75vh; width: 100%"
              :zoom="map.zoom"
              :center="map.center"
              @update:zoom="zoomUpdated"
              @update:center="centerUpdated"
              @update:bounds="boundsUpdated"
            >
              <l-tile-layer
                :url="map.url"
                :attribution="map.attribution"
              ></l-tile-layer>
            </l-map>
          </div>
        </v-col>
        <v-col cols="4">
          <div class="info" style="height: 20vh">
            <span>Center: {{ map.center }}</span>
            <br />
            <span>Zoom: {{ map.zoom }}</span>
            <br />
            <span>Bounds: {{ map.bounds }}</span>
          </div>
        </v-col>
      </v-layout>
    </v-layout>

    <!-- <ProjectDescription /> -->
  </v-container>
</template>

<script>
import { LMap, LTileLayer } from 'vue2-leaflet'

export default {
  components: {
    LMap,
    LTileLayer
  },
  data() {
    return {
      name: 'LUIS', // this.$store.state.auth.user.name,
      showVerifyDialog: false, // !this.$store.state.verify.emailVerified
      map: {
        zoom: 17,
        center: [40.960871, -5.669412],
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        bounds: null
      }
    }
  },
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('home.TITLE')} - %s`
    }
  },
  methods: {
    zoomUpdated(zoom) {
      this.map.zoom = zoom
    },
    centerUpdated(center) {
      this.map.center = center
    },
    boundsUpdated(bounds) {
      this.map.bounds = bounds
    }
  }
}
</script>
