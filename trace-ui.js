var TraceUI, TraceLine;

function wrapInClass(className, content, elemFn) {
	var elemFn = elemFn || React.DOM.span;
	return elemFn({className: className}, content);
}

function renderTrace(code, trace) {
	var lines = code.split("\n");
	var lineNo = trace.line - 1;
	var currentLine = lines[lineNo];
	if (trace.pos) {
		var val = Object.keys(trace.writes).concat(Object.keys(trace.values))[0];
		var start = currentLine.indexOf(val);
		currentLine = [
			currentLine.slice(0, start),
			wrapInClass("current-expr", val),
			currentLine.slice(start + val.length, currentLine.length)
		];
	}
	lines[lineNo] = wrapInClass("current-line", currentLine);
	var reads = mapProperties(trace.reads, function(k, v) {
		return React.DOM.span(null, "// " + k + " = " + JSON.stringify(v) + "\n");
	});
	var writes = mapProperties(trace.writes, function(k, v) {
		return React.DOM.span(null, "// " + k + " := " + JSON.stringify(v) + "\n");
	});
	var values = mapProperties(trace.values, function(k, v) {
		return React.DOM.span(null, "// " + k + " : " + JSON.stringify(v) + "\n");
	});
	var traceView = React.DOM.pre(null,
		lines.concat(reads, writes, values).map(function(line, n) { return TraceLine({line: line, lineNo: n + 1})}));
	if (isSearch(trace)) {
		return React.DOM.div(null, renderSearch(trace.vars), traceView);
	} else {
		return React.DOM.div(null, traceView);
	}
}

function isSearch(trace) {
	return trace.vars && trace.vars.string && trace.vars.pattern && "i" in trace.vars;
}

function renderSearch(vars) {
  function wrap(str) {
		return React.DOM.span(null, str);
	}
	var string = vars.string.split("").map(wrap);
	var padding = " ".repeat(vars.i);
	var pattern = (padding + vars.pattern).split("").map(wrap);

	if ("i" in vars && "j" in vars && vars.j < vars.pattern.length) {
		var i = vars.i, j = vars.j;
		var state = vars.pattern[j] == vars.string[i + j];
		var stateClass = state ? "success" : "failure";
		string[i + j] = React.DOM.span({className: stateClass}, vars.string[i + j]);
	}
	return React.DOM.pre(null, string, "\n", pattern);
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
