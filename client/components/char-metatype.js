import React from 'react'
import RadioButton from '@material-ui/core/Radio'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { 
  baseMetatypeAttributes, changeMetatype, changeAttributes, attPointsReset, changeAttPoints
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
  },
}

export const CharMetatype = (props) => {
  const { curMetatype, curMetaPriority, curAttPriority, handleClick, classes } = props
  return (
    <div className="priority-form">
      {
        Object.keys(curMetaPriority).length !== 0 ? 
          Object.keys(curMetaPriority).map((key) => {
            if (curMetaPriority[key].title) {
              return (
                <div className="priority-form-label" key={key}>
                  <RadioButton
                    checked={curMetatype.class === curMetaPriority[key].class}
                    onClick={() => {handleClick(curMetaPriority[key], curAttPriority)}}
                    classes={{
                      root: classes.root,
                      checked: classes.checked
                    }}
                  />
                  <div>{curMetaPriority[key].title}</div>
                  <div className="metatype-points">({curMetaPriority[key].points})</div>
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
      let stats = Object.assign({}, baseMetatypeAttributes[newMetatype.class.split('-')[0]])
      dispatch(changeMetatype(newMetatype))
      dispatch(changeAttributes(stats))
      let attPoints = attPointsReset(newMetatype.points, curAttPriority)
      dispatch(changeAttPoints(attPoints))
    }
  }
}

export default withStyles(styles)(connect(mapState, mapDispatch)(CharMetatype))
