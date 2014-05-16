function Trace() {
	this.traces = [];
}

Trace.prototype.traceLine = function(lineNo) {
	this.traces.push({type: "line", line: lineNo});
}

Trace.prototype.traceWrite = function(varName, val, init) {
	this.traces.push({type: "write", varName: varName, value: val, init: init == null ? false : init});
	return val;
}

Trace.prototype.rollup = function() {
	return this.traces.reduce(function(states, trace) {
		switch (trace.type) {
			case "line":
				var newState = {line: trace.line, vars: {}};
				if (states.length > 0) {
					newState.vars = states[states.length - 1].vars;
				}
				states.push(newState);
				break;
			case "write":
				var curState = states[states.length - 1];
				curState.vars[trace.varName] = trace.value;
				break;
			default:
				throw "unknown type " + trace.type;
		}
		return states;
	}, []);
}

var currentTrace = new Trace();

Trace.start = function() {
	currentTrace = new Trace();
}

function traceLine() { currentTrace.traceLine.apply(currentTrace, arguments); }
function traceWrite() { return currentTrace.traceWrite.apply(currentTrace, arguments); }
