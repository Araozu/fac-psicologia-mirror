import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";

// views
import {GoogleLogin} from "@/views/auth/GoogleLogin";
import Register from "../../views/auth/Register";
import {useHistory} from "react-router";

export default function Auth() {
    const history = useHistory();
    const accessToken = localStorage.getItem("access_token");

    if (accessToken !== null) {
        history.replace("/admin/dashboard");
    }

    return (
        <>
            <main>
                <section className="relative w-full h-full py-40 min-h-screen">
                    <div
                        className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
                        style={{}}
                    />
                    <Switch>
                        <Route path="/auth/login" exact component={GoogleLogin}/>
                        <Route path="/auth/register" exact component={Register}/>
                        <Redirect from="/" to="/auth/login"/>
                    </Switch>

                </section>
            </main>
        </>
    );
}
// linea 18  <Navbar transparent />
