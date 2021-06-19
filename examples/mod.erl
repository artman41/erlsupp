-module(mod).

%% Compile flag
-compile(debug_info).

-define(X, test).

-define(Y, [1, 2, 3,
4, 5, 6]).

-define(Z, [1, 2, 3, 4, 5, 6]).

-export([
    func/0,
    func/1
]).

-record(test, {
    a :: atom(),
    b :: any(),
    c :: undefined
}).

%% Function example
func() ->
    ?X,
    ok.

%% Clause example
func(1) ->
    "a";
func(2) ->
    [$b];
func(C) ->
    io_lib:format("~p", [C]).

-ifdef(X).
%% ifdef block
-endif.