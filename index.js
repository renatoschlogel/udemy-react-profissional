import React from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import uuid from "uuid/v1";

import "./index.scss";

class App extends React.Component{

    state = {
        notes: []
    }
    
    handleAddNote = texto => {
        this.setState(prevState => ({
            notes: prevState.notes.concat({id: uuid(), text: texto  })
        }));
    }

    handleMove = (direction, index) =>{
        
        this.setState( prevState => {
            
            const newNotes = prevState.notes.slice();
            const removedNote = newNotes.splice(index, 1)[0];

            if (direction === "up") {
                newNotes.splice(index - 1, 0, removedNote);
            }else {
                newNotes.splice(index + 1, 0, removedNote);
            }

            return {
                notes: newNotes
            };
        })
    }

    render(){
        return (
            <div className="container">
                <NewNote onAddNote={this.handleAddNote}/>
                <NoteList notes={this.state.notes} onMove={this.handleMove}/>
            </div>
        );
    }
}

class NewNote extends React.Component {

    state = {
        texto: ''
    }

    render(){
        const { onAddNote} = this.props;
        const { texto } = this.state;

        return (
            <div className="new-note">
                <input type="text" 
                       className="new-note__input"
                       placeholder="Digite aqui"
                       value={texto}
                       onChange={event =>{
                         this.setState({
                            texto: event.target.value
                         });
                       }}
                       onKeyPress={event => {
             
                         if(event.key === "Enter"){
                            onAddNote(event.target.value);
                            this.setState({
                                texto: ''
                             });
                         }
                       }}
                       />
            </div>
        );
    }
}

const Icon = ({icon}) => {
    return <i className="material-icons">{icon}</i>
}

const NoteList = ({notes, onMove}) => (
    <div className="node-list">
        {notes.map((note, index) => (
           <div key={note.id} className="note">
                <span className="note__text">{`${note.text}`}</span>
                
                <button className={classNames("note__button", {
                    "note__button--hidden": index === 0
                })} 
                        onClick ={() => {
                            onMove("up", index);
                        }}
                >
                    <Icon icon="arrow_upward"/>
                </button>
                
                <button className={classNames("note__button", {
                    "note__button--hidden": index == notes.length - 1.
                })}
                            onClick ={() => {
                            onMove("down", index);
                        }}
                    >
                    <Icon icon="arrow_downward"/>
                </button>
                
           </div>
         ))}
    </div>

)

ReactDOM.render(
    <App/>,
    document.getElementById("root")
);