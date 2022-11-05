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
          <v-card class="elevation-0">
            <v-card-title class="headline"> Route Definiton </v-card-title>
            <v-card-text> Salamanca - Vuelo Mavic Air </v-card-text>

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
                <l-marker
                  v-for="marker in map.markers"
                  :key="marker.id"
                  :lat-lng="marker.position"
                  :draggable="marker.draggable"
                  :icon="marker.icon"
                >
                </l-marker>
              </l-map>
            </div>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card class="elevation-0">
            <v-card-title class="headline">Detection </v-card-title>
            <v-card-text> Salamanca - Vuelo Mavic Air </v-card-text>
          </v-card>
          <v-card class="mx-auto" max-width="400">
            <v-img
              class="white--text align-end"
              height="200px"
              src="/assets/detections/1.png"
            >
              <v-card-title>Center: {{ map.center }}</v-card-title>
            </v-img>

            <v-card-subtitle class="pb-0"> Number 10 </v-card-subtitle>

            <v-card-text class="text--primary">
              <div></div>

              <div></div>
              <br />
              <span>Zoom: {{ map.zoom }}</span>
              <br />
              <span>Bounds: {{ map.bounds }}</span>
            </v-card-text>

            <v-card-actions>
              <v-btn color="cyan" text> Enviar </v-btn>

              <v-btn color="cyan" text> Relatorio </v-btn>
            </v-card-actions>
          </v-card>
          <v-card class="mx-auto mt-3" max-width="400">
            <v-img
              class="white--text align-end"
              height="200px"
              src="/assets/detections/2.png"
            >
              <v-card-title>Center: {{ map.center }}</v-card-title>
            </v-img>

            <v-card-subtitle class="pb-0"> Number 13 </v-card-subtitle>

            <v-card-text class="text--primary">
              <div></div>

              <div></div>
              <br />
              <span>Zoom: {{ map.zoom }}</span>
              <br />
              <span>Bounds: {{ map.bounds }}</span>
            </v-card-text>

            <v-card-actions>
              <v-btn color="cyan" text> Enviar </v-btn>

              <v-btn color="cyan" text> Relatorio </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-layout>
    </v-layout>

    <!-- <ProjectDescription /> -->
  </v-container>
</template>

<script>
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

const icon = L.icon({ iconUrl: '/assets/marker-icon-2x.png' })

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data() {
    return {
      name: 'LUIS', // this.$store.state.auth.user.name,
      showVerifyDialog: false, // !this.$store.state.verify.emailVerified
      map: {
        zoom: 17,
        center: [40.799947, -5.670642],
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        bounds: null,
        markers: [
          {
            id: 1,
            position: [40.800004, -5.669558],
            draggable: true,
            icon
          },
          {
            id: 2,
            position: [40.799947, -5.670642],
            draggable: true,
            icon
          },
          {
            id: 12,
            position: [40.80945401207291, -5.665911916079673],
            draggable: true,
            icon
          },
          {
            id: 13,
            position: [40.79223645699125, -5.672762964993432],
            draggable: true,
            icon
          },
          {
            id: 14,
            position: [40.799947, -5.670642],
            draggable: true,
            icon
          },
          {
            id: 15,
            position: [40.79609896174421, -5.6713369487813186],
            draggable: true,
            icon
          },
          {
            id: 16,
            position: [40.80365892071844, -5.668046115123242],
            draggable: true,
            icon
          },
          {
            id: 17,
            position: [40.80365892071844, -5.668046115123242],
            draggable: true,
            icon
          },
          {
            id: 18,
            position: [40.802107748046474, -5.668657658758306],
            draggable: true,
            icon
          }
        ]
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
