<template>
  <div class="cuaca-container">
    <b-row>
      <b-col cols="12" sm="4">
        <b-row class="mb-3" align-v="center">
          <b-col v-if="frompage !== 'search-page'" cols="12" sm="3">
            <b-button size="sm" variant="transparent" @click="$emit('close-detail')">
              <img src="@/assets/back-arrow.svg" alt="Weather Icon" style="width: 15px">
            </b-button>
          </b-col>
          <b-col cols="12" sm="9" :class="frompage !== 'search-page' ? 'text-right' : ''">
            <template v-if="!loading">
              {{ data_cuaca ? data_cuaca.name : '-' }}
            </template>
            <template v-else>
              <b-spinner small variant="light" />
            </template>
          </b-col>
        </b-row>
        <!--  -->
        <b-form-group>
          <b-form-radio-group
            id="btn-radios-1"
            v-model="temp_selected"
            :options="temp_options"
            button-variant="outline-light"
            class="w-100"
            buttons
          />
        </b-form-group>
        <!--  -->
        <template v-if="!loading">
          <b-row>
            <b-col cols="12" class="text-center">
              <img :src="cuaca_icon" alt="Weather Icon" style="width: 150px">
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" class="text-center">
              <h3>
                {{ data_cuaca ? data_cuaca.main.temp : '-' }}&deg;
              </h3>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" class="text-center">
              <small>
                {{ data_cuaca ? data_cuaca.coord.lat : '-' }} {{ data_cuaca ? data_cuaca.coord.lon : '-' }}
              </small>
            </b-col>
          </b-row>
          <b-row class="mt-3">
            <b-col cols="12" class="text-center">
              <strong>
                {{ data_cuaca ? capitalizeFirstLetter(data_cuaca.weather[0].description) : '-' }}
              </strong>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" class="text-center">
              <small>
                {{ day }}, {{ date }} {{ month }} {{ year }}
              </small>
            </b-col>
          </b-row>
        </template>
        <template v-else>
          <div class="text-center">
            <b-spinner variant="light" style="width: 3rem; height: 3rem;" />
          </div>
        </template>
      </b-col>
      <b-col cols="12" sm="8">
        <template v-if="!loading">
          <cuaca-info :info="data_cuaca" :units="temp_selected" :uvi="uv_index" :frompage="frompage" />
        </template>
        <template v-else>
          <div class="text-center">
            <b-spinner variant="light" style="width: 3rem; height: 3rem;" />
          </div>
        </template>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CuacaInfo from '@/components/current-cuaca/detail-cuaca/info.vue'
export default {
  components: {
    CuacaInfo
  },
  props: {
    frompage: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      data_cuaca: null,
      loading: false,
      cuaca_icon: '',
      temp_selected: 'metric',
      temp_options: [
        { text: 'Celcius', value: 'metric' },
        { text: 'Fahrenheit', value: 'imperial' }
      ],
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Fryday', 'Saturday'],
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    }
  },
  computed: {
    ...mapGetters('cuaca', ['info']),
    ...mapGetters('uv-index', { uv_index: 'info' }),
    day () {
      const d = new Date()
      return this.days[d.getDay()]
    },
    date () {
      const d = new Date()
      return d.getDate()
    },
    month () {
      const d = new Date()
      return this.months[d.getMonth()]
    },
    year () {
      const d = new Date()
      return d.getFullYear()
    }
  },
  watch: {
    info: {
      deep: true,
      handler () {
        this.parsingCuaca()
      }
    },
    temp_selected: {
      deep: true,
      async handler (newval) {
        this.loading = true
        const kota = this.info[0].name
        const latitude = this.info[0].coord.lat
        const longitude = this.info[0].coord.lon
        try {
          await this.$store.dispatch('cuaca/getDetailCuaca', {
            q: kota,
            lat: latitude,
            lon: longitude,
            units: newval
          })
        } catch (err) {
        }

        try {
          await this.$store.dispatch('uv-index/getUvIndex', {
            lat: latitude,
            lon: longitude
          })
        } catch (err) {}

        this.parsingCuaca()
        this.loading = false
      }
    }
  },
  mounted () {
    this.parsingCuaca()
  },
  methods: {
    capitalizeFirstLetter (word) {
      return word.charAt(0).toUpperCase() + word.slice(1)
    },
    parsingCuaca () {
      if (this.info.length > 0) {
        this.data_cuaca = this.info[0]
        this.cuaca_icon = `http://openweathermap.org/img/w/${this.info[0].weather[0].icon}.png`
      }
    }
  }
}
</script>

<style scoped>
.cuaca-container {
  background-image: linear-gradient(to right, #2193b0, #6dd5ed);
  border-radius: 10px;
  color: white;
  padding: 30px 15px;
}

.main-cuaca {
  font-size: 2rem;
  font-weight: bold;
}

.home-icon {
  width: 15px;
}
</style>
