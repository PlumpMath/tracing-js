var last_occ = {};
for (var k = 0; k <= m - 2; k++) {
    last_occ[pattern[k]] = m - 1 - k;
}

var c = 0, i = 0;
while (i <= n - m) {
    var j = 0;
    while (j < m && pattern[j] == text[i + j]) {
	j = j + 1;
    }

    if (j == m) {
        console.log("found match #" + ++c + " at " + i);
    }
    i = i + (last_occ[text[i + m - 1]] || m);
}
