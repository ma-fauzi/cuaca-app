<template>
  <div class="cuaca-container">
    <b-row align-v="center">
      <b-col cols="12" sm="8">
        <div class="main-cuaca">
          {{ data_cuaca ? capitalizeFirstLetter(data_cuaca.weather[0].description) : '-' }}
        </div>
      </b-col>
      <b-col cols="12" sm="4" class="text-center">
        <img :src="cuaca_icon" alt="Weather Icon" style="width: 150px">
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col cols="12">
        <img src="@/assets/maps-black.svg" alt=""> {{ data_cuaca ? data_cuaca.name : '-' }}
      </b-col>
    </b-row>
    <b-row class="mb-5">
      <b-col cols="12" sm="3">
        <img src="@/assets/temp.svg" alt="" class="home-icon"> {{ data_cuaca ? data_cuaca.main.temp : '-' }}&deg;
      </b-col>
      <b-col cols="12" sm="3">
        <img src="@/assets/rain.svg" alt="" class="home-icon"> {{ data_cuaca ? data_cuaca.main.humidity : '-' }}%
      </b-col>
      <b-col cols="12" sm="3">
        <img src="@/assets/sun.svg" alt="" class="home-icon"> {{ uv_index ? uv_index.value : '-' }}
      </b-col>
      <b-col cols="12" sm="3">
        <img src="@/assets/wind.svg" alt="" class="home-icon"> {{ data_cuaca ? data_cuaca.wind.speed : '-' }} m/s
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" class="text-right">
        <b-button
          variant="light"
          :disabled="loaddetail"
          class="px-5"
          @click="$emit('detail-cuaca')"
        >
          More Details
          <template v-if="loaddetail">
            <b-spinner small class="ml-3" />
          </template>
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    loaddetail: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      data_cuaca: null,
      cuaca_icon: ''
    }
  },
  computed: {
    ...mapGetters('cuaca', ['list']),
    ...mapGetters('uv-index', { uv_index: 'info' })
  },
  watch: {
    list: {
      deep: true,
      handler () {
        this.parsingCuaca()
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
      if (this.list.length > 0) {
        this.data_cuaca = this.list[0]
        this.cuaca_icon = `http://openweathermap.org/img/w/${this.list[0].weather[0].icon}.png`
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
