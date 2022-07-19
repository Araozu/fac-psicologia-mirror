import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";

// views

import Login from "../views/auth/Login.tsx";
import Register from "../views/auth/Register.tsx";

export default function Auth() {
    return (
        <>
            <main>
                <section className="relative w-full h-full py-40 min-h-screen">
                    <div
                        className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
                        style={{
                            // backgroundImage:
                            //"url(" + require("assets/img/register_bg_2.png").default + ")",
                        }}
                    />
                    <Switch>
                        <Route path="/auth/login" exact component={Login} />
                        <Route path="/auth/register" exact component={Register} />
                        <Redirect from="/" to="/auth/login" />
                    </Switch>

                </section>
            </main>
        </>
    );
}
// linea 18  <Navbar transparent />
