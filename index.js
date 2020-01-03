import React from "react";
import ReactDOM from "react-dom";

import "./index.scss";

const App = () => (
    <div className="container">
        <NewNote/>
        <NoteList/>
    </div>
);

const NewNote = () => {
    return (
        <div className="new-note">
            <input type="text" className="new-note__input"/>
        </div>
    );
}

const NoteList = () => (
    <div className="node-list">
        <div className="note">Teste</div>
        <div className="note">Teste</div>
        <div className="note">Teste</div>
    </div>

)

ReactDOM.render(
    <App/>,
    document.getElementById("root")
);