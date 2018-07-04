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
      let stats = Object.assign({}, baseMetatypeAttributes[newMetatype.class.split('-')[0]])
      dispatch(changeMetatype(newMetatype))
      // need checker and changer for special stats if magTech is present
      console.log('curMagRes in charMetatype', curMagRes)
      // I have access to curMagRes.stat for the stat to add to the specials... prolly copy from the other cloning places
      if (curMagRes.stat) {
        // here is where i will add the new special to 'stats' and then just pass stats as i was already
        let newSpecialStats = Object.assign({}, stats.special, curMagRes.stat)
        stats = Object.assign({}, stats, {special: newSpecialStats})
      }
      //
      dispatch(changeAttributes(stats))
      let attPoints = attPointsReset(newMetatype.points, curAttPriority)
      dispatch(changeAttPoints(attPoints))
    }
  }
}

export default withStyles(styles)(connect(mapState, mapDispatch)(CharMetatype))
