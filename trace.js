function Trace() {
	this.traces = [];
}

Trace.prototype.traceLine = function(lineNo) {
	this.traces.push({type: "line", line: lineNo});
}

Trace.prototype.traceWrite = function(varName, val) {
	this.traces.push({type: "write", varName: varName, value: val});
	return val;
}

var currentTrace = null;

Trace.start = function() {
	currentTrace = new Trace();
}

function traceLine() { currentTrace.traceLine.apply(currentTrace, arguments); }
function traceWrite() { return currentTrace.traceWrite.apply(currentTrace, arguments); }
