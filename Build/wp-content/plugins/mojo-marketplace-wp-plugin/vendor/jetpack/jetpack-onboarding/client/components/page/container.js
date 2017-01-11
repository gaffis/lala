var React = require( 'react' );

var WelcomeSection = React.createClass( {displayName: "WelcomeSection",
	render: function() {
		var $__0=    this.props,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{});
		return (
			React.createElement("div", React.__spread({},   other , {className: "welcome__section"}), 
				 this.props.children
			)
		);
	}
} );

module.exports = WelcomeSection;
