import AltContainer from 'alt-container';
import React from 'react';
//uuid moved to NoteStore. We're moving all data manipulation to the stores
//import uuid from 'node-uuid';

import Lanes from './Lanes.jsx';
import LaneActions from '../actions/LaneActions';
import LaneStore from '../stores/LaneStore';

export default class App extends React.Component {

	//Note: render() didn't change after implementing flux. Meaning out view doesn't change, because we only moved data manipulation logic to the NoteStore.
	render() {
		return (
	      <div>
	        <button className="add-lane" onClick={this.addItem}>+</button>
	        <AltContainer
	          stores={[LaneStore]}
	          inject={{
	            lanes: () => LaneStore.getState().lanes || []
	          }}
	        >
	          <Lanes />
	        </AltContainer>
	      </div>
    	);
	}

	addItem(){
		LaneActions.create({name: 'New lane'});
	}

	//Note: We encapsulate the Action parameters to escape jsx and pass in js objects
};