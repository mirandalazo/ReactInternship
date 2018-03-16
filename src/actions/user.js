import http from '../config/http';
import {push } from 'react-router-redux';


export const onLogin = (user) => {
     return (dispatch) => {
        http.post('/users/login', user)
        .then( (response)=> {
         localStorage.setItem('user',JSON.stringify(response.data));
         localStorage.setItem('id',response.data.id);
         localStorage.setItem('role',response.data.userRoleId);

       if(response.data.userRoleId == 1)
           dispatch(push('/users'));
        else if(response.data.userRoleId == 2)
            dispatch(push('/companies'));
       else if(response.data.userRoleId == 3)
           dispatch(push('/alljobs'));

    dispatch(onLoginSuccess(response.data));
})
  .catch((error)=>dispatch(onLoginFailure(error)));    
     };
};

export const onLoginSuccess = (user) => {
    return { type: 'ON_LOGIN_SUCCESS', user };
};

export const onLoginFailure = (error) => {
    return { type: 'ON_LOGIN_ERROR', error };
};

export const handleLogout=()=>{
     localStorage.removeItem('id');
     localStorage.removeItem('role');
     localStorage.removeItem('companyId');
     localStorage.removeItem('user');

     return { type: 'ON_LOGOUT'};
};

export const onAppInit=()=>{
    return(dispatch)=>
    {
        const user = localStorage.getItem('user');
        if (user)
           dispatch(onLoginSuccess(JSON.parse(user)));
    }
};

export const onGetUsersSuccess=(userInfoList)=>{
    return{type:'GET_USERS_SUCCESS',userInfoList};
};

export const onGetUsersFailure=(error)=>{
    return { type: 'GET_USERS_ERROR', error };
};

export const getUsers=()=>{
    return(dispatch)=> {
        http.get('/users/').then(response => {
            dispatch(onGetUsersSuccess(response.data));
        })
            .catch((error) => dispatch(onGetUsersFailure(error)));
         };
};

export const onCreateUserSuccess=(user)=>{
    return {type:'CREATE_USER_SUCCESS'};
};

export const onCreateUserFailure=(error)=>{
    return{type:'CREATE_USER_FAILURE',error};
};

export const createUser=(user)=>{
    return(dispatch)=> {
        http.post('/users', user)
            .then((response) => {
                dispatch(onCreateUserSuccess(response.data));
                dispatch(getUsers());
            })
            .catch((error) => dispatch(onCreateUserFailure(error)));
    }
};

export const regUser=(user)=>{
    return(dispatch)=> {
        user.userRoleId=3;
        http.post('/users', user)
            .then((response) => {
                dispatch(onCreateUserSuccess(response.data));
                if(response.data.userRoleId == 3)
                    dispatch(push('/'));
            })
            .catch((error) => dispatch(onCreateUserFailure(error)));
    }
};

export const onDeleteUserSuccess=()=>{
    return {type:'DELETE_USER_SUCCESS'};
};

export const onDeleteUserFailure=(error)=>{
    return{type:'DELETE_USER_FAILURE',error};
};
export const deleteUser=(userId)=>{
    return(dispatch)=>{
        http.delete(`/users/${userId}/`,userId).then(response => {
           dispatch(onDeleteUserSuccess());
           dispatch(getUsers());
        })
            .catch((error) =>  dispatch(onDeleteUserFailure(error)));
    }
};

export const getEditUser=(userEdit)=>{
    return{type:'GET_USER_TO_EDIT',userEdit};
};

export const onUpdateUserSuccess=()=>{
    return {type:'UPDATE_USER_SUCCESS'};
};

export const onUpdateUserFailure=(error)=>{
    return{type:'UPDATE_USER_FAILURE',error};
};

export const updateUser=(userEdit)=>{
    return (dispatch)=>
    {
        http.put(`users/${userEdit.id}`, userEdit)
            .then(response => {
                dispatch(onUpdateUserSuccess());
                dispatch(getUsers());
            })

            .catch(e => dispatch(onUpdateUserFailure(e)));
    }
};

export const getWorkXp=()=>{
    const userId= localStorage.getItem('id');

    return async(dispatch)=>{
        try{
            const response = http.get(`/userworkexperiences/user/${userId}`);
            const workList = response.data;
            dispatch(onGetWorkSuccess(workList));
        }
        catch(e){}
    }
};

export const onGetWorkSuccess=(workList)=>{
    return{type:'GET_WORK_SUCCESS',workList}
};

export const onCreateWorkXPSuccess=(work)=>{
    return{type:'CREATE_WORKXP_SUCCESS',work}
};

export const onCreateWorkFail=(error)=>{
    return{type:'CREATE_WORK_FAIL',error}
};

export const createWorkXp=(workxpList)=>{
    const userId=localStorage.getItem('id');

    return async (dispatch)=> {
        try {
            const response= await http.get(`/users/${userId}/true`);
            const user=response.data;
            user.userWorkExperienceInfoList = workxpList;

            if(user.id) {
                for (let i = 0; i < user.userWorkExperienceInfoList.workxpList.length; i++) {
                    const work = user.userWorkExperienceInfoList.workxpList[i];
                    work.userId = userId;

                    await http.post('/userworkexperiences', work);
                    dispatch(onCreateWorkXPSuccess(work));
                    window.alert("Work xp created!");
                    dispatch(getWorkXp());
                }
            }

        }
        catch(error){
            dispatch(onCreateWorkFail(error));
        }
    }
};

export const createEducation=(educationList)=>{
    const userId=localStorage.getItem('id');

    return async (dispatch)=> {
        try {
            const response= await http.get(`/users/${userId}/true`);
            const user=response.data;
            user.userEducationInfoList = educationList;

            if(user.id) {
                for (let i = 0; i < user.userEducationInfoList.educationList.length; i++) {
                    const education = user.userEducationInfoList.educationList[i];
                    education.userId = userId;

                    await http.post('/usereducations',education);
                    dispatch(onCreateWorkXPSuccess(education));
                    window.alert("Education created!");
                }
            }

        }
        catch(error){
            dispatch(onCreateWorkFail(error));
        }
    }
};

export const onGetMyAppsSuccess=(myapps)=>{
    return{type:'GET_MY_APPS_SUCCESS',myapps}
};

export const getMyApps=()=>{
    const userId= localStorage.getItem('id');
    return async(dispatch)=>{
        try {
            const response = await http.get(`/userjobapplications/user/${userId}`);
            dispatch(onGetMyAppsSuccess(response.data));
        }
        catch(e){}
    }
};