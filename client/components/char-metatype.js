import React from 'react'
import RadioButton from '@material-ui/core/Radio'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { 
  baseMetatypeAttributes, changeMetatype, changeAttributes, 
  attPointsReset, specPointsReset, changeAttPoints, priorities
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
  }
}

export const CharMetatype = (props) => {
  const { curMetatype, curMetaPriority, curAttPriority, curMagRes, handleClick, classes } = props
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
                    onClick={() => {handleClick(curMetaPriority[key], curAttPriority, curMagRes)}}
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
    curAttPriority: state.charCreate.priorities.attributes,
    curMagRes: state.charCreate.magOrResStat
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick(newMetatype, curAttPriority, curMagRes) {
      let newTotalObject = {}
      let stats = Object.assign({}, baseMetatypeAttributes[newMetatype.class.split('-')[0]])
      dispatch(changeMetatype(newMetatype))
      if (curMagRes.stat) {
        let newSpecialStats = Object.assign({}, stats.special, curMagRes.stat)
        stats = Object.assign({}, stats, {special: newSpecialStats})
      }
      dispatch(changeAttributes(stats))
      newTotalObject.attPoints = attPointsReset(curAttPriority)
      newTotalObject.specPoints = specPointsReset(newMetatype.points)
      dispatch(changeAttPoints(newTotalObject))
    }
  }
}

export default withStyles(styles)(connect(mapState, mapDispatch)(CharMetatype))
