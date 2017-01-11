var React = require( 'react' ),
	SetupProgressStore = require( 'stores/setup-progress-store' ),
	SetupProgressActions = require( 'actions/setup-progress-actions' ),
	Button = require( '@automattic/dops-components/client/components/button' );

function getSetupState() {
	return {};
}

var GetStarted = React.createClass({displayName: "GetStarted",
	componentDidMount: function() {
		SetupProgressStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		SetupProgressStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState(getSetupState());
	},

	getInitialState: function() {
		return getSetupState();
	},

	handleGetStarted: function(e) {
		e.preventDefault();
		SetupProgressActions.getStarted();
	},

	handleNoThanks: function(e) {
		e.preventDefault();
		SetupProgressActions.disableJPS();
	},

	render: function() {
		return (
			React.createElement("div", {className: "welcome__get-started--intro"}, 
				React.createElement("div", {className: "welcome__get-started--wrapper"}, 
					React.createElement("h1", null, "Welcome to WordPress"), 
					React.createElement("p", {className: "welcome__callout welcome__get-started--callout"}, "Would you like help launching your site?"), 
					React.createElement("p", null, 
						React.createElement(Button, {onClick:  this.handleGetStarted, primary: true}, "Yes"), 
						React.createElement(Button, {onClick:  this.handleNoThanks}, "No thanks")
					)
				)
			)
		);
	}
});

module.exports = GetStarted;