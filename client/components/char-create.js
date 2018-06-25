import React from 'react'
import { connect } from 'react-redux'
import { CharPriorities } from './index.js'

/**
 * COMPONENT
*/

// likely where the curCharacter will be submitted finally

export const CharCreate = (props) => {
  // const { currentChar} = props
  return (
    <div className="char-create-container">
      <CharPriorities />
    </div>
  )
}

const mapState = (state) => {
  return {
    currentChar: state.charCreate
  }
}

export default connect(mapState)(CharCreate)
