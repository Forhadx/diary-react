import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/actions/index';


const Logout = React.memo(props =>{

    const { onLogout } = props;
    useEffect(()=>{
        onLogout();
    }, [onLogout])
    console.log('clicked?')
    return(
        <Redirect to="/" />
    )
});

const mapDispatchToProps = dispatch =>{
    return{
        onLogout: ()=> dispatch(actions.logout())
    }
}
export default connect(null, mapDispatchToProps)(Logout);