import * as actionTypes from './actionTypes';
import axios from '../../axios';


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

export const addPost = (postData) => {
    return dispatch =>{
        dispatch( addPostStart() );
        axios.post('/diaryPosts.json', postData)
            .then(response =>{
                //console.log('x',postData);
                dispatch( addPostSuccess(response.data.name, postData) );
            })
            .catch(err =>{
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

export const fetchPost = () =>{
    return dispatch =>{
        dispatch( fetchPostStart() );
        axios.get('/diaryPosts.json')
            .then(response =>{
                const fetchPosts = [];
                for(let key in response.data){
                    fetchPosts.push({
                        ...response.data[key],
                        id: key
                    })
                }
                console.log('x',fetchPosts);
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

export const deletePost = (pId) =>{
    return dispatch =>{
        dispatch( deletePostStart() );
        axios.delete(`/diaryPosts/${pId}.json`)
            .then(response =>{
                dispatch( deletePostSuccess(pId) );
            })
            .catch(err =>{
                dispatch( deletePostFailed(err) );
            })
    }
}


export const updatePostStart = () =>{
    return{
        type: actionTypes.UPDATE_POST_START
    }
}

export const updatePostSuccess = () =>{
    return{
        type: actionTypes.UPDATE_POST_SUCCESS
    }
}


export const updatePostFailed = (err) =>{
    return{
        type: actionTypes.UPDATE_POST_FAILED,
        error: err
    }
}

export const updatePost = (pId, postData) =>{
    return dispatch =>{
        dispatch( updatePostStart() );
        axios.put(`/diaryPosts/${pId}.json`, postData)
            .then(response =>{
                dispatch( updatePostSuccess() );
            })
            .catch(err =>{
                dispatch( updatePostFailed(err) );
            })
    }
}