import http from '../config/http';
import * as companyActions from "./company";
import {push} from "react-router-redux";


export const onGetJobsSuccess=(jobInfoList)=>{
    return{type:'GET_JOBS_SUCCESS',jobInfoList};
};

export const onGetJobsFailure=(error)=>{
    return { type: 'GET_JOBS_ERROR', error };
};

export const getJobs=()=>{
    return(dispatch)=> {
        http.get(`/jobs`).then(response => {
            dispatch(onGetJobsSuccess(response.data));
        })
            .catch((error) => dispatch(onGetJobsFailure(error)));
    };
};

export const onCreateJobSuccess=()=>{
    return {type:'CREATE_JOB_SUCCESS'};
};

export const onCreateJobFailure=(error)=>{
    return{type:'CREATE_JOB_FAILURE',error};
};

export const createJob=(job)=>{
    job.isAvailable='true';

    return async (dispatch)=> {
        try {
                const response = await http.post('/jobs', job);
                const jobId = response.data.id;

                if (job.jobReqList) {
                    for (let i = 0; i < job.jobReqList.length; i++) {
                        const req = job.jobReqList[i];
                        req.jobId = jobId;
                        await  http.post('/jobrequirements', req);
                    }
                }
                if (job.jobBenefList) {
                    for (let i = 0; i < job.jobBenefList.length; i++) {
                        const benefit = job.jobBenefList[i];
                        benefit.jobId = jobId;
                        await http.post('/jobbenefits', benefit);
                    }
                }

            dispatch(onCreateJobSuccess());
            dispatch(getCompanyJobs());
            dispatch(companyActions.getCompanies());
            dispatch(getReq());
            dispatch(getBenefits());
            dispatch(getReq());
        }
        catch (error) {
            dispatch(onCreateJobFailure(error));
        }
    }
};

export const onGetCompanyJobsSuccess=(compJobs)=>{
    return{type:'GET_COMPANY_JOBS_SUCCESS',compJobs}
};

export const onGetCompanyJobsFailure=(error)=>{
    return{type:'GET_COMPANY_JOBS_FAILURE'}
};

export const getCompanyJobs=()=>{
    const compId=localStorage.getItem('companyId');
    return(dispatch)=> {
        http.get(`/companies/${compId}/${true}`)
            .then(response => {
                dispatch(onGetCompanyJobsSuccess(response.data.jobInfoList));
            })
            .catch((error) => dispatch(onGetCompanyJobsFailure(error)));
    }
};

export const onDeleteJobSuccess=(job)=>{
    return {type:'DELETE_JOB_SUCCESS',job};
};

export const onDeleteJobFailure=(error)=>{
    return{type:'DELETE_JOB_FAILURE',error};
};
export const deleteJob=(job)=>{
    return(dispatch)=>{
        http.delete(`/jobs/${job.id}/`,job.id).then(response => {
            dispatch(onDeleteJobSuccess(job));
            dispatch(getCompanyJobs());
        })
            .catch((error) =>  dispatch(onDeleteJobFailure(error)));
    }
};

export const getEditJobSuccess=(jobEdit)=>{
    return{type:'GET_JOB_TO_EDIT',jobEdit};
};

export const getEditJob=(jobEdit)=> {
    const userId=localStorage.getItem('id');

    return async (dispatch) => {
        try {
            const jobId = jobEdit.id;
            const response = await http.get(`/jobs/${jobId}`);
            jobEdit.name = response.data.name;
            jobEdit.description = response.data.description;

            if (jobEdit.id) {
                const response = await http.get(`/jobrequirements/job/${jobId}`);
                jobEdit.jobReqList = response.data;
            }

            if (jobEdit.id) {
                const response = await http.get(`/jobbenefits/job/${jobId}`);
                jobEdit.jobBenefList = response.data;
            }
            if(jobEdit.id){
                const responde = await http.get(`/companies/user/${userId}`);
                jobEdit.companies=responde.data;
            }
            dispatch(getEditJobSuccess(jobEdit));
        }
        catch (error) {
        }
    };
};

export const onUpdateJobSuccess=()=>{
    return {type:'UPDATE_JOB_SUCCESS'};
};

export const onUpdateJobFailure=(error)=>{
    return{type:'UPDATE_JOB_FAILURE',error};
};

export const updateJob=(jobEdit)=>{
    return async(dispatch)=>
    {
        try {
            http.put(`jobs/${jobEdit.id}`, jobEdit);

            if (jobEdit.jobBenefList) {
                for (let i = 0; i < jobEdit.jobBenefList.length; i++) {
                    const benefit = jobEdit.jobBenefList[i];
                    await http.put(`/jobbenefits/${benefit.id}`, benefit);
                }
            }

            if (jobEdit.jobReqList) {
                for (let i = 0; i < jobEdit.jobReqList; i++) {
                    const req = jobEdit.jobReqList[i];
                    await http.put(`/jobrequirements/${req.id}`, req);
                }
            }
            dispatch(onUpdateJobSuccess());
            dispatch(companyActions.getCompanies());
            dispatch(getJobs());
            dispatch(getBenefits());
            dispatch(getReq());
        }
            catch(e){
                dispatch(onUpdateJobFailure(e))
            }
    }
};

export const checkAv=(job)=>{
    if(job.isAvailable===true) {
        job.isAvailable = false;
    }
    else job.isAvailable=true;
    return{type:'SWITCH_AVAILABILITY',job}
};

export const getAllJobs=()=>{
    return(dispatch)=> {
        http.get(`/jobs`).then(response => {
            dispatch(onGetJobsSuccess(response.data));
        })
            .catch((error) => dispatch(onGetJobsFailure(error)));
    };
};

export const onJobDetailSuccess=()=>{
    return{type:'TO_JOB_DETAILS_SUCCESS'}
};

export const goToJobDetail=(job)=>{
    localStorage.setItem('jobId',job.id);
    const jobId= localStorage.getItem('jobId');

    return (dispatch)=>{
        dispatch(push(`/alljobs/${jobId}`));
        dispatch(onJobDetailSuccess());
    };
};

export const onGetJobDetailSuccess=(jobDetail)=>{
    return{type:'GET_JOB_DETAIL_SUCCESS',jobDetail}
};

export const onGetJobDetailFailure=(error)=>{
    return{type:'GET_JOB_DETAIL_FAILURE',error}
};

export const getJobDetail=(jobId)=>{
    return(dispatch)=> {
        http.get(`/jobs/${jobId}`).then(response => {
            dispatch(onGetJobDetailSuccess(response.data));
        })
            .catch((error) => dispatch(onGetJobDetailFailure(error)));
    };
};

export const getJob=(job)=>{
    localStorage.setItem('jobId',job.id);
    const jobId= localStorage.getItem('jobId');

    return (dispatch)=>{
        dispatch(push(`/jobDetail`));
        dispatch(onJobDetailSuccess());
        http.get(`/jobs/${jobId}`).then(response => {
            dispatch(onGetJobDetailSuccess(response.data));
        })
            .catch((error) => dispatch(onGetJobDetailFailure(error)));
    };
};

export const onCreateJobReqSuccess=()=>{
    return{type:'CREATE_JOB_REQ_SUCCESS'}
};

export const onCreateJobReqFailure=(error)=>{
    return{type:'CREATE_JOB_REQ_FAILURE',error}
};

export const addReq=(req)=>{
    const jobid=localStorage.getItem('jobId');
    req.jobId=jobid;
    return(dispatch)=> {
        http.post('/jobrequirements', req)
            .then((response) => {
                dispatch(onCreateJobReqSuccess());
                dispatch(getReq());

            })
            .catch((error) => dispatch(onCreateJobReqFailure(error)));
    }
};

export const onCreateJobBenefitSuccess=()=>{
    return{type:'CREATE_JOB_BENEFIT_SUCCESS'}
};

export const onCreateJobBenefitFailure=(error)=>{
    return{type:'CREATE_JOB_BENEFIT_FAILURE',error}
};

export const addBenefit=(benefit)=>{
    const jobid=localStorage.getItem('jobId');
    benefit.jobId=jobid;

    return(dispatch)=> {
        http.post('/jobbenefits', benefit)
            .then((response) => {
                dispatch(onCreateJobBenefitSuccess());
                dispatch(getBenefits());
            })
            .catch((error) => dispatch(onCreateJobBenefitFailure(error)));
    }
};

export const onGetJobReqSuccess=(jobReqs)=> {
    return{type:'GET_JOB_REQ_SUCCESS',jobReqs}
};

export const onGetJobReqFailure=(error)=> {
    return{type:'GET_JOB_REQ_FAILURE',error}
};

export const getReq=()=>{
    const jobId=localStorage.getItem('jobId');
    return(dispatch)=>{
        http.get(`/jobrequirements/job/${jobId}`).then(response => {
            dispatch(onGetJobReqSuccess(response.data));
        })
            .catch((error) => dispatch(onGetJobReqFailure(error)));
    };
};

export const onGetJobBenefitsSuccess=(jobBenefits)=> {
    return{type:'GET_JOB_BENEFITS_SUCCESS',jobBenefits}
};

export const onGetJobBenefitsFailure=(error)=> {
    return{type:'GET_JOB_BENEFITS_FAILURE',error}
};

export const getBenefits=()=>{
    const jobId=localStorage.getItem('jobId');
    return(dispatch)=>{
        http.get(`/jobbenefits/job/${jobId}`).then(response => {
            dispatch(onGetJobBenefitsSuccess(response.data));
        })
            .catch((error) => dispatch(onGetJobBenefitsFailure(error)));
    };
};

export const onCreateJobAppSuccess=()=>{
    return{type:'CREATE_JOB_APP_SUCCESS'}
};

export const onCreateJobAppFailure=(error)=>{
    return{type:'CREATE_JOB_APP_FAILURE',error}
};

export const sendApp=(app)=>{
    const jobId=localStorage.getItem('jobId');
    app.jobId=jobId;
    const userId=localStorage.getItem('id');
    app.userId=userId;

    return(dispatch)=> {
        http.post('/userjobapplications', app)
            .then(response => {
                dispatch(onCreateJobAppSuccess());
            })
            .catch(error => dispatch(onCreateJobAppFailure(error)));
    }
};

export const onGetJobAppsSuccess=(apps)=>{
    return{type:'GET_JOB_APPS_SUCCESS',apps};

};

export const onGetJobAppsFailure=(error)=>{
    return{type:'GET_JOB_APPS_FAILURE',error}
};

export const getApps=()=>{
    const jobId=localStorage.getItem('jobId');

    return async (dispatch)=>{
        try {
            const response = await http.get(`/userjobapplications/job/${jobId}`);

            for (let i = 0; i < response.data.length; i++) {
                const jobApp = response.data[i];
                const userId = jobApp.userId;
                const detailUserInfo = await http.get(`/users/${userId}/true`);
                response.data[i].userDetailInfo = detailUserInfo.data;
            }
            dispatch(onGetJobAppsSuccess(response.data));
        }
        catch (error) {
            dispatch(onGetJobAppsFailure(error));
        }
    };
};

export const putApp=(app)=>{
    return async (dispatch) => {
        try {
            const response = await http.put(`/userjobapplications/${app.id}`, app);
            dispatch(onSuccessAccepted(response.data));
            dispatch(getApps());
        }
        catch (error) {
        }
    };
};

export const onSuccessAccepted=(app)=>{
    return{type:'UPDATE_APP_SUCCESS',app};
};

export const checkAccept=(app)=> {
    if (app.isAccepted == true)
        app.isAccepted == false;
    else app.isAccepted == true;

    const accept=app.isAccepted;
    return{type:'SWITCH_ACCEPTED',accept};
};

export const deleteReq=(req)=>{

    return async(dispatch)=>{
        try{
            await http.delete(`/jobrequirements/${req.id}`)
            dispatch(onDeleteReqSuccess());
        }
        catch(e){}
    }
};

export const onDeleteReqSuccess=()=>{
    return{type:'DELETE_REQ_SUCCESS'}
};

export const deleteBenefit=(benef)=>{

    return async(dispatch)=>{
        try{
            await http.delete(`/jobbenefits/${benef.id}`)
            dispatch(onDeleteBenefitSuccess());
        }
        catch(e){}
    }
};

export const onDeleteBenefitSuccess=()=>{
    return{type:'DELETE_BENEFIT_SUCCESS'}
};

export const closeEdit = () => ({ type: 'CLOSE_JOB_FOR_EDIT' });
