import * as actionTypes from '../actions/actionTypes';

const initialState = {
    allPosts: [],
    error: false,
    loading: true,

    isPostAdd: true,
    addLoading: false,

    upLoading: false,
    isUpdate: false

};


const reducer = (state=initialState, action ) =>{
    switch(action.type){
        case actionTypes.ADD_POST_INIT:
            return{
                ...state,
                isPostAdd: true,
                addLoading: false
            }
        case actionTypes.ADD_POST_START:
            return{
                ...state,
                isPostAdd: true,
                addLoading: true
            }
        case actionTypes.ADD_POST_SUCCESS:
            const newPost = {
                ...action.postData, 
                id: action.postId
            }
            return{
                ...state,
                isPostAdd: false,
                addLoading: false,
                allPosts: state.allPosts.concat( newPost )
            }
        case actionTypes.ADD_POST_FAILED:
            return{
                ...state,
                error: action.error,
                isPostAdd: false,
                addLoading: false
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
        case actionTypes.UPDATE_POST_INIT:
                return{
                    ...state,
                    upLoading: false,
                    isUpdate: false
                }
        case actionTypes.UPDATE_POST_START:
            return{
                ...state,
                upLoading: true,
                isUpdate: false
            }
        case actionTypes.UPDATE_POST_SUCCESS:
            return{
                ...state,
                allpost: action.postData,
                upLoading: false,
                isUpdate: true
            }
        case actionTypes.UPDATE_POST_FAILED:
            return{
                ...state,
                error: action.error,
                upLoading: false,
                isUpdate: false
            }
        default:
            return state;
    }
}

export default reducer;