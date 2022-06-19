<template>
  <div
      class="player"
      :class="{'fullscreen-player': fullscreen, 'none-fullscreen-player': !fullscreen}"
  >
    <video ref="videoPlayer" class="video-js vjs-default-skin" controls preload="none">
      <p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p>
    </video>
    <div class="over-player-wrapper" :class="{'show': overPlayer, 'hide': !overPlayer}">
      <slot name="overPlayer" />
    </div>
  </div>
</template>

<script>
import videojs from 'video.js'
import fa from 'video.js/dist/lang/fa.json'
import 'video.js/dist/video-js.css'
import 'videojs-hotkeys'
import { PlayerSourceList } from '../models/PlayerSource'

require('@silvermine/videojs-quality-selector')(videojs)
require('@silvermine/videojs-quality-selector/dist/css/quality-selector.css')

export default {
  name: 'Player',

  data() {
    return {
      playerHeight: '200px',
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
  computed: {
    hasSources (){
      return this.sources.list.length > 0
    },
    fullscreen() {
      return this.isFullscreen()
    },
  },
  props: {
    sources: {
      type: PlayerSourceList,
      default() {
        return new PlayerSourceList()
      },
    },
    overPlayer: {
      type: Boolean,
      default: false,
    },
    poster: {
      type: String,
      default: '',
    },
  },

  watch: {
    sources() {
      if (this.playerInstance === null) {
        this.initPlayer()
      }
      this.playerInstance.src(this.sources.list)
    },
    poster() {
      if (this.playerInstance === null) {
        this.initPlayer()
      }
      this.playerInstance.poster(this.poster)
    },
  },

  mounted() {
    this.initPlayer()
  },

  methods: {
    updatePlayerHeight () {
      const playerWidth = this.$refs.videoPlayerWrapper.clientWidth
      this.playerHeight = (playerWidth * 9) / 16 + 'px'
    },
    goToTime(time) {
      this.playerInstance.currentTime(time)
    },
    dispose() {
      if (this.playerInstance) {
        this.playerInstance.dispose()
      }
    },
    play() {
      this.playerInstance.play()
    },
    focus() {
      this.playerInstance.focus()
    },
    pause() {
      this.playerInstance.pause()
    },

    isFullscreen() {
      return this.playerInstance ? this.playerInstance.isFullscreen() : false
    },

    initPlayer() {
      this.updatePlayerHeight()
      if (!this.hasSources) {
        return
      }
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

      this.playerInstance.src(this.sources.list)
      this.playerInstance.poster(this.poster)
    },
  },
}
</script>

<style lang="scss" scoped>
.player {
  &.none-fullscreen-player {
    position: relative;

  }

  &.fullscreen-player {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    .video-js {
      display: contents

    }
  }

  .video-js {
    width: 100%;
  }
  .over-player-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    &.show {
      display: block;
    }
    &.hide {
      display: none;
    }
  }
}
</style>
