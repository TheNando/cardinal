import { Firebase } from './data'

// // const iArray = (array, index, item) =>
// //   Object.assign([...array], { [index]: { ...array[index], ...item } })
// const defaultElement = {
//   name: '',
//   contentType: '',
//   type: '',
//   style: {
//     top: 0,
//     left: 0,
//     width: 0,
//     height: 0,
//   },
// }

// export default {
//   assets: {
//     hide: () => ({
//       visible: false,
//     }),

//     show: () => ({
//       visible: true,
//     }),

//     upload: file => async (state, actions) => {
//       console.log(file)
//       // const ref = Firebase.child(file)
//     },
//   },

//   // Element
//   addElement: () => async ({ elements, template }, { setTemplate }) => {
//     const newElement = { name: `element${elements.length + 1}` }
//     const updateData = { elements: [...elements, newElement] }
//     await template.$ref.update(updateData)

//     setTemplate({ ...template, ...updateData })
//   },

//   backupElements: elements => ({ oElements: elements }),

//   deleteElement: index => async ({ elements, template }, { setTemplate }) => {
//     const updateData = (elements.splice(index, 1), { elements })
//     await template.$ref.update(updateData)

//     setTemplate({ ...template, ...updateData })
//   },

//   mouseElement: mouseIndex => ({ mouseIndex }),

//   restoreElements: () => ({ oElements }) => ({ elements: oElements }),

//   selectElement: selectedIndex => state => ({
//     selectedIndex,
//     element: { ...defaultElement, ...state.elements[selectedIndex] },
//   }),

//   updateElement: ({ ...partial }) => ({ elements, selectedIndex }) => {
//     const element = { ...elements[selectedIndex], ...partial }
//     return {
//       element,
//       elements: Object.assign([...elements], { [selectedIndex]: element }),
//     }
//   },

//   // Elements
//   setElements: elements => ({ elements }),

//   // SideBar
//   setTab: tab => ({ tab }),

//   // Template
//   fetchTemplate: match => async (
//     _,
//     { backupElements, setTemplate, setElements, selectElement }
//   ) => {
//     const template = await Firebase.doc('templates', match.params.templateId)
//     setTemplate(template)
//     setElements(template.elements)
//     backupElements(template.elements)
//     selectElement(0)
//   },

//   saveTemplate: () => ({ elements, template }) => {
//     template.$ref.update({ elements })
//   },

//   setTemplate: template => ({ template }),

//   // Templates
//   fetchTemplates: match => async (_, { setTemplates }) => {
//     const query = { owner: 'nando', game: match.params.gameId }
//     setTemplates(await Firebase.query('templates', query, 'name'))
//   },

//   setTemplates: templates => ({ templates }),
// }

const fetchGames = async store => {
  const games = await Firebase.list('games', 'name')
  store.updateStore({ games })
}

// Templates
const clearTemplates = store => store.updateStore({ templates: [] })

const fetchTemplates = async (store, match) => {
  const query = { owner: 'nando', game: match.params.gameId }
  const templates = await Firebase.query('templates', query, 'name')
  store.updateStore({ templates })
}

export { clearTemplates, fetchGames, fetchTemplates }