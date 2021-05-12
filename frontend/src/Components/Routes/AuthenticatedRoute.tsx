import React, { useEffect } from "react";
import { Redirect, RouteProps } from "react-router";
import { Route } from "react-router-dom";
import { useAuth } from "../../http/Auth/auth-context";
import { Session } from "../../Models/User/Session";


export function AuthenticatedRoute({ ...props }: RouteProps) {
    const session = JSON.parse(localStorage.getItem("session")!) as Session;

    if (session === null) return <Redirect to="/login" />

    return <Route {...props} />
}