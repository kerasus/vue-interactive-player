import { Model, Collection } from 'js-abstract-model'
import { TaskList } from './Task'
import { PlayerSourceList } from './PlayerSource'

class TimePoint extends Model {
  constructor(data) {
    super(data, [
      { key: 'id' },
      {
        key: 'sources',
        relatedModel: PlayerSourceList,
      },
      { key: 'poster' },
      {
        key: 'start',
        default: 0,
      },
      {
        key: 'end',
        default: 0,
      },
      { key: 'legal_time' },
      {
        key: 'tasks',
        relatedModel: TaskList,
      }
    ])
  }

  getNextTask (currentTask) {
    const taskId = currentTask?.data?.next_task_id
    const taskAutoPlay = currentTask?.data?.next_task_auto_play
    if (typeof taskId !== 'undefined' && taskId !== null && taskAutoPlay) {
      return this.tasks.getItem('id', taskId)
    }

    return null
  }


  hesTasks () {
    return this.tasks.list.length > 0
  }
}

class TimePointList extends Collection {
  model() {
    return TimePoint
  }
}
export { TimePoint, TimePointList }
