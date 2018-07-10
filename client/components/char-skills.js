import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import TextField from '@material-ui/core/TextField'
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { 
  // baseMetatypeAttributes, changeMetatype, changeAttributes, 
  // attPointsReset, specPointsReset, changeAttPoints
  skillsLibrary
} from '../store'

const styles = theme => ({
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
  // textField: {
    
  // }
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

export const CharSkills = (props) => {
  const { curAttributes, curSkillPoints, curGroupPoints, curSkills, curSkillPriority, classes } = props
  let skillObjArray = Object.entries(skillsLibrary)
  let skillType
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
      <div id="skills-list-container">
        {
          skillObjArray.map((skillClass) => {
            let skillsClassArray = Object.entries(skillClass[1])
            if (skillClass[1].title === 'Knowledge Skills') skillType = 'knowledge'
            else skillType = 'active'
            return (
              <div className="skill-column" key={skillClass[0]}>
                <b className="skill-header-text">{skillClass[1].title}</b>
                <div className="ind-skill-list">
                  {
                    skillsClassArray.map((skillSub) => {
                      let skillsArray = Object.entries(skillSub[1])
                      if (skillSub[0] !== 'title') {
                        return (
                          <div className="skill-sub-header" key={skillSub[1].title}>
                            <b>
                              {skillSub[1].title}
                            </b>
                            {
                              skillsArray.map((skill) => {
                                if (skill[0] !== 'title' && skillType === 'active') {
                                  return (
                                    <div className="skill-label" key={skill[1].title}>
                                      <Checkbox
                                        classes={{
                                          root: classes.root,
                                          checked: classes.checked
                                        }}
                                      />
                                      <div>{skill[1].title}</div>
                                    </div>
                                  )
                                }
                                else if (skillType === 'knowledge') {
                                  return (
                                    <MuiThemeProvider theme={theme} key={skill[1]}>
                                      <div className="skill-label">
                                        <TextField className={classes.textField}/>
                                      </div>
                                    </MuiThemeProvider>
                                  )
                                }
                              })
                            }
                          </div>
                        )
                      }
                    })
                  }
                </div>
              </div>
            )
          })
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
