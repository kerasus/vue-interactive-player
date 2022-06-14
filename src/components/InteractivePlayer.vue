<template>
  <div class="InteractivePlayer">
    <video ref="videoPlayer" class="video-js vjs-default-skin" controls preload="none">
<!--      <source v-for="(source, index) in sources"-->
<!--              :key="index"-->
<!--              :src="source.src"-->
<!--              :type="source.src"-->
<!--              :res="source.res"-->
<!--              :label="source.label"-->
<!--      >-->

<!--      <source src="http://vjs.zencdn.net/v/oceans.mp4" type="video/mp4">-->
<!--      <source src="http://vjs.zencdn.net/v/oceans.webm" type="video/webm">-->
<!--      <source src="http://vjs.zencdn.net/v/oceans.ogv" type="video/ogg">-->
      <p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p>
    </video>
  </div>
</template>

<script>
import videojs from 'video.js'
import fa from 'video.js/dist/lang/fa.json'
import 'video.js/dist/video-js.css'
import 'videojs-hotkeys';

require('@silvermine/videojs-quality-selector')(videojs)
require('@silvermine/videojs-quality-selector/dist/css/quality-selector.css')

export default {
  name: 'InteractivePlayer',
  data() {
    return {
      playerInstance: null,
      playerOptions: {
        controlBar: {
          // currentTimeDisplay: true,
          TimeDivider: true,
          children: [
            'playToggle',
            'PlaybackRateMenuButton',
            'CurrentTimeDisplay',
            'progressControl',
            'TimeDivider',
            'RemainingTimeDisplay',
            'volumePanel',
            'SubtitlesButton',
            'qualitySelector',
            'fullscreenToggle',
            'PictureInPictureToggle',
          ],
          volumePanel: {
            inline: false,
            vertical: true,
          },
        },
        language: 'fa',
        languages: {
          fa,
        },
        autoplay: false,
        controls: true,
        playbackRates: [0.25, 0.5, 1, 1.5, 2, 2.5, 3, 4],
        nativeControlsForTouch: true,
        sources: [],
        poster: null,
        plugins: {
          hotkeys: {
            enableModifiersForNumbers: false,
            seekStep: 5,
            enableMute: true,
            enableVolumeScroll: true,
            enableHoverScroll: true,
            enableFullscreen: true,
          },
        },
      },
    }
  },
  props: {
    sources: {
      type: Array,
      default() {
        return []
      },
    },
    poster: {
      type: String,
      default: ''
    },
  },
  watch: {
    sources () {
      this.playerInstance.src(this.sources)
    },
    poster () {
      this.playerInstance.poster(this.poster)
    }
  },
  mounted() {
    this.initPlayer()
  },
  beforeUnmount() {
    if (this.playerInstance) {
      this.playerInstance.dispose()
    }
  },
  methods: {
    goToTime (time) {
      this.playerInstance.currentTime(time)
    },
    play () {
      this.playerInstance.play()
    },
    focus () {
      this.playerInstance.focus()
    },
    initPlayer() {
      this.playerInstance = videojs(this.$refs.videoPlayer, this.playerOptions, () => {
        this.$emit('ready')
        this.playerInstance.on('ended', () => {
          this.$emit('ended')
        })
        this.playerInstance.on('timeupdate', () => {
          this.$emit('timeupdate', {
            currentTime: this.playerInstance.currentTime(),
            duration: this.playerInstance.duration(),
          })

          // if (!that.player.paused() && !that.player.userActive()) {
          //   that.videoStatus(false)
          // } else if (!that.player.paused()) {
          //   that.videoStatus(true)
          // }

        })
      })

      this.playerInstance.src(this.sources)
      this.playerInstance.poster(this.poster)
    },
  },
}
</script>

<style scoped>
.video-js {
  width: 100%;
}
</style>
