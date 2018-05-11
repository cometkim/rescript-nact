'use strict';

var Nact = require("nact");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Js_exn = require("bs-platform/lib/js/js_exn.js");
var $$String = require("bs-platform/lib/js/string.js");
var Caml_int32 = require("bs-platform/lib/js/caml_int32.js");
var Nact_jsMap = require("./Nact_jsMap.js");
var Belt_Option = require("bs-platform/lib/js/belt_Option.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");
var Belt_SetString = require("bs-platform/lib/js/belt_SetString.js");
var Caml_exceptions = require("bs-platform/lib/js/caml_exceptions.js");
var Js_null_undefined = require("bs-platform/lib/js/js_null_undefined.js");
var References = require("nact/lib/references");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");

function defaultTo($$default, opt) {
  if (opt) {
    return opt[0];
  } else {
    return $$default;
  }
}

function fromUntypedRef(reference) {
  return /* ActorRef */[reference];
}

function toUntypedRef(param) {
  return param[0];
}

function dispatch(prim, prim$1) {
  Nact.dispatch(prim, prim$1);
  return /* () */0;
}

var Interop = /* module */[
  /* fromUntypedRef */fromUntypedRef,
  /* toUntypedRef */toUntypedRef,
  /* dispatch */dispatch
];

function fromReference(param) {
  return /* ActorPath */[param[0].path];
}

function systemName(param) {
  return param[0].system;
}

function toString(param) {
  var path = param[0];
  return "system:" + (path.system + ("//" + $$String.concat("/", path.parts)));
}

function parts(param) {
  return param[0].parts;
}

var ActorPath = /* module */[
  /* fromReference */fromReference,
  /* systemName */systemName,
  /* toString */toString,
  /* parts */parts
];


/* This code is to handle how bucklescript sometimes represents variants */

var WrappedVariant = '_wvariant';
var WrappedEvent = '_wevent';
function unsafeEncoder(obj) {
  var data = JSON.stringify(obj, function (key, value) {
    if (value && Array.isArray(value) && value.tag !== undefined) {
      var r = {};
      r.values = value.slice();
      r.tag = value.tag;
      r.type = WrappedVariant;
      return r;
    } else {
      return value;
    }
  });
  return { data: JSON.parse(data), type: WrappedEvent };
};

function unsafeDecoder(result) {
  if(result && typeof(result) === 'object' && result.type === WrappedEvent) {
    var serialized = result.serialized || JSON.stringify(result.data);
    return JSON.parse(serialized, (key, value) => {
      if (value && typeof (value) === 'object' && value.type === WrappedVariant) {
        var values = value.values;
        values.tag = value.tag;
        return values;
      } else {
        return value;
      }
    });
  } else {
    return result;
  }
};

;

function logLevelFromJs(param) {
  if (param <= 6 && 0 <= param) {
    return /* Some */[param - 0 | 0];
  } else {
    return /* None */0;
  }
}

function logLevelToString(param) {
  switch (param) {
    case 0 : 
        return "off";
    case 1 : 
        return "trace";
    case 2 : 
        return "debug";
    case 3 : 
        return "info";
    case 4 : 
        return "warn";
    case 5 : 
        return "error";
    case 6 : 
        return "critical";
    
  }
}

function fromJsLog(msg) {
  var a = defaultTo(new References.Nobody(), Js_primitive.null_undefined_to_opt(msg.actor));
  var path = /* ActorPath */[a.path];
  var createdAt = defaultTo(new Date(), Js_primitive.null_undefined_to_opt(msg.createdAt));
  var match = msg.type;
  if (match == null) {
    return /* Unknown */Block.__(4, [
              unsafeEncoder(msg),
              createdAt,
              path
            ]);
  } else {
    switch (match) {
      case "event" : 
          return /* Event */Block.__(3, [
                    defaultTo("", Js_primitive.null_undefined_to_opt(msg.name)),
                    defaultTo(null, Js_primitive.null_undefined_to_opt(msg.properties)),
                    createdAt,
                    path
                  ]);
      case "exception" : 
          return /* Error */Block.__(1, [
                    defaultTo([
                          Caml_builtin_exceptions.failure,
                          "Error is undefined"
                        ], Js_primitive.null_undefined_to_opt(msg.exception)),
                    createdAt,
                    path
                  ]);
      case "metric" : 
          return /* Metric */Block.__(2, [
                    defaultTo("", Js_primitive.null_undefined_to_opt(msg.name)),
                    defaultTo(null, Js_primitive.null_undefined_to_opt(msg.values)),
                    createdAt,
                    path
                  ]);
      case "trace" : 
          return /* Message */Block.__(0, [
                    defaultTo(/* Off */0, logLevelFromJs(defaultTo(0, Js_primitive.null_undefined_to_opt(msg.level)))),
                    defaultTo("", Js_primitive.null_undefined_to_opt(msg.message)),
                    createdAt,
                    path
                  ]);
      default:
        return /* Unknown */Block.__(4, [
                  unsafeEncoder(msg),
                  createdAt,
                  path
                ]);
    }
  }
}

function trace(message, loggingEngine) {
  loggingEngine.trace(message);
  return /* () */0;
}

function debug(message, loggingEngine) {
  loggingEngine.debug(message);
  return /* () */0;
}

function info(message, loggingEngine) {
  loggingEngine.info(message);
  return /* () */0;
}

function warn(message, loggingEngine) {
  loggingEngine.warn(message);
  return /* () */0;
}

function error(message, loggingEngine) {
  loggingEngine.error(message);
  return /* () */0;
}

function critical(message, loggingEngine) {
  loggingEngine.critical(message);
  return /* () */0;
}

function $$event(name, properties, loggingEngine) {
  loggingEngine.event(name, properties);
  return /* () */0;
}

function metric(name, values, loggingEngine) {
  loggingEngine.metric(name, values);
  return /* () */0;
}

function exception_(err, loggingEngine) {
  loggingEngine.exception(err);
  return /* () */0;
}

function mapCtx(untypedCtx) {
  return /* record */[
          /* parent : ActorRef */[untypedCtx.parent],
          /* path : ActorPath */[untypedCtx.path],
          /* self : ActorRef */[untypedCtx.self],
          /* children */Belt_SetString.fromArray(Nact_jsMap.keys(untypedCtx.children)),
          /* name */untypedCtx.name,
          /* logger */untypedCtx.log
        ];
}

function mapPersistentCtx(untypedCtx) {
  var partial_arg = untypedCtx.persist;
  return /* record */[
          /* parent : ActorRef */[untypedCtx.parent],
          /* path : ActorPath */[untypedCtx.path],
          /* self : ActorRef */[untypedCtx.self],
          /* name */untypedCtx.name,
          /* persist */Curry.__1(partial_arg),
          /* children */Belt_SetString.fromArray(Nact_jsMap.keys(untypedCtx.children)),
          /* recovering */defaultTo(false, Js_primitive.null_undefined_to_opt(untypedCtx.recovering)),
          /* logger */untypedCtx.log
        ];
}

function mapSupervisionCtx(untypedCtx) {
  return /* record */[
          /* parent : ActorRef */[untypedCtx.parent],
          /* path : ActorPath */[untypedCtx.path],
          /* self : ActorRef */[untypedCtx.self],
          /* name */untypedCtx.name,
          /* children */Belt_SetString.fromArray(Nact_jsMap.keys(untypedCtx.children))
        ];
}

function mapSupervisionFunction(optionalF) {
  if (optionalF) {
    var f = optionalF[0];
    return (function (msg, err, ctx) {
        return Curry._3(f, msg, err, mapSupervisionCtx(ctx)).then((function (decision) {
                      var tmp;
                      switch (decision) {
                        case 0 : 
                            tmp = ctx.stop;
                            break;
                        case 1 : 
                            tmp = ctx.stopAll;
                            break;
                        case 2 : 
                            tmp = ctx.reset;
                            break;
                        case 3 : 
                            tmp = ctx.resetAll;
                            break;
                        case 4 : 
                            tmp = ctx.escalate;
                            break;
                        case 5 : 
                            tmp = ctx.resume;
                            break;
                        
                      }
                      return Promise.resolve(tmp);
                    }));
      });
  } else {
    return undefined;
  }
}

function useStatefulSupervisionPolicy(f, initialState) {
  var state = [initialState];
  return (function (msg, err, ctx) {
      var match = Curry._4(f, msg, err, state[0], ctx);
      state[0] = match[0];
      return match[1];
    });
}

function spawn(name, shutdownAfter, onCrash, param, func, initialState) {
  var options = {
    shutdownAfter: Js_null_undefined.fromOption(shutdownAfter),
    onCrash: mapSupervisionFunction(onCrash)
  };
  var f = function (possibleState, msg, ctx) {
    var state = defaultTo(initialState, (possibleState == null) ? /* None */0 : [possibleState]);
    try {
      return Curry._3(func, state, msg, mapCtx(ctx));
    }
    catch (raw_err){
      return Promise.reject(Js_exn.internalToOCamlException(raw_err));
    }
  };
  var untypedRef = Nact.spawn(param[0], f, Js_null_undefined.fromOption(name), options);
  return /* ActorRef */[untypedRef];
}

function spawnStateless(name, shutdownAfter, onCrash, param, func) {
  var options = {
    shutdownAfter: Js_null_undefined.fromOption(shutdownAfter),
    onCrash: mapSupervisionFunction(onCrash)
  };
  var f = function (msg, ctx) {
    try {
      return Curry._2(func, msg, mapCtx(ctx));
    }
    catch (exn){
      return Promise.resolve(/* () */0);
    }
  };
  var untypedRef = Nact.spawnStateless(param[0], f, Js_null_undefined.fromOption(name), options);
  return /* ActorRef */[untypedRef];
}

function spawnPersistent(key, name, shutdownAfter, snapshotEvery, onCrash, decoder, stateDecoder, stateEncoder, encoder, param, func, initialState) {
  var decoder$1 = defaultTo((function (prim) {
          return unsafeDecoder(prim);
        }), decoder);
  var match = Belt_Option.isSome(snapshotEvery);
  var stateDecoder$1 = defaultTo(match ? (function (prim) {
            return unsafeDecoder(prim);
          }) : (function (prim) {
            return prim;
          }), stateDecoder);
  var match$1 = Belt_Option.isSome(snapshotEvery);
  var stateEncoder$1 = defaultTo(match$1 ? (function (prim) {
            return unsafeEncoder(prim);
          }) : (function (prim) {
            return prim;
          }), stateEncoder);
  var encoder$1 = defaultTo((function (prim) {
          return unsafeEncoder(prim);
        }), encoder);
  var options = {
    shutdownAfter: Js_null_undefined.fromOption(shutdownAfter),
    onCrash: mapSupervisionFunction(onCrash),
    snapshotEvery: Js_null_undefined.fromOption(snapshotEvery),
    decoder: decoder$1,
    encoder: encoder$1,
    snapshotDecoder: stateDecoder$1,
    snapshotEncoder: stateEncoder$1
  };
  var f = function (state, msg, ctx) {
    var state$1 = Belt_Option.getWithDefault((state == null) ? /* None */0 : [state], initialState);
    try {
      return Curry._3(func, state$1, msg, mapPersistentCtx(ctx));
    }
    catch (raw_err){
      return Promise.reject(Js_exn.internalToOCamlException(raw_err));
    }
  };
  var untypedRef = Nact.spawnPersistent(param[0], f, key, Js_null_undefined.fromOption(name), options);
  return /* ActorRef */[untypedRef];
}

function stop(param) {
  Nact.stop(param[0]);
  return /* () */0;
}

function dispatch$1(param, msg) {
  Nact.dispatch(param[0], msg);
  return /* () */0;
}

function nobody() {
  return /* ActorRef */[new References.Nobody()];
}

function spawnAdapter(name, parent, mapping) {
  if (name) {
    return spawnStateless(/* Some */[name[0]], /* None */0, /* None */0, parent, (function (msg, _) {
                  return Promise.resolve(dispatch$1(parent, Curry._1(mapping, msg)));
                }));
  } else {
    return spawnStateless(/* None */0, /* None */0, /* None */0, parent, (function (msg, _) {
                  return Promise.resolve(dispatch$1(parent, Curry._1(mapping, msg)));
                }));
  }
}

function start(name, persistenceEngine, logger, _) {
  var plugins = persistenceEngine ? /* :: */[
      Nact.configurePersistence(persistenceEngine[0]),
      /* [] */0
    ] : /* [] */0;
  var plugins$1;
  if (logger) {
    var logger$1 = logger[0];
    plugins$1 = /* :: */[
      Nact.configureLogging((function (param) {
              var loggingActorFunction = logger$1;
              var system = param;
              var loggerActor = Curry._1(loggingActorFunction, /* ActorRef */[system]);
              return spawnAdapter(/* None */0, loggerActor, fromJsLog)[0];
            })),
      plugins
    ];
  } else {
    plugins$1 = plugins;
  }
  var plugins$2 = name ? /* :: */[
      {
        name: name[0]
      },
      plugins$1
    ] : plugins$1;
  if (plugins$2) {
    var match = plugins$2[1];
    var a = plugins$2[0];
    if (match) {
      var match$1 = match[1];
      var b = match[0];
      if (match$1) {
        if (match$1[1]) {
          return /* ActorRef */[Nact.start()];
        } else {
          return /* ActorRef */[Nact.start(a, b, match$1[0])];
        }
      } else {
        return /* ActorRef */[Nact.start(a, b)];
      }
    } else {
      return /* ActorRef */[Nact.start(a)];
    }
  } else {
    return /* ActorRef */[Nact.start()];
  }
}

var QueryTimeout = Caml_exceptions.create("Nact.QueryTimeout");

function query(timeout, param, msgF) {
  var f = function (tempReference) {
    return Curry._1(msgF, /* ActorRef */[tempReference]);
  };
  return Nact.query(param[0], f, timeout).catch((function () {
                return Promise.reject([
                            QueryTimeout,
                            timeout
                          ]);
              }));
}

var seconds = 1000;

var minutes = Caml_int32.imul(60, seconds);

var hours = Caml_int32.imul(60, minutes);

var $less$neg$less = dispatch$1;

function $great$neg$great(msg, actorRef) {
  return dispatch$1(actorRef, msg);
}

function $less$unknown(actor, param) {
  return query(param[1], actor, param[0]);
}

var Operators = /* module */[
  /* <-< */$less$neg$less,
  /* >-> */$great$neg$great,
  /* <? */$less$unknown
];

var Log = [
  logLevelToString,
  trace,
  debug,
  info,
  warn,
  error,
  critical,
  $$event,
  exception_,
  metric
];

var milliseconds = 1;

var millisecond = 1;

var second = seconds;

var minute = minutes;

var messages = 1;

var message = 1;

exports.Interop = Interop;
exports.ActorPath = ActorPath;
exports.Log = Log;
exports.useStatefulSupervisionPolicy = useStatefulSupervisionPolicy;
exports.spawn = spawn;
exports.spawnStateless = spawnStateless;
exports.spawnPersistent = spawnPersistent;
exports.spawnAdapter = spawnAdapter;
exports.start = start;
exports.stop = stop;
exports.dispatch = dispatch$1;
exports.nobody = nobody;
exports.QueryTimeout = QueryTimeout;
exports.query = query;
exports.milliseconds = milliseconds;
exports.millisecond = millisecond;
exports.seconds = seconds;
exports.second = second;
exports.minutes = minutes;
exports.minute = minute;
exports.hours = hours;
exports.messages = messages;
exports.message = message;
exports.Operators = Operators;
/*  Not a pure module */
