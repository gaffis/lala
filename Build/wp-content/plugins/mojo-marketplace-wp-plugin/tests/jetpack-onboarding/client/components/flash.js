/**
 * Displays a flash message, if set.
 * JSON structure:
 * { severity: 'notice', message: 'My message' }
 *
 * Valid severities:
 * - error, notice
 */

var React = require('react'),
	FlashStore = require('stores/flash-store');

function getFlashState() {
	return FlashStore.getFlash();
}

var Flash = React.createClass( {displayName: "Flash",
	componentDidMount: function() {
		FlashStore.addChangeListener( this._onChange );
	},

	componentWillUnmount: function() {
		FlashStore.removeChangeListener( this._onChange );
	},

	_onChange: function() {
		this.setState( getFlashState() );
	},

	getInitialState: function() {
		return getFlashState();
	},

	render: function() {
		if ( this.state.message ) {
			return ( React.createElement("div", {className:  this.state.severity + ' updated'},  this.state.message) );
		} else {
			return null;
		}
	}
} );

module.exports = Flash;