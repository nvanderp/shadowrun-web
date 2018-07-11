import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import TextField from '@material-ui/core/TextField'
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { 
  skillsLibrary, changeSkillsToShow, changeSkills, changeSkillPoints,
  changeTempSpecials
} from '../store'
import Icon from '@material-ui/core/Icon'
import Collapse from '@material-ui/core/Collapse'

const styles = () => ({
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
  },
  iconHover: {
    '&:hover': {
      color: 'navajowhite',
      cursor: 'pointer'
    },
    '&:active': {
      color: '#E2AA38'
    }
  },
  specField: {
    width: '75%',
    paddingLeft: '2em',
    paddingBottom: '.5em'
  }
})

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#E2AA38',
      main: '#E2AA38',
      dark: '#E2AA38',
      contrastText: '#E2AA38',
    },
    secondary: {
      light: '#E2AA38',
      main: '#E2AA38',
      dark: '#E2AA38',
      contrastText: '#E2AA38',
    },
  },
})

const pointsContainer = (curSkillPoints, curGroupPoints) => {
  if (!curSkillPoints || !curGroupPoints) {
    curSkillPoints = {min: 0, max: 0, cur: 0}
    curGroupPoints = curSkillPoints
  }
  return (
    <div className="points-container">
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
  )
}

const newSpecializationContainer = (skill, props) => {
  const {curTotalPoints, handleSpecAddClick, 
    handleTempSpecial, curTempSpecials, curSkills, 
    classes 
  } = props
  if (curSkills[skill[1].title] !== undefined ) {
    return (
      <Collapse in={curSkills[skill[1].title] !== undefined && curSkills[skill[1].title].specializations.length === 0}>
        <div className="spec-skill-label">
          <TextField
            value={curTempSpecials[skill[1].title] ? curTempSpecials[skill[1].title] : ""}
            className={classes.specField}
            onChange={(event) => handleTempSpecial(event, skill[1].title, curTempSpecials)}
          />
          <Icon 
            className="material-icons md-18"
            classes={{
              root: classes.iconHover
            }}
            onClick={() => handleSpecAddClick(curTempSpecials, skill[1], curSkills, curTotalPoints)}
          >done
          </Icon>
        </div>
      </Collapse>
    )
  }
}

const curSpecializationContainer = (skill, props) => {
  const { curTotalPoints, curSkills,
    handleSpecBoxClick, classes 
  } = props
  if (curSkills[skill[1].title] !== undefined ) {
    return (
      <Collapse in={curSkills[skill[1].title].specializations.length !== 0}>
        <div className="skill-label spec-label">
          <Checkbox
            classes={{
              root: classes.root,
              checked: classes.checked,
            }}
            checked='true'
            onClick={() => handleSpecBoxClick(skill[1], curSkills, curTotalPoints)}
          />
          <div>{curSkills[skill[1].title].specializations[0]}</div>
        </div>
      </Collapse>
    )
  }
}

const skillClassContainer = (skillsClassArray, skillClass, props) => {
  const { curSkillsToShow, curTotalPoints, curSkills, 
    handleCheckBoxClick, 
    classes 
  } = props
  return (
    skillsClassArray.map((skill) => {
      if (skill[0] !== 'title') {
        return (
          <Collapse 
            key={skill[1].title}
            in={curSkillsToShow === skillClass[1].title}
          >
            <div id={skill[1].title} className="skill-label-container">
              <div className="skill-label">
                <Checkbox
                  classes={{
                    root: classes.root,
                    checked: classes.checked,
                  }}
                  checked={curSkills[skill[1].title] !== undefined}
                  onClick={() => handleCheckBoxClick(skill[1], curSkills, curTotalPoints)}
                />
                <div>{skill[1].title}</div>
              </div>
              {curSpecializationContainer(skill, props)}
              {newSpecializationContainer(skill, props)}
            </div>
          </Collapse>
        )
      }
    })
  )
}

const activeSkillsContainer = (activeSkillObjArray, props) => {
  const { curSkillsToShow, handleSkillSubClick, classes } = props
  return (
    activeSkillObjArray.map((skillClass) => {
      let skillsClassArray = Object.entries(skillClass[1])
      return (
        <div key={skillClass[1].title}>
          <div className="skill-icon-header">
            <Icon
              className="material-icons md-18"
              classes={{
                root: classes.iconHover
              }}
              onClick={() => handleSkillSubClick(skillClass[1].title, curSkillsToShow)}
            > {
                curSkillsToShow === skillClass[1].title
                ? 'keyboard_arrow_down'
                : 'keyboard_arrow_right'
              }
            </Icon>
            <b className="skill-sub-header">
              {skillClass[1].title}
            </b>
          </div>
          {skillClassContainer(skillsClassArray, skillClass, props)}
        </div>
      )
    })
  )
}

export const CharSkills = (props) => {
  const { curSkillPoints, curGroupPoints } = props
  let activeSkillObjArray = Object.entries(skillsLibrary.active)
  return (
    <MuiThemeProvider theme={theme}>
      <div>
        {pointsContainer(curSkillPoints, curGroupPoints)}
        <div id="skills-list-container">
          <div className="skill-column">
            <b className="skill-header-text">Active Skills</b>
            <div className="ind-skill-list">
              {activeSkillsContainer(activeSkillObjArray, props)}
            </div>
          </div>
        </div>
      </div>
    </MuiThemeProvider>
  )
}

/**
 * CONTAINER
*/
const mapState = (state) => {
  return {
    curAttributes: state.charCreate.attributes,
    curTotalPoints: state.charCreate.skillPoints,
    curSkillPoints: state.charCreate.skillPoints.skillPoints,
    curGroupPoints: state.charCreate.skillPoints.groupPoints,
    curSkillsToShow: state.charCreate.skillsToShow,
    curSkills: state.charCreate.skills,
    curSkillPriority: state.charCreate.priorities.skills,
    curTempSpecials: state.charCreate.tempSpecials
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSkillSubClick(skills, curSkillToShow) {
      if (curSkillToShow === skills) skills = {}
      dispatch(changeSkillsToShow(skills))
    },
    handleCheckBoxClick(skill, curSkills, curTotalPoints) {
      let newSkillsObj = JSON.parse(JSON.stringify(curSkills))
      let newTotalPointsObj = JSON.parse(JSON.stringify(curTotalPoints))
      if (curTotalPoints.skillPoints.cur > curTotalPoints.skillPoints.min) {
        if (newSkillsObj[skill.title] !== undefined) {
          newSkillsObj[skill.title] = undefined
          if (skill.skillGroup !== undefined) {
            newTotalPointsObj.skillPoints.cur += 1
          }
        } else {
          newSkillsObj[skill.title] = skill
          if (skill.skillGroup !== undefined) {
            newTotalPointsObj.skillPoints.cur -= 1
          }
        }
        dispatch(changeSkills(newSkillsObj))
        dispatch(changeSkillPoints(newTotalPointsObj))
      }
    },
    handleTempSpecial(event, skillTitle, curTempSpecials) {
      let newTempSpecObj = JSON.parse(JSON.stringify(curTempSpecials))
      newTempSpecObj[skillTitle] = event.target.value
      dispatch(changeTempSpecials(newTempSpecObj))
    },
    handleSpecAddClick(curTempSpecials, skill, curSkills, curTotalPoints) {
      let newSpec = curTempSpecials[skill.title]
      let newSkillsObj = JSON.parse(JSON.stringify(curSkills))
      let newTotalPointsObj = JSON.parse(JSON.stringify(curTotalPoints))
      let newTempSpecObj = JSON.parse(JSON.stringify(curTempSpecials))
      if (curTotalPoints.skillPoints.cur > curTotalPoints.skillPoints.min 
        && newSpec !== undefined && newSpec.length !== 0
      ) {
        if (curSkills[skill.title].specializations.length < 1) {
          newSkillsObj[skill.title].specializations.push(newSpec)
          newTotalPointsObj.skillPoints.cur -= 1
          newTempSpecObj[skill.title] = ""
          dispatch(changeSkills(newSkillsObj))
          dispatch(changeSkillPoints(newTotalPointsObj))
          dispatch(changeTempSpecials(newTempSpecObj))
        }
      }
    },
    handleSpecBoxClick(skill, curSkills, curTotalPoints) {
      let newSkillsObj = JSON.parse(JSON.stringify(curSkills))
      let newTotalPointsObj = JSON.parse(JSON.stringify(curTotalPoints))
      newSkillsObj[skill.title].specializations = []
      newTotalPointsObj.skillPoints.cur += 1
      dispatch(changeSkills(newSkillsObj))
      dispatch(changeSkillPoints(newTotalPointsObj))
    }
  }
}

export default withStyles(styles)(connect(mapState, mapDispatch)(CharSkills))
