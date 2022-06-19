<template>
  <div class="InteractivePlayer">
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
          <over-player :data="overPlayData" :over-play-component="overPlayComponent" @action="onAction"/>
        </template>
      </player>
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
import Player from './components/Player'
import OverPlayer from './components/OverPlayer'
import { Task } from './models/Task'
import { TimePointList, TimePoint } from './models/TimePoint'
import { PlayerSourceList } from './models/PlayerSource'
import { mixinQuestionOfKnowingSubject, mixinGoToTime, mixinGoToTimePoint } from './mixins/Mixins'

export default {
  name: 'InteractivePlayer',
  components: { Player, OverPlayer },
  mixins: [mixinQuestionOfKnowingSubject, mixinGoToTime, mixinGoToTimePoint],
  props: {
    timePoints: {
      type: TimePointList,
      default() {
        return new TimePointList()
      },
    },
  },

  watch: {
    playerCurrentTime (newValue) {
      if (this.watchingEndTime <= newValue) {
        if (!this.currentTimePoint.tasks.hasPostShow()) {
          return
        }

        const postShowTask = this.currentTimePoint.tasks.getPostShow()
        this.doTask(postShowTask)
      }
    }
  },

  data() {
    return {
      // timePointsSequence: [],
      // currentTimePoint: null,

      watchingEndTime: 0,
      playerCurrentTime: 0,
      currentTimePoint: new TimePoint(),
      currentTask: new Task(),
      localTimePoints : new TimePointList(),
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
      sources: new PlayerSourceList(),
      poster: '',
    }
  },

  created() {
    this.localTimePoints = new TimePointList(this.timePoints)
    const firstTimePoint = this.getFirstTimePont()
    this.runTimePoint(firstTimePoint)
  },

  computed: {
    // currentTimeOfPlayer() {
    //   return this.onPlayerTimeUpdate()
    // },
    // LoadCurrentTimePoint() {
    //   return this.timePointsSequence.find(
    //     (timePoint) => timePoint.start === Math.ceil(this.currentTimeOfPlayer.currentTime),
    //   )
    // },
  },

  methods: {
    pause() {
      this.$refs.interactivePlayer.pause()
    },

    onAction (data) {
      this.doTaskAction(this.currentTask, data)
    },

    getFirstTimePont() {
      return this.localTimePoints.list[0]
    },

    runTimePoint(timePoint) {
      this.currentTimePoint = timePoint
      if (timePoint.hesTasks() && timePoint.tasks.hasPreShow()) {
        const preShowTask = timePoint.tasks.getPreShow()
        this.doTask(preShowTask)
        return
      }

      this.changeSources(timePoint.sources, timePoint.poster)
    },

    doTaskAction(task, actionData) {
      switch (task.type) {
        case 'QuestionOfKnowingSubject':
          this.doActionOfQuestionOfKnowingSubject(actionData)
          break
        case 'StabilizationTest':
          this.doStabilizationTest(task.data)
          break
        case 'SpecialTest':
          this.doSpecialTest(task.data)
          break
        case 'ShowTimePint':
          this.doSpecialTest(task.data)
          break
        default:
          break
      }
    },

    doTask(task) {
      this.currentTask = task
      switch (task.type) {
        case 'QuestionOfKnowingSubject':
          this.doQuestionOfKnowingSubject(task)
          break
        case 'gotToTime':
          this.doGoToTime(task)
          break
        case 'StabilizationTest':
          this.doStabilizationTest(task.data)
          break
        case 'SpecialTest':
          this.doSpecialTest(task.data)
          break
        case 'ShowTimePint':
          this.doSpecialTest(task.data)
          break
        default:
          break
      }
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
      this.overPlayer = false
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
      this.playerCurrentTime = data.currentTime
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
      this.sources = new PlayerSourceList(sources)
      this.poster = poster
    },
  },
}
</script>

<style lang="scss" scoped>
.InteractivePlayer {
  direction: rtl;
}
</style>
