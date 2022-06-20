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
import {Task, TaskList} from './models/Task'
import { TimePointList, TimePoint } from './models/TimePoint'
import { PlayerSourceList } from './models/PlayerSource'
import { mixinQuestionOfKnowingSubject, mixinStabilizationTest, mixinGoToTime, mixinGoToTimePoint, mixinPlayer, mixinOverPlayer } from './mixins/Mixins'

export default {
  name: 'InteractivePlayer',
  components: { Player, OverPlayer },
  mixins: [mixinQuestionOfKnowingSubject, mixinGoToTime, mixinGoToTimePoint, mixinPlayer, mixinOverPlayer, mixinStabilizationTest],
  props: {
    timePoints: {
      type: Array,
      default() {
        return []
      },
    },
  },
  watch: {
    playerCurrentTime (newValue) {
      if (this.watchingEndTime > newValue) {
        return
      }

      const nextTaskOfCurrentTaskId = this.currentTask?.data?.next_task_id
      const nextTaskOfCurrentTaskAutoPlay = this.currentTask?.data?.next_task_auto_play
      if (typeof nextTaskOfCurrentTaskId !== 'undefined' && nextTaskOfCurrentTaskId !== null && nextTaskOfCurrentTaskAutoPlay) {
        const nextTaskOfCurrentTask = this.getTaskOfTimePoint(nextTaskOfCurrentTaskId)
        if (nextTaskOfCurrentTask) {
          this.doTask(nextTaskOfCurrentTask)
          return
        }
      }

      if (!this.currentTimePoint.tasks.hasPostShow()) {
        return
      }

      const postShowTask = this.currentTimePoint.tasks.getPostShow()
      this.doTask(postShowTask)
    }
  },
  data() {
    return {
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
    this.loadFirstTimePont()
  },
  methods: {
    getTaskOfTimePoint (taskId) {
      return this.currentTimePoint.tasks.getItem('id', taskId)
    },
    onAction (data) {
      this.doTaskAction(this.currentTask, data)
    },
    setCurrentTask (task) {
      this.currentTask = task
    },
    getFirstTimePont() {
      return this.localTimePoints.list[0]
    },
    loadFirstTimePont() {
      const firstTimePoint = this.getFirstTimePont()
      this.runTimePoint(firstTimePoint)
    },
    getNextTimePont() {
      const currentTimePointIndex = this.localTimePoints.getIndex('id', this.currentTimePoint.id)
      const nextTimePoint = this.localTimePoints.list[currentTimePointIndex+1]
      if (typeof nextTimePoint === 'undefined') {
        return null
      }

      return nextTimePoint
    },
    loadNextTimePont() {
      const nextTimePoint = this.getNextTimePont()
      if (!nextTimePoint) {
        this.pause()
        return
      }
      this.runTimePoint(nextTimePoint)
    },
    runTimePoint(timePoint) {
      this.currentTimePoint = timePoint
      this.setWatchingEndTime(this.currentTimePoint.end)
      this.changeSources(timePoint.sources, timePoint.poster)
      if (timePoint.hesTasks() && timePoint.tasks.hasPreShow()) {
        const preShowTask = timePoint.tasks.getPreShow()
        this.doTask(preShowTask)
      }
    },
    doTaskAction(task, actionData) {
      switch (task.type) {
        case 'QuestionOfKnowingSubject':
          this.doActionOfQuestionOfKnowingSubject(actionData)
          break
        case 'StabilizationTest':
          this.doActionOfStabilizationTest(actionData)
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
      this.setCurrentTask(task)
      switch (task.type) {
        case 'QuestionOfKnowingSubject':
          this.doQuestionOfKnowingSubject(task)
          break
        case 'gotToTime':
          this.doGoToTime(task)
          break
        case 'StabilizationTest':
          this.doStabilizationTest(task)
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
    doTaskSequence (taskIds, examTask) {
      const firstTaskIdOfSequence = taskIds[0]
      if (typeof firstTaskIdOfSequence === 'undefined') {
        // ToDo:go to next timePoint
        return
      }

      this.loadTaskSequence(taskIds, examTask)

      const firstTask = this.currentTimePoint.tasks.getItem('id', firstTaskIdOfSequence)

      this.doTask(firstTask)
    },
    loadTaskSequence (taskIds, examTask) {
      taskIds.forEach( (taskId, taskIdIndex) => {
        const taskIndex = this.currentTimePoint.tasks.getIndex('id', taskId)
        if (taskIndex === -1) {
          // ToDo:go to ?
          return
        }
        if (!this.currentTimePoint.tasks.list[taskIndex].data) {
          this.currentTimePoint.tasks.list[taskIndex].data = {}
        }

        const nextTaskId = taskIds[taskIdIndex + 1]
        if (typeof nextTaskId === 'undefined') {
          this.currentTimePoint.tasks.list[taskIndex].data.next_task_id = examTask.id
          this.currentTimePoint.tasks.list[taskIndex].data.next_task_auto_play = true
          return
        }

        const nextTaskIndex = this.currentTimePoint.tasks.getIndex('id', nextTaskId)
        if (typeof nextTaskIndex === 'undefined') {
          return
        }

        this.currentTimePoint.tasks.list[taskIndex].data.next_task_id = this.currentTimePoint.tasks.list[nextTaskIndex].id
        this.currentTimePoint.tasks.list[taskIndex].data.next_task_auto_play = true
      })
    },
    setNextTaskId (task, nextTaskId, autoPlay) {
      if (typeof task.data === 'undefined') {
        task.data = {}
      }
      if (typeof autoPlay === 'undefined') {
        autoPlay = true
      }
      task.data.next_task_id = nextTaskId
      task.data.next_task_auto_play = autoPlay
    },
    setWatchingEndTime (endTime) {
      this.watchingEndTime = endTime
    },

    doSpecialTest() {
      // show dialog for QuestionOfKnowingSubject
      // new Question(data.questoin)
    },
  },
}
</script>

<style lang="scss" scoped>
.InteractivePlayer {
  direction: rtl;
}
</style>
