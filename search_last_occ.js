var pattern = "Wor";
var m = pattern.length;
var string  = "Hello, World!";
var n = string.length;

var last_occ = {};
for (var k = 0; k < m - 2; k++) {
    last_occ[pattern[k]] = m - 1 - k;
}

var i = 0;
while (i < n - m) {
    var j = 0;
    while (j < m && pattern[j] == string[i + j]) {
	j = j + 1;
    }

    if (j == m) {
	console.log("found match at " + i);
    }
    i = i + (last_occ[string[i + m - 1]] || m);
}
