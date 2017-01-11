var React = require( 'react' ),
	SiteStore = require( 'stores/site-store' ),
	Button = require( '@automattic/dops-components/client/components/button' ),
	WelcomeSection = require( '../page/container' ),
	SetupProgressActions = require( 'actions/setup-progress-actions' );

function getSiteContactState() {
	return {
		site_title: SiteStore.getTitle(),
		contactPageURL: SiteStore.getContactPageURL(),
		contactPageScreenshot : ( JPS.base_url + "/img/contact-us-screenshot.png")
	};
}

var ContactPageStep = React.createClass( {displayName: "ContactPageStep",

	componentDidMount: function() {
		SiteStore.addChangeListener( this._onChange );
	},

	componentWillUnmount: function() {
		SiteStore.removeChangeListener( this._onChange );
	},

	_onChange: function() {
		this.setState( getSiteContactState() );
	},

	getInitialState: function() {
		return getSiteContactState();
	},

	handleBuildContact: function( e ) {
		e.preventDefault();
		SetupProgressActions.createContactPage();
	},

	handleSubmit: function( e ) {
		e.preventDefault();
		SetupProgressActions.skipContactPageBuild();
	},

	handleContinue: function( e ) {
		e.preventDefault();
		SetupProgressActions.selectNextStep();
	},

	render: function() {
		return(
			React.createElement(WelcomeSection, {id: "welcome__contact"}, 
				React.createElement("h1", null, "Let's launch ", React.createElement("em", null, this.state.site_title)), 

				 this.state.contactPageURL ?
					this._renderWithContactPage() :
					this._renderWithoutContactPage()
				
			)
		);
	},

	_renderWithContactPage: function() {
		return (
			React.createElement("div", null, 
				React.createElement("p", {className: "welcome__callout welcome__contact--callout welcome__contact-exists--callout"}, "View your starter ", React.createElement("a", {href:  this.state.contactPageURL, target: "_blank"}, "Contact Us"), " page."), 
				React.createElement("p", {className: "welcome__submit"}, 
					React.createElement(Button, {primary: true, onClick:  this.handleContinue}, "Next Step →")
				)
			)
		);
	},

	_renderWithoutContactPage: function() {
		return (
			React.createElement("div", {className: "welcome__contact-cols"}, 
				React.createElement("div", {className: "welcome__contact-col"}, 
					React.createElement("div", {className: "welcome__contact-button"}, 
						React.createElement("p", {className: "welcome__callout welcome__contact--callout welcome__contact-build--callout"}, "Build a ", React.createElement("em", null, "starter"), " \"Contact Us\" page?"), 

						React.createElement("p", {className: "welcome__submit"}, 
							React.createElement(Button, {primary: true, onClick:  this.handleBuildContact}, "Yes"), 
							React.createElement(Button, {onClick:  this.handleSubmit}, "No Thanks")
						)
					)
				), 
				React.createElement("div", {className: "welcome__contact-col welcome__contact--screenshot"}, 
					React.createElement("img", {src:  this.state.contactPageScreenshot})
				)
			)
		);
	}
});

module.exports = ContactPageStep;