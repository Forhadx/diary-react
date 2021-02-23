import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const addPostInit = () =>{
    return{
        type: actionTypes.ADD_POST_INIT
    }
}
export const addPostStart = () =>{
    return{
        type: actionTypes.ADD_POST_START
    }
}

export const addPostSuccess = (id, postData) =>{
    return{
        type: actionTypes.ADD_POST_SUCCESS,
        postId: id,
        postData: postData
    }
}

export const addPostFailed = (err) =>{
    return{
        type: actionTypes.ADD_POST_FAILED,
        error: err
    }
}

export const addPost = (postData, token) => {
   // console.log('token: ', token)
    return dispatch =>{
        dispatch( addPostStart() );
        axios.post('/diaryPosts.json?auth=' + token, postData)
            .then(response =>{
               // console.log('add success!!')
                dispatch( addPostSuccess(response.data.name, postData) );
            })
            .catch(err =>{
               // console.log('add error! ', err);
                dispatch( addPostFailed(err) );
            })
    }
}



export const fetchPostStart = () =>{
    return{
        type: actionTypes.FETCH_POST_START
    }
}

export const fetchPostSuccess = (postData) =>{
    return{
        type: actionTypes.FETCH_POST_SUCCESS,
        postData: postData
    }
}


export const fetchPostFailed = (err) =>{
    return{
        type: actionTypes.FETCH_POST_FAILED,
        error: err
    }
}

export const fetchPost = (token, userId) =>{
    const queryParams = "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
    return dispatch =>{
        dispatch( fetchPostStart() );
        axios.get('/diaryPosts.json' + queryParams)
            .then(response =>{
                const fetchPosts = [];
                for(let key in response.data){
                    fetchPosts.push({
                        ...response.data[key],
                        id: key
                    })
                }
               // console.log('post action: ',fetchPosts);
                dispatch( fetchPostSuccess(fetchPosts) );
            })
            .catch(err =>{
                dispatch( fetchPostFailed(err) );
            })
    }
}



export const deletePostStart = () =>{
    return{
        type: actionTypes.DELETE_POST_START
    }
}

export const deletePostSuccess = (pId) =>{
    return{
        type: actionTypes.DELETE_POST_SUCCESS,
        pId: pId
    }
}


export const deletePostFailed = (err) =>{
    return{
        type: actionTypes.DELETE_POST_FAILED,
        error: err
    }
}

export const deletePost = (pId, token) =>{
    return dispatch =>{
        dispatch( deletePostStart() );
        axios.delete(`/diaryPosts/${pId}.json?auth=${token}`)
            .then(response =>{
                dispatch( deletePostSuccess(pId) );
            })
            .catch(err =>{
                dispatch( deletePostFailed(err) );
            })
    }
}

export const updatePostInit = () =>{
    return{
        type: actionTypes.UPDATE_POST_INIT
    }
}

export const updatePostStart = () =>{
    return{
        type: actionTypes.UPDATE_POST_START
    }
}

export const updatePostSuccess = (postData) =>{
    return{
        type: actionTypes.UPDATE_POST_SUCCESS,
        postData: postData
    }
}


export const updatePostFailed = (err) =>{
    return{
        type: actionTypes.UPDATE_POST_FAILED,
        error: err
    }
}

export const updatePost = (pId, postData, token) =>{
    return dispatch =>{
        dispatch( updatePostStart() );
        axios.put(`/diaryPosts/${pId}.json?auth=${token}`, postData)
            .then(response =>{
                dispatch( updatePostSuccess(postData) );
            })
            .catch(err =>{
                dispatch( updatePostFailed(err) );
            })
    }
}


export const addLoveSuccess = (postData) =>{
    return{
        type: actionTypes.ADD_LOVE,
        postData: postData
    }
}


export const addLove = (pId, postData, token) =>{
    return dispatch =>{
        axios.put(`/diaryPosts/${pId}.json?auth=${token}`, postData)
            .then(response =>{
                dispatch( updatePostSuccess(postData) );
            })
            .catch(err =>{
                console.log('error in love: ', err);
            })
    }
}