const initState={
   user:null,
    error:null,
    userInfoList:[],
    userEdit:null,
    workxp:{},
    myapps:[],
    workList:[]
};

const userReducer = (state = initState, action) => {
    //console.log(action);
    switch (action.type) {
        case 'ON_LOGIN_SUCCESS':
            console.log('Am ajuns in reducer SUCCESS', action);
            return { ...state, user: action.user };
        case 'ON_LOGIN_ERROR':
            console.log('Am ajuns in reducer ERROR', action);
            return { ...state, error: action.error };
        case 'ON_LOGOUT':
              return { ...state, user: null };
        case 'GET_USERS_SUCCESS':
            return{...state,userInfoList:action.userInfoList};
        case 'GET_USERS_ERROR':
            return { ...state, error: action.error };
        case 'CREATE_USER_SUCCESS':
            return state;
        case 'CREATE_USER_FAILURE':
            return{...state,error:action.error};
        case 'DELETE_USER_SUCCESS':
            return state;
        case 'DELETE_USER_FAILURE':
            return{...state,error:action.error};
        case 'GET_USER_TO_EDIT':
            return{...state,userEdit:action.userEdit};
        case 'UPDATE_USER_SUCCESS':
            return state;
        case 'UPDATE_USER_FAILURE':
            return {...state,error:action.error};
        case 'CREATE_WORKXP_SUCCESS':
            return {...state,workxp:action.work};
        case 'CREATE_WORK_FAIL':
            return{...state,error:action.error};
        case 'GET_MY_APPS_SUCCESS':
            return{...state,myapps:action.myapps};
        case 'GET_WORK_SUCCESS':
            return{...state,workList:action.workList};
        default:
            return state;   
    }
};

export default userReducer;