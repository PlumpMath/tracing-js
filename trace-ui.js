var TraceUI, TraceLine;

function wrapInClass(className, content, elemFn) {
	var elemFn = elemFn || React.DOM.span;
	return elemFn({className: className}, content);
}

function renderTrace(code, trace) {
	var lines = code.split("\n");
	var lineNo = trace.line - 1;
	var currentLine = lines[lineNo];
	lines[lineNo] = wrapInClass("current-line", currentLine);
	var reads = mapProperties(trace.reads, function(k, v) {
		return React.DOM.span(null, "// " + k + " -> " + JSON.stringify(v) + "\n");
	});
	var writes = mapProperties(trace.writes, function(k, v) {
		return React.DOM.span(null, "// " + k + " = " + JSON.stringify(v) + "\n");
	});
	var values = mapProperties(trace.values, function(k, v) {
		return React.DOM.span(null, "// " + k + " -> " + JSON.stringify(v) + "\n");
	});
	return React.DOM.pre(null,
		lines.concat(reads, writes, values).map(function(line, n) { return TraceLine({line: line, lineNo: n + 1})}));
}

var TraceUI2 = React.createClass({
	render: function() {
		return renderTrace(this.props.code, this.props.trace);
	}
});

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
