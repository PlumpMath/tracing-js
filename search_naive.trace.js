traceLine(1); var pattern = traceWrite("pattern", "Wor", true);
traceLine(2); var string  = traceWrite("string", "Hello, World!", true);

traceLine(4); for (var i = traceWrite("i", 0, true); traceLine(4),traceValue("i < string.length", i < string.length); traceLine(4),traceWrite("i", i++)) {
	traceLine(5); var j = traceWrite("j", 0, true);
	traceLine(6); while (traceLine(6),traceValue("j < pattern.length", j < pattern.length)
			&& traceValue("pattern[j] == string[i + j]",
					traceRead("pattern[j]", pattern[j]) == traceRead("string[i + j]", string[i + j]))) {
		traceLine(7); traceWrite("j", j++);
	}

	traceLine(10); if (traceValue("j == pattern.length", traceRead("j", j) == traceRead("pattern.length", pattern.length))) {
		traceLine(11); console.log("found match at " + traceRead("j", j));
	}
}
