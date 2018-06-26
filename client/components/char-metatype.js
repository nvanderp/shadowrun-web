import React from 'react'
import RadioButton from '@material-ui/core/Radio'
import {connect} from 'react-redux'
import { 
  baseMetatypeAttributes, changeMetatype, changeAttributes, attPointsReset, changeAttPoints
} from '../store'

export const CharMetatype = (props) => {
  const { curMetatype, curMetaPriority, curAttPriority, handleClick } = props
  return (
    <div>
      {
        Object.keys(curMetaPriority).length !== 0 ? 
          Object.keys(curMetaPriority).map(function(key) {
            if (curMetaPriority[key].title) {
              return (
                <div key={key}>
                  <RadioButton
                    checked={curMetatype.class === curMetaPriority[key].class}
                    onClick={() => {handleClick(curMetaPriority[key], curAttPriority)}}
                  />
                  {curMetaPriority[key].title} ({curMetaPriority[key].points})
                </div>
              )
            }
          })
        : null
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
    curMetaPriority: state.charCreate.priorities.metatype,
    curAttPriority: state.charCreate.priorities.attributes
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick(newMetatype, curAttPriority) {
      let stats = baseMetatypeAttributes[newMetatype.class.split('-')[0]]
      dispatch(changeMetatype(newMetatype))
      dispatch(changeAttributes(stats))
      let attPoints = attPointsReset(newMetatype.points, curAttPriority)
      dispatch(changeAttPoints(attPoints))
    }
  }
}

export default connect(mapState, mapDispatch)(CharMetatype)
