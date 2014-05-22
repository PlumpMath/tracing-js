var examples = {};

examples.all = ["search_naive.js","search_last_occ.js"];

examples['search_naive.js'] = "var pattern = \"Wor\";\nvar m = pattern.length;\nvar string  = \"Hello, World!\";\nvar n = string.length;\n\nvar i = 0;\nwhile (i < n - m) {\n    var j = 0;\n    while (j < m && pattern[j] == string[i + j]) {\n\tj = j + 1;\n    }\n\n    if (j == m) {\n\tconsole.log(\"found match at \" + i);\n    }\n    i = i + 1;\n}\n";

examples['search_last_occ.js'] = "var pattern = \"Wor\";\nvar m = pattern.length;\nvar string  = \"Hello, World!\";\nvar n = string.length;\n\nvar last_occ = {};\nfor (var k = 0; k < m - 2; k++) {\n    last_occ[pattern[k]] = m - 1 - k;\n}\n\nvar i = 0;\nwhile (i < n - m) {\n    var j = 0;\n    while (j < m && pattern[j] == string[i + j]) {\n\tj = j + 1;\n    }\n\n    if (j == m) {\n\tconsole.log(\"found match at \" + i);\n    }\n    i = i + (last_occ[string[i + j]] || m);\n}\n";

