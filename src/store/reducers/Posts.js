import * as actionTypes from '../actions/actionTypes';

const initialState = {
    allPosts: [],
    error: false,
    loading: true
};


const reducer = (state=initialState, action ) =>{
    switch(action.type){
        case actionTypes.ADD_POST_START:
            return{
                ...state,
                loading: true
            }
        case actionTypes.ADD_POST_SUCCESS:
            return{
                ...state,
                loading: false,
                allPosts: state.allPosts.concat(action.postData, {id: action.postId})
            }
        case actionTypes.ADD_POST_FAILED:
            return{
                ...state,
                error: action.error,
                loading: false
            }
        case actionTypes.FETCH_POST_START:
            return{
                ...state,
                loading: true
            }
        case actionTypes.FETCH_POST_SUCCESS:
            return{
                ...state,
                loading: false,
                allPosts: action.postData
            }
        case actionTypes.FETCH_POST_FAILED:
            return{
                ...state,
                error: action.error,
                loading: false
            }
        case actionTypes.DELETE_POST_START:
            return{
                ...state,
                loading: true
            }
        case actionTypes.DELETE_POST_SUCCESS:
            let posts = state.allPosts.filter(p => p.id !== action.pId);
            return{
                ...state,
                allPosts: posts,
                loading: false
            }
        case actionTypes.DELETE_POST_FAILED:
            return{
                ...state,
                error: action.error,
                loading: false
            }
        case actionTypes.UPDATE_POST_START:
            return{
                ...state,
                loading: true
            }
        case actionTypes.UPDATE_POST_SUCCESS:
            return{
                ...state,
                loading: false,
            }
        case actionTypes.UPDATE_POST_FAILED:
            return{
                ...state,
                error: action.error,
                loading: false
            }
        default:
            return state;
    }
}

export default reducer;