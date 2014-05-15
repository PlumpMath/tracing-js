var TraceUI, TraceLine;

TraceUI = React.createClass({
	render: function() {
		var lines = this.props.code.split("\n");
		var tracedLines = React.DOM.pre(null,
			lines.map(function(line, n) { return TraceLine({line: line, lineNo: n + 1}); }));
		return React.DOM.div(null, tracedLines);
	}
});

TraceLine = React.createClass({
	render: function() {
		return React.DOM.div(null,
			React.DOM.span({className: "lineNo"}, this.props.lineNo),
			React.DOM.span({className: "line"}, this.props.line));
	}
});
