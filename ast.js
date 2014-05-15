function transformAST(fn, ast) {
	var curriedTransform = function(ast) { return transformAST(fn, ast); };

	for (var prop in ast) {
		var val = ast[prop];
		if (isArray(val)) {
			ast[prop] = val.map(curriedTransform);
		} else if (isObject(val)) {
			ast[prop] = curriedTransform(val);
		}
	}
	return fn(ast);
}

function logReadsAndWrites(ast) {
	switch (ast.type) {
		case "AssignmentExpression":
			var name = escodegen.generate(ast.left);
			ast.right = CallExpr(Ident("traceWrite"), [Lit(name), ast.right]);
			break;
		case "VariableDeclarator":
			var name = escodegen.generate(ast.id);
			ast.init = CallExpr(Ident("traceWrite"), [Lit(name), ast.init, Lit(true)]);
			break;
	}
	return ast;
}

function BlockStatement(body) {
	return { type: "BlockStatement", body: body };
}

function Expr(expr) {
	return { type: "ExpressionStatement", expression: expr };
}

function CallExpr(callee, args) {
	return { type: "CallExpression", callee: callee, arguments: args };
}

function Ident(name) {
	return { type: "Identifier", name: name };
}

function ArrayExpr(elements) {
	return { type: "ArrayExpression", elements: elements };
}

function Lit(value) {
	return { type: "Literal", value: value };
}

function LitString(str) {
	return Lit("\"" + str + "\"");
}

function isArray(x) {
	return x instanceof Array;
}

function isObject(x) {
	return x instanceof Object;
}
