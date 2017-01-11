var React = require('react'),
	Button = require('@automattic/dops-components/client/components/button'),
	SiteStore = require('stores/site-store'),
	Paths = require('../../constants/jetpack-onboarding-paths'),
	Dashicon = require('../dashicon'),
	SetupProgressActions = require( 'actions/setup-progress-actions' ),
	WelcomeSection = require('../page/container');

function getSiteState() {
	return {
		site_title: SiteStore.getTitle(),
		contactUrl: SiteStore.getContactPageEditURL(),
		welcomeUrl: SiteStore.getWelcomePageEditURL(),
		newsUrl: SiteStore.getNewsPageEditURL(),
		isJPConnected: SiteStore.getJetpackConfigured(),
		layout: SiteStore.getLayout(),
	};
}

var AdvancedSettingsStep = React.createClass({displayName: "AdvancedSettingsStep",

	getInitialState: function() {
		return getSiteState();
	},

	componentDidMount: function() {
		SiteStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		SiteStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState(getSiteState());
	},

	handleSkipTo: function( slug, event ) {
		event.preventDefault();
		SetupProgressActions.setCurrentStep( slug );
	},

	handleDismiss: function( event ) {
		event.preventDefault();
		jQuery( '#welcome-panel .welcome-panel-close' ).trigger( 'click' );
	},

	render: function() {
		let contactProps = {};
		if ( this.state.contactUrl ) {
			contactProps.href = this.state.contactUrl;
		} else {
			contactProps.href = '#';
			contactProps.onClick = this.handleSkipTo.bind(this, Paths.CONTACT_PAGE_STEP_SLUG );
		}
		return (
			React.createElement(WelcomeSection, {id: "welcome__review"}, 
				React.createElement("div", {className: "welcome__dismiss"}, 
					React.createElement("a", {href: "#", onClick:  this.handleDismiss}, React.createElement(Dashicon, {name: "dismiss"}), React.createElement("span", {className: "screen-reader-text"}, "Dismiss"))), 

				React.createElement("h1", null, "Let's launch ", React.createElement("em", null, this.state.site_title)), 
				React.createElement("p", {className: "welcome__callout welcome__review--callout"}, "Great Work!"), 

				React.createElement("div", {className: "welcome__review-cols"}, 
					React.createElement("div", {className: "welcome__review-col"}, 
						React.createElement("ul", {className: "welcome__review-list"}, 
							React.createElement("li", null, React.createElement(Dashicon, {name: "yes"}), " Title and description ", React.createElement("a", {href: "#", onClick:  this.handleSkipTo.bind(this, Paths.SITE_TITLE_STEP_SLUG) }, "(edit)")), 
							React.createElement("li", null, React.createElement(Dashicon, {name: "yes"}), " Homepage layout ", React.createElement("a", {href: "#", onClick:  this.handleSkipTo.bind(this, Paths.IS_BLOG_STEP_SLUG) }, "(edit)"), 
							 this.state.layout !== 'blog' ?
								React.createElement("ul", null, 
									React.createElement("li", null, React.createElement("a", {href:  this.state.welcomeUrl}, "Edit your Welcome page")), 
								 ( this.state.layout !== 'website' ) ?
									React.createElement("li", null, React.createElement("a", {href:  this.state.newsUrl}, "Edit your News and Updates page")) : null
								
								) :
								null
							
							), 
							React.createElement("li", null, React.createElement(Dashicon, {name: "yes"}), " ", React.createElement("em", null, "Contact Us"), " page ", React.createElement("a", React.__spread({},   contactProps ), "(edit)")), 
							React.createElement("li", null, React.createElement(Dashicon, {name: "yes"}), 
							 this.state.isJPConnected ?
								React.createElement("a", {href:  JPS.steps.advanced_settings.jetpack_dash}, "Jetpack: ") :
								React.createElement("a", {href: "#", onClick:  this.handleSkipTo.bind(this, Paths.JETPACK_MODULES_STEP_SLUG) }, "Connect Jetpack: "), 
							
							"increase visitors and improve security")
						)
					), 

					React.createElement("div", {className: "welcome__review-col welcome__review-themes"}, 
						React.createElement("img", {src:  ( JPS.base_url + "/img/jpo-themes.png")}), 
						React.createElement("p", null, React.createElement(Button, {href:  JPS.steps.advanced_settings.customize_url}, "Customize your site"))
					)
				)
			)
		);
	}
});

module.exports = AdvancedSettingsStep;
