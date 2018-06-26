import React from 'react'
import {connect} from 'react-redux'
import { 
  baseMetatypeAttributes, changeMetatype, changeAttributes, attPointsReset, changeAttPoints
} from '../store'
import Icon from '@material-ui/core/Icon'

export const CharAttributes = (props) => {
  const { curAttPoints, curAttributes } = props
  let test = Object.keys(curAttributes)
  console.log('test', test)
  return (
    <div id="attributes-stat-container">
      <div>Points: {curAttPoints.cur}</div>
      <div>
        <b className="att-header-text">Physical</b>
        <div className="att-stat-list">
          <div className="att-list-item">
            Body:
            <div className="att-stat-controls">
              <Icon 
                className="material-icons md-18"
              >remove_circle
              </Icon>
              {curAttributes.bod.cur}/{curAttributes.bod.max}
              <Icon
                className="material-icons md-18"
              >add_circle
              </Icon>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * CONTAINER
*/
const mapState = (state) => {
  return {
    curAttPoints: state.charCreate.attPoints,
    // curAttPriority: state.charCreate.priorities.attributes,
    curAttributes: state.charCreate.attributes
  }
}

// const mapDispatch = (dispatch) => {
//   return {
//     handleClick(newMetatype, curAttPriority) {
//       let stats = baseMetatypeAttributes[newMetatype.class.split('-')[0]]
//       dispatch(changeMetatype(newMetatype))
//       dispatch(changeAttributes(stats))
//       let attPoints = attPointsReset(newMetatype.points, curAttPriority)
//       dispatch(changeAttPoints(attPoints))
//     }
//   }
// }

export default connect(mapState)(CharAttributes)
