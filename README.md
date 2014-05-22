# tracing-js - Tracing JavaScript for fun and understanding.

Tracing the step a JavaScript program takes to understand what it does.

The current main motivation is understanding different string search
algorithms. They look quite simple, but what they do isn't easy to
explain. I hope that by looking at their behaviour it will be easier
to understand what they do and why they do it.

There's a version of this available at <http://papill0n.org/trace>.

## Implementation

* a [library](./Trace.hs) that transforms given code into a traced version of it
  (written in Haskell)

    For example, the following code:

        var sum = 0;

        for (var i = 0; i < 10; i++) {
            sum += i;
        }

    Will be transformed into the following:

        traceLine(1);
        var sum = traceWrite("sum",0,true,{line: 1,col: 19});
        traceLine(2);
        traceLine(3);
        for (var i = traceWrite("i",0,true,{line: 3,col: 24});
             traceLine(3), traceValue("i < 10",traceRead("i",i,{line: 3,col: 31}) < 10,{line: 3,col: 33});
             traceLine(3), traceWrite("i++",i++,false,{line: 3,col: 39})) {
          traceLine(4);
          sum += traceWrite("sum += i",traceRead("i",i,{line: 4,col: 24}),false,{line: 4,col: 17});
          traceLine(5);
        }

* a [frontend](./trace.html) that allows you to write some code, send
  it to the server, execute it and then look at the trace
