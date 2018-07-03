import React from 'react'
import RadioButton from '@material-ui/core/Radio'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { 
  changeMagRes
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
  const { curOptions, curMagRes, handleClick, classes } = props
  let magResArray = Object.entries(curOptions)
  console.log('magResArray', curOptions)
  return (
    <div>
      <div className="priority-form">
        {
          magResArray.map((key) => {
            return (
              <div key={key[1].title}>
                <RadioButton
                  checked={curMagRes.text === key[1].text}
                  onClick={() => {handleClick(key[1])}}
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
    curMagRes: state.charCreate.magOrResStat
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick(newMagResStat) {
      console.log('newMagResStat', newMagResStat)
      dispatch(changeMagRes(newMagResStat))
    }
  }
}

export default withStyles(styles)(connect(mapState, mapDispatch)(CharMagTechno))