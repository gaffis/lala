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
		modulesEnabled: SiteStore.getActiveModuleSlugs()
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
		return state;
	},

	handleJetpackConnect: function (e) {
		e.preventDefault();

		SiteActions.configureJetpack( Paths.REVIEW_STEP_SLUG );
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
						React.createElement("p", null, React.createElement("a", {href: "#"}, "Check out the settings page…")), 
						React.createElement("p", null, React.createElement(Button, {style: {float: 'right'}, color: "blue", onClick: this.handleNext}, "Next Step →"))
					) :
					React.createElement("div", null, 
						React.createElement("p", null, React.createElement(Button, {onClick:  this.handleJetpackConnect, primary: true}, "Connect to WordPress.com")), 
						React.createElement("p", null, React.createElement(SkipButton, null))
					)
				
			)
		);
	}
});

module.exports = JetpackJumpstart;