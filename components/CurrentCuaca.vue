<template>
  <b-container>
    <current
      v-if="!detail_cuaca"
      :loaddetail="loading_detail"
      @detail-cuaca="getDetailCuaca"
    />
    <detail-cuaca v-else @close-detail="detail_cuaca = false" />
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import Current from '@/components/current-cuaca/current.vue'
import DetailCuaca from '@/components/current-cuaca/detail-cuaca.vue'
export default {
  components: {
    Current,
    DetailCuaca
  },
  data () {
    return {
      loading_detail: false,
      data_cuaca: null,
      cuaca_icon: '',
      detail_cuaca: false
    }
  },
  computed: {
    ...mapGetters('cuaca', ['list'])
  },
  methods: {
    async getDetailCuaca () {
      if (this.list.length > 0) {
        this.loading_detail = true
        const kota = this.list[0].name
        const latitude = this.list[0].coord.lat
        const longitude = this.list[0].coord.lon
        try {
          await this.$store.dispatch('cuaca/getDetailCuaca', {
            q: kota,
            lat: latitude,
            lon: longitude,
            units: 'metric'
          })

          this.loading_detail = false
          this.detail_cuaca = true
        } catch (err) {
          this.loading_detail = false
          console.log(err)
        }

        try {
          await this.$store.dispatch('uv-index/getUvIndex', {
            lat: latitude,
            lon: longitude
          })
        } catch (err) {}
      }
    }
  }
}
</script>
