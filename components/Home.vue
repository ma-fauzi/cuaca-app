<template>
  <div>
    <template v-if="loading">
      <splash :message="splash_message" />
    </template>
    <template v-else>
      <b-container>
        <div>
          <b-navbar variant="white">
            <b-navbar-brand href="#">
              <b-button v-b-toggle.sidebar-1 variant="tranparent" class="btn-nav">
                <div class="icon-bar" />
                <div class="icon-bar" />
                <div class="icon-bar" />
              </b-button>
            </b-navbar-brand>
          </b-navbar>
          <b-sidebar id="sidebar-1" shadow>
            <div class="px-3">
              <b-row>
                <b-col cols="12">
                  <small class="side-color">
                    Current Location
                  </small>
                </b-col>
              </b-row>
              <b-row class="mt-2">
                <b-col cols="12">
                  <img src="@/assets/maps-black.svg" alt="" class="side-icon"> <strong class="side-color">{{ list[0] ? list[0].name : '-' }}</strong>
                </b-col>
              </b-row>
              <b-row class="mt-5">
                <b-col cols="12">
                  <b-button
                    variant="transparent"
                    class="w-100 side-btn"
                    to="/search-location"
                  >
                    Add Location
                  </b-button>
                </b-col>
              </b-row>
            </div>
          </b-sidebar>
        </div>
        <current-cuaca />
      </b-container>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Splash from '@/components/Splash.vue'
import CurrentCuaca from '@/components/CurrentCuaca.vue'
export default {
  components: {
    Splash,
    CurrentCuaca
  },
  data () {
    return {
      loading: true,
      splash_message: ''
    }
  },
  computed: {
    ...mapGetters('cuaca', ['list'])
  },
  mounted () {
    this.getPosition()
  },
  methods: {
    getPosition () {
      this.splash_message = 'Don`t worry about the weather we all here'
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.fetch, this.positionError)
      } else {
        this.splash_message = 'Geolocation is not supported by this device'
      }
    },
    async fetch (position) {
      this.loading = true
      const dtLocation = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
        units: 'metric'
      }
      try {
        await this.$store.dispatch('cuaca/getCuaca', dtLocation)
      } catch (err) {}

      try {
        await this.$store.dispatch('uv-index/getUvIndex', dtLocation)
      } catch (err) {}

      this.loading = false
    },
    positionError () {
      this.loading = true
      this.splash_message = 'Geolocation permission is not enabled. Please enable to use this feature. Go to Setting and reload this page.'
    }
  }
}
</script>

<style scoped>
  .btn-nav {
    border: 1px solid #2c2c2c;
    border-radius: 5px;
  }
  .icon-bar {
    width: 30px;
    height: 2px;
    background-color: #2c2c2c;
    border-radius: 5px;
    margin: 4px 0;
  }

  .side-color {
    color: #2c3e50
  }

  .side-icon {
    filter: invert(18%) sepia(5%) saturate(4510%) hue-rotate(170deg) brightness(97%) contrast(83%);
  }

  .side-btn {
    background-color: #2193b0;
    color: white;
  }
</style>
