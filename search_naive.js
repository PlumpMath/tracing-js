var c = 0, i = 0;
while (i < n - m) {
    var j = 0;
    while (j < m && pattern[j] == text[i + j]) {
	j = j + 1;
    }

    if (j == m) {
        console.log("found match #" + ++c + " at " + i);
    }
    i = i + 1;
}
