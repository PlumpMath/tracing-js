var examples = {};

examples.all = ["search_naive.js","search_last_occ.js","search_morris_pratt.js","search_knuth_morris_pratt.js","search_boyer_moore.js","search_boyer_moore_galil.js"];

examples['search_naive.js'] = "var pattern = \"Wor\";\nvar m = pattern.length;\nvar string  = \"Hello, World!\";\nvar n = string.length;\n\nvar i = 0;\nwhile (i < n - m) {\n    var j = 0;\n    while (j < m && pattern[j] == string[i + j]) {\n\tj = j + 1;\n    }\n\n    if (j == m) {\n\tconsole.log(\"found match at \" + i);\n    }\n    i = i + 1;\n}\n";

examples['search_last_occ.js'] = "var pattern = \"Wor\";\nvar m = pattern.length;\nvar string  = \"Hello, World!\";\nvar n = string.length;\n\nvar last_occ = {};\nfor (var k = 0; k <= m - 2; k++) {\n    last_occ[pattern[k]] = m - 1 - k;\n}\n\nvar i = 0;\nwhile (i <= n - m) {\n    var j = 0;\n    while (j < m && pattern[j] == string[i + j]) {\n\tj = j + 1;\n    }\n\n    if (j == m) {\n\tconsole.log(\"found match at \" + i);\n    }\n    i = i + (last_occ[string[i + m - 1]] || m);\n}\n";

examples['search_morris_pratt.js'] = "var pattern = \"Wor\";\nvar m = pattern.length;\nvar string = \"Hello, World!\";\nvar n = string.length;\n\nvar bord = [-1], t = -1;\nfor (var j = 1; j <= m; j++) {\n    while (t >= 0 && pattern[t] != pattern[j - 1]) {\n        t = bord[t];\n    }\n    t = t + 1;\n    bord[j] = t;\n}\n\nvar i = 0, j = 0;\nwhile (i <= n - m) {\n    while (j < m && pattern[j] == string[i + j]) {\n        j = j + 1;\n    }\n    if (j == m) {\n        console.log(\"found match at \" + i);\n    }\n    i = i + j - bord[j];\n    j = Math.max(0, bord[j]);\n}\n";

examples['search_knuth_morris_pratt.js'] = "var pattern = \"Wor\";\nvar m = pattern.length;\nvar string = \"Hello, World!\";\nvar n = string.length;\n\nvar bord = [-1], t = -1;\nfor (var j = 1; j <= m; j++) {\n    t = bord[j - 1];\n    while (t >= 0 && pattern[t] != pattern[j - 1]) {\n        t = bord[t];\n    }\n    t = t + 1;\n    bord[j] = t;\n    if (j == m || pattern[t] != pattern[j]) {\n        bord[j] = t;\n    } else {\n        bord[j] = bord[t];\n    }\n}\n\nvar i = 0, j = 0;\nwhile (i <= n - m) {\n    while (j < m && pattern[j] == string[i + j]) {\n        j = j + 1;\n    }\n    if (j == m) {\n        console.log(\"found match at \" + i);\n    }\n    i = i + j - bord[j];\n    j = Math.max(0, bord[j]);\n}\n";

examples['search_boyer_moore.js'] = "var pattern = \"Wor\";\nvar m = pattern.length;\nvar string = \"Hello, World!\";\nvar n = string.length;\n\nvar suffix = Array.apply(null, Array(m)).map(function() { return 0; });\nsuffix[m - 1] = m;\nvar f = 0, g = m - 1;\nfor (var i = m - 2; i >= 0; i--) {\n    if (i > g && suffix[i + m - 1 - f] != i - g) {\n        suffix[i] = Math.min(suffix[i + m - f - 1], i - g);\n    } else {\n        f = i; g = Math.min(g, i);\n        while (g >= 0 && pattern[g] == pattern[g + m - 1 - f]) {\n            g = g - 1;\n        }\n        suffix[i] = f - g;\n    }\n}\n\nvar bmShift = Array.apply(null, Array(m)).map(function() { return m; });\nvar i = 0;\nfor (var k = m - 2; k >= -1; k--) {\n    if (k == -1 || suffix[k] == k + 1) {\n        while (i >= m - 1 - k) {\n            bmShift[i] = m - 1 - k;\n            i = i + 1;\n        }\n    }\n}\nfor (var k = 0; k <= m - 2; k++) {\n    bmShift[m - 1 - suffix[k]] = m - 1 - k;\n}\n\nvar badCharShift = {};\nfor (var k = 0; k <= m - 2; k++) {\n    badCharShift[pattern[k]] = m - 1 - k;\n}\n\nvar i = 0, j;\nwhile (i <= n - m) {\n    j = m - 1;\n    while (j >= 0 && pattern[j] == string[i + j]) {\n        j = j - 1;\n    }\n\n    if (j == -1) {\n        console.log(\"found match at \" + i);\n        i = i + 1;\n    } else {\n        i = i + Math.max(bmShift[j >= 0 ? j : 0], (badCharShift[string[i + j]] || m) - m + j + 1);\n    }\n}\n";

examples['search_boyer_moore_galil.js'] = "var pattern = \"Wor\";\nvar m = pattern.length;\nvar string = \"Hello, World!\";\nvar n = string.length;\n\nvar suffix = Array.apply(null, Array(m)).map(function() { return 0; });\nsuffix[m - 1] = m;\nvar f = 0, g = m - 1;\nfor (var i = m - 2; i >= 0; i--) {\n    if (i > g && suffix[i + m - 1 - f] != i - g) {\n        suffix[i] = Math.min(suffix[i + m - f - 1], i - g);\n    } else {\n        f = i; g = Math.min(g, i);\n        while (g >= 0 && pattern[g] == pattern[g + m - 1 - f]) {\n            g = g - 1;\n        }\n        suffix[i] = f - g;\n    }\n}\n\nvar bmShift = Array.apply(null, Array(m)).map(function() { return m; });\nvar i = 0;\nfor (var k = m - 2; k >= -1; k--) {\n    if (k == -1 || suffix[k] == k + 1) {\n        while (i >= m - 1 - k) {\n            bmShift[i] = m - 1 - k;\n            i = i + 1;\n        }\n    }\n}\nfor (var k = 0; k <= m - 2; k++) {\n    bmShift[m - 1 - suffix[k]] = m - 1 - k;\n}\n\nvar badCharShift = {};\nfor (var k = 0; k <= m - 2; k++) {\n    badCharShift[pattern[k]] = m - 1 - k;\n}\n\nvar j = 0, t = -1;\nvar bord = Array.apply(null, Array(m + 1)).map(function() { return 0; });\nbord[j] = t;\nwhile (j < m) {\n    j = j + 1;\n    while (t >= 0 && pattern[t] != pattern[j - 1]) {\n        t = bord[t];\n    }\n    t += 1;\n    bord[j] = t;\n}\n\nvar i = 0, j, memory = 0;\nwhile (i <= n - m) {\n    j = m - 1;\n    while (j >= memory && pattern[j] == string[i + j]) {\n        j = j - 1;\n    }\n\n    if (j < memory) {\n        console.log(\"found match at \" + i);\n        memory = bord[m];\n        i = i + m - bord[m];\n    } else {\n        memory = 0;\n        i = i + Math.max(bmShift[j >= 0 ? j : 0], (badCharShift[string[i + j]] || m) - m + j + 1);\n    }\n}\n";

