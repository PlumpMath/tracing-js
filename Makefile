deps:
	mkdir -p lib
	
	curl -o lib/esprima.js http://esprima.org/esprima.js
	curl -o lib/escodegen.js http://constellation.github.io/escodegen/escodegen.browser.js
	
	curl -o lib/react.js http://facebook.github.io/react/js/react.js

trace: Trace.hs
	ghc -o trace Trace.hs

trace.release: trace
	strip --strip-unneeded $<
	upx $<
