import React from 'react'
import RadioButton from '@material-ui/core/Radio'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { 
  changeMagRes, changeAttributes, baseMetatypeAttributes, 
  changeSkillsToShow, changeSkills, changeSkillPoints,
  changeAttPoints, attPointsReset, specPointsReset
} from '../store'

const styles = {
  root: {
    color: '#FFFFFF',
    '&$checked': {
      color: '#E2AA38',
    },
    '&:hover': {
      color: '#E2AA38',
    }
  },
  checked: {},
  size: {
    width: 40,
    height: 40,
  },
  sizeIcon: {
    fontSize: 20,
  }
}

export const CharMagRes = (props) => {
  const { curOptions, curMagRes, handleClick, classes } = props
  let magResArray = Object.entries(curOptions)
  return (
    <div>
      <div className="priority-form">
        {
          magResArray.length > 1 ?
            magResArray.map((key) => {
              return (
                <div className="magRes-button-text-container" key={key[1].title}>
                  <RadioButton
                    checked={curMagRes.title === key[1].title}
                    onClick={() => {handleClick(key[1], props)}}
                    classes={{
                      root: classes.root,
                      checked: classes.checked
                    }}
                  />
                  <div className="magRes-text-container">
                    <div className="magRes-header-text">{key[1].title}</div>
                    <div className="magRes-body-text">{key[1].text}</div>
                  </div>
                </div>
              )
            })
          : <div className="priority-form-label">None</div>
        }
      </div>
    </div>
  )
}

/**
 * CONTAINER
*/
const mapState = (state) => {
  return {
    curOptions: state.charCreate.priorities.magicRes,
    curMagRes: state.charCreate.magOrResStat,
    curAttributes: state.charCreate.attributes,
    curMetatype: state.charCreate.metatype,
    curPriorities: state.charCreate.priorities,
    curAttPriority: state.charCreate.priorities.attributes
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick(newMagResStat, props) {
      let { curMetatype, curPriorities, curAttPriority } = props
      let metatypeClass = {}
      if (curMetatype) {
        metatypeClass.title = curMetatype.class.split('-')[0]
        metatypeClass.points = curMetatype.points
      } else {
        metatypeClass.title = 'human'
        metatypeClass.points = '0'
      }
      let newAttsObj = JSON.parse(JSON.stringify(baseMetatypeAttributes[metatypeClass.title]))
      let statToAdd = newMagResStat.stat
      let newSpecialStats = Object.assign({}, newAttsObj.special, statToAdd)
      let newAttStats = Object.assign({}, newAttsObj, {special: newSpecialStats})
      let skillPoints = curPriorities.skills
      let newTotalObject = {}
      newTotalObject.attPoints = attPointsReset(curAttPriority)
      newTotalObject.specPoints = specPointsReset(metatypeClass.points)
      dispatch(changeAttPoints(newTotalObject))
      dispatch(changeAttributes(newAttStats))
      dispatch(changeMagRes(newMagResStat))
      dispatch(changeSkillPoints(skillPoints))
      dispatch(changeSkills({}))
      dispatch(changeSkillsToShow({}))
      dispatch(changeAttPoints(newTotalObject))
    }
  }
}

export default withStyles(styles)(connect(mapState, mapDispatch)(CharMagRes))