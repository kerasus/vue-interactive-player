import { Model, Collection } from 'js-abstract-model'

class Choice extends Model {
  constructor(data) {
    super(data, [
      { key: 'id' },
      { key: 'label' },
      { key: 'value' },
      {
        key: 'selected',
        default: false
      },
      { key: 'task_id' },
    ])
  }
}

class ChoiceList extends Collection {
  model() {
    return Choice
  }

  hasTrueSelected () {
    const selectedChoice = this.getSelected()

    return selectedChoice && selectedChoice.value
  }

  getSelected () {
    return this.list.find( choice => choice.selected)
  }

  getSelectedNumber () {
    const selectedChoice = this.getSelected()
    if (!selectedChoice) {
      return null
    }

    return this.getNumber(selectedChoice.id)
  }

  getNumber (choiceId) {
    if (typeof choiceId === 'undefined' || choiceId === null) {
      return null
    }
    const index = this.getIndex('id', choiceId)
    if (index === -1) {
      return null
    }
    return (index + 1)
  }

  clearSelected () {
    this.list.forEach( choice => choice.selected = false)
  }
}
export { Choice, ChoiceList }
