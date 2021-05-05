import React, { useEffect, useMemo } from "react";
import { createContext, useState } from "react";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import { Session } from "../../Models/User/Session";
import User from "../../Models/User/User";
import { LoginRequest, RegisterRequest } from "../../Models/User/UserRequests";
import usersAPI from "./auth.api";



export type AuthContextType = {
    user?: User,
    loading: boolean,
    error?: any,
    session?: Session,
    setSession: (session: Session) => void,
    login: (req: LoginRequest) => void,
    logout: () => void,
    signUp: (req: RegisterRequest) => void,
    loggedIn: boolean
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);


const AuthProvider = (props: { children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [session, setSession] = useState<Session>();
    const [user, setUser] = useState<User>();
    const [error, setError] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [initloading, setInitLoading] = useState<boolean>(false);

    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        if (error) setError(null);
    }, [location.pathname])

    useEffect(() => {
        usersAPI.getCurrentUser()
            .then((session) => {
                setUser(session.user!);
                setLoggedIn(true);
                setSession(session)
            })
            .catch((_error) => { })
            .finally(() => setInitLoading(false));
    }, []);

    const login = async (request: LoginRequest) => {
        setLoading(true);

        const session = await usersAPI.login(request);
            if (session.succes) {
                setSession(session);
                setUser(session.user);
                setLoggedIn(true);
                localStorage.setItem("session", JSON.stringify(session));
                history.push("/");
            }
            else {
                setError(session.error?.description);
            }
            setLoading(false);
    }

    const logout = () => {
        setUser(undefined);
        setSession(undefined);
        setLoggedIn(false);
        localStorage.removeItem("session");
    }

    const signUp = async (req: RegisterRequest) => {
        await usersAPI.register(req)
            .then(() => {
                history.push("/login");
            })
            .catch((error) => setError(error))
            .finally(() => setLoading(false));

    };

    const memoedValue: AuthContextType = useMemo(() => ({
        user: user,
        loading: loading,
        error: error,
        session: session,
        loggedIn: loggedIn,
        setSession: (session) => setSession(session),
        signUp: signUp,
        login: login,
        logout: logout,
    }), [user, loading, error, session, loggedIn])

    return (
        <AuthContext.Provider value={memoedValue}>
            {!initloading && props.children}
        </AuthContext.Provider>);
};

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };