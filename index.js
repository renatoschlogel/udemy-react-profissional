import React from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import uuid from "uuid/v1";

import "./index.scss";

class App extends React.Component {
  state = {
    notes: [
      { id: 1, text: "a" },
      { id: 2, text: "b" },
      { id: 3, text: "c" },
      { id: 4, text: "d" }
    ]
  };

  handleAddNote = texto => {
    this.setState(prevState => ({
      notes: prevState.notes.concat({ id: uuid(), text: texto })
    }));
  };

  handleMove = (direction, index) => {
    this.setState(prevState => {
      const newNotes = prevState.notes.slice();
      const removedNote = newNotes.splice(index, 1)[0];

      if (direction === "up") {
        newNotes.splice(index - 1, 0, removedNote);
      } else {
        newNotes.splice(index + 1, 0, removedNote);
      }

      return {
        notes: newNotes
      };
    });
  };

  handleDelete = id => {
    this.setState(prevState => {
      const newNotes = prevState.notes.slice();
      const index = newNotes.findIndex(note => note.id === id);
      newNotes.splice(index, 1);

      return {
        notes: newNotes
      };
    });
  };

  handleEdit = (id, text) => {
    this.setState(prevState => {
      const newNotes = prevState.notes.slice();
      const index = newNotes.findIndex(note => note.id === id);
      newNotes[index].text = text;

      return {
        notes: newNotes
      };
    });
  };

  render() {
    return (
      <div className="container">
        <NewNote onAddNote={this.handleAddNote} />
        <NoteList
          notes={this.state.notes}
          onMove={this.handleMove}
          onDelete={this.handleDelete}
          onEdit={this.handleEdit}
        />
      </div>
    );
  }
}

class NewNote extends React.Component {
  state = {
    texto: ""
  };

  render() {
    const { onAddNote } = this.props;
    const { texto } = this.state;

    return (
      <div className="new-note">
        <input
          type="text"
          className="new-note__input"
          placeholder="Digite aqui"
          value={texto}
          onChange={event => {
            this.setState({
              texto: event.target.value
            });
          }}
          onKeyPress={event => {
            if (event.key === "Enter") {
              onAddNote(event.target.value);
              this.setState({
                texto: ""
              });
            }
          }}
        />
      </div>
    );
  }
}

const Icon = ({ icon }) => {
  return <i className="material-icons">{icon}</i>;
};

class Note extends React.Component {

  state = {
    isEditing: false
  }

  handleEdit = () => {
      this.setState({isEditing: true});
  }

  handleSave = () => {
    this.props.onEdit(this.props.note.id, this.input.value);
    this.setState({isEditing: false});
  }

  handleCancel = () => {
    this.setState({isEditing: false});
  }

  render() {
    const {note, onEdit, onDelete, index, onMove, total} = this.props;
    const {isEditing} = this.state;

    return (
      <div className="note">
        {isEditing ? (
          <input
            type="text"
            className="note__input"
            defaultValue={note.text}
            ref={c => {
              this.input = c;
            }}
          />
        ) : (
          <span className="note__text">{`${note.text}`}</span>
        )}

        {isEditing && (
          <React.Fragment>
            <button
              className="note__button note__button--green"
              onClick={this.handleSave}
            >
              <Icon icon="done_outline" />
            </button>
            <button
              className="note__button note__button--red"
              onClick={this.handleCancel}
            >
              <Icon icon="cancel" />
            </button>
          </React.Fragment>
        )}

        <button
          className={classNames("note__button", {
            "note__button--hidden": index === 0
          })}
          onClick={() => {
            onMove("up", index);
          }}
        >
          <Icon icon="arrow_upward" />
        </button>

        <button
          className={classNames("note__button", {
            "note__button--hidden": index == total - 1
          })}
          onClick={() => {
            onMove("down", index);
          }}
        >
          <Icon icon="arrow_downward" />
        </button>

        <button
          className="note__button"
          onClick={() => {
            this.handleEdit();
          }}
          disabled={isEditing}
        >
          <Icon icon="edit" />
        </button>

        <button
          className="note__button"
          onClick={() => {
            onDelete(note.id);
          }}
          disabled={isEditing}
        >
          <Icon icon="delete" />
        </button>
      </div>
    );
  }
}

const NoteList = ({ notes, onMove, onDelete, onEdit }) => (

  <div className="node-list">
    {notes.map((note, index) => (

       
      <Note
        key={note.id}
        note={note}
        onEdit={onEdit}
        onDelete={onDelete}
        index={index}
        onMove={onMove}
        total={notes.length}
      />
    ))}
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));
