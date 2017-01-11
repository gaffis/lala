var React = require( 'react' ),
	SiteActions = require( 'actions/site-actions' ),
	SiteStore = require( 'stores/site-store' ),
	WelcomeSection = require( '../page/container' ),
	Button = require( '@automattic/dops-components/client/components/button' ),
	SetupProgressActions = require( 'actions/setup-progress-actions' );

function getSiteTitleState() {
	return {
		title: SiteStore.getTitle(),
		description: SiteStore.getDescription()
	};
}

var SiteTitleStep = React.createClass( {displayName: "SiteTitleStep",

	componentDidMount: function() {
		SiteStore.addChangeListener( this._onChange );
	},

	componentWillUnmount: function() {
		SiteStore.removeChangeListener( this._onChange );
	},

	_onChange: function() {
		this.setState( getSiteTitleState() );
	},

	getInitialState: function() {
		return getSiteTitleState();
	},

	handleChangeTitle: function(e) {
		SiteActions.setTitle( e.currentTarget.value );
	},

	handleChangeDescription: function(e) {
		SiteActions.setDescription( e.currentTarget.value );
	},

	handleSubmit: function(e) {
		e.preventDefault();
		SetupProgressActions.submitTitleStep();
	},

	render: function() {
		return (
			React.createElement(WelcomeSection, {id: "welcome__site-title"}, 
				React.createElement("h1", null, "Let's launch your new website"), 
				React.createElement("p", {className: "welcome__callout welcome__site-title--callout"}, "Name and describe your website"), 
				React.createElement("form", {onSubmit:  this.handleSubmit, className: "welcome__site-title--form"}, 
					React.createElement("p", null, 
						React.createElement("label", {className: "screen-reader-text", htmlFor: "site_title"}, "Site Title"), 
						React.createElement("input", {type: "text", name: "site_title", id: "site-title", autoComplete: "off", onChange:  this.handleChangeTitle, value:  this.state.title, placeholder: "Site Title (this can be changed later)", required: true})
					), 
					React.createElement("p", null, 
						React.createElement("label", {className: "screen-reader-text", htmlFor: "site_description"}, "Site Description"), 
						React.createElement("input", {type: "text", name: "site_description", id: "site-description", autoComplete: "off", onChange:  this.handleChangeDescription, value:  this.state.description, placeholder: "Site Description (this can be changed later)", required: true})
					), 
					React.createElement("p", {className: "welcome__submit"}, 
						React.createElement(Button, {primary: true, type: "submit"}, "Next Step →")
					)
				)
			)
		);
	}
});

module.exports = SiteTitleStep;