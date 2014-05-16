var pattern = "Wor";
var string  = "Hello, World!";

for (var i = 0; i < string.length; i++) {
	var j = 0;
	while (j < pattern.length && pattern[j] == string[i + j]) {
		j++;
	}

	if (j == pattern.length) {
		console.log("found match at " + j);
	}
}
