import React from 'react'
import {connect} from 'react-redux'
import { 
  changeAttributes, changeAttPoints
} from '../store'
import Icon from '@material-ui/core/Icon'

export const CharAttributes = (props) => {
  const { curAttributes, curAttPoints, clickAdd, clickSubtract } = props
  let attClassArray = Object.entries(curAttributes)
  return (
    <div id="attributes-stat-container">
      <div id="att-points-container">Points: {curAttPoints.cur}/{curAttPoints.max}</div>
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
                          >remove_circle
                          </Icon>
                          {att[1].cur}/{att[1].max}
                          <Icon
                            className="material-icons md-18"
                            onClick={() => clickAdd(att[1], curAttributes, curAttPoints, attClass[0])}
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
    clickSubtract(attObj, curAttributes, curAttPoints, attClass) {
      let attStat = attObj.name.toLowerCase().slice(0, 3)
      let newAttsObj = Object.assign({}, curAttributes)
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
      let newAttsObj = Object.assign({}, curAttributes)
      newAttsObj[attClass][attStat].cur += 1
      let newPoints = curAttPoints.cur - 1
      if (newAttsObj[attClass][attStat].cur > attObj.max || newPoints < curAttPoints.min) return null
      else {
        let newPointsObj = Object.assign({}, curAttPoints, {cur: newPoints})
        dispatch(changeAttributes(newAttsObj))
        dispatch(changeAttPoints(newPointsObj))
      }

      // console.log('attObj', attObj)
      // let key = attObj.name.toLowerCase().slice(0, 3)
      // console.log('key', key)
      // let newStat = curAttributes[key].cur + 1
      // let newPoints = curAttPoints.cur - 1
      // if (newStat > curAttributes[key].max || newPoints < curAttPoints.min) return null
      // else {
      //   let newAttsObj = Object.assign({}, curAttributes, {[key]: {...curAttributes[key], cur: newStat}} )
      //   let newPointsObj = Object.assign({}, curAttPoints, {cur: newPoints})
      //   dispatch(changeAttributes(newAttsObj))
      //   dispatch(changeAttPoints(newPointsObj))
      // }
    }
  }
}

export default connect(mapState, mapDispatch)(CharAttributes)
