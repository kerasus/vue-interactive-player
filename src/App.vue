<template>
  <div id="app">
    <div>
      <interactive-player
          ref="interactivePlayer"
          :sources="sources"
          :poster="poster"
          @ready="onPlayerReady"
          @ended="onPlayerEnded"
          @timeupdate="onPlayerTimeUpdate"
      />
    </div>
    <div style="text-align: center; padding: 50px">
      <button @click="changeSources(sampleSources1, samplePoster1)">
        source 1
      </button>
      <button @click="changeSources(sampleSources2, samplePoster2)">
        source 2
      </button>
      <button @click="changeSources(sampleSources3, samplePoster3)">
        source 3
      </button>
    </div>
    <div style="text-align: center; padding: 50px">
      <button @click="goToTime(20)">
        go to time 20
      </button>
      <button @click="goToTime(100)">
        go to time 100
      </button>
      <button @click="goToTime(200)">
        go to time 200
      </button>
    </div>
  </div>
</template>

<script>
import InteractivePlayer from './components/InteractivePlayer.vue'

export default {
  name: 'App',
  components: { InteractivePlayer },
  data() {
    return {
      samplePoster1: 'https://nodes.alaatv.com/media/thumbnails/969/969007kbnt.jpg',
      sampleSources1: [
        {
          src: 'https://nodes.alaatv.com/media/969/HD_720p/969007kbnt.mp4',
          type: 'video/mp4',
          res: '720p',
          label: 'کیفیت عالی',
        },
        {
          src: 'https://nodes.alaatv.com/media/969/hq/969007kbnt.mp4',
          type: 'video/mp4',
          res: '480p',
          label: 'کیفیت بالا',
        },
        {
          src: 'https://nodes.alaatv.com/media/969/240p/969007kbnt.mp4',
          type: 'video/mp4',
          res: '240p',
          label: 'کیفیت متوسط',
          selected: true
        },
      ],
      samplePoster2: 'https://nodes.alaatv.com/media/thumbnails/769/769001zone.jpg',
      sampleSources2: [
        {
          src: 'https://nodes.alaatv.com/media/769/HD_720p/769001zone.mp4',
          type: 'video/mp4',
          res: '720p',
          label: 'کیفیت عالی',
        },
        {
          src: 'https://nodes.alaatv.com/media/769/hq/769001zone.mp4',
          type: 'video/mp4',
          res: '480p',
          label: 'کیفیت بالا',
        },
        {
          src: 'https://nodes.alaatv.com/media/769/240p/769001zone.mp4',
          type: 'video/mp4',
          res: '240p',
          label: 'کیفیت متوسط',
          selected: true
        },
      ],
      samplePoster3: 'https://nodes.alaatv.com/media/thumbnails/1374/1374000asdf.jpg',
      sampleSources3: [
        {
          src: 'https://nodes.alaatv.com/media/1374/HD_720p/1374000asdf.mp4',
          type: 'video/mp4',
          res: '720p',
          label: 'کیفیت عالی',
        },
        {
          src: 'https://nodes.alaatv.com/media/1374/hq/1374000asdf.mp4',
          type: 'video/mp4',
          res: '480p',
          label: 'کیفیت بالا',
        },
        {
          src: 'https://nodes.alaatv.com/media/1374/240p/1374000asdf.mp4',
          type: 'video/mp4',
          res: '240p',
          label: 'کیفیت متوسط',
          selected: true
        },
      ],
      sources: [],
      poster: ''
    }
  },
  created() {
    this.changeSources(this.sampleSources3, this.samplePoster3)
  },
  methods: {
    onPlayerReady() {
      console.log('onPlayerReady')
    },
    onPlayerEnded() {
      console.log('onPlayerEnded')
    },
    onPlayerTimeUpdate(data) {
      console.log('onPlayerTimeUpdate', data)
    },
    goToTime(time) {
      this.$refs.interactivePlayer.goToTime(time)
      this.play()
      this.focus()
    },
    play() {
      this.$refs.interactivePlayer.play()
    },
    focus() {
      this.$refs.interactivePlayer.focus()
    },
    changeSources (sources, poster) {
      this.sources = sources
      this.poster = poster
    }
  },
}
</script>

