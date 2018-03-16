import http from '../config/http';
import {push } from 'react-router-redux';


export const onGetCompaniesSuccess=(companyInfoList)=>{
    return{type:'GET_COMPANIES_SUCCESS',companyInfoList};
};

export const onGetCompaniesFailure=(error)=>{
    return { type: 'GET_COMPANIES_ERROR', error };
};

export const getCompanies=()=>{
    const userId= localStorage.getItem('id');
    return(dispatch)=> {
        http.get(`/companies/user/${userId}`).then(response => {
            dispatch(onGetCompaniesSuccess(response.data));
        })
            .catch((error) => dispatch(onGetCompaniesFailure(error)));
    };
};

export const onCreateCompanySuccess=(company)=>{

    return {type:'CREATE_COMPANY_SUCCESS'};
};

export const onCreateCompanyFailure=(error)=>{
    return{type:'CREATE_COMPANY_FAILURE',error};
};

export const createCompany=(company)=>{
    const userId= localStorage.getItem('id');
    company.userId=userId;

    return(dispatch)=> {
        http.post('/companies', company)
            .then((response) => {
                dispatch(onCreateCompanySuccess(response.data));
                dispatch(getCompanies());
            })
            .catch((error) => dispatch(onCreateCompanyFailure(error)));
    }
};

export const onDeleteCompanySuccess=()=>{
    return {type:'DELETE_COMPANY_SUCCESS'};
};

export const onDeleteCompanyFailure=(error)=>{
    return{type:'DELETE_COMPANY_FAILURE',error};
};

export const deleteCompany=(compId)=>{
    return(dispatch)=>{
        http.delete(`/companies/${compId}/`,compId).then(response => {
            dispatch(onDeleteCompanySuccess());
            dispatch(getCompanies());
        })
            .catch((error) =>  dispatch(onDeleteCompanyFailure(error)));
    }
};

export const getEditCompany=(compEdit)=>{
    return{type:'GET_COMPANY_TO_EDIT',compEdit};
};

export const onUpdateCompanySuccess=()=>{
    return {type:'UPDATE_COMPANY_SUCCESS'};
};

export const onUpdateCompanyFailure=(error)=>{
    return{type:'UPDATE_COMPANY_FAILURE',error};
};

export const updateCompany=(compEdit)=>{
    return (dispatch)=>
    {
        http.put(`companies/${compEdit.id}`, compEdit)
            .then(response => {
                dispatch(onUpdateCompanySuccess());
                dispatch(getCompanies());
            })

            .catch(e => dispatch(onUpdateCompanyFailure(e)));
    }
};

export const onCompanyDetailsSuccess=()=>{
    return{type:'TO_COMPANY_DETAILS_SUCCESS'}
};

export const goToCompanyDetails=(comp)=>{
    localStorage.setItem('companyId',comp.id);
    const compId= localStorage.getItem('companyId');

    return (dispatch)=>{
        dispatch(push(`/companies/${compId}`));
        dispatch(onCompanyDetailsSuccess());
    };
};

export const onGetCompanyDetailsSuccess=(comp)=>{
    return{type:'GET_COMPANY_DETAILS_SUCCESS',comp}
};

export const onGetCompanyDetailsFailure=(error)=>{
    return{type:'GET_COMPANY_DETAILS_FAILURE',error}
};

export const getCompDetail=(compId)=>{
    return(dispatch)=> {
        http.get(`/companies/${compId}/${true}`)
            .then(response => {
            dispatch(onGetCompanyDetailsSuccess(response.data));
            })
            .catch((error) => dispatch(onGetCompanyDetailsFailure(error)));
    }
};