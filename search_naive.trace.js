traceLine(1); var pattern = "Wor";
traceLine(2); var string  = "Hello, World!";

traceLine(4); for (var i = 0; traceLine(4),i < string.length; traceLine(4),traceWrite("i", i++)) {
	traceLine(5); var j = 0;
	traceLine(5); while (traceLine(5),j < pattern.length
			&& traceValue("pattern[j] == string[i + j]",
					traceRead("pattern[j]", pattern[j]) == traceRead("string[i + j]", string[i + j]))) {
		traceLine(6); traceWrite("j", j++);
	}

	traceLine(8); if (traceValue("j == pattern.length", traceRead("j", j) == traceRead("pattern.length", pattern.length))) {
		traceLine(9); console.log("found match at " + traceRead("j", j));
	}
}
