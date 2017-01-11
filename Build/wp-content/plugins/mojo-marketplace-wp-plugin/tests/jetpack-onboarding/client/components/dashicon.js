// simple noticon wrapper

var React = require('react');

var Dashicon = React.createClass({displayName: "Dashicon",

	propTypes: {
		name: React.PropTypes.string.isRequired
	},

	render: function() {
		var $__0=     this.props,name=$__0.name,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{name:1});

		return (
			React.createElement("span", React.__spread({className: ("dashicons dashicons-" + name)},  other), 
				this.props.children
			)
		);
	}
});

module.exports = Dashicon;