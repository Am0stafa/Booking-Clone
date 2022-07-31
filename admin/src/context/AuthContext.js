import { createContext,useEffect,useReducer} from "react"
const INITIAL_STATE = {
     user:JSON.parse(localStorage.getItem('user')) || null,
     loading:false,
     error:null,
     add:false
}

export const AuthContext = createContext(INITIAL_STATE)

const AuthReducer=(state,action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                 user:null,
                 loading:true,
                 error:null,
                 add:false
            }
        case "LOGIN_SUCCESS":
            return {
                 user:action.payload,
                 loading:false,
                 error:null,
                 add:true
            }
        case "LOGIN_FAILURE":
            return {
                 user:null,
                 loading:false,
                 error:action.payload,
                 add:false
            }
        case "LOGOUT":
            return {
                 user:null,
                 loading:false,
                 error:null,
                 add:false
            }
        default:
            return state  
    }
}

export const AuthContextProvider=({children}) =>{
    const [state,dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    
    useEffect(() => {
        localStorage.setItem('user',JSON.stringify(state.user))
    }, [state.user]);

    return(
        <AuthContext.Provider value={{user:state.user,loading:state.loading,error:state.error,dispatch,add:state.add}}>
            {children}
        </AuthContext.Provider>
    )

}