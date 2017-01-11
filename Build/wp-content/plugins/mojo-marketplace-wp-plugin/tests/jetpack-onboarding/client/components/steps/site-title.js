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
		this.setState( { title: e.currentTarget.value } );
	},

	handleChangeDescription: function(e) {
		this.setState( { description: e.currentTarget.value } );
	},

	handleSubmit: function(e) {
		e.preventDefault();
		SetupProgressActions.submitTitleStep( this.state.title, this.state.description );
	},

	render: function() {
		return (
			React.createElement(WelcomeSection, {id: "welcome__site-title"}, 
				React.createElement("h1", null, "Let's launch your new website"), 
				React.createElement("p", {className: "welcome__callout welcome__site-title--callout"}, "Name and describe your website"), 
				React.createElement("form", {onSubmit:  this.handleSubmit, className: "welcome__site-title--form"}, 
						React.createElement("label", {htmlFor: "site_title"}, "Site Title"), 
						React.createElement("input", {type: "text", name: "site_title", id: "site-title", autoComplete: "off", onChange:  this.handleChangeTitle, value:  this.state.title, placeholder: "e.g. My WordPress site", required: true}), 
						React.createElement("label", {htmlFor: "site_description"}, "Site Description"), 
						React.createElement("input", {type: "text", name: "site_description", id: "site-description", autoComplete: "off", onChange:  this.handleChangeDescription, value:  this.state.description, placeholder: "e.g. Just another WordPress blog", required: true}), 
						React.createElement(Button, {className: "welcome-submit", primary: true, type: "submit"}, "Next Step")
				)
			)
		);
	}
});

module.exports = SiteTitleStep;
