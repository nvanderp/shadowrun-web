import React from 'react'
import {connect} from 'react-redux'
import { 
  changeAttributes, changeAttPoints
} from '../store'
import Icon from '@material-ui/core/Icon'

export const CharAttributes = (props) => {
  const { curAttributes, curAttPoints, clickAdd, clickSubtract } = props
  let attArray = Object.entries(curAttributes)
  let attClass
  return (
    <div id="attributes-stat-container">
      <div id="att-points-container">Points: {curAttPoints.cur}/{curAttPoints.max}</div>
      {
        attArray.map((att) => {
          if (att[1].name === 'Body') attClass = 'Physical'
          else if (att[1].name === 'Willpower') attClass = 'Mental'
          else if (att[1].name === 'Edge') attClass = 'Special'
          else attClass = null
          return (
            <div key={att[1].name} >
              {attClass ? <b className="att-header-text">{attClass}</b> : null}
              <div className="att-stat-list">
                <div className="att-list-item">
                  {att[1].name}
                  <div className="att-stat-controls">
                    <Icon 
                      className="material-icons md-18"
                      onClick={() => clickSubtract(att[1], curAttributes, curAttPoints)}
                    >remove_circle
                    </Icon>
                    {att[1].cur}/{att[1].max}
                    <Icon
                      className="material-icons md-18"
                      onClick={() => clickAdd(att[1], curAttributes, curAttPoints)}
                    >add_circle
                    </Icon>
                  </div>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

/**
 * CONTAINER
*/
const mapState = (state) => {
  return {
    curMetatype: state.charCreate.metatype,
    curAttPoints: state.charCreate.attPoints,
    curAttributes: state.charCreate.attributes
  }
}

const mapDispatch = (dispatch) => {
  return {
    clickSubtract(attObj, curAttributes, curAttPoints) {
      let key = attObj.name.toLowerCase().slice(0, 3)
      let newStat = curAttributes[key].cur - 1
      let newPoints = curAttPoints.cur + 1
      if (newStat < curAttributes[key].min || newPoints > curAttPoints.max) return null
      else {
        let newAttsObj = Object.assign({}, curAttributes, {[key]: {...curAttributes[key], cur: newStat}} )
        let newPointsObj = Object.assign({}, curAttPoints, {cur: newPoints})
        dispatch(changeAttributes(newAttsObj))
        dispatch(changeAttPoints(newPointsObj))
      }
    },
    clickAdd(attObj, curAttributes, curAttPoints) {
      let key = attObj.name.toLowerCase().slice(0, 3)
      let newStat = curAttributes[key].cur + 1
      let newPoints = curAttPoints.cur - 1
      if (newStat > curAttributes[key].max || newPoints < curAttPoints.min) return null
      else {
        let newAttsObj = Object.assign({}, curAttributes, {[key]: {...curAttributes[key], cur: newStat}} )
        let newPointsObj = Object.assign({}, curAttPoints, {cur: newPoints})
        dispatch(changeAttributes(newAttsObj))
        dispatch(changeAttPoints(newPointsObj))
      }
    }
  }
}

export default connect(mapState, mapDispatch)(CharAttributes)
