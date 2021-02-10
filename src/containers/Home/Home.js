import React, { Suspense } from "react";
import { NavLink, Redirect, Route, Switch } from "react-router-dom";

import AllPosts from "./AllPosts/AllPosts";
//import AddPost from '../AddPost/AddPost';
//import Favourite from '../Favourite/Favourite';
import Spinner from '../../components/UI/Spinner/Spinner';
import "./home.css";

const AddPost = React.lazy(() => {
  return import('../AddPost/AddPost');
});

const Favourite = React.lazy(() => {
  return import('../Favourite/Favourite');
});



const Home = () => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/add-post">Add Post</NavLink>
            </li>
            <li>
              <NavLink to="/favourite">Favourite</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main className="main">
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route path="/add-post" exact render= {props => <AddPost {...props} />} />
            <Route path="/favourite" exact render= {props => <Favourite {...props} />} />
            <Route path="/" exact component={AllPosts} />
            <Redirect to="/" />
          </Switch>
        </Suspense>
      </main>
    </div>
  );
};

export default Home;
