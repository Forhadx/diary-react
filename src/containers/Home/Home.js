import React from 'react';
import { NavLink, Redirect, Route, Switch } from 'react-router-dom';

import AllPosts from './AllPosts/AllPosts';
import AddPost from '../AddPost/AddPost';
import Favourite from '../Favourite/Favourite';

import './home.css';

const Home = () =>{
    return(
        <div>
            <header>
                <nav>
                    <ul>
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/add-post">Add Post</NavLink></li>
                        <li><NavLink to="favourite">Favourite</NavLink></li>
                    </ul>
                </nav>
            </header>
            <main className="main">
                <Switch>
                    <Route path="/add-post" exact component={AddPost} />
                    <Route path="/favourite" exact component={Favourite} />
                    <Route path="/" exact component={AllPosts}/>
                    <Redirect to="/" />
                </Switch>
            </main>
        </div>
    );
}

export default Home;