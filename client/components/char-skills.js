import React from 'react'
import RadioButton from '@material-ui/core/Radio'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { 
  // baseMetatypeAttributes, changeMetatype, changeAttributes, 
  // attPointsReset, specPointsReset, changeAttPoints
} from '../store'

const styles = {
  root: {
    color: '#FFFFFF',
    '&$checked': {
      color: '#E2AA38',
    },
    '&:hover': {
      color: '#E2AA38'
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

export const CharSkills = (props) => {
  const { curAttributes, curSkillPoints, curGroupPoints, curSkills, curSkillPriority } = props
  return (
    <div>
      {curSkillPoints && curGroupPoints
        ? <div className="points-container">
            <div className="points-container-total">
              <div className="points-total">{curSkillPoints.cur}</div>
              <div className="points-total-divider">/</div>
              <div className="points-num-max">{curSkillPoints.max}</div>
              <div className="points-title">Individual Skill Points</div>
            </div>
            <div className="points-container-total">
              <div className="points-total">{curGroupPoints.cur}</div>
              <div className="points-total-divider">/</div>
              <div className="points-num-max">{curGroupPoints.max}</div>
              <div className="points-title">Skill Group Points</div>
            </div>
          </div>
        : null}
    </div>
  )
}

/**
 * CONTAINER
*/
const mapState = (state) => {
  return {
    curAttributes: state.charCreate.attributes,
    curSkillPoints: state.charCreate.skillPoints.skillPoints,
    curGroupPoints: state.charCreate.skillPoints.groupPoints,
    curSkills: state.charCreate.skills,
    curSkillPriority: state.charCreate.priorities.skills
  }
}

const mapDispatch = (dispatch) => {
  return {

  }
}

export default withStyles(styles)(connect(mapState, mapDispatch)(CharSkills))
