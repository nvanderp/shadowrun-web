import React from 'react'
import {connect} from 'react-redux'
import { 
  changeAttributes, changeAttPoints
} from '../store'
import Icon from '@material-ui/core/Icon'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  root: {
    color: '#FFFFFF'
  },
  iconHover: {
    '&:hover': {
      color: 'navajowhite',
      cursor: 'pointer'
    },
    '&:active': {
      color: '#E2AA38'
    }
  }
}

export const CharAttributes = (props) => {
  const { curAttributes, curAttPoints, clickAdd, clickSubtract, classes } = props
  let attPoints, specPoints
  if (curAttPoints !== undefined) {
    attPoints = curAttPoints.attPoints
    specPoints = curAttPoints.specPoints
  } else {
    attPoints = {min: 0, cur: 0, max: 0}
    specPoints = {min: 0, cur: 0, max: 0}
  }
  let attClassArray = Object.entries(curAttributes)
  return (
    <div>
      <div className="att-points-container">
        <div className="attPoints-container-total">
          <div className="attPoints-total">{attPoints.cur}/</div><div className="attpts-num-max">{attPoints.max}</div>
        </div>
        <div className="attPoints-title">Attribute Points</div>
        <div className="attPoints-container-total">
          <div className="attPoints-total">{specPoints.cur}/</div><div className="attpts-num-max">{specPoints.max}</div>
        </div>
        <div className="attPoints-title">Special Points</div>
      </div>
      <div id="attributes-stat-container">
      {
        attClassArray.map((attClass) => {
          let attArray = Object.entries(attClass[1])
          return (
            <div key={attClass[0]}>
              <b className="att-header-text">{attClass[0].charAt(0).toUpperCase() + attClass[0].slice(1)}</b>
              <div className="att-stat-list">
                {
                  attArray.map((att) => {
                    return (
                      <div key={att[1].name} className="att-list-item">
                        {att[1].name}
                        <div className="att-stat-controls">
                          <Icon 
                            className="material-icons md-18"
                            onClick={() => clickSubtract(att[1], curAttributes, curAttPoints, attClass[0])}
                            classes={{
                              root: classes.iconHover
                            }}
                          >remove_circle
                          </Icon>
                          {att[1].cur}/<div className="att-num-max">{att[1].max}</div>
                          <Icon
                            className="material-icons md-18"
                            onClick={() => clickAdd(att[1], curAttributes, curAttPoints, attClass[0])}
                            classes={{
                              root: classes.iconHover
                            }}
                          >add_circle
                          </Icon>
                          </div>
                      </div>
                    )
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
    curMetatype: state.charCreate.metatype,
    curAttPoints: state.charCreate.allAttPoints,
    curAttributes: state.charCreate.attributes
  }
}

const mapDispatch = (dispatch) => {
  return {
    clickSubtract(attObj, curAttributes, curAttPoints, attClass) {
      let attStat = attObj.name.toLowerCase().slice(0, 3)
      let newAttsObj = JSON.parse(JSON.stringify(curAttributes))
      newAttsObj[attClass][attStat].cur -= 1
      let newPoints = curAttPoints.cur + 1
      if (newAttsObj[attClass][attStat].cur < attObj.min || newPoints > curAttPoints.max) return null
      else {
        let newPointsObj = Object.assign({}, curAttPoints, {cur: newPoints})
        dispatch(changeAttributes(newAttsObj))
        dispatch(changeAttPoints(newPointsObj))
      }
    },
    clickAdd(attObj, curAttributes, curAttPoints, attClass) {
      let attStat = attObj.name.toLowerCase().slice(0, 3)
      let newAttsObj = JSON.parse(JSON.stringify(curAttributes))
      newAttsObj[attClass][attStat].cur += 1
      let newPoints = curAttPoints.cur - 1
      if (newAttsObj[attClass][attStat].cur > attObj.max || newPoints < curAttPoints.min) return null
      else {
        let newPointsObj = Object.assign({}, curAttPoints, {cur: newPoints})
        dispatch(changeAttributes(newAttsObj))
        dispatch(changeAttPoints(newPointsObj))
      }
    }
  }
}

export default withStyles(styles)(connect(mapState, mapDispatch)(CharAttributes))
