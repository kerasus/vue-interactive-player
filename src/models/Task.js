import { Model, Collection } from 'js-abstract-model'

class Task extends Model {
  constructor(data) {
    super(data, [
      { key: 'id' },
      { key: 'type' }, // question of knowing subject
      { key: 'data' },
      { key: 'done' },
      {
        key: 'pre_show',
        default: false
      },
      {
        key: 'post_show',
        default: false
      },
    ])
  }
}

class TaskList extends Collection {
  model() {
    return Task
  }

  getPreShow () {
    return this.list.find( task => task.pre_show)
  }

  getPostShow () {
    return this.list.find( task => task.post_show)
  }

  hasPreShow () {
    return !!this.getPreShow()
  }

  hasPostShow () {
    return !!this.getPostShow()
  }
}
export { Task, TaskList }
