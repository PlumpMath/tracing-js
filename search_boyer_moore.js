var pattern = "Wor";
var m = pattern.length;
var string = "Hello, World!";
var n = string.length;

var suffix = Array.apply(null, Array(m)).map(function() { return 0; });
suffix[m - 1] = m;
var f = 0, g = m - 1;
for (var i = m - 2; i >= 0; i--) {
    if (i > g && suffix[i + m - 1 - f] != i - g) {
        suffix[i] = Math.min(suffix[i + m - f - 1], i - g);
    } else {
        f = i; g = Math.min(g, i);
        while (g >= 0 && pattern[g] == pattern[g + m - 1 - f]) {
            g = g - 1;
        }
        suffix[i] = f - g;
    }
}

var bmShift = Array.apply(null, Array(m)).map(function() { return m; });
var i = 0;
for (var k = m - 2; k >= -1; k--) {
    if (k == -1 || suffix[k] == k + 1) {
        while (i >= m - 1 - k) {
            bmShift[i] = m - 1 - k;
            i = i + 1;
        }
    }
}
for (var k = 0; k <= m - 2; k++) {
    bmShift[m - 1 - suffix[k]] = m - 1 - k;
}

var badCharShift = {};
for (var k = 0; k <= m - 2; k++) {
    badCharShift[pattern[k]] = m - 1 - k;
}

var i = 0, j;
while (i <= n - m) {
    j = m - 1;
    while (j >= 0 && pattern[j] == string[i + j]) {
        j = j - 1;
    }

    if (j == -1) {
        console.log("found match at " + i);
        i = i + 1;
    } else {
        i = i + Math.max(bmShift[j >= 0 ? j : 0], (badCharShift[string[i + j]] || m) - m + j + 1);
    }
}
