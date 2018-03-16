
const initState={
    company:{name:''},
    error:null,
    companyInfoList:[],
    compEdit:null,
    jobCompanyList:[],
};

const companyReducer = (state = initState, action) => {
    console.log(action);
    switch (action.type) {
        case 'GET_COMPANIES_SUCCESS':
            return{...state,companyInfoList:action.companyInfoList};
        case 'GET_COMPANIES_ERROR':
            return { ...state, error: action.error };
        case 'CREATE_COMPANY_SUCCESS':
            return{...state,company:action.company};
        case 'CREATE_COMPANY_FAILURE':
            return{...state,error:action.error};
        case 'DELETE_COMPANY_SUCCESS':
            return state;
        case 'DELETE_COMPANY_FAILURE':
            return{...state,error:action.error};
        case 'GET_COMPANY_TO_EDIT':
            return{...state,compEdit:action.compEdit};
        case 'UPDATE_COMPANY_SUCCESS':
            return state;
        case 'UPDATE_COMPANY_FAILURE':
            return {...state,error:action.error};
        case 'TO_COMPANY_DETAILS_SUCCESS':
            return state;
        case 'GET_COMPANY_DETAILS_SUCCESS':
            return {...state,company:action.comp};

        case 'GET_COMPANY_DETAILS_FAILURE':
            return {...state,error:action.error};
        default:
            return state;
    }
};

export default companyReducer;