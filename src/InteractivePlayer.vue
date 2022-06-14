<template>
  <div class="InteractivePlayer">
    <div>
      <player
          ref="interactivePlayer"
          :sources="sources"
          :poster="poster"
          :over-player="overPlayer"
          @ready="onPlayerReady"
          @ended="onPlayerEnded"
          @timeupdate="onPlayerTimeUpdate"
      >
        <template #overPlayer>
          <over-player :data="overPlayData" :over-play-component="overPlayComponent"/>
        </template>
      </player>
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
    <div style="text-align: center; padding: 50px">
      <button @click="overPlayer = !overPlayer">
        toggle overPlayer
      </button>
    </div>
  </div>
</template>

<script>
import Player from './components/Player.vue'
import OverPlayer from './components/OverPlayer.vue'
import { TimePointList } from './models/TimePoint'

export default {
  name: 'InteractivePlayer',
  components: { Player, OverPlayer },
  props: {
    timePoints: {
      type: TimePointList,
      default() {
        return new TimePointList()
      },
    },
  },
  data() {
    return {
      overPlayData: null,
      overPlayComponent: '',
      overPlayer: false,
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
          selected: true,
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
          selected: true,
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
          selected: true,
        },
      ],
      sources: [],
      poster: '',
    }
  },
  created() {
    this.runTimePoints()
  },
  methods: {
    runTimePoints() {
      const firstTimePint = this.timePoints.list[0]
      this.changeSources(firstTimePint.sources, firstTimePint.poster)
    },
    do(taskType, data) {
      switch (taskType) {
        case 'QuestionOfKnowingSubject':
          this.doQuestionOfKnowingSubject(data)
          break
        case 'StabilizationTest':
          this.doStabilizationTest(data)
          break
        case 'SpecialTest':
          this.doSpecialTest(data)
          break
        case 'ShowTimePint':
          this.doSpecialTest(data)
          break
        default:
          break
      }
    },
    doQuestionOfKnowingSubject(data) {
      this.overPlayData = data
      this.overPlayComponent = 'question-of-knowing-subject'
      this.showOverPlayer()
    },
    doStabilizationTest() {
      // show dialog for QuestionOfKnowingSubject
      // new Question(data.questoin)
    },
    doSpecialTest() {
      // show dialog for QuestionOfKnowingSubject
      // new Question(data.questoin)
    },

    showOverPlayer() {
      this.overPlayer = true
    },
    hideOverPlayer() {
      this.overPlayer = true
    },
    toggleOverPlayer() {
      if (this.overPlayer) {
        this.hideOverPlayer()
      } else {
        this.showOverPlayer()
      }
    },
    onPlayerReady() {
      // eslint-disable-next-line
      console.log('onPlayerReady')
    },
    onPlayerEnded() {
      // eslint-disable-next-line
      console.log('onPlayerEnded')
    },
    onPlayerTimeUpdate(data) {
      // eslint-disable-next-line
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
    changeSources(sources, poster) {
      this.sources = sources
      this.poster = poster
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
