var React = require( 'react' ),
	SiteStore = require( 'stores/site-store' ),
	Button = require( '@automattic/dops-components/client/components/button' ),
	WelcomeSection = require( '../page/container' ),
	SetupProgressActions = require( 'actions/setup-progress-actions' );

function getSiteLayoutState() {
	return {
		site_title: SiteStore.getTitle(),
		layout: SiteStore.getLayout()
	};
}

var LayoutStep = React.createClass({displayName: "LayoutStep",

	componentDidMount: function() {
		SiteStore.addChangeListener( this._onChange );
	},

	componentWillUnmount: function() {
		SiteStore.removeChangeListener( this._onChange );
	},

	_onChange: function() {
		this.setState( getSiteLayoutState() );
	},

	getInitialState: function() {
		return getSiteLayoutState();
	},

	handleIsBlog: function(){
		SetupProgressActions.confirmHomepageStep();
	},

	handleNotBlog: function(){
		SetupProgressActions.submitLayoutStep( 'website' );
	},

	render: function() {
		return (
			React.createElement(WelcomeSection, {id: "welcome__layout"}, 
				React.createElement("h1", null, "Let's launch ", React.createElement("em", null,  this.state.site_title)), 
				React.createElement("p", {className: "welcome__callout welcome__layout--callout"}, "Are you going to update your site with news or blog posts?"), 
				React.createElement("p", null, 
					React.createElement(Button, {onClick:  this.handleIsBlog, primary: true}, "Yes"), 
					React.createElement(Button, {onClick:  this.handleNotBlog}, "Nope")
				)
			)
		);
	}
});

module.exports = LayoutStep;