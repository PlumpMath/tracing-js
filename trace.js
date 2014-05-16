function Trace() {
	this.traces = [];
}

Trace.prototype.traceLine = function(lineNo) {
	this.traces.push({type: "line", line: lineNo});
}

Trace.prototype.traceRead = function(varName, val) {
	this.traces.push({type: "read", varName: varName, value: val});
	return val;
}

Trace.prototype.traceWrite = function(varName, val, init) {
	this.traces.push({type: "write", varName: varName, value: val, init: init == null ? false : init});
	return val;
}

Trace.prototype.traceValue = function(expr, val) {
	this.traces.push({type: "value", expression: expr, value: val});
	return val;
}

Trace.prototype.rollup = function() {
	return this.traces.reduce(function(states, trace) {
		switch (trace.type) {
			case "line":
				var curState = states[states.length - 1];
				if (states.length > 0 && Object.keys(curState.reads) == 0 && Object.keys(curState.writes) == 0) {
					states.pop();
				}
				var newState = {line: trace.line, vars: {}, reads: {}, writes: {}, values: {}};
				if (states.length > 0) {
					newState.vars = clone(states[states.length - 1].vars);
				}
				states.push(newState);
				break;
			case "read":
				var curState = states[states.length - 1];
				curState.reads[trace.varName] = trace.value;
				break;
			case "write":
				var curState = states[states.length - 1];
				curState.vars[trace.varName] = trace.value;
				curState.writes[trace.varName] = trace.value;
				break;
			case "value":
				var curState = states[states.length - 1];
				curState.values[trace.expression] = trace.value;
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
function traceRead() { return currentTrace.traceRead.apply(currentTrace, arguments); }
function traceWrite() { return currentTrace.traceWrite.apply(currentTrace, arguments); }
function traceValue() { return currentTrace.traceValue.apply(currentTrace, arguments); }
