import React, {Component} from 'react'
import { connect } from 'react-redux'
import {
  CharMetatype,
  CharAttributes,
  CharMagRes,
  CharSkills
} from './index.js'
import { 
  priorities, baseMetatypeAttributes, attPointsReset, specPointsReset,
  changePriorities, changeMetatype, changeAttributes, changeAttPoints, changeMagRes,
  changeSkills, changeSkillPoints, changeSkillsToShow
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
    this.metatypePriorityEval = this.metatypePriorityEval.bind(this)
    this.attributesPriorityEval = this.attributesPriorityEval.bind(this)
    this.magicResPriorityEval = this.magicResPriorityEval.bind(this)
    this.skillsPriorityEval = this.skillsPriorityEval.bind(this)
    this.evaluatePriorities = this.evaluatePriorities.bind(this)
    this.moveGradeDiv = this.moveGradeDiv.bind(this)
    this.prioritiesGradesView = this.prioritiesGradesView.bind(this)
    this.metatypeGradeContainer = this.metatypeGradeContainer.bind(this)
    this.attributesGradeContainer = this.attributesGradeContainer.bind(this)
    this.magResGradeContainer = this.magResGradeContainer.bind(this)
    this.skillsGradeContainer = this.skillsGradeContainer.bind(this)
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
    let trueParent, newParent
    if (event.target.id.split('-')[0] === 'priority') {
      trueParent = document.getElementById(event.target.id).parentNode.id
    }
    this.moveGradeDiv(event, data)
    newParent = document.getElementById(event.target.id).parentNode.id
    this.evaluatePriorities(event, trueParent, newParent)
  }

  metatypePriorityEval = (metatypePriority, trueParent, newParent, event) => {
    let id, metaPoints, curMetatype
    let newMetaObject = {}
    id = metatypePriority.id.split('-')[1]
    this.props.updatePriorities('metatype', priorities[id].metatype)
    if (event.target.id === 'metatype-grade-container' 
      || trueParent === 'metatype-grade-container'
      || newParent === 'metatype-grade-container'
      )
    {
      this.props.updateMetatype(priorities[id].metatype['human'])
      metaPoints = priorities[id].metatype['human'].points
      newMetaObject.metatype = 'human'
    } else {
      curMetatype = this.props.curCharacter.metatype.class.split('-')[0]
      metaPoints = priorities[id].metatype[curMetatype].points
      newMetaObject.metatype = curMetatype
    }
    newMetaObject.metaPoints = metaPoints
    return newMetaObject
  }

  attributesPriorityEval = (attributesPriority, newMetaObject) => {
    let stats, id, attPoints
    id = attributesPriority.id.split('-')[1]
    attPoints = priorities[id].attributes
    this.props.updatePriorities('attributes', priorities[id].attributes)
    stats = baseMetatypeAttributes[newMetaObject.metatype]
    if (this.props.curCharacter.magOrResStat.stat) {
      let newSpecialStats = Object.assign({}, stats.special, this.props.curCharacter.magOrResStat.stat)
      stats = Object.assign({}, stats, {special: newSpecialStats})
    }
    this.props.updateAttributes(stats)
    return attPoints
  }

  magicResPriorityEval = (magResPriority, newMetaObject) => {
    let magResDisplay, stats, displayStat
    let curMetatype = newMetaObject.metatype
    let curBaseStats = baseMetatypeAttributes[curMetatype]
    if (curBaseStats === undefined) {
      curBaseStats = baseMetatypeAttributes['human']
    }
    let id = magResPriority.id.split('-')[1]
    magResDisplay = priorities[id].magTech
    this.props.updatePriorities('magicRes', magResDisplay)
    if (magResDisplay.magic === undefined) {
      displayStat = magResDisplay.adept
    } else {
      displayStat = magResDisplay.magic
    }
    let newSpecialStats = Object.assign({}, curBaseStats.special, displayStat.stat)
    stats = Object.assign({}, curBaseStats, {special: newSpecialStats})
    this.props.updateMagOrRes(displayStat)
    this.props.updateAttributes(stats)
  }

  skillsPriorityEval = (skillsPriority) => {
    let id, skillPoints
    id = skillsPriority.id.split('-')[1]
    skillPoints = priorities[id].skills
    this.props.updatePriorities('skills', skillPoints)
    this.props.updateSkills({})
    this.props.updateSkillPoints(skillPoints)
    this.props.updateSkillsToShow({})
  }

  evaluatePriorities = (event, trueParent, newParent) => {
    const metatypePriority = document.getElementById('metatype-grade-container').children[0]
    const attributesPriority = document.getElementById('attributes-grade-container').children[0]
    const magResPriority = document.getElementById('magres-grade-container').children[0]
    const skillsPriority = document.getElementById('skills-grade-container').children[0]
    let curMetatype = this.props.curCharacter.metatype.class
    let attPoints, resetStats
    let newMetaObject = {}
    let newTotalObject = {}
    if (metatypePriority) {
      newMetaObject = this.metatypePriorityEval(metatypePriority, trueParent, newParent, event)
    } else {
      this.props.updatePriorities('metatype', {})
      newMetaObject.metatype = 'human'
    }
    if (attributesPriority) {
      attPoints = this.attributesPriorityEval(attributesPriority, newMetaObject)
    } else {
      this.props.updatePriorities('attributes', 0)
    }
    if (curMetatype === undefined) curMetatype = 'human'
    else curMetatype = curMetatype.split("-")[0]
    if (magResPriority) {
      this.magicResPriorityEval(magResPriority, newMetaObject)
    } else {
      resetStats = baseMetatypeAttributes[curMetatype]
      this.props.updatePriorities('magicRes', {})
      this.props.updateAttributes(resetStats)
      this.props.updateMagOrRes({})
    }
    if (skillsPriority) {
      this.skillsPriorityEval(skillsPriority)
    } else {
      this.props.updatePriorities('skills', {})
      this.props.updateSkillPoints({})
      this.props.updateSkills({})
      this.props.updateSkillsToShow({})
    }
    newTotalObject.attPoints = attPointsReset(attPoints)
    newTotalObject.specPoints = specPointsReset(newMetaObject.metaPoints)
    this.props.updateAttPoints(newTotalObject)
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

  skillsGradeContainer = () => {
    return (
      <div
        id="skills-grade-container"
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
                in={curPriorities.magicRes.magic !== undefined || curPriorities.magicRes.adept !== undefined}
              >
                <CharMagRes />
              </Collapse>
            </div>
          </div>
          <div id="skills-container" className="priority-container">
            <div>
              <div className="priority-header">
                <h4 className="priority-title">Skills</h4>
                {this.skillsGradeContainer()}
              </div>
              <Collapse 
                in={curPriorities.skills.skillPoints !== undefined}
              >
                <CharSkills />
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
    updateAttPoints(allAttPoints) {
      dispatch(changeAttPoints(allAttPoints))
    },
    updateMagOrRes(magOrResStat) {
      dispatch(changeMagRes(magOrResStat))
    },
    updateSkillPoints(skillPoints) {
      dispatch(changeSkillPoints(skillPoints))
    },
    updateSkills(skills) {
      dispatch(changeSkills(skills))
    },
    updateSkillsToShow(skills) {
      dispatch(changeSkillsToShow(skills))
    }
  }
}

export default connect(mapState, mapDispatch)(CharPriorities)
