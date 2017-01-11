var React = require( 'react' ),
	classNames = require( 'classnames' ),
	SiteStore = require( 'stores/site-store' ),
	Button = require( '@automattic/dops-components/client/components/button' ),
	WelcomeSection = require( '../page/container' ),
	SetupProgressActions = require( 'actions/setup-progress-actions' );

function getSiteLayoutState() {
	return {
		site_title: SiteStore.getTitle(),
		layout: SiteStore.getLayout(),
		siteScreenshot: ( JPS.base_url + "/img/jpo-layout-static.jpg"),
		blogScreenshot: ( JPS.base_url + "/img/jpo-layout-news.jpg"),
	};
}

var HomepageStep = React.createClass( {displayName: "HomepageStep",

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

	handleSetLayout: function( e ) {
		let layout = jQuery( e.currentTarget ).val();
		this.setState( { layout: layout } );
		SetupProgressActions.submitLayoutStep( layout );
	},

	skipStep: function( e ) {
		e.preventDefault();
		let layout = 'blog';
		this.setState( { layout: layout } );
		SetupProgressActions.submitLayoutStep( layout );
	},

	render: function() {
		return (
			React.createElement(WelcomeSection, {id: "welcome__homepage"}, 
				React.createElement("h1", null, "Let's launch ", React.createElement("em", null,  this.state.site_title)), 
				React.createElement("p", {className: "welcome__callout welcome__homepage--callout"}, "What should visitors see on your homepage?"), 
				React.createElement("form", null, 
					React.createElement("div", {className: "welcome__homepage-cols"}, 
						React.createElement("div", {className:  classNames( { 'welcome__homepage-col': true, 'is-selected': this.state.layout === 'blog' }) }, 
							React.createElement("label", null, 
								React.createElement("input", {type: "radio", name: "site_layout", value: "blog", checked:  this.state.layout === 'blog', onChange:  this.handleSetLayout, className: "screen-reader-text"}), 
								React.createElement("img", {src:  this.state.blogScreenshot}), 
								React.createElement("p", null, "Most recent news or updates")
							)
						), 
						React.createElement("div", {className:  classNames( { 'welcome__homepage-col': true, 'is-selected': this.state.layout === 'site-blog' }) }, 
							React.createElement("label", null, 
								React.createElement("input", {type: "radio", name: "site_layout", value: "site-blog", checked:  this.state.layout === 'site-blog', onChange:  this.handleSetLayout, className: "screen-reader-text"}), 
								React.createElement("img", {src:  this.state.siteScreenshot}), 
								React.createElement("p", null, "A static welcome page")
							)
						)
					), 
					React.createElement("div", {className: "welcome__submit"}, 
						React.createElement(Button, {className: "welcome__skip-link", onClick:  this.skipStep}, "Skip this step")
					)
				)
			)
		);
	}
} );

module.exports = HomepageStep;
