import { createContext,useReducer} from "react"
const INITIAL_STATE = {
     city:undefined,
     date:[],
     Options:{
        adult:undefined,
        children:undefined,
        room:undefined
     }
}

export const SearchContext = createContext(INITIAL_STATE)

const SearchReducer=(state,action) => {
    switch (action.type) {
        //? whenever we change the search value we will dispatch this item
        case "NEW_SEARCH":
            return action.payload
        case "RESET_SEARCH":
            return INITIAL_STATE
        default:
            return state  
    }
}

export const SearchContextProvider=({children}) =>{
    const [state,dispatch] = useReducer(SearchReducer, INITIAL_STATE);

    return(
        <SearchContext.Provider value={{city:state.city, date:state.date,Options:state.Options,dispatch}}>
            {children}
        </SearchContext.Provider>
    )

}