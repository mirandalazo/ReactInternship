const initState={
    job:null,
    error:null,
    jobInfoList:[],
    jobEdit:null,
    isAvailable:true,
    jobDetail:null,
    jobReqList:[],
    jobBenefList:[],
    apps:[],
    isAccepted:false,
    disabled:false,
    companyJobList:[]
};

const jobReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CLOSE_JOB_FOR_EDIT':
            return { ...state, jobEdit: null };
        case 'CREATE_JOB_SUCCESS':
            return state;
        case 'CREATE_JOB_FAILURE':
            return{...state,error:action.error};
        case 'GET_JOBS_SUCCESS':
            return{...state,jobInfoList:action.jobInfoList};
        case 'GET_JOBS_ERROR':
            return { ...state, error: action.error };
        case 'DELETE_JOB_SUCCESS':
            return {...state, companyJobList:state.companyJobList.splice(state.companyJobList.indexOf(action.job),1)};
        case 'DELETE_JOB_FAILURE':
            return{...state,error:action.error};
        case 'GET_JOB_TO_EDIT':
            return{...state,jobEdit:action.jobEdit};
        case 'UPDATE_JOB_SUCCESS':
            return state;
        case 'UPDATE_JOB_FAILURE':
            return {...state,error:action.error};
        case 'SWITCH_AVAILABILITY':
            return{...state, isAvailable:action.job.isAvailable};
        case 'TO_JOB_DETAILS_SUCCESS':
            return state;
        case 'GET_JOB_DETAIL_SUCCESS':
            return{...state,jobDetail:action.jobDetail};
        case 'GET_JOB_DETAIL_FAILURE':
            return{...state,error:action.error};
        case 'CREATE_JOB_REQ_SUCCESS':
            return state;
        case 'CREATE_JOB_REQ_FAILURE':
            return{...state,error:action.error};
        case 'GET_JOB_REQ_SUCCESS':
            return{...state,jobReqList:action.jobReqs};
        case 'GET_JOB_REQ_FAILURE':
            return{...state,error:action.error};
        case 'CREATE_JOB_BENEFIT_SUCCESS':
            return state;
        case 'CREATE_JOB_BENEFIT_FAILURE':
            return{...state,error:action.error};
        case 'GET_JOB_BENEFITS_SUCCESS':
            return{...state,jobBenefList:action.jobBenefits};
        case 'GET_JOB_BENEFITS_FAILURE':
            return{...state,error:action.error};
        case 'CREATE_JOB_APP_SUCCESS':
            return state;
        case 'CREATE_JOB_APP_FAILURE':
            return{...state,error:action.error};
        case 'GET_JOB_APPS_SUCCESS':
            return {...state,apps:action.apps};
        case 'GET_JOB_APPS_FAILURE':
            return{...state,error:action.error};
        case 'GET_COMPANY_JOBS_SUCCESS':
            return {...state,companyJobList:action.compJobs};
        case 'GET_COMPANY_JOBS_FAILURE':
            return{...state,error:action.error};
        case 'SWITCH_ACCEPTED':
            return{...state, isAccepted:action.accept};
        case 'UPDATE_APP_SUCCESS':
            return state;
        case 'DISABLE_SUCCESS':
            return {...state,disabled:action.disabled};
        case 'DELETE_REQ_SUCCESS':
            return state;
        case 'DELETE_BENEFIT_SUCCESS':
            return state;
        default:
            return state;   
    }
};

export default jobReducer;