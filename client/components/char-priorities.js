import React, {Component} from 'react'
import { connect } from 'react-redux'
import {
  CharMetatype,
  CharAttributes,
  CharMagTechno
} from './index.js'
import { 
  priorities, baseMetatypeAttributes, attPointsReset,
  changePriorities, changeMetatype, changeAttributes, changeAttPoints, changeMagRes
} from '../store'
import Collapse from '@material-ui/core/Collapse'

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
    this.magResGradeContainer = this.magResGradeContainer.bind(this)
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
    let trueParent
    if (event.target.id.split('-')[0] === 'priority') {
      trueParent = document.getElementById(event.target.id).parentNode.id
    }
    this.moveGradeDiv(event, data)
    this.evaluatePriorities(event, trueParent)
  }

  evaluatePriorities = (event, trueParent) => {
    const metatypePriority = document.getElementById('metatype-grade-container').children[0]
    const attributesPriority = document.getElementById('attributes-grade-container').children[0]
    const magResPriority = document.getElementById('magres-grade-container').children[0]
    let id, metaPoints, attPoints, curMetatype, stats, magTechDisplay
    if (metatypePriority) {
      id = metatypePriority.id.split('-')[1]
      this.props.updatePriorities('metatype', priorities[id].metatype)
      if (event.target.id === 'metatype-grade-container' 
        || trueParent !== undefined
        )
      {
        this.props.updateMetatype(priorities[id].metatype['human'])
        metaPoints = priorities[id].metatype['human'].points
      } else {
        curMetatype = this.props.curCharacter.metatype.class.split('-')[0]
        metaPoints = priorities[id].metatype[curMetatype].points
      }
    }
    if (attributesPriority) {
      id = attributesPriority.id.split('-')[1]
      attPoints = priorities[id].attributes
      this.props.updatePriorities('attributes', priorities[id].attributes)
      if (this.props.curCharacter.metatype.class) {
        stats = baseMetatypeAttributes[this.props.curCharacter.metatype.class.split('-')[0]]
      }
      else {
        stats = baseMetatypeAttributes['human']
      }
      if (this.props.curCharacter.magOrResStat.stat) {
        let newSpecialStats = Object.assign({}, stats.special, this.props.curCharacter.magOrResStat.stat)
        stats = Object.assign({}, stats, {special: newSpecialStats})
      }
      this.props.updateAttributes(stats)
    }
    if (magResPriority) {
      id = magResPriority.id.split('-')[1]
      magTechDisplay = priorities[id].magTech
      this.props.updatePriorities('magicRes', magTechDisplay)
      let newSpecialStats = Object.assign({}, stats.special, magTechDisplay.magic.stat)
      stats = Object.assign({}, stats, {special: newSpecialStats})
      this.props.updateMagOrRes(magTechDisplay.magic)
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

  magResGradeContainer = () => {
    return (
      <div
        id="magres-grade-container"
        className="priorities-grade-container"
        onDrop={(event) => {this.drop(event)}}
        onDragOver={(event) => {this.allowDrop(event)}}
      />
    )
  }

  render () {
    const { curPriorities } = this.props
    return (
      <div>
        <div>
          <h3 className="character-creation-title">Priorities</h3>
          {this.prioritiesGradesView()}
        </div>
        <div className="priorities-container">
          <div id="metatype-container" className="priority-container">
            <div>
              <div className="priority-header">
                <h4 className="priority-title">Metatype</h4>
                {this.metatypeGradeContainer()}
              </div>
              <Collapse in={curPriorities.metatype.defaultChoice !== undefined}>
                <CharMetatype />
              </Collapse>
            </div>
          </div>
          <div id="attributes-container" className="priority-container">
            <div>
              <div className="priority-header">
                <h4 className="priority-title">Attributes</h4>
                {this.attributesGradeContainer()}
              </div>
              <Collapse in={curPriorities.attributes !== 0}>
                <CharAttributes />
              </Collapse>
            </div>
          </div>
          <div id="magres-container" className="priority-container">
            <div>
              <div className="priority-header">
                <h4 className="priority-title">Magic or Resonance</h4>
                {this.magResGradeContainer()}
              </div>
              <Collapse 
                in={curPriorities.magicRes.magic !== undefined || curPriorities.magicRes.techno !== undefined}
              >
                <CharMagTechno />
              </Collapse>
            </div>
          </div>
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
    curCharacter: state.charCreate,
    curPriorities: state.charCreate.priorities
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
    },
    updateMagOrRes(magOrResStat) {
      dispatch(changeMagRes(magOrResStat))
    }
  }
}

export default connect(mapState, mapDispatch)(CharPriorities)
