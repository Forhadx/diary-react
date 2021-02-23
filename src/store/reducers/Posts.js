import * as actionTypes from '../actions/actionTypes';

const initialState = {
    allPosts: [],
    error: false,
    loading: false,

    addLoading: false,
    isAdd: false,

    upLoading: false,
    isUpdate: false,

    delLoading: false,
    fetchLoading: true
};


const reducer = (state=initialState, action ) =>{
    switch(action.type){
        case actionTypes.ADD_POST_INIT:
            return{
                ...state,
                addLoading: false,
                isAdd: false
            }
        case actionTypes.ADD_POST_START:
            return{
                ...state,
                addLoading: true,
                isAdd: false
            }
        case actionTypes.ADD_POST_SUCCESS:
            const newPost = {
                ...action.postData, 
                id: action.postId
            }
            return{
                ...state,
                addLoading: false,
                isAdd: true,
                allPosts: state.allPosts.concat( newPost )
            }
        case actionTypes.ADD_POST_FAILED:
            return{
                ...state,
                error: action.error,
                isPostAdd: false,
                addLoading: false,
                isAdd: false
            }

        case actionTypes.FETCH_POST_START:
            return{
                ...state,
                fetchLoading: true
            }
        case actionTypes.FETCH_POST_SUCCESS:
            return{
                ...state,
                fetchLoading: false,
                allPosts: action.postData
            }
        case actionTypes.FETCH_POST_FAILED:
            return{
                ...state,
                error: action.error,
                fetchLoading: false
            }
        case actionTypes.DELETE_POST_START:
            return{
                ...state,
                delLoading: true
            }
        case actionTypes.DELETE_POST_SUCCESS:
            let posts = state.allPosts.filter(p => p.id !== action.pId);
            return{
                ...state,
                allPosts: posts,
                delLoading: false
            }
        case actionTypes.DELETE_POST_FAILED:
            return{
                ...state,
                error: action.error,
                delLoading: false
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
        case actionTypes.ADD_LOVE:
            return{
                ...state,
                allpost: action.postData
            }
        default:
            return state;
    }
}

export default reducer;