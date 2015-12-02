import AltContainer from 'alt-container';
import React from 'react';
//uuid moved to NoteStore. We're moving all data manipulation to the stores
//import uuid from 'node-uuid';
import Notes from './Notes.jsx';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';

export default class App extends React.Component {
	constructor(props) {
		super(props);

		//Keeping old code for personal use

		/* 
		this.state = {
			notes: [
				{
					id: uuid.v4(),
					task: 'Learn Webpack'
				},
				{
					id: uuid.v4(),
					task: 'Learn React'
				},
				{
					id: uuid.v4(),
					task: 'Do laundry'
				}

			]
		};


		this.findNote = this.findNote.bind(this);
		this.addNote = this.addNote.bind(this);
		this.editNote = this.editNote.bind(this);
		this.deleteNote = this.deleteNote.bind(this);
		*/

		//NoteStore.getState() is an alt.js method. Don't let it be confused with a react component getState()
		this.state = NoteStore.getState();

	}
	componentDidMount() {
		NoteStore.listen(this.storeChanged);
	}
	componentWillUnmount() {
		NoteStore.unlisten(this.storeChanged);
	}
	storeChanged = (state) => {
		// Without a property initializer `this` wouldn't
    	// point at the right context (defaults to `window`).
		this.setState(state);
	}

	//Note: render() didn't change after implementing flux. Meaning out view doesn't change, because we only moved data manipulation logic to the NoteStore.
	render() {
		const notes = this.state.notes;

		return (
			<div> 
				<button className="add-note" onClick={this.addNote}>+</button>
				<AltContainer
					stores={[NoteStore]}
					inject={{
						items: () => NoteStore.getState().notes
					}}
				>
					<Notes 
						onEdit={this.editNote}
						onDelete={this.deleteNote} />
				</AltContainer>
			</div>
		);
	}

	//Note: We encapsulate the Action parameters to escape jsx and pass in js objects
	addNote() { 
		NoteActions.create({task: 'New task'});
	/*
		this.setState({
			notes: this.state.notes.concat([{
				id: uuid.v4(),
				task: 'New task'
			}])
		});
	*/
	}
	editNote(id, task) { 
		NoteActions.update({id, task});
	/*
		let notes = this.state.notes;
		const noteIndex = this.findNote(id);

		if(noteIndex < 0) {return;}

		notes[noteIndex].task = task;

		this.setState({notes});
	*/
	}
	deleteNote(id) {
		NoteActions.delete(id);
	/*
		const notes = this.state.notes; 
		const noteIndex = this.findNote(id);

		if(noteIndex < 0){return;}

		this.setState({
			notes: notes.slice(0, noteIndex).concat(notes.slice(noteIndex + 1))
		});
	*/
	}

	//findNote(id) moved to NoteStore
};