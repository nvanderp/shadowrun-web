/**
 * ACTION TYPES
 */
const UPDATE_PRIORITIES = 'UPDATE_PRIORITIES'
const UPDATE_METATYPE = 'UPDATE_METATYPE'
const UPDATE_ATTRIBUTES = 'UPDATE_ATTRIBUTES'
const UPDATE_ATTPOINTS = 'UPDATE_ATTPOINTS'

/**
 * INITIAL STATE
 */
const defaultCharacter = {
  priorities: {       // grades
    'metatype': {},
    'attributes': 0
  },
  metatype: {},
  attributes: {
    bod: { min: 1, max: 6, cur: 1 },
    agi: { min: 1, max: 6, cur: 1 },
    rea: { min: 1, max: 6, cur: 1 },
    str: { min: 1, max: 6, cur: 1 },
    wil: { min: 1, max: 6, cur: 1 },
    log: { min: 1, max: 6, cur: 1 },
    int: { min: 1, max: 6, cur: 1 },
    cha: { min: 1, max: 6, cur: 1 },
    edg: { min: 2, max: 7, cur: 2 },
    ess: { min: 1, max: 6, cur: 6 }
  },
  attPoints: {
    max: 0,
    cur: 0,
    min: 0
  }
}

/**
 * ACTION CREATORS
 */
const updatePriorities = (view, grade) => ({type: UPDATE_PRIORITIES, view, grade})
const updateMetatype = metatype => ({type: UPDATE_METATYPE, metatype})
const updateAttributes = attributes => ({type: UPDATE_ATTRIBUTES, attributes})
const updateAttPoints = attPoints => ({type: UPDATE_ATTPOINTS, attPoints})

export const changePriorities = (view, grade) =>
  dispatch =>
    dispatch(updatePriorities(view, grade))

export const changeMetatype = (metatype) =>
  dispatch =>
    dispatch(updateMetatype(metatype))

export const changeAttributes = (attributes) =>
  dispatch =>
    dispatch(updateAttributes(attributes))

export const changeAttPoints = (attPoints) =>
  dispatch =>
    dispatch(updateAttPoints(attPoints))

export const baseMetatypeAttributes = {
  'human': { 
    bod: {name: 'Body', min: 1, max: 6, cur: 1},
    agi: {name: 'Agility', min: 1, max: 6, cur: 1},
    rea: {name: 'Reaction', min: 1, max: 6, cur: 1},
    str: {name: 'Strength', min: 1, max: 6, cur: 1},
    wil: {name: 'Willpower', min: 1, max: 6, cur: 1},
    log: {name: 'Logic', min: 1, max: 6, cur: 1},
    int: {name: 'Intelligence', min: 1, max: 6, cur: 1},
    cha: {name: 'Charisma', min: 1, max: 6, cur: 1},
    edg: {name: 'Edge',  min: 2, max: 7, cur: 2},
    ess: {name: 'Essence', min: 1, max: 6, cur: 6}
  },
  'elf': {
    bod: {name: 'Body', min: 1, max: 6, cur: 1 },
    agi: {name: 'Agility', min: 2, max: 7, cur: 2 },
    rea: {name: 'Reaction', min: 1, max: 6, cur: 1 },
    str: {name: 'Strength', min: 1, max: 6, cur: 1 },
    wil: {name: 'Willpower', min: 1, max: 6, cur: 1 },
    log: {name: 'Logic', min: 1, max: 6, cur: 1 },
    int: {name: 'Intelligence', min: 1, max: 6, cur: 1 },
    cha: {name: 'Charisma', min: 3, max: 8, cur: 3 },
    edg: {name: 'Edge', min: 1, max: 6, cur: 1 },
    ess: {name: 'Essence', min: 1, max: 6, cur: 6 }
  },
  'dwarf': {
    bod: {name: 'Body', min: 3, max: 8, cur: 3 },
    agi: {name: 'Agility', min: 1, max: 6, cur: 1 },
    rea: {name: 'Reaction', min: 1, max: 5, cur: 1 },
    str: {name: 'Strength', min: 3, max: 8, cur: 3 },
    wil: {name: 'Willpower', min: 2, max: 7, cur: 2 },
    log: {name: 'Logic', min: 1, max: 6, cur: 1 },
    int: {name: 'Intelligence', min: 1, max: 6, cur: 1 },
    cha: {name: 'Charisma', min: 1, max: 6, cur: 1 },
    edg: {name: 'Edge', min: 1, max: 6, cur: 1 },
    ess: {name: 'Essence', min: 1, max: 6, cur: 6 }
  },
  'ork': {
    bod: {name: 'Body', min: 4, max: 9, cur: 4 },
    agi: {name: 'Agiliry', min: 1, max: 6, cur: 1 },
    rea: {name: 'Reaction', min: 1, max: 6, cur: 1 },
    str: {name: 'Strength', min: 3, max: 8, cur: 3 },
    wil: {name: 'Willpower', min: 1, max: 6, cur: 1 },
    log: {name: 'Logic', min: 1, max: 5, cur: 1 },
    int: {name: 'Intelligence', min: 1, max: 6, cur: 1 },
    cha: {name: 'Charisma', min: 1, max: 5, cur: 1 },
    edg: {name: 'Edge', min: 1, max: 6, cur: 1 },
    ess: {name: 'Essence', min: 1, max: 6, cur: 6 }
  },
  'troll': {
    bod: {name: 'Body', min: 5, max: 10, cur: 5 },
    agi: {name: 'Agility', min: 1, max: 5, cur: 1 },
    rea: {name: 'Reaction', min: 1, max: 6, cur: 1 },
    str: {name: 'Strength', min: 5, max: 10, cur: 5 },
    wil: {name: 'Willpower', min: 1, max: 6, cur: 1 },
    log: {name: 'Logic', min: 1, max: 5, cur: 1 },
    int: {name: 'Intelligence', min: 1, max: 5, cur: 1 },
    cha: {name: 'Charisma', min: 1, max: 4, cur: 1 },
    edg: {name: 'Edge', min: 1, max: 6, cur: 1 },
    ess: {name: 'Essence', min: 1, max: 6, cur: 6 }
  }
}

// export const getAttributesStats = (metatype) => {
//   if (metatype) metatype = metatype.split('-')[0]
//   else metatype = 'human'
//   let stats
//   if (metatype === 'human') {
//     stats = {
//       bod: {name: 'Body', min: 1, max: 6, cur: 1 },
//       agi: {name: 'Agility', min: 1, max: 6, cur: 1 },
//       rea: {name: 'Reaction', min: 1, max: 6, cur: 1 },
//       str: {name: 'Strength', min: 1, max: 6, cur: 1 },
//       wil: {name: 'Willpower', min: 1, max: 6, cur: 1 },
//       log: {name: 'Logic', min: 1, max: 6, cur: 1 },
//       int: {name: 'Intelligence', min: 1, max: 6, cur: 1 },
//       cha: {name: 'Charisma', min: 1, max: 6, cur: 1 },
//       edg: {name: 'Edge',  min: 2, max: 7, cur: 2 },
//       ess: {name: 'Essence', min: 1, max: 6, cur: 6 }
//     }
//   }
//   else if (metatype === 'elf') {
//     stats = {
//       bod: { min: 1, max: 6, cur: 1 },
//       agi: { min: 2, max: 7, cur: 2 },
//       rea: { min: 1, max: 6, cur: 1 },
//       str: { min: 1, max: 6, cur: 1 },
//       wil: { min: 1, max: 6, cur: 1 },
//       log: { min: 1, max: 6, cur: 1 },
//       int: { min: 1, max: 6, cur: 1 },
//       cha: { min: 3, max: 8, cur: 3 },
//       edg: { min: 1, max: 6, cur: 1 },
//       ess: { min: 1, max: 6, cur: 6 }
//     }
//   }
//   else if (metatype === 'dwarf') {
//     stats = {
//       bod: { min: 3, max: 8, cur: 3 },
//       agi: { min: 1, max: 6, cur: 1 },
//       rea: { min: 1, max: 5, cur: 1 },
//       str: { min: 3, max: 8, cur: 3 },
//       wil: { min: 2, max: 7, cur: 2 },
//       log: { min: 1, max: 6, cur: 1 },
//       int: { min: 1, max: 6, cur: 1 },
//       cha: { min: 1, max: 6, cur: 1 },
//       edg: { min: 1, max: 6, cur: 1 },
//       ess: { min: 1, max: 6, cur: 6 }
//     }
//   }
//   else if (metatype === 'ork') {
//     stats = {
//       bod: { min: 4, max: 9, cur: 4 },
//       agi: { min: 1, max: 6, cur: 1 },
//       rea: { min: 1, max: 6, cur: 1 },
//       str: { min: 3, max: 8, cur: 3 },
//       wil: { min: 1, max: 6, cur: 1 },
//       log: { min: 1, max: 5, cur: 1 },
//       int: { min: 1, max: 6, cur: 1 },
//       cha: { min: 1, max: 5, cur: 1 },
//       edg: { min: 1, max: 6, cur: 1 },
//       ess: { min: 1, max: 6, cur: 6 }
//     }
//   }
//   else if (metatype === 'troll') {
//     stats = {
//       bod: { min: 5, max: 10, cur: 5 },
//       agi: { min: 1, max: 5, cur: 1 },
//       rea: { min: 1, max: 6, cur: 1 },
//       str: { min: 5, max: 10, cur: 5 },
//       wil: { min: 1, max: 6, cur: 1 },
//       log: { min: 1, max: 5, cur: 1 },
//       int: { min: 1, max: 5, cur: 1 },
//       cha: { min: 1, max: 4, cur: 1 },
//       edg: { min: 1, max: 6, cur: 1 },
//       ess: { min: 1, max: 6, cur: 6 }
//     }
//   }
//   return stats
// }

export const priorities = {
  'A': {
    metatype: {
      defaultChoice: 'human-9',
      'human': {
        class: 'human-9',
        title: 'Human',
        points: 9
      },
      'elf': {
        class: 'elf-8',
        title: 'Elf',
        points: 8
      },
      'dwarf': {
        class: 'dwarf-7',
        title: 'Dwarf',
        points: 7
      },
      'ork': {
        class: 'ork-7',
        title: 'Ork',
        points: 7
      },
      'troll': {
        class: 'troll-5',
        title: 'Troll',
        points: 5
      }
    },
    attributes: 24
  },
  'B': {
    metatype: {
      defaultChoice: 'human-7',
      'human': {
        class: 'human-7',
        title: 'Human',
        points: 7
      },
      'elf': {
        class: 'elf-6',
        title: 'Elf',
        points: 6
      },
      'dwarf': {
        class: 'dwarf-4',
        title: 'Dwarf',
        points: 4
      },
      'ork': {
        class: 'ork-4',
        title: 'Ork',
        points: 4
      },
      'troll': {
        class: 'troll-0',
        title: 'Troll',
        points: 0
      }
    },
    attributes: 20
  }
}

export const attPointsReset = (metaValue, attValue) => {
  if (!metaValue) metaValue = 0
  if (!attValue) attValue = 0
  let total = metaValue + attValue
  return {max: total, cur: total, min: 0}
}

/**
 * REDUCER
 */
export default function (state = defaultCharacter, action) {
  switch (action.type) {
    case UPDATE_PRIORITIES:
      return { ...state, priorities: {...state.priorities, [action.view]: action.grade }}
    case UPDATE_METATYPE:
      return Object.assign({}, state, {metatype: action.metatype})
    case UPDATE_ATTRIBUTES:
      return Object.assign({}, state, {attributes: action.attributes})
    case UPDATE_ATTPOINTS:
      return Object.assign({}, state, {attPoints: action.attPoints})
    default:
      return state
  }
}