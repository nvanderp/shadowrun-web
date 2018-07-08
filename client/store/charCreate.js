/**
 * ACTION TYPES
 */
const UPDATE_PRIORITIES = 'UPDATE_PRIORITIES'
const UPDATE_METATYPE = 'UPDATE_METATYPE'
const UPDATE_ATTRIBUTES = 'UPDATE_ATTRIBUTES'
const UPDATE_ATTPOINTS = 'UPDATE_ATTPOINTS'
const UPDATE_MAGRES = 'UPDATE_MAGRES'

/**
 * INITIAL STATE
 */
const defaultCharacter = {
  priorities: {       // grades
    'metatype': {},
    'attributes': 0,
    'magicRes': {}
  },
  metatype: {},
  attributes: {},
  allAttPoints: {
    attPoints: {
      max: 0,
      cur: 0,
      min: 0
    },
    specPoints: {
      max: 0,
      cur: 0,
      min: 0
    }
  },
  magOrResStat: {}
}

/**
 * ACTION CREATORS
 */
const updatePriorities = (view, grade) => ({type: UPDATE_PRIORITIES, view, grade})
const updateMetatype = metatype => ({type: UPDATE_METATYPE, metatype})
const updateAttributes = attributes => ({type: UPDATE_ATTRIBUTES, attributes})
const updateAttPoints = allAttPoints => ({type: UPDATE_ATTPOINTS, allAttPoints})
const updateMagRes = magOrResStat => ({type: UPDATE_MAGRES, magOrResStat})

export const changePriorities = (view, grade) =>
  dispatch =>
    dispatch(updatePriorities(view, grade))

export const changeMetatype = (metatype) =>
  dispatch =>
    dispatch(updateMetatype(metatype))

export const changeAttributes = (attributes) =>
  dispatch =>
    dispatch(updateAttributes(attributes))

export const changeAttPoints = (allAttPoints) =>
  dispatch =>
    dispatch(updateAttPoints(allAttPoints))

export const changeMagRes = (magOrResStat) =>
  dispatch =>
    dispatch(updateMagRes(magOrResStat))

export const baseMetatypeAttributes = {
  'human': {
    'physical': {
      'bod': {name: 'Body', min: 1, max: 6, cur: 1},
      'agi': {name: 'Agility', min: 1, max: 6, cur: 1},
      'rea': {name: 'Reaction', min: 1, max: 6, cur: 1},
      'str': {name: 'Strength', min: 1, max: 6, cur: 1}
    },
    'mental': {
      'wil': {name: 'Willpower', min: 1, max: 6, cur: 1},
      'log': {name: 'Logic', min: 1, max: 6, cur: 1},
      'int': {name: 'Intelligence', min: 1, max: 6, cur: 1},
      'cha': {name: 'Charisma', min: 1, max: 6, cur: 1}
    },
    'special': {
      'edg': {name: 'Edge',  min: 2, max: 7, cur: 2},
      'ess': {name: 'Essence', min: 1, max: 6, cur: 6}
    }
  },
  'elf': {
    'physical': {
      'bod': {name: 'Body', min: 1, max: 6, cur: 1 },
      'agi': {name: 'Agility', min: 2, max: 7, cur: 2 },
      'rea': {name: 'Reaction', min: 1, max: 6, cur: 1 },
      'str': {name: 'Strength', min: 1, max: 6, cur: 1 }
    },
    'mental': {
      'wil': {name: 'Willpower', min: 1, max: 6, cur: 1 },
      'log': {name: 'Logic', min: 1, max: 6, cur: 1 },
      'int': {name: 'Intelligence', min: 1, max: 6, cur: 1 },
      'cha': {name: 'Charisma', min: 3, max: 8, cur: 3 }
    },
    'special': {
      'edg': {name: 'Edge', min: 1, max: 6, cur: 1 },
      'ess': {name: 'Essence', min: 1, max: 6, cur: 6 }
    }
  },
  'dwarf': {
    'physical': {
      'bod': {name: 'Body', min: 3, max: 8, cur: 3 },
      'agi': {name: 'Agility', min: 1, max: 6, cur: 1 },
      'rea': {name: 'Reaction', min: 1, max: 5, cur: 1 },
      'str': {name: 'Strength', min: 3, max: 8, cur: 3 }
    },
    'mental': {
      'wil': {name: 'Willpower', min: 2, max: 7, cur: 2 },
      'log': {name: 'Logic', min: 1, max: 6, cur: 1 },
      'int': {name: 'Intelligence', min: 1, max: 6, cur: 1 },
      'cha': {name: 'Charisma', min: 1, max: 6, cur: 1 }
    },
    'special': {
      'edg': {name: 'Edge', min: 1, max: 6, cur: 1 },
      'ess': {name: 'Essence', min: 1, max: 6, cur: 6 }
    }
  },
  'ork': {
    'physical': {
      'bod': {name: 'Body', min: 4, max: 9, cur: 4 },
      'agi': {name: 'Agiliry', min: 1, max: 6, cur: 1 },
      'rea': {name: 'Reaction', min: 1, max: 6, cur: 1 },
      'str': {name: 'Strength', min: 3, max: 8, cur: 3 }
    },
    'mental': {
      'wil': {name: 'Willpower', min: 1, max: 6, cur: 1 },
      'log': {name: 'Logic', min: 1, max: 5, cur: 1 },
      'int': {name: 'Intelligence', min: 1, max: 6, cur: 1 },
      'cha': {name: 'Charisma', min: 1, max: 5, cur: 1 }
    },
    'special': {
      'edg': {name: 'Edge', min: 1, max: 6, cur: 1 },
      'ess': {name: 'Essence', min: 1, max: 6, cur: 6 }
    }
  },
  'troll': {
    'physical': {
      'bod': {name: 'Body', min: 5, max: 10, cur: 5 },
      'agi': {name: 'Agility', min: 1, max: 5, cur: 1 },
      'rea': {name: 'Reaction', min: 1, max: 6, cur: 1 },
      'str': {name: 'Strength', min: 5, max: 10, cur: 5 }
    },
    'mental': {
      'wil': {name: 'Willpower', min: 1, max: 6, cur: 1 },
      'log': {name: 'Logic', min: 1, max: 5, cur: 1 },
      'int': {name: 'Intelligence', min: 1, max: 5, cur: 1 },
      'cha': {name: 'Charisma', min: 1, max: 4, cur: 1 }
    },
    'special': {
      'edg': {name: 'Edge', min: 1, max: 6, cur: 1 },
      'ess': {name: 'Essence', min: 1, max: 6, cur: 6 }
    }
  }
}

export const priorities = {
  'A': {
    metatype: {defaultChoice: 'human-9',
      'human': {class: 'human-9', title: 'Human', points: 9},
      'elf': {class: 'elf-8', title: 'Elf', points: 8},
      'dwarf': {class: 'dwarf-7', title: 'Dwarf', points: 7},
      'ork': {class: 'ork-7', title: 'Ork', points: 7},
      'troll': {class: 'troll-5', title: 'Troll', points: 5}
    },
    attributes: 24,
    magTech: {
      magic: {
        stat: { 'mag': {name: 'Magic', min: 6, max: 6, cur: 6} },
        skills: {points: 2, rating: 5, type: 'magical'},
        spells: 10,
        title: 'Magician or Mystic Adept',
        text: 'Magic 6, two Rating 5 Magical skills, 10 spells'
      },
      techno: {
        stat: { 'res': {name: 'Resonance', min: 6, max: 6, cur: 6} },
        skills: {points: 2, rating: 5, type: 'resonance'},
        compForms: 5,
        title: 'Technomancer',
        text: 'Resonance 6, two Rating 5 Resonance skills, 5 complex forms'
      }
    }
  },
  'B': {
    metatype: {defaultChoice: 'human-7',
      'human': {class: 'human-7', title: 'Human', points: 7},
      'elf': {class: 'elf-6', title: 'Elf', points: 6},
      'dwarf': {class: 'dwarf-4', title: 'Dwarf', points: 4},
      'ork': {class: 'ork-4', title: 'Ork', points: 4},
      'troll': {class: 'troll-0', title: 'Troll', points: 0}
    },
    attributes: 20,
    magTech: {
      magic: {
        stat: { 'mag': {name: 'Magic', min: 4, max: 6, cur: 4} },
        skills: {points: 2, rating: 4, type: 'magical'},
        spells: 7,
        title: 'Magician or Mystic Adept',
        text: 'Magic 4, two Rating 4 Magical skills, 7 spells'
      },
      techno: {
        stat: { 'res': {name: 'Resonance', min: 4, max: 6, cur: 4} },
        skills: {points: 2, rating: 4, type: 'resonance'},
        compForms: 2,
        title: 'Technomancer',
        text: 'Resonance 4, two Rating 4 Resonance skills, 2 complex forms'
      },
      adept: {
        stat: { 'mag': {name: 'Magic', min: 6, max: 6, cur: 6} },
        skills: {points: 1, rating: 4, type: 'active'},
        title: 'Adept',
        text: 'Magic 6, one Rating 4 Active skill'
      },
      aspect: {
        stat: { 'mag': {name: 'Magic', min: 5, max: 6, cur: 5} },
        skills: {points: 1, rating: 4, type: 'magical'},
        title: 'Aspected Magician',
        text: 'Magic 5, one Rating 4 Magical skill'
      }
    }
  },
  'C': {
    metatype: {defaultChoice: 'human-5',
      'human': {class: 'human-5', title: 'Human', points: 5},
      'elf': {class: 'elf-3', title: 'Elf', points: 3},
      'dwarf': {class: 'dwarf-1', title: 'Dwarf', points: 1},
      'ork': {class: 'ork-0', title: 'Ork', points: 0}
    },
    attributes: 16,
    magTech: {
      magic: {
        stat: { 'mag': {name: 'Magic', min: 3, max: 6, cur: 3} },
        skills: {},
        spells: 5,
        title: 'Magician or Mystic Adept',
        text: 'Magic 3, 5 spells'
      },
      techno: {
        stat: { 'res': {name: 'Resonance', min: 3, max: 6, cur: 3} },
        skills: {},
        compForms: 1,
        title: 'Technomancer',
        text: 'Resonance 3, 1 complex form'
      },
      adept: {
        stat: { 'mag': {name: 'Magic', min: 4, max: 6, cur: 4} },
        skills: {points: 1, rating: 2, type: 'active'},
        title: 'Adept',
        text: 'Magic 4, one Rating 2 Active skill'
      },
      aspect: {
        stat: { 'mag': {name: 'Magic', min: 3, max: 6, cur: 3} },
        skills: {points: 1, rating: 2, type: 'magical'},
        title: 'Aspected Magician',
        text: 'Magic 3, one Rating 2 Magical skill group'
      }
    }
  },
  'D': {
    metatype: {defaultChoice: 'human-3',
      'human': {class: 'human-3', title: 'Human', points: 3},
      'elf': {class: 'elf-0', title: 'Elf', points: 0}
    },
    attributes: 14,
    magTech: {
      adept: {
        stat: { 'mag': {name: 'Magic', min: 2, max: 6, cur: 2} },
        skills: {},
        title: 'Adept',
        text: 'Magic 2'
      },
      aspect: {
        stat: { 'mag': {name: 'Magic', min: 3, max: 6, cur: 3} },
        skills: {points: 1, rating: 2, type: 'magical'},
        title: 'Aspected Magician',
        text: 'Magic 2'
      }
    }
  },
  'E': {
    metatype: {defaultChoice: 'human-1',
      'human': {class: 'human-1', title: 'Human', points: 1}
    },
    attributes: 12,
    magTech: {adept: {stat: null}}
  }
}

export const attPointsReset = (attValue) => {
  if (!attValue) attValue = 0
  return {max: attValue, cur: attValue, min: 0}
}

export const specPointsReset = (metaValue) => {
  if (!metaValue) metaValue = 0
  return {max: metaValue, cur: metaValue, min: 0}
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
      return Object.assign({}, state, {allAttPoints: action.allAttPoints})
    case UPDATE_MAGRES:
      return Object.assign({}, state, {magOrResStat: action.magOrResStat})
    default:
      return state
  }
}