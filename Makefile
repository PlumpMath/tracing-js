all: deps trace trace-server

deps:
	mkdir -p lib

	curl -o lib/esprima.js http://esprima.org/esprima.js
	curl -o lib/escodegen.js http://constellation.github.io/escodegen/escodegen.browser.js

	curl -o lib/react.js http://facebook.github.io/react/js/react.js

trace: Main.hs Trace.hs
	ghc -o trace Main.hs

trace.release: trace
	strip --strip-unneeded $<
	upx $<

trace-server: TraceServer.hs Trace.hs
	ghc -o trace-server TraceServer.hs

trace-server.release: trace-server
	strip --strip-unneeded $<
	upx $<

run-server: trace-server
	./trace-server 5001

frontend = \
	index.html trace.html \
	util.js trace.js \
	example-code.js \
	lib/react.js trace-ui.js \

examples = search_naive.js search_last_occ.js search_morris_pratt.js

example-code.js: ${examples}
	ruby example-code.rb ${examples} > example-code.js

trace.zip: ${frontend} trace-server.release
	zip trace.zip ${frontend} trace-server

clean:
	rm -f trace.zip trace trace-server *.o *.hi
