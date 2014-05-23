var pattern = "Wor";
var m = pattern.length;
var string = "Hello, World!";
var n = string.length;

// border
var bord = [-1];
var t = -1;

for (var j = 1; j < m; j++) {
    while (t >= 0 && pattern[t] != pattern[j - 1]) {
        t = bord[t];
    }
    t = t + 1;
    bord[j] = t;
}

var i = 0, j = 0;
while (i <= n - m) {
    while (j < m && pattern[j] == string[i + j]) {
        j = j + 1;
    }
    if (j == m) {
        console.log("found match at " + i);
    }
    i = i + j - bord[j];
    j = Math.max(0, bord[j]);
}
