var React = require('react'),
	SkipButton = require('../skip-button'),
	SiteStore = require('stores/site-store'),
	SiteActions = require('actions/site-actions'),
	Paths = require('../../constants/jetpack-onboarding-paths'),
	ContentBox = require('../page/section'),
	WelcomeSection = require('../page/container'),
	SetupProgressActions = require('actions/setup-progress-actions'),
	SpinnerStore = require('stores/spinner-store'),
	Button = require('@automattic/dops-components/client/components/button');

function getJetpackState() {
	return {
		site_title: SiteStore.getTitle(),
		jetpackConfigured: SiteStore.getJetpackConfigured(),
		jumpstartEnabled: SiteStore.getJetpackJumpstartEnabled(),
		modulesEnabled: SiteStore.getActiveModuleSlugs(),
		settingsUrl: SiteStore.getJetpackSettingsUrl()
	};
}

var JetpackJumpstart = React.createClass({displayName: "JetpackJumpstart",

	componentDidMount: function() {
		SiteStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		SiteStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState(getJetpackState());
	},

	getInitialState: function() {
		var state = getJetpackState();
		state.showMoreModules = false;
		state.jetpackConnecting = false;
		return state;
	},

	handleJetpackConnect: function (e) {
		e.preventDefault();

		this.setState( { jetpackConnecting: true } );
		SiteActions
			.configureJetpack( Paths.REVIEW_STEP_SLUG )
			.always(function() {
				this.setState( { jetpackConnecting: false } );
			}.bind( this ) );
	},

	handleNext: function (e) {
		e.preventDefault();

		SetupProgressActions.completeAndNextStep(Paths.JETPACK_MODULES_STEP_SLUG);
	},

	render: function() {
		return (
			React.createElement(WelcomeSection, {id: "welcome__jetpack"}, 
				React.createElement("h1", null, "Let's launch ", React.createElement("em", null, this.state.site_title)), 
				React.createElement("p", {className: "welcome__callout welcome__jetpack--callout"}, "Connect your Jetpack profile to improve security, track stats, and grow traffic"), 
				 this.state.jetpackConfigured ?
					React.createElement("div", null, 
						React.createElement("p", null, "Congratulations! You've enabled Jetpack and unlocked dozens of powerful features."), 
						React.createElement("p", null, React.createElement("a", {href:  this.state.settingsUrl}, "Check out the settings page…")), 
						React.createElement("div", {className: "welcome__submit"}, 
							React.createElement(Button, {primary: true, onClick: this.handleNext}, "Next Step")
						)
					) :
					React.createElement("div", {className: "welcome__submit"}, 
						React.createElement(Button, {disabled: this.state.jetpackConnecting, onClick:  this.handleJetpackConnect, primary: true},  this.state.jetpackConnecting ? 'Connecting' : 'Connect', " to WordPress.com"), 
						 !this.state.jetpackConnecting && React.createElement(SkipButton, null)
					)
				
			)
		);
	}
});

module.exports = JetpackJumpstart;
