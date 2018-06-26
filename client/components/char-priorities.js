import React, {Component} from 'react'
import { connect } from 'react-redux'
import {
  CharMetatype
} from './index.js'
import { 
  attributesReset, attPointsReset,
  changePriorities, changeMetatype, changeAttributes, changeAttPoints
} from '../store'

/**
 * COMPONENT
*/

class CharPriorities extends Component {
  constructor(props) {
    super(props)
    this.allowDrop = this.allowDrop.bind(this)
    this.drag = this.drag.bind(this)
    this.drop = this.drop.bind(this)
    this.evaluatePriorities = this.evaluatePriorities.bind(this)
    this.moveGradeDiv = this.moveGradeDiv.bind(this)
    this.prioritiesGradesView = this.prioritiesGradesView.bind(this)
    this.metatypeGradeContainer = this.metatypeGradeContainer.bind(this)
    this.attributesGradeContainer = this.attributesGradeContainer.bind(this)
  }

  priorities = {
    'A': {
      metatype: {
        defaultChoice: 'human-9',
        'human': {
          class: 'human-9',
          title: 'Human',
          points: 9
        },
        'elf': {
          class: 'elf-8',
          title: 'Elf',
          points: 8
        },
        'dwarf': {
          class: 'dwarf-7',
          title: 'Dwarf',
          points: 7
        },
        'ork': {
          class: 'ork-7',
          title: 'Ork',
          points: 7
        },
        'troll': {
          class: 'troll-5',
          title: 'Troll',
          points: 5
        }
      },
      attributes: 24
    },
    'B': {
      metatype: {
        defaultChoice: 'human-7',
        'human': {
          class: 'human-7',
          title: 'Human',
          points: 7
        },
        'elf': {
          class: 'elf-6',
          title: 'Elf',
          points: 6
        },
        'dwarf': {
          class: 'dwarf-4',
          title: 'Dwarf',
          points: 4
        },
        'ork': {
          class: 'ork-4',
          title: 'Ork',
          points: 4
        },
        'troll': {
          class: 'troll-0',
          title: 'Troll',
          points: 0
        }
      },
      attributes: 20
    }
  }

  allowDrop = (event) => {
    event.preventDefault()
  }

  drag = (event) => {
    event.dataTransfer.setData('priority', event.target.id)
  }

  drop = (event) => {
    event.preventDefault()
    const data = event.dataTransfer.getData('priority') // 'priority-A'
    this.moveGradeDiv(event, data)
    this.evaluatePriorities()
  }

  evaluatePriorities = () => {
    const metatypePriority = document.getElementById('metatype-grade-container').children[0]
    const attributesPriority = document.getElementById('attributes-grade-container').children[0]
    let id, metaPoints, attPoints
    if (metatypePriority) {
      id = metatypePriority.id.split('-')[1]
      metaPoints = this.priorities[id].metatype['human'].points // replace 'human' with var
      this.props.updatePriorities('metatype', this.priorities[id].metatype)
      this.props.updateMetatype(this.priorities[id].metatype['human'])
    }
    if (attributesPriority) {
      id = attributesPriority.id.split('-')[1]
      attPoints = this.priorities[id].attributes
      this.props.updatePriorities('attributes', this.priorities[id].attributes)
      let stats = attributesReset(this.props.currentChar.metatype.class)
      this.props.updateAttributes(stats)
    }
    let total = attPointsReset(metaPoints, attPoints)
    this.props.updateAttPoints(total)
  }

  moveGradeDiv = (event, data) => {
    const prevParent = document.getElementById(data).parentNode
    event.target.appendChild(document.getElementById(data))
    const parent = document.getElementById(data).parentNode
    const grandparent = document.getElementById(parent.id).parentNode
    const children = document.getElementById(parent.id).children
    const child = children[0]
    if (parent.id !== 'priorities-grades-view'
    && children.length > 1
    || parent.id.split('-')[0] === 'priority'
    ) {
      if (parent.id.split('-')[0] === 'priority') {
        parent.removeChild(child)
        grandparent.appendChild(child)
        grandparent.removeChild(parent)
        prevParent.appendChild(parent)
      }
      else {
        parent.removeChild(child)
        prevParent.appendChild(child)
      }
    }
  }

  // VIEWS
  prioritiesGradesView = () => {
    return (
      <div
        id="priorities-grades-view"
        onDrop={(event) => {this.drop(event)}}
        onDragOver={(event) => {this.allowDrop(event)}}
      >
        <div id="priority-A" className="grade" draggable={true} onDragStart={(event) => {this.drag(event)}}>A</div>
        <div id="priority-B" className="grade" draggable={true} onDragStart={(event) => {this.drag(event)}}>B</div>
        <div id="priority-C" className="grade" draggable={true} onDragStart={(event) => {this.drag(event)}}>C</div>
        <div id="priority-D" className="grade" draggable={true} onDragStart={(event) => {this.drag(event)}}>D</div>
        <div id="priority-E" className="grade" draggable={true} onDragStart={(event) => {this.drag(event)}}>E</div>
      </div>
    )
  }

  metatypeGradeContainer = () => {
    return (
      <div
        id="metatype-grade-container"
        className="priorities-grade-container"
        onDrop={(event) => {this.drop(event)}}
        onDragOver={(event) => {this.allowDrop(event)}}
      />
    )
  }

  attributesGradeContainer = () => {
    return (
      <div
        id="attributes-grade-container"
        className="priorities-grade-container"
        onDrop={(event) => {this.drop(event)}}
        onDragOver={(event) => {this.allowDrop(event)}}
      />
    )
  }

  render () {
    // const { currentChar } = this.props
    return (
      <div>
        {this.prioritiesGradesView()}
        <div id="metatype-container" className="priority-container">
          <div>
            <div className="priority-header">
              <h4 className="priority-title">Metatype</h4>
              {this.metatypeGradeContainer()}
            </div>
            <CharMetatype updateMetatype={this.props.updateMetatype}/>
          </div>
        </div>
        <div className="priority-header">
          <h4 className="priority-title">Attributes</h4>
          {this.attributesGradeContainer()}
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
*/

const mapState = (state) => {
  return {
    currentChar: state.charCreate
  }
}

const mapDispatch = (dispatch) => {
  return {
    // Updaters
    updatePriorities(view, grade) {
      dispatch(changePriorities(view, grade))
    },
    updateMetatype(metatype) {
      dispatch(changeMetatype(metatype))
    },
    updateAttributes(attributes) {
      dispatch(changeAttributes(attributes))
    },
    updateAttPoints(attPoints) {
      dispatch(changeAttPoints(attPoints))
    }
  }
}

export default connect(mapState, mapDispatch)(CharPriorities)
