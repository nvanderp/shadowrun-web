import React from 'react'
import RadioButton from '@material-ui/core/Radio'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { 
  changeMagRes, changeAttributes
} from '../store'

const styles = {
  root: {
    color: '#FFFFFF',
    '&$checked': {
      color: '#E2AA38',
    },
    '&:hover': {
      color: '#E2AA38',
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

export const CharMagTechno = (props) => {
  const { curOptions, curMagRes, curAttributes, handleClick, classes } = props
  let magResArray = Object.entries(curOptions)
  return (
    <div>
      <div className="priority-form">
        {
          magResArray.map((key) => {
            return (
              <div key={key[1].title}>
                <RadioButton
                  checked={curMagRes.text === key[1].text}
                  onClick={() => {handleClick(key[1], curAttributes)}}
                  classes={{
                    root: classes.root,
                    checked: classes.checked
                  }}
                />
                <div className="magRes-header-text">{key[1].title}</div>
                <div className="magRes-body-text">{key[1].text}</div>
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
    curOptions: state.charCreate.priorities.magicRes,
    curMagRes: state.charCreate.magOrResStat,
    curAttributes: state.charCreate.attributes
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick(newMagResStat, curAttributes) {
      let newAttsObj = JSON.parse(JSON.stringify(curAttributes))
      let statToAdd = newMagResStat.stat
      let newSpecialStats = Object.assign({}, newAttsObj.special, statToAdd)
      let newAttStats = Object.assign({}, newAttsObj, {special: newSpecialStats})
      console.log("newAttStst", newAttStats)
      dispatch(changeAttributes(newAttStats))
      dispatch(changeMagRes(newMagResStat))
    }
  }
}

export default withStyles(styles)(connect(mapState, mapDispatch)(CharMagTechno))