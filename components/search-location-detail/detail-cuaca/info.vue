<template>
  <b-row>
    <b-col cols="12" :md="frompage === 'search-page' ? '6' : '3'" class="mb-3">
      <b-card>
        <b-row no-gutters align-v="center">
          <b-col md="3">
            <b-card-img src="@/assets/temp.svg" alt="Image" class="card-img" />
          </b-col>
          <b-col md="9">
            <b-card-text>
              <div class="card-text">
                {{ info ? info.main.temp : '-' }}&deg;
              </div>
              <div>
                <small class="text-muted">
                  {{ units === 'metric' ? 'Celcius' : 'Fahrenheit' }}
                </small>
              </div>
            </b-card-text>
          </b-col>
        </b-row>
      </b-card>
    </b-col>
    <b-col cols="12" :md="frompage === 'search-page' ? '6' : '3'" class="mb-3">
      <b-card>
        <b-row no-gutters align-v="center">
          <b-col md="3">
            <b-card-img src="@/assets/wind.svg" alt="Image" class="card-img" />
          </b-col>
          <b-col md="9">
            <b-card-text>
              <div class="card-text">
                {{ info ? info.wind.speed : '-' }} m/s
              </div>
              <div>
                <small class="text-muted">
                  Pressure
                </small>
              </div>
            </b-card-text>
          </b-col>
        </b-row>
      </b-card>
    </b-col>
    <b-col cols="12" :md="frompage === 'search-page' ? '6' : '3'" class="mb-3">
      <b-card>
        <b-row no-gutters align-v="center">
          <b-col md="3">
            <b-card-img src="@/assets/sun.svg" alt="Image" class="card-img" />
          </b-col>
          <b-col md="9">
            <b-card-text>
              <div class="card-text">
                {{ uvi ? uvi.value : '-' }}
              </div>
              <div>
                <small class="text-muted">
                  UV Index
                </small>
              </div>
            </b-card-text>
          </b-col>
        </b-row>
      </b-card>
    </b-col>
    <b-col cols="12" :md="frompage === 'search-page' ? '6' : '3'" class="mb-3">
      <b-card>
        <b-row no-gutters align-v="center">
          <b-col md="3">
            <b-card-img src="@/assets/rain.svg" alt="Image" class="card-img" />
          </b-col>
          <b-col md="9">
            <b-card-text>
              <div class="card-text">
                {{ info ? info.main.humidity : '-' }}%
              </div>
              <div>
                <small class="text-muted">
                  Humidity
                </small>
              </div>
            </b-card-text>
          </b-col>
        </b-row>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: null
    },
    units: {
      type: String,
      default: 'metric'
    },
    uvi: {
      type: Object,
      default: null
    },
    frompage: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.card-img {
  filter: invert(49%) sepia(56%) saturate(604%) hue-rotate(145deg) brightness(89%) contrast(90%);
  width: 15px
}

.card-text {
  color: #203A43;
}
</style>
