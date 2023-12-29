//state = { text: "" } :
// l'état initial de votre recherche est un objet avec une propriété text initialisée à une chaîne vide ("").
export function searchReducer(state = { text: "" }, action) {
  switch (action.type) {
    //return { ...state, ...action.payload } =>
    //permet de copier les states
    //et de modifier uniquement les champs modifiers
    //=> utile quand on a plusieurs états qui pevent venir : text:"maya", categorie:"schwender"...
    case "SEARCH_QUERY":
      return { ...state, ...action.payload };

    default:
      return state;
  }
}
