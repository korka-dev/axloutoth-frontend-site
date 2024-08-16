// eslint-disable-next-line no-unused-vars
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Login} from "./components/auth/Login.jsx";
import {Register} from "./components/users/Register.jsx";
import ErrorBoundary from "./components/errors/ErrorBoundary.jsx";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <ErrorBoundary errorMessage="Error in the LoginForm component">
                            <Login/>
                        </ErrorBoundary>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <ErrorBoundary errorMessage="Error in the Register component">
                            <Register/>
                        </ErrorBoundary>
                    }
                />
            </Routes>
        </Router>
    )
}

export default App
