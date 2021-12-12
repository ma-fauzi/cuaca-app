<template>
  <b-container>
    <b-row class="my-3">
      <b-col cols="12">
        <b-button variant="primary" to="/">
          Back to Home
        </b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" sm="4">
        <div class="box-component">
          <b-row align-v="center">
            <b-col cols="12" :sm="loading_search ? '10' : '12'">
              <b-input v-model="input" type="text" class="w-100" placeholder="Type Location..." />
            </b-col>
            <b-col v-if="loading_search" cols="12" sm="2" class="text-center">
              <b-spinner variant="muted" small />
            </b-col>
          </b-row>
          <div class="text-center mt-5">
            <template v-if="data_cuaca === null">
              <h4 class="font-weight-bold">
                City not found!
              </h4>
            </template>
            <template v-else>
              <div class="box-component text-left">
                <strong>
                  {{ data_cuaca ? data_cuaca.name : '-' }}
                </strong>
                <div class="text-muted">
                  <small>
                    {{ data_cuaca ? `${data_cuaca.coord.lat},` : '-' }} {{ data_cuaca ? data_cuaca.coord.lon : '-' }}
                  </small>
                </div>
                <div class="mt-5">
                  <b-button variant="outline-primary" class="w-100" :disabled="detail_loading" @click="getDetailCuaca">
                    <template v-if="!detail_loading">
                      More Detail
                    </template>
                    <template v-else>
                      <b-spinner small variant="primary" />
                    </template>
                  </b-button>
                </div>
              </div>
            </template>
          </div>
        </div>
      </b-col>
      <b-col cols="12" sm="8">
        <template v-if="detail_cuaca && !detail_loading">
          <detail-cuaca :frompage="'search-page'" />
        </template>
        <template v-if="detail_loading">
          <div class="my-5 d-flex flex-column justify-content-center align-items-center">
            <b-spinner variant="primary" style="width: 3rem; height: 3rem;" />
          </div>
        </template>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import DetailCuaca from '@/components/search-location-detail/detail-cuaca.vue'
export default {
  components: {
    DetailCuaca
  },
  data () {
    return {
      search_loc: '',
      loading_search: false,
      detail_loading: false,
      delay_timer: null,
      cuaca_icon: '',
      data_cuaca: null,
      detail_cuaca: false
    }
  },
  computed: {
    ...mapGetters('cuaca', ['info']),
    ...mapGetters('uv-index', { uv_index: 'info' }),
    input: {
      get () {
        return this.search_loc
      },
      set (val) {
        if (this.delay_timer) {
          clearTimeout(this.delay_timer)
        }
        this.delay_timer = setTimeout(() => {
          this.search_loc = val
        }, 1000)
      }
    }
  },
  watch: {
    search_loc: {
      deep: true,
      async handler (newval) {
        await this.searchLoc(newval)
      }
    }
  },
  methods: {
    async searchLoc (location) {
      this.loading_search = true
      this.data_cuaca = null
      this.detail_cuaca = false
      try {
        await this.$store.dispatch('cuaca/getDetailCuaca', {
          q: location,
          units: 'metric'
        })
      } catch (err) {
        this.$store.commit('cuaca/removeInfo')
        this.loading_search = false
        console.log(err)
      }

      if (this.info.length > 0) {
        const latitude = this.info[0].coord.lat
        const longitude = this.info[0].coord.lon
        try {
          await this.$store.dispatch('uv-index/getUvIndex', {
            lat: latitude,
            lon: longitude
          })
          this.loading_search = false
        } catch (err) {
          this.loading_search = false
        }
      } else {
        this.loading_search = false
      }

      this.parsingCuaca()
    },
    async getDetailCuaca () {
      if (this.info.length > 0) {
        this.detail_loading = true
        const kota = this.info[0].name
        const latitude = this.info[0].coord.lat
        const longitude = this.info[0].coord.lon
        this.$store.commit('cuaca/removeInfoFromClick')
        try {
          await this.$store.dispatch('cuaca/getDetailCuacaByClick', {
            q: kota,
            lat: latitude,
            lon: longitude,
            units: 'metric'
          })
        } catch (err) {
          this.detail_loading = false
          console.log(err)
        }

        if (this.info.length > 0) {
          try {
            await this.$store.dispatch('uv-index/getUvIndex', {
              lat: latitude,
              lon: longitude
            })
          } catch (err) {
            this.detail_loading = false
          }
        } else {
          this.detail_loading = false
        }

        this.detail_loading = false
        this.detail_cuaca = true
      }
    },
    parsingCuaca () {
      if (this.info.length > 0) {
        this.data_cuaca = this.info[0]
        this.cuaca_icon = `http://openweathermap.org/img/w/${this.info[0].weather[0].icon}.png`
      } else {
        this.data_cuaca = null
        this.$store.commit('cuaca/removeInfo')
      }
    }
  }
}
</script>

<style scoped>
.box-component {
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.3);
}
</style>
