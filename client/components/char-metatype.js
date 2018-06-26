import React from 'react'
import RadioButton from '@material-ui/core/Radio'
import {connect} from 'react-redux'

export const CharMetatype = (props) => {
  const { curMetatype, curMetaPriority, handleClick, updateMetatype } = props
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
                    onClick={() => {handleClick(updateMetatype, curMetaPriority[key])}}
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
    curMetaPriority: state.charCreate.priorities.metatype
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick(updater, newMetatype) {
      updater(newMetatype)
    }
  }
}

export default connect(mapState, mapDispatch)(CharMetatype)