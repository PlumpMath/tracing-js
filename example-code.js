var examples = {};

examples.all = ["search_naive.js","search_last_occ.js","search_morris_pratt.js"];

examples['search_naive.js'] = "var pattern = \"Wor\";\nvar m = pattern.length;\nvar string  = \"Hello, World!\";\nvar n = string.length;\n\nvar i = 0;\nwhile (i < n - m) {\n    var j = 0;\n    while (j < m && pattern[j] == string[i + j]) {\n\tj = j + 1;\n    }\n\n    if (j == m) {\n\tconsole.log(\"found match at \" + i);\n    }\n    i = i + 1;\n}\n";

examples['search_last_occ.js'] = "var pattern = \"Wor\";\nvar m = pattern.length;\nvar string  = \"Hello, World!\";\nvar n = string.length;\n\nvar last_occ = {};\nfor (var k = 0; k < m - 2; k++) {\n    last_occ[pattern[k]] = m - 1 - k;\n}\n\nvar i = 0;\nwhile (i < n - m) {\n    var j = 0;\n    while (j < m && pattern[j] == string[i + j]) {\n\tj = j + 1;\n    }\n\n    if (j == m) {\n\tconsole.log(\"found match at \" + i);\n    }\n    i = i + (last_occ[string[i + j]] || m);\n}\n";

examples['search_morris_pratt.js'] = "var pattern = \"Wor\";\nvar m = pattern.length;\nvar string = \"Hello, World!\";\nvar n = string.length;\n\n// border\nvar bord = [-1];\nvar t = -1;\n\nfor (var j = 1; j < m; j++) {\n    while (t >= 0 && pattern[t] != pattern[j - 1]) {\n        t = bord[t];\n    }\n    t = t + 1;\n    bord[j] = t;\n}\n\nvar i = 0, j = 0;\nwhile (i <= n - m) {\n    while (j < m && pattern[j] == string[i + j]) {\n        j = j + 1;\n    }\n    if (j == m) {\n        console.log(\"found match at \" + i);\n    }\n    i = i + j - bord[j];\n    j = Math.max(0, bord[j]);\n}\n";

