import React from 'react'
import {connect} from 'react-redux'
import { 
  changeAttributes, changeAttPoints
} from '../store'
import Icon from '@material-ui/core/Icon'

export const CharAttributes = (props) => {
  const { curAttPoints, curAttributes, clickAdd, clickSubtract } = props
  let attArray = Object.entries(curAttributes)
  let attClass
  return (
    <div id="attributes-stat-container">
      <div>Points: {curAttPoints.cur}/{curAttPoints.max}</div>
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
                      onClick={() => clickSubtract(att[1], curAttributes)}
                    >remove_circle
                    </Icon>
                    {att[1].cur}/{att[1].max}
                    <Icon
                      className="material-icons md-18"
                      onClick={() => clickAdd(att[1], curAttributes)}
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
    curAttPoints: state.charCreate.attPoints,
    curAttributes: state.charCreate.attributes
  }
}

const mapDispatch = (dispatch) => {
  return {
    clickSubtract(attObj, curAttributes) {
      let newCur = attObj.cur - 1
      if (newCur < attObj.min) return null
      else {
        attObj.cur = newCur
        dispatch(changeAttributes(attObj))
      }
    },
    clickAdd(attObj, curAttributes) {
      let newCur = attObj.cur + 1
      let key = attObj.name.toLowerCase().slice(0, 3)
      if (newCur > attObj.max) return null
      else {
        curAttributes[key].cur = newCur
        dispatch(changeAttributes(curAttributes))
      }
    }
  }
}

export default connect(mapState, mapDispatch)(CharAttributes)
