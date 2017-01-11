var React = require('react');

var ContentBox = React.createClass({displayName: "ContentBox",
	render: function() {
		return (
			React.createElement("div", {className: "welcome__content-box clear"}, 
				 this.props.children
			)
		);
	}
});

module.exports = ContentBox;
