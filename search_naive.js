var pattern = "Wor";
var m = pattern.length;
var string  = "Hello, World!";
var n = string.length;

var i = 0;
while (i < n - m) {
    var j = 0;
    while (j < m && pattern[j] == string[i + j]) {
	j = j + 1;
    }

    if (j == m) {
	console.log("found match at " + i);
    }
    i = i + 1;
}
