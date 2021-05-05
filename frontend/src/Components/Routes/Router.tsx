import React from 'react';
import { Route, Switch } from 'react-router-dom';
import FriendsPage from '../../Pages/FriendsPage';
import IssuesPage from '../../Pages/IssuesPage';
import LoginPage from '../../Pages/LoginPage';
import MainPage from '../../Pages/MainPage';
import PlantsPage from '../../Pages/PlantsPage';
import RegisterPage from '../../Pages/RegisterPage';
import PlantDetailsPage from '../../Pages/PlantDetailsPage';
import { AuthenticatedRoute } from './AuthenticatedRoute';

export default function MyRouter() {
    return (
        <Switch>
            <AuthenticatedRoute
                exact
                path="/plants"
                component={PlantsPage}
            />
            <AuthenticatedRoute
                exact
                path="/plant/:id"
                component={PlantDetailsPage}
            />
            <AuthenticatedRoute
                exact
                path="/issues"
                component={IssuesPage}
            />
            <AuthenticatedRoute
                exact
                path="/friends"
                component={FriendsPage}
            />
            <Route
                exact
                path="/"
                component={MainPage}
            />
            <Route
                exact
                path="/login"
                component={LoginPage}
            />
            <Route
                exact
                path="/register"
                component={RegisterPage}
            />
        </Switch>
    );
}