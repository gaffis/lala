var React = require( 'react'),
	SetupProgressStore = require( 'stores/setup-progress-store'),
	SetupProgressActions = require( 'actions/setup-progress-actions'),
	SpinnerStore = require( 'stores/spinner-store' ),
	SpinnerActions = require( 'actions/spinner-actions'),
	DataStore = require( 'stores/data-store' ),
	Flash = require( '../flash' ),
	GetStarted = require( '../steps/get-started' );

function getSetupProgress() {
	return {
		newUser: SetupProgressStore.isNewUser(),
		showSpinner: SpinnerStore.showing(),
		spinnerMessage: SpinnerStore.getMessage(),
		currentStep: SetupProgressStore.getCurrentStep(),
		allSteps: SetupProgressStore.getAllSteps(),
		progressPercent: SetupProgressStore.getProgressPercent()
	};
}

// TODO: visual "saving" for this.state.saving
module.exports = React.createClass( {
	displayName: 'WelcomeWidget',

	componentDidMount: function() {
		SetupProgressStore.addChangeListener( this._onChange );
		SpinnerStore.addChangeListener( this._onSpinnerChange );
		DataStore.addChangeListener( this._onDataChange );
	},

	componentWillUnmount: function() {
		SetupProgressStore.removeChangeListener( this._onChange );
		SpinnerStore.removeChangeListener( this._onSpinnerChange );
		DataStore.removeChangeListener( this._onDataChange );
	},

	_onChange: function() {
		this.setState( getSetupProgress() );
	},

	_onSpinnerChange: function() {
		this.setState( { showSpinner: SpinnerStore.showing(), spinnerMessage: SpinnerStore.getMessage() } );
	},

	_onDataChange: function() {
		this.setState( { saving: DataStore.isSaving() } );
	},

	getInitialState: function() {
		return getSetupProgress();
	},

	handleReset: function( e ) {
		e.preventDefault();
		SetupProgressActions.resetData();
	},

	handleShowSpinner: function ( e ) {
		e.preventDefault();
		SpinnerActions.show( "Testing spinner" );
	},

	handleHideSpinner: function ( e ) {
		e.preventDefault();
		SpinnerActions.hide();
	},

	render: function() {
		return (
			React.createElement("div", null, 
				 this._renderDebug(), 
				React.createElement("div", {className: "welcome__wrapper clear"}, 
					 this._renderSpinner(), 
					React.createElement("div", {className: "welcome__container"}, 
						React.createElement(Flash, null), 
						 this._renderSection() 
					)
				)
			)
		);
	},

	_renderSection: function() {
		if ( this.state.newUser ) {
			return ( React.createElement(GetStarted, null) );
		} else {
			return this._renderCurrentView();
		}
	},

	_renderDebug: function() {
		if ( JPS.debug ) {
			return (
				React.createElement("div", {className: "welcome__debug"}, 
					React.createElement("a", {href: "#", className: "button", onClick: this.handleReset}, "Reset Wizard"), 
					React.createElement("a", {href: "#", className: "button", onClick: this.handleShowSpinner}, "Show spinner"), 
					React.createElement("a", {href: "#", className: "button", onClick: this.handleHideSpinner}, "Hide spinner")
				)
			);
		} else {
			return null;
		}
	},

	_renderSpinner: function() {
		if ( this.state.showSpinner ) {
			return (
				React.createElement("div", {className: "welcome__loading-overlay"}, 
					React.createElement("div", {className: "welcome__loading-message"}, 
						React.createElement("img", {src:  (JPS.base_url + "/img/spinner-2x.gif"), width: "16px", height: "16px"}), 
						"  ",  this.state.spinnerMessage
					)
				)
			);

		} else {
			return null;
		}
	},

	_renderCurrentView: function() {
		if ( this.state.currentStep ) {
			return ( React.createElement(this.state.currentStep.welcomeView, null) );
		} else {
			return ( React.createElement("h3", null, "Nothing") );
		}
	},

} );
