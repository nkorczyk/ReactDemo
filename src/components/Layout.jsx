import React from 'react';
import { NavBar } from './Nav';

export const Layout = (props) => (
    <div>
        <div className="container">
            <NavBar />
            <div className="row">
                <div className="col-xs-12">
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12">
                    {props.children}
                </div>
            </div>
        </div>
        <footer className="footer">
            <div className="container">
                <p> </p>
            </div>
        </footer>
    </div>
);
