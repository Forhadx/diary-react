import React, { Suspense, useState, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import * as actions from '../../store/actions/index';

import AllPosts from "../AllPosts/AllPosts";
import Spinner from "../../components/UI/Spinner/Spinner";

import Navbar from "../../components/Navigation/Navbar/Navbar";
import Sidebar from "../../components/Navigation/Sidebar/Sidebar";
import Auth from "../Auth/Auth";
import Logout from '../Auth/Logout';

import "./home.css";
import { connect } from "react-redux";

const AddPost = React.lazy(() => {
  return import("../AddPost/AddPost");
});

const Favourite = React.lazy(() => {
  return import("../Favourite/Favourite");
});

const Home = React.memo(props => {
  const [sidebarIsVisible, setSidebarIsVisible] = useState(false);

  const { onAutoSignup } = props;
  useEffect(()=>{
    onAutoSignup();
  }, [onAutoSignup])

  const sidebarClosedHandler = () => {
    setSidebarIsVisible(false);
  };

  const sidebarToggleHandler = () => {
    setSidebarIsVisible(!sidebarIsVisible);
  };

  let showedPage = (
    <div>
      <header>
        <Navbar drawerToggleClicked={sidebarToggleHandler} />
        <Sidebar open={sidebarIsVisible} closed={sidebarClosedHandler} />
      </header>
      <main className="main">
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route
              path="/add-post"
              render={(props) => <AddPost {...props} />}
            />
            <Route
              path="/favourite"
              render={(props) => <Favourite {...props} />}
            />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={AllPosts} />
            <Redirect to="/" />
          </Switch>
        </Suspense>
      </main>
    </div>
  );

  if (!props.isAuthenticate) {
    showedPage = (
      <div>
        <header />
        <main className="main">
          <Route path="/login" component={Auth} />
          <Redirect from="/" to="/login" />
        </main>
      </div>
    );
  }

  return showedPage;
});

const mapStateToProps = (state) => {
  return {
    isAuthenticate: state.auth.token,
  };
};

const mapDispatchToProps = dispatch =>{
  return{
    onAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
