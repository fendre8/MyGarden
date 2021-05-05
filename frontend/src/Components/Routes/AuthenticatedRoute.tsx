import React from "react";
import { Redirect, RouteProps } from "react-router";
import { Route } from "react-router-dom";
import { useAuth } from "../../http/Auth/auth-context";


export function AuthenticatedRoute({ ...props }: RouteProps) {
    const { user } = useAuth();

    if (user === undefined) return <Redirect to="/login" />

    return <Route {...props} />
}