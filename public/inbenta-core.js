/*
 * Inbenta SDK
 * Deliverable v1.6.0
 * (c) 2019 Inbenta <https://www.inbenta.com/>
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (factory());
}(this, (function () { 'use strict';

  /*
  |---------------------------------------------------
  |          Functions + external libraries
  |---------------------------------------------------
  |
  | >> WARNING!
  |
  | Function and external libraries used to build the
  | application customizations. Please, be carefull if
  | you want to modify this section.
  |
  */

  /**
   * Load script dynamically and instantly trigger a function
   * @param  {object || string}     script    Script attributes
   * @param  {function}             callback  Function to be triggered when the file is completely loaded
   */
  function importScript(script, callback) {
    var dom = document.createElement('script');
    if (callback) { dom.onload = callback; }
    script.type ? dom.type = script.type : dom.type = 'text/javascript';
    if (typeof (script) === 'object') {
      if (script.src) { dom.src = script.src; }
      if (script.integrity) { dom.integrity = script.integrity; }
      if (script.crossorigin) { dom.crossOrigin = script.crossorigin; }
      if (script.id) { dom.id = script.id; }
    } else if (typeof (script) === 'string') {
      dom.src = script;
    } else {
      throw new Error('Helper - importScript: script argument passed is not valid');
    }
    document.getElementsByTagName('head')[0].appendChild(dom, document.currentScript);
  }

  function showSurvey$1(surveyID) {
    var surveyProcess='toInit'; //Check if we're already showing the survey
    return function(chatbot) {
      
      window.addEventListener("message", receiveMessage, false); //event listener triggered on survey completition
      
      /**
       * 
       * @param {Object} event used to detct that the survey has been submitted
       */
      
      function receiveMessage(event) {
        if (event.data.message == "inbenta.survey.successful_answer") {
          surveyProcess='toFinish';
          chatbot.actions.resetSession(); //Close chatbot and resetSession
        }
      }

      chatbot.subscriptions.onResetSession(function(next) {
        
        if(surveyProcess!=='toInit'){ //Already showing the survey
          surveyProcess='toInit';
          return next(); //return next in order to allow the resetSession, user clicked close button  while the survey was being shown.
        }else { 
          var surveyURL = chatbot.api.getSurvey(surveyID); //get survey data
          
          surveyURL.then(function (ref){
            var data = ref.data;

            var survey={
              content: '<iframe name="inbenta-survey" src=' + data.url + '></iframe>'
            };
            chatbot.actions.showCustomConversationWindow(survey); //show Survey iframe on the customConversationWindow.
            surveyProcess = 'inProgress';
          });
        }
      });
      chatbot.subscriptions.onDisplaySystemMessage(function(messageData,next) {
        if(messageData.id=="exitConversation"){
          if(surveyProcess=='inProgress'){
            chatbot.actions.resetSession();
          }else {
            return next(messageData);
          }
        }else{ return next(messageData) }    });
    };
    window.showSurvey = showSurvey;
  }

  /**
   * Get Inbenta SDK script
   * @param   {object}  conf  Script configuration
   * @return  {object}        Inbenta SDK Script
   */
  function getSDKScript(conf) {
    var script = {};

    // Set script src & type
    script.type = 'text/javascript';
    script.src = 'https://sdk.inbenta.io/chatbot/' + conf.version + '/inbenta-chatbot-sdk.js';

    // Set script integrity
    if (conf.integrity) {
      script.integrity = conf.integrity;
      script.crossorigin = 'anonymous';
    }

    return script;
  }

  var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var jquery = createCommonjsModule(function (module) {
  /*!
   * jQuery JavaScript Library v3.4.1
   * https://jquery.com/
   *
   * Includes Sizzle.js
   * https://sizzlejs.com/
   *
   * Copyright JS Foundation and other contributors
   * Released under the MIT license
   * https://jquery.org/license
   *
   * Date: 2019-05-01T21:04Z
   */
  ( function( global, factory ) {

  	{

  		// For CommonJS and CommonJS-like environments where a proper `window`
  		// is present, execute the factory and get jQuery.
  		// For environments that do not have a `window` with a `document`
  		// (such as Node.js), expose a factory as module.exports.
  		// This accentuates the need for the creation of a real `window`.
  		// e.g. var jQuery = require("jquery")(window);
  		// See ticket #14549 for more info.
  		module.exports = global.document ?
  			factory( global, true ) :
  			function( w ) {
  				if ( !w.document ) {
  					throw new Error( "jQuery requires a window with a document" );
  				}
  				return factory( w );
  			};
  	}

  // Pass this if window is not defined yet
  } )( typeof window !== "undefined" ? window : commonjsGlobal, function( window, noGlobal ) {

  var arr = [];

  var document = window.document;

  var getProto = Object.getPrototypeOf;

  var slice = arr.slice;

  var concat = arr.concat;

  var push = arr.push;

  var indexOf = arr.indexOf;

  var class2type = {};

  var toString = class2type.toString;

  var hasOwn = class2type.hasOwnProperty;

  var fnToString = hasOwn.toString;

  var ObjectFunctionString = fnToString.call( Object );

  var support = {};

  var isFunction = function isFunction( obj ) {

        // Support: Chrome <=57, Firefox <=52
        // In some browsers, typeof returns "function" for HTML <object> elements
        // (i.e., `typeof document.createElement( "object" ) === "function"`).
        // We don't want to classify *any* DOM node as a function.
        return typeof obj === "function" && typeof obj.nodeType !== "number";
    };


  var isWindow = function isWindow( obj ) {
  		return obj != null && obj === obj.window;
  	};




  	var preservedScriptAttributes = {
  		type: true,
  		src: true,
  		nonce: true,
  		noModule: true
  	};

  	function DOMEval( code, node, doc ) {
  		doc = doc || document;

  		var i, val,
  			script = doc.createElement( "script" );

  		script.text = code;
  		if ( node ) {
  			for ( i in preservedScriptAttributes ) {

  				// Support: Firefox 64+, Edge 18+
  				// Some browsers don't support the "nonce" property on scripts.
  				// On the other hand, just using `getAttribute` is not enough as
  				// the `nonce` attribute is reset to an empty string whenever it
  				// becomes browsing-context connected.
  				// See https://github.com/whatwg/html/issues/2369
  				// See https://html.spec.whatwg.org/#nonce-attributes
  				// The `node.getAttribute` check was added for the sake of
  				// `jQuery.globalEval` so that it can fake a nonce-containing node
  				// via an object.
  				val = node[ i ] || node.getAttribute && node.getAttribute( i );
  				if ( val ) {
  					script.setAttribute( i, val );
  				}
  			}
  		}
  		doc.head.appendChild( script ).parentNode.removeChild( script );
  	}


  function toType( obj ) {
  	if ( obj == null ) {
  		return obj + "";
  	}

  	// Support: Android <=2.3 only (functionish RegExp)
  	return typeof obj === "object" || typeof obj === "function" ?
  		class2type[ toString.call( obj ) ] || "object" :
  		typeof obj;
  }
  /* global Symbol */
  // Defining this global in .eslintrc.json would create a danger of using the global
  // unguarded in another place, it seems safer to define global only for this module



  var
  	version = "3.4.1",

  	// Define a local copy of jQuery
  	jQuery = function( selector, context ) {

  		// The jQuery object is actually just the init constructor 'enhanced'
  		// Need init if jQuery is called (just allow error to be thrown if not included)
  		return new jQuery.fn.init( selector, context );
  	},

  	// Support: Android <=4.0 only
  	// Make sure we trim BOM and NBSP
  	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

  jQuery.fn = jQuery.prototype = {

  	// The current version of jQuery being used
  	jquery: version,

  	constructor: jQuery,

  	// The default length of a jQuery object is 0
  	length: 0,

  	toArray: function() {
  		return slice.call( this );
  	},

  	// Get the Nth element in the matched element set OR
  	// Get the whole matched element set as a clean array
  	get: function( num ) {

  		// Return all the elements in a clean array
  		if ( num == null ) {
  			return slice.call( this );
  		}

  		// Return just the one element from the set
  		return num < 0 ? this[ num + this.length ] : this[ num ];
  	},

  	// Take an array of elements and push it onto the stack
  	// (returning the new matched element set)
  	pushStack: function( elems ) {

  		// Build a new jQuery matched element set
  		var ret = jQuery.merge( this.constructor(), elems );

  		// Add the old object onto the stack (as a reference)
  		ret.prevObject = this;

  		// Return the newly-formed element set
  		return ret;
  	},

  	// Execute a callback for every element in the matched set.
  	each: function( callback ) {
  		return jQuery.each( this, callback );
  	},

  	map: function( callback ) {
  		return this.pushStack( jQuery.map( this, function( elem, i ) {
  			return callback.call( elem, i, elem );
  		} ) );
  	},

  	slice: function() {
  		return this.pushStack( slice.apply( this, arguments ) );
  	},

  	first: function() {
  		return this.eq( 0 );
  	},

  	last: function() {
  		return this.eq( -1 );
  	},

  	eq: function( i ) {
  		var len = this.length,
  			j = +i + ( i < 0 ? len : 0 );
  		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
  	},

  	end: function() {
  		return this.prevObject || this.constructor();
  	},

  	// For internal use only.
  	// Behaves like an Array's method, not like a jQuery method.
  	push: push,
  	sort: arr.sort,
  	splice: arr.splice
  };

  jQuery.extend = jQuery.fn.extend = function() {
  	var arguments$1 = arguments;

  	var options, name, src, copy, copyIsArray, clone,
  		target = arguments[ 0 ] || {},
  		i = 1,
  		length = arguments.length,
  		deep = false;

  	// Handle a deep copy situation
  	if ( typeof target === "boolean" ) {
  		deep = target;

  		// Skip the boolean and the target
  		target = arguments[ i ] || {};
  		i++;
  	}

  	// Handle case when target is a string or something (possible in deep copy)
  	if ( typeof target !== "object" && !isFunction( target ) ) {
  		target = {};
  	}

  	// Extend jQuery itself if only one argument is passed
  	if ( i === length ) {
  		target = this;
  		i--;
  	}

  	for ( ; i < length; i++ ) {

  		// Only deal with non-null/undefined values
  		if ( ( options = arguments$1[ i ] ) != null ) {

  			// Extend the base object
  			for ( name in options ) {
  				copy = options[ name ];

  				// Prevent Object.prototype pollution
  				// Prevent never-ending loop
  				if ( name === "__proto__" || target === copy ) {
  					continue;
  				}

  				// Recurse if we're merging plain objects or arrays
  				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
  					( copyIsArray = Array.isArray( copy ) ) ) ) {
  					src = target[ name ];

  					// Ensure proper type for the source value
  					if ( copyIsArray && !Array.isArray( src ) ) {
  						clone = [];
  					} else if ( !copyIsArray && !jQuery.isPlainObject( src ) ) {
  						clone = {};
  					} else {
  						clone = src;
  					}
  					copyIsArray = false;

  					// Never move original objects, clone them
  					target[ name ] = jQuery.extend( deep, clone, copy );

  				// Don't bring in undefined values
  				} else if ( copy !== undefined ) {
  					target[ name ] = copy;
  				}
  			}
  		}
  	}

  	// Return the modified object
  	return target;
  };

  jQuery.extend( {

  	// Unique for each copy of jQuery on the page
  	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

  	// Assume jQuery is ready without the ready module
  	isReady: true,

  	error: function( msg ) {
  		throw new Error( msg );
  	},

  	noop: function() {},

  	isPlainObject: function( obj ) {
  		var proto, Ctor;

  		// Detect obvious negatives
  		// Use toString instead of jQuery.type to catch host objects
  		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
  			return false;
  		}

  		proto = getProto( obj );

  		// Objects with no prototype (e.g., `Object.create( null )`) are plain
  		if ( !proto ) {
  			return true;
  		}

  		// Objects with prototype are plain iff they were constructed by a global Object function
  		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
  		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
  	},

  	isEmptyObject: function( obj ) {
  		var name;

  		for ( name in obj ) {
  			return false;
  		}
  		return true;
  	},

  	// Evaluates a script in a global context
  	globalEval: function( code, options ) {
  		DOMEval( code, { nonce: options && options.nonce } );
  	},

  	each: function( obj, callback ) {
  		var length, i = 0;

  		if ( isArrayLike( obj ) ) {
  			length = obj.length;
  			for ( ; i < length; i++ ) {
  				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
  					break;
  				}
  			}
  		} else {
  			for ( i in obj ) {
  				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
  					break;
  				}
  			}
  		}

  		return obj;
  	},

  	// Support: Android <=4.0 only
  	trim: function( text ) {
  		return text == null ?
  			"" :
  			( text + "" ).replace( rtrim, "" );
  	},

  	// results is for internal usage only
  	makeArray: function( arr, results ) {
  		var ret = results || [];

  		if ( arr != null ) {
  			if ( isArrayLike( Object( arr ) ) ) {
  				jQuery.merge( ret,
  					typeof arr === "string" ?
  					[ arr ] : arr
  				);
  			} else {
  				push.call( ret, arr );
  			}
  		}

  		return ret;
  	},

  	inArray: function( elem, arr, i ) {
  		return arr == null ? -1 : indexOf.call( arr, elem, i );
  	},

  	// Support: Android <=4.0 only, PhantomJS 1 only
  	// push.apply(_, arraylike) throws on ancient WebKit
  	merge: function( first, second ) {
  		var len = +second.length,
  			j = 0,
  			i = first.length;

  		for ( ; j < len; j++ ) {
  			first[ i++ ] = second[ j ];
  		}

  		first.length = i;

  		return first;
  	},

  	grep: function( elems, callback, invert ) {
  		var callbackInverse,
  			matches = [],
  			i = 0,
  			length = elems.length,
  			callbackExpect = !invert;

  		// Go through the array, only saving the items
  		// that pass the validator function
  		for ( ; i < length; i++ ) {
  			callbackInverse = !callback( elems[ i ], i );
  			if ( callbackInverse !== callbackExpect ) {
  				matches.push( elems[ i ] );
  			}
  		}

  		return matches;
  	},

  	// arg is for internal usage only
  	map: function( elems, callback, arg ) {
  		var length, value,
  			i = 0,
  			ret = [];

  		// Go through the array, translating each of the items to their new values
  		if ( isArrayLike( elems ) ) {
  			length = elems.length;
  			for ( ; i < length; i++ ) {
  				value = callback( elems[ i ], i, arg );

  				if ( value != null ) {
  					ret.push( value );
  				}
  			}

  		// Go through every key on the object,
  		} else {
  			for ( i in elems ) {
  				value = callback( elems[ i ], i, arg );

  				if ( value != null ) {
  					ret.push( value );
  				}
  			}
  		}

  		// Flatten any nested arrays
  		return concat.apply( [], ret );
  	},

  	// A global GUID counter for objects
  	guid: 1,

  	// jQuery.support is not used in Core but other projects attach their
  	// properties to it so it needs to exist.
  	support: support
  } );

  if ( typeof Symbol === "function" ) {
  	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
  }

  // Populate the class2type map
  jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
  function( i, name ) {
  	class2type[ "[object " + name + "]" ] = name.toLowerCase();
  } );

  function isArrayLike( obj ) {

  	// Support: real iOS 8.2 only (not reproducible in simulator)
  	// `in` check used to prevent JIT error (gh-2145)
  	// hasOwn isn't used here due to false negatives
  	// regarding Nodelist length in IE
  	var length = !!obj && "length" in obj && obj.length,
  		type = toType( obj );

  	if ( isFunction( obj ) || isWindow( obj ) ) {
  		return false;
  	}

  	return type === "array" || length === 0 ||
  		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
  }
  var Sizzle =
  /*!
   * Sizzle CSS Selector Engine v2.3.4
   * https://sizzlejs.com/
   *
   * Copyright JS Foundation and other contributors
   * Released under the MIT license
   * https://js.foundation/
   *
   * Date: 2019-04-08
   */
  (function( window ) {

  var i,
  	support,
  	Expr,
  	getText,
  	isXML,
  	tokenize,
  	compile,
  	select,
  	outermostContext,
  	sortInput,
  	hasDuplicate,

  	// Local document vars
  	setDocument,
  	document,
  	docElem,
  	documentIsHTML,
  	rbuggyQSA,
  	rbuggyMatches,
  	matches,
  	contains,

  	// Instance-specific data
  	expando = "sizzle" + 1 * new Date(),
  	preferredDoc = window.document,
  	dirruns = 0,
  	done = 0,
  	classCache = createCache(),
  	tokenCache = createCache(),
  	compilerCache = createCache(),
  	nonnativeSelectorCache = createCache(),
  	sortOrder = function( a, b ) {
  		if ( a === b ) {
  			hasDuplicate = true;
  		}
  		return 0;
  	},

  	// Instance methods
  	hasOwn = ({}).hasOwnProperty,
  	arr = [],
  	pop = arr.pop,
  	push_native = arr.push,
  	push = arr.push,
  	slice = arr.slice,
  	// Use a stripped-down indexOf as it's faster than native
  	// https://jsperf.com/thor-indexof-vs-for/5
  	indexOf = function( list, elem ) {
  		var i = 0,
  			len = list.length;
  		for ( ; i < len; i++ ) {
  			if ( list[i] === elem ) {
  				return i;
  			}
  		}
  		return -1;
  	},

  	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

  	// Regular expressions

  	// http://www.w3.org/TR/css3-selectors/#whitespace
  	whitespace = "[\\x20\\t\\r\\n\\f]",

  	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
  	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

  	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
  	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
  		// Operator (capture 2)
  		"*([*^$|!~]?=)" + whitespace +
  		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
  		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
  		"*\\]",

  	pseudos = ":(" + identifier + ")(?:\\((" +
  		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
  		// 1. quoted (capture 3; capture 4 or capture 5)
  		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
  		// 2. simple (capture 6)
  		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
  		// 3. anything else (capture 2)
  		".*" +
  		")\\)|)",

  	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
  	rwhitespace = new RegExp( whitespace + "+", "g" ),
  	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

  	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
  	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),
  	rdescend = new RegExp( whitespace + "|>" ),

  	rpseudo = new RegExp( pseudos ),
  	ridentifier = new RegExp( "^" + identifier + "$" ),

  	matchExpr = {
  		"ID": new RegExp( "^#(" + identifier + ")" ),
  		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
  		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
  		"ATTR": new RegExp( "^" + attributes ),
  		"PSEUDO": new RegExp( "^" + pseudos ),
  		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
  			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
  			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
  		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
  		// For use in libraries implementing .is()
  		// We use this for POS matching in `select`
  		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
  			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
  	},

  	rhtml = /HTML$/i,
  	rinputs = /^(?:input|select|textarea|button)$/i,
  	rheader = /^h\d$/i,

  	rnative = /^[^{]+\{\s*\[native \w/,

  	// Easily-parseable/retrievable ID or TAG or CLASS selectors
  	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

  	rsibling = /[+~]/,

  	// CSS escapes
  	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
  	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
  	funescape = function( _, escaped, escapedWhitespace ) {
  		var high = "0x" + escaped - 0x10000;
  		// NaN means non-codepoint
  		// Support: Firefox<24
  		// Workaround erroneous numeric interpretation of +"0x"
  		return high !== high || escapedWhitespace ?
  			escaped :
  			high < 0 ?
  				// BMP codepoint
  				String.fromCharCode( high + 0x10000 ) :
  				// Supplemental Plane codepoint (surrogate pair)
  				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
  	},

  	// CSS string/identifier serialization
  	// https://drafts.csswg.org/cssom/#common-serializing-idioms
  	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
  	fcssescape = function( ch, asCodePoint ) {
  		if ( asCodePoint ) {

  			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
  			if ( ch === "\0" ) {
  				return "\uFFFD";
  			}

  			// Control characters and (dependent upon position) numbers get escaped as code points
  			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
  		}

  		// Other potentially-special ASCII characters get backslash-escaped
  		return "\\" + ch;
  	},

  	// Used for iframes
  	// See setDocument()
  	// Removing the function wrapper causes a "Permission Denied"
  	// error in IE
  	unloadHandler = function() {
  		setDocument();
  	},

  	inDisabledFieldset = addCombinator(
  		function( elem ) {
  			return elem.disabled === true && elem.nodeName.toLowerCase() === "fieldset";
  		},
  		{ dir: "parentNode", next: "legend" }
  	);

  // Optimize for push.apply( _, NodeList )
  try {
  	push.apply(
  		(arr = slice.call( preferredDoc.childNodes )),
  		preferredDoc.childNodes
  	);
  	// Support: Android<4.0
  	// Detect silently failing push.apply
  	arr[ preferredDoc.childNodes.length ].nodeType;
  } catch ( e ) {
  	push = { apply: arr.length ?

  		// Leverage slice if possible
  		function( target, els ) {
  			push_native.apply( target, slice.call(els) );
  		} :

  		// Support: IE<9
  		// Otherwise append directly
  		function( target, els ) {
  			var j = target.length,
  				i = 0;
  			// Can't trust NodeList.length
  			while ( (target[j++] = els[i++]) ) {}
  			target.length = j - 1;
  		}
  	};
  }

  function Sizzle( selector, context, results, seed ) {
  	var m, i, elem, nid, match, groups, newSelector,
  		newContext = context && context.ownerDocument,

  		// nodeType defaults to 9, since context defaults to document
  		nodeType = context ? context.nodeType : 9;

  	results = results || [];

  	// Return early from calls with invalid selector or context
  	if ( typeof selector !== "string" || !selector ||
  		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

  		return results;
  	}

  	// Try to shortcut find operations (as opposed to filters) in HTML documents
  	if ( !seed ) {

  		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
  			setDocument( context );
  		}
  		context = context || document;

  		if ( documentIsHTML ) {

  			// If the selector is sufficiently simple, try using a "get*By*" DOM method
  			// (excepting DocumentFragment context, where the methods don't exist)
  			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

  				// ID selector
  				if ( (m = match[1]) ) {

  					// Document context
  					if ( nodeType === 9 ) {
  						if ( (elem = context.getElementById( m )) ) {

  							// Support: IE, Opera, Webkit
  							// TODO: identify versions
  							// getElementById can match elements by name instead of ID
  							if ( elem.id === m ) {
  								results.push( elem );
  								return results;
  							}
  						} else {
  							return results;
  						}

  					// Element context
  					} else {

  						// Support: IE, Opera, Webkit
  						// TODO: identify versions
  						// getElementById can match elements by name instead of ID
  						if ( newContext && (elem = newContext.getElementById( m )) &&
  							contains( context, elem ) &&
  							elem.id === m ) {

  							results.push( elem );
  							return results;
  						}
  					}

  				// Type selector
  				} else if ( match[2] ) {
  					push.apply( results, context.getElementsByTagName( selector ) );
  					return results;

  				// Class selector
  				} else if ( (m = match[3]) && support.getElementsByClassName &&
  					context.getElementsByClassName ) {

  					push.apply( results, context.getElementsByClassName( m ) );
  					return results;
  				}
  			}

  			// Take advantage of querySelectorAll
  			if ( support.qsa &&
  				!nonnativeSelectorCache[ selector + " " ] &&
  				(!rbuggyQSA || !rbuggyQSA.test( selector )) &&

  				// Support: IE 8 only
  				// Exclude object elements
  				(nodeType !== 1 || context.nodeName.toLowerCase() !== "object") ) {

  				newSelector = selector;
  				newContext = context;

  				// qSA considers elements outside a scoping root when evaluating child or
  				// descendant combinators, which is not what we want.
  				// In such cases, we work around the behavior by prefixing every selector in the
  				// list with an ID selector referencing the scope context.
  				// Thanks to Andrew Dupont for this technique.
  				if ( nodeType === 1 && rdescend.test( selector ) ) {

  					// Capture the context ID, setting it first if necessary
  					if ( (nid = context.getAttribute( "id" )) ) {
  						nid = nid.replace( rcssescape, fcssescape );
  					} else {
  						context.setAttribute( "id", (nid = expando) );
  					}

  					// Prefix every selector in the list
  					groups = tokenize( selector );
  					i = groups.length;
  					while ( i-- ) {
  						groups[i] = "#" + nid + " " + toSelector( groups[i] );
  					}
  					newSelector = groups.join( "," );

  					// Expand context for sibling selectors
  					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
  						context;
  				}

  				try {
  					push.apply( results,
  						newContext.querySelectorAll( newSelector )
  					);
  					return results;
  				} catch ( qsaError ) {
  					nonnativeSelectorCache( selector, true );
  				} finally {
  					if ( nid === expando ) {
  						context.removeAttribute( "id" );
  					}
  				}
  			}
  		}
  	}

  	// All others
  	return select( selector.replace( rtrim, "$1" ), context, results, seed );
  }

  /**
   * Create key-value caches of limited size
   * @returns {function(string, object)} Returns the Object data after storing it on itself with
   *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
   *	deleting the oldest entry
   */
  function createCache() {
  	var keys = [];

  	function cache( key, value ) {
  		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
  		if ( keys.push( key + " " ) > Expr.cacheLength ) {
  			// Only keep the most recent entries
  			delete cache[ keys.shift() ];
  		}
  		return (cache[ key + " " ] = value);
  	}
  	return cache;
  }

  /**
   * Mark a function for special use by Sizzle
   * @param {Function} fn The function to mark
   */
  function markFunction( fn ) {
  	fn[ expando ] = true;
  	return fn;
  }

  /**
   * Support testing using an element
   * @param {Function} fn Passed the created element and returns a boolean result
   */
  function assert( fn ) {
  	var el = document.createElement("fieldset");

  	try {
  		return !!fn( el );
  	} catch (e) {
  		return false;
  	} finally {
  		// Remove from its parent by default
  		if ( el.parentNode ) {
  			el.parentNode.removeChild( el );
  		}
  		// release memory in IE
  		el = null;
  	}
  }

  /**
   * Adds the same handler for all of the specified attrs
   * @param {String} attrs Pipe-separated list of attributes
   * @param {Function} handler The method that will be applied
   */
  function addHandle( attrs, handler ) {
  	var arr = attrs.split("|"),
  		i = arr.length;

  	while ( i-- ) {
  		Expr.attrHandle[ arr[i] ] = handler;
  	}
  }

  /**
   * Checks document order of two siblings
   * @param {Element} a
   * @param {Element} b
   * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
   */
  function siblingCheck( a, b ) {
  	var cur = b && a,
  		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
  			a.sourceIndex - b.sourceIndex;

  	// Use IE sourceIndex if available on both nodes
  	if ( diff ) {
  		return diff;
  	}

  	// Check if b follows a
  	if ( cur ) {
  		while ( (cur = cur.nextSibling) ) {
  			if ( cur === b ) {
  				return -1;
  			}
  		}
  	}

  	return a ? 1 : -1;
  }

  /**
   * Returns a function to use in pseudos for input types
   * @param {String} type
   */
  function createInputPseudo( type ) {
  	return function( elem ) {
  		var name = elem.nodeName.toLowerCase();
  		return name === "input" && elem.type === type;
  	};
  }

  /**
   * Returns a function to use in pseudos for buttons
   * @param {String} type
   */
  function createButtonPseudo( type ) {
  	return function( elem ) {
  		var name = elem.nodeName.toLowerCase();
  		return (name === "input" || name === "button") && elem.type === type;
  	};
  }

  /**
   * Returns a function to use in pseudos for :enabled/:disabled
   * @param {Boolean} disabled true for :disabled; false for :enabled
   */
  function createDisabledPseudo( disabled ) {

  	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
  	return function( elem ) {

  		// Only certain elements can match :enabled or :disabled
  		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
  		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
  		if ( "form" in elem ) {

  			// Check for inherited disabledness on relevant non-disabled elements:
  			// * listed form-associated elements in a disabled fieldset
  			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
  			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
  			// * option elements in a disabled optgroup
  			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
  			// All such elements have a "form" property.
  			if ( elem.parentNode && elem.disabled === false ) {

  				// Option elements defer to a parent optgroup if present
  				if ( "label" in elem ) {
  					if ( "label" in elem.parentNode ) {
  						return elem.parentNode.disabled === disabled;
  					} else {
  						return elem.disabled === disabled;
  					}
  				}

  				// Support: IE 6 - 11
  				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
  				return elem.isDisabled === disabled ||

  					// Where there is no isDisabled, check manually
  					/* jshint -W018 */
  					elem.isDisabled !== !disabled &&
  						inDisabledFieldset( elem ) === disabled;
  			}

  			return elem.disabled === disabled;

  		// Try to winnow out elements that can't be disabled before trusting the disabled property.
  		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
  		// even exist on them, let alone have a boolean value.
  		} else if ( "label" in elem ) {
  			return elem.disabled === disabled;
  		}

  		// Remaining elements are neither :enabled nor :disabled
  		return false;
  	};
  }

  /**
   * Returns a function to use in pseudos for positionals
   * @param {Function} fn
   */
  function createPositionalPseudo( fn ) {
  	return markFunction(function( argument ) {
  		argument = +argument;
  		return markFunction(function( seed, matches ) {
  			var j,
  				matchIndexes = fn( [], seed.length, argument ),
  				i = matchIndexes.length;

  			// Match elements found at the specified indexes
  			while ( i-- ) {
  				if ( seed[ (j = matchIndexes[i]) ] ) {
  					seed[j] = !(matches[j] = seed[j]);
  				}
  			}
  		});
  	});
  }

  /**
   * Checks a node for validity as a Sizzle context
   * @param {Element|Object=} context
   * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
   */
  function testContext( context ) {
  	return context && typeof context.getElementsByTagName !== "undefined" && context;
  }

  // Expose support vars for convenience
  support = Sizzle.support = {};

  /**
   * Detects XML nodes
   * @param {Element|Object} elem An element or a document
   * @returns {Boolean} True iff elem is a non-HTML XML node
   */
  isXML = Sizzle.isXML = function( elem ) {
  	var namespace = elem.namespaceURI,
  		docElem = (elem.ownerDocument || elem).documentElement;

  	// Support: IE <=8
  	// Assume HTML when documentElement doesn't yet exist, such as inside loading iframes
  	// https://bugs.jquery.com/ticket/4833
  	return !rhtml.test( namespace || docElem && docElem.nodeName || "HTML" );
  };

  /**
   * Sets document-related variables once based on the current document
   * @param {Element|Object} [doc] An element or document object to use to set the document
   * @returns {Object} Returns the current document
   */
  setDocument = Sizzle.setDocument = function( node ) {
  	var hasCompare, subWindow,
  		doc = node ? node.ownerDocument || node : preferredDoc;

  	// Return early if doc is invalid or already selected
  	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
  		return document;
  	}

  	// Update global variables
  	document = doc;
  	docElem = document.documentElement;
  	documentIsHTML = !isXML( document );

  	// Support: IE 9-11, Edge
  	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
  	if ( preferredDoc !== document &&
  		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

  		// Support: IE 11, Edge
  		if ( subWindow.addEventListener ) {
  			subWindow.addEventListener( "unload", unloadHandler, false );

  		// Support: IE 9 - 10 only
  		} else if ( subWindow.attachEvent ) {
  			subWindow.attachEvent( "onunload", unloadHandler );
  		}
  	}

  	/* Attributes
  	---------------------------------------------------------------------- */

  	// Support: IE<8
  	// Verify that getAttribute really returns attributes and not properties
  	// (excepting IE8 booleans)
  	support.attributes = assert(function( el ) {
  		el.className = "i";
  		return !el.getAttribute("className");
  	});

  	/* getElement(s)By*
  	---------------------------------------------------------------------- */

  	// Check if getElementsByTagName("*") returns only elements
  	support.getElementsByTagName = assert(function( el ) {
  		el.appendChild( document.createComment("") );
  		return !el.getElementsByTagName("*").length;
  	});

  	// Support: IE<9
  	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

  	// Support: IE<10
  	// Check if getElementById returns elements by name
  	// The broken getElementById methods don't pick up programmatically-set names,
  	// so use a roundabout getElementsByName test
  	support.getById = assert(function( el ) {
  		docElem.appendChild( el ).id = expando;
  		return !document.getElementsByName || !document.getElementsByName( expando ).length;
  	});

  	// ID filter and find
  	if ( support.getById ) {
  		Expr.filter["ID"] = function( id ) {
  			var attrId = id.replace( runescape, funescape );
  			return function( elem ) {
  				return elem.getAttribute("id") === attrId;
  			};
  		};
  		Expr.find["ID"] = function( id, context ) {
  			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
  				var elem = context.getElementById( id );
  				return elem ? [ elem ] : [];
  			}
  		};
  	} else {
  		Expr.filter["ID"] =  function( id ) {
  			var attrId = id.replace( runescape, funescape );
  			return function( elem ) {
  				var node = typeof elem.getAttributeNode !== "undefined" &&
  					elem.getAttributeNode("id");
  				return node && node.value === attrId;
  			};
  		};

  		// Support: IE 6 - 7 only
  		// getElementById is not reliable as a find shortcut
  		Expr.find["ID"] = function( id, context ) {
  			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
  				var node, i, elems,
  					elem = context.getElementById( id );

  				if ( elem ) {

  					// Verify the id attribute
  					node = elem.getAttributeNode("id");
  					if ( node && node.value === id ) {
  						return [ elem ];
  					}

  					// Fall back on getElementsByName
  					elems = context.getElementsByName( id );
  					i = 0;
  					while ( (elem = elems[i++]) ) {
  						node = elem.getAttributeNode("id");
  						if ( node && node.value === id ) {
  							return [ elem ];
  						}
  					}
  				}

  				return [];
  			}
  		};
  	}

  	// Tag
  	Expr.find["TAG"] = support.getElementsByTagName ?
  		function( tag, context ) {
  			if ( typeof context.getElementsByTagName !== "undefined" ) {
  				return context.getElementsByTagName( tag );

  			// DocumentFragment nodes don't have gEBTN
  			} else if ( support.qsa ) {
  				return context.querySelectorAll( tag );
  			}
  		} :

  		function( tag, context ) {
  			var elem,
  				tmp = [],
  				i = 0,
  				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
  				results = context.getElementsByTagName( tag );

  			// Filter out possible comments
  			if ( tag === "*" ) {
  				while ( (elem = results[i++]) ) {
  					if ( elem.nodeType === 1 ) {
  						tmp.push( elem );
  					}
  				}

  				return tmp;
  			}
  			return results;
  		};

  	// Class
  	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
  		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
  			return context.getElementsByClassName( className );
  		}
  	};

  	/* QSA/matchesSelector
  	---------------------------------------------------------------------- */

  	// QSA and matchesSelector support

  	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
  	rbuggyMatches = [];

  	// qSa(:focus) reports false when true (Chrome 21)
  	// We allow this because of a bug in IE8/9 that throws an error
  	// whenever `document.activeElement` is accessed on an iframe
  	// So, we allow :focus to pass through QSA all the time to avoid the IE error
  	// See https://bugs.jquery.com/ticket/13378
  	rbuggyQSA = [];

  	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
  		// Build QSA regex
  		// Regex strategy adopted from Diego Perini
  		assert(function( el ) {
  			// Select is set to empty string on purpose
  			// This is to test IE's treatment of not explicitly
  			// setting a boolean content attribute,
  			// since its presence should be enough
  			// https://bugs.jquery.com/ticket/12359
  			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
  				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
  				"<option selected=''></option></select>";

  			// Support: IE8, Opera 11-12.16
  			// Nothing should be selected when empty strings follow ^= or $= or *=
  			// The test attribute must be unknown in Opera but "safe" for WinRT
  			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
  			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
  				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
  			}

  			// Support: IE8
  			// Boolean attributes and "value" are not treated correctly
  			if ( !el.querySelectorAll("[selected]").length ) {
  				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
  			}

  			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
  			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
  				rbuggyQSA.push("~=");
  			}

  			// Webkit/Opera - :checked should return selected option elements
  			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
  			// IE8 throws error here and will not see later tests
  			if ( !el.querySelectorAll(":checked").length ) {
  				rbuggyQSA.push(":checked");
  			}

  			// Support: Safari 8+, iOS 8+
  			// https://bugs.webkit.org/show_bug.cgi?id=136851
  			// In-page `selector#id sibling-combinator selector` fails
  			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
  				rbuggyQSA.push(".#.+[+~]");
  			}
  		});

  		assert(function( el ) {
  			el.innerHTML = "<a href='' disabled='disabled'></a>" +
  				"<select disabled='disabled'><option/></select>";

  			// Support: Windows 8 Native Apps
  			// The type and name attributes are restricted during .innerHTML assignment
  			var input = document.createElement("input");
  			input.setAttribute( "type", "hidden" );
  			el.appendChild( input ).setAttribute( "name", "D" );

  			// Support: IE8
  			// Enforce case-sensitivity of name attribute
  			if ( el.querySelectorAll("[name=d]").length ) {
  				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
  			}

  			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
  			// IE8 throws error here and will not see later tests
  			if ( el.querySelectorAll(":enabled").length !== 2 ) {
  				rbuggyQSA.push( ":enabled", ":disabled" );
  			}

  			// Support: IE9-11+
  			// IE's :disabled selector does not pick up the children of disabled fieldsets
  			docElem.appendChild( el ).disabled = true;
  			if ( el.querySelectorAll(":disabled").length !== 2 ) {
  				rbuggyQSA.push( ":enabled", ":disabled" );
  			}

  			// Opera 10-11 does not throw on post-comma invalid pseudos
  			el.querySelectorAll("*,:x");
  			rbuggyQSA.push(",.*:");
  		});
  	}

  	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
  		docElem.webkitMatchesSelector ||
  		docElem.mozMatchesSelector ||
  		docElem.oMatchesSelector ||
  		docElem.msMatchesSelector) )) ) {

  		assert(function( el ) {
  			// Check to see if it's possible to do matchesSelector
  			// on a disconnected node (IE 9)
  			support.disconnectedMatch = matches.call( el, "*" );

  			// This should fail with an exception
  			// Gecko does not error, returns false instead
  			matches.call( el, "[s!='']:x" );
  			rbuggyMatches.push( "!=", pseudos );
  		});
  	}

  	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
  	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

  	/* Contains
  	---------------------------------------------------------------------- */
  	hasCompare = rnative.test( docElem.compareDocumentPosition );

  	// Element contains another
  	// Purposefully self-exclusive
  	// As in, an element does not contain itself
  	contains = hasCompare || rnative.test( docElem.contains ) ?
  		function( a, b ) {
  			var adown = a.nodeType === 9 ? a.documentElement : a,
  				bup = b && b.parentNode;
  			return a === bup || !!( bup && bup.nodeType === 1 && (
  				adown.contains ?
  					adown.contains( bup ) :
  					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
  			));
  		} :
  		function( a, b ) {
  			if ( b ) {
  				while ( (b = b.parentNode) ) {
  					if ( b === a ) {
  						return true;
  					}
  				}
  			}
  			return false;
  		};

  	/* Sorting
  	---------------------------------------------------------------------- */

  	// Document order sorting
  	sortOrder = hasCompare ?
  	function( a, b ) {

  		// Flag for duplicate removal
  		if ( a === b ) {
  			hasDuplicate = true;
  			return 0;
  		}

  		// Sort on method existence if only one input has compareDocumentPosition
  		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
  		if ( compare ) {
  			return compare;
  		}

  		// Calculate position if both inputs belong to the same document
  		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
  			a.compareDocumentPosition( b ) :

  			// Otherwise we know they are disconnected
  			1;

  		// Disconnected nodes
  		if ( compare & 1 ||
  			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

  			// Choose the first element that is related to our preferred document
  			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
  				return -1;
  			}
  			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
  				return 1;
  			}

  			// Maintain original order
  			return sortInput ?
  				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
  				0;
  		}

  		return compare & 4 ? -1 : 1;
  	} :
  	function( a, b ) {
  		// Exit early if the nodes are identical
  		if ( a === b ) {
  			hasDuplicate = true;
  			return 0;
  		}

  		var cur,
  			i = 0,
  			aup = a.parentNode,
  			bup = b.parentNode,
  			ap = [ a ],
  			bp = [ b ];

  		// Parentless nodes are either documents or disconnected
  		if ( !aup || !bup ) {
  			return a === document ? -1 :
  				b === document ? 1 :
  				aup ? -1 :
  				bup ? 1 :
  				sortInput ?
  				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
  				0;

  		// If the nodes are siblings, we can do a quick check
  		} else if ( aup === bup ) {
  			return siblingCheck( a, b );
  		}

  		// Otherwise we need full lists of their ancestors for comparison
  		cur = a;
  		while ( (cur = cur.parentNode) ) {
  			ap.unshift( cur );
  		}
  		cur = b;
  		while ( (cur = cur.parentNode) ) {
  			bp.unshift( cur );
  		}

  		// Walk down the tree looking for a discrepancy
  		while ( ap[i] === bp[i] ) {
  			i++;
  		}

  		return i ?
  			// Do a sibling check if the nodes have a common ancestor
  			siblingCheck( ap[i], bp[i] ) :

  			// Otherwise nodes in our document sort first
  			ap[i] === preferredDoc ? -1 :
  			bp[i] === preferredDoc ? 1 :
  			0;
  	};

  	return document;
  };

  Sizzle.matches = function( expr, elements ) {
  	return Sizzle( expr, null, null, elements );
  };

  Sizzle.matchesSelector = function( elem, expr ) {
  	// Set document vars if needed
  	if ( ( elem.ownerDocument || elem ) !== document ) {
  		setDocument( elem );
  	}

  	if ( support.matchesSelector && documentIsHTML &&
  		!nonnativeSelectorCache[ expr + " " ] &&
  		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
  		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

  		try {
  			var ret = matches.call( elem, expr );

  			// IE 9's matchesSelector returns false on disconnected nodes
  			if ( ret || support.disconnectedMatch ||
  					// As well, disconnected nodes are said to be in a document
  					// fragment in IE 9
  					elem.document && elem.document.nodeType !== 11 ) {
  				return ret;
  			}
  		} catch (e) {
  			nonnativeSelectorCache( expr, true );
  		}
  	}

  	return Sizzle( expr, document, null, [ elem ] ).length > 0;
  };

  Sizzle.contains = function( context, elem ) {
  	// Set document vars if needed
  	if ( ( context.ownerDocument || context ) !== document ) {
  		setDocument( context );
  	}
  	return contains( context, elem );
  };

  Sizzle.attr = function( elem, name ) {
  	// Set document vars if needed
  	if ( ( elem.ownerDocument || elem ) !== document ) {
  		setDocument( elem );
  	}

  	var fn = Expr.attrHandle[ name.toLowerCase() ],
  		// Don't get fooled by Object.prototype properties (jQuery #13807)
  		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
  			fn( elem, name, !documentIsHTML ) :
  			undefined;

  	return val !== undefined ?
  		val :
  		support.attributes || !documentIsHTML ?
  			elem.getAttribute( name ) :
  			(val = elem.getAttributeNode(name)) && val.specified ?
  				val.value :
  				null;
  };

  Sizzle.escape = function( sel ) {
  	return (sel + "").replace( rcssescape, fcssescape );
  };

  Sizzle.error = function( msg ) {
  	throw new Error( "Syntax error, unrecognized expression: " + msg );
  };

  /**
   * Document sorting and removing duplicates
   * @param {ArrayLike} results
   */
  Sizzle.uniqueSort = function( results ) {
  	var elem,
  		duplicates = [],
  		j = 0,
  		i = 0;

  	// Unless we *know* we can detect duplicates, assume their presence
  	hasDuplicate = !support.detectDuplicates;
  	sortInput = !support.sortStable && results.slice( 0 );
  	results.sort( sortOrder );

  	if ( hasDuplicate ) {
  		while ( (elem = results[i++]) ) {
  			if ( elem === results[ i ] ) {
  				j = duplicates.push( i );
  			}
  		}
  		while ( j-- ) {
  			results.splice( duplicates[ j ], 1 );
  		}
  	}

  	// Clear input after sorting to release objects
  	// See https://github.com/jquery/sizzle/pull/225
  	sortInput = null;

  	return results;
  };

  /**
   * Utility function for retrieving the text value of an array of DOM nodes
   * @param {Array|Element} elem
   */
  getText = Sizzle.getText = function( elem ) {
  	var node,
  		ret = "",
  		i = 0,
  		nodeType = elem.nodeType;

  	if ( !nodeType ) {
  		// If no nodeType, this is expected to be an array
  		while ( (node = elem[i++]) ) {
  			// Do not traverse comment nodes
  			ret += getText( node );
  		}
  	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
  		// Use textContent for elements
  		// innerText usage removed for consistency of new lines (jQuery #11153)
  		if ( typeof elem.textContent === "string" ) {
  			return elem.textContent;
  		} else {
  			// Traverse its children
  			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
  				ret += getText( elem );
  			}
  		}
  	} else if ( nodeType === 3 || nodeType === 4 ) {
  		return elem.nodeValue;
  	}
  	// Do not include comment or processing instruction nodes

  	return ret;
  };

  Expr = Sizzle.selectors = {

  	// Can be adjusted by the user
  	cacheLength: 50,

  	createPseudo: markFunction,

  	match: matchExpr,

  	attrHandle: {},

  	find: {},

  	relative: {
  		">": { dir: "parentNode", first: true },
  		" ": { dir: "parentNode" },
  		"+": { dir: "previousSibling", first: true },
  		"~": { dir: "previousSibling" }
  	},

  	preFilter: {
  		"ATTR": function( match ) {
  			match[1] = match[1].replace( runescape, funescape );

  			// Move the given value to match[3] whether quoted or unquoted
  			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

  			if ( match[2] === "~=" ) {
  				match[3] = " " + match[3] + " ";
  			}

  			return match.slice( 0, 4 );
  		},

  		"CHILD": function( match ) {
  			/* matches from matchExpr["CHILD"]
  				1 type (only|nth|...)
  				2 what (child|of-type)
  				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
  				4 xn-component of xn+y argument ([+-]?\d*n|)
  				5 sign of xn-component
  				6 x of xn-component
  				7 sign of y-component
  				8 y of y-component
  			*/
  			match[1] = match[1].toLowerCase();

  			if ( match[1].slice( 0, 3 ) === "nth" ) {
  				// nth-* requires argument
  				if ( !match[3] ) {
  					Sizzle.error( match[0] );
  				}

  				// numeric x and y parameters for Expr.filter.CHILD
  				// remember that false/true cast respectively to 0/1
  				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
  				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

  			// other types prohibit arguments
  			} else if ( match[3] ) {
  				Sizzle.error( match[0] );
  			}

  			return match;
  		},

  		"PSEUDO": function( match ) {
  			var excess,
  				unquoted = !match[6] && match[2];

  			if ( matchExpr["CHILD"].test( match[0] ) ) {
  				return null;
  			}

  			// Accept quoted arguments as-is
  			if ( match[3] ) {
  				match[2] = match[4] || match[5] || "";

  			// Strip excess characters from unquoted arguments
  			} else if ( unquoted && rpseudo.test( unquoted ) &&
  				// Get excess from tokenize (recursively)
  				(excess = tokenize( unquoted, true )) &&
  				// advance to the next closing parenthesis
  				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

  				// excess is a negative index
  				match[0] = match[0].slice( 0, excess );
  				match[2] = unquoted.slice( 0, excess );
  			}

  			// Return only captures needed by the pseudo filter method (type and argument)
  			return match.slice( 0, 3 );
  		}
  	},

  	filter: {

  		"TAG": function( nodeNameSelector ) {
  			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
  			return nodeNameSelector === "*" ?
  				function() { return true; } :
  				function( elem ) {
  					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
  				};
  		},

  		"CLASS": function( className ) {
  			var pattern = classCache[ className + " " ];

  			return pattern ||
  				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
  				classCache( className, function( elem ) {
  					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
  				});
  		},

  		"ATTR": function( name, operator, check ) {
  			return function( elem ) {
  				var result = Sizzle.attr( elem, name );

  				if ( result == null ) {
  					return operator === "!=";
  				}
  				if ( !operator ) {
  					return true;
  				}

  				result += "";

  				return operator === "=" ? result === check :
  					operator === "!=" ? result !== check :
  					operator === "^=" ? check && result.indexOf( check ) === 0 :
  					operator === "*=" ? check && result.indexOf( check ) > -1 :
  					operator === "$=" ? check && result.slice( -check.length ) === check :
  					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
  					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
  					false;
  			};
  		},

  		"CHILD": function( type, what, argument, first, last ) {
  			var simple = type.slice( 0, 3 ) !== "nth",
  				forward = type.slice( -4 ) !== "last",
  				ofType = what === "of-type";

  			return first === 1 && last === 0 ?

  				// Shortcut for :nth-*(n)
  				function( elem ) {
  					return !!elem.parentNode;
  				} :

  				function( elem, context, xml ) {
  					var cache, uniqueCache, outerCache, node, nodeIndex, start,
  						dir = simple !== forward ? "nextSibling" : "previousSibling",
  						parent = elem.parentNode,
  						name = ofType && elem.nodeName.toLowerCase(),
  						useCache = !xml && !ofType,
  						diff = false;

  					if ( parent ) {

  						// :(first|last|only)-(child|of-type)
  						if ( simple ) {
  							while ( dir ) {
  								node = elem;
  								while ( (node = node[ dir ]) ) {
  									if ( ofType ?
  										node.nodeName.toLowerCase() === name :
  										node.nodeType === 1 ) {

  										return false;
  									}
  								}
  								// Reverse direction for :only-* (if we haven't yet done so)
  								start = dir = type === "only" && !start && "nextSibling";
  							}
  							return true;
  						}

  						start = [ forward ? parent.firstChild : parent.lastChild ];

  						// non-xml :nth-child(...) stores cache data on `parent`
  						if ( forward && useCache ) {

  							// Seek `elem` from a previously-cached index

  							// ...in a gzip-friendly way
  							node = parent;
  							outerCache = node[ expando ] || (node[ expando ] = {});

  							// Support: IE <9 only
  							// Defend against cloned attroperties (jQuery gh-1709)
  							uniqueCache = outerCache[ node.uniqueID ] ||
  								(outerCache[ node.uniqueID ] = {});

  							cache = uniqueCache[ type ] || [];
  							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
  							diff = nodeIndex && cache[ 2 ];
  							node = nodeIndex && parent.childNodes[ nodeIndex ];

  							while ( (node = ++nodeIndex && node && node[ dir ] ||

  								// Fallback to seeking `elem` from the start
  								(diff = nodeIndex = 0) || start.pop()) ) {

  								// When found, cache indexes on `parent` and break
  								if ( node.nodeType === 1 && ++diff && node === elem ) {
  									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
  									break;
  								}
  							}

  						} else {
  							// Use previously-cached element index if available
  							if ( useCache ) {
  								// ...in a gzip-friendly way
  								node = elem;
  								outerCache = node[ expando ] || (node[ expando ] = {});

  								// Support: IE <9 only
  								// Defend against cloned attroperties (jQuery gh-1709)
  								uniqueCache = outerCache[ node.uniqueID ] ||
  									(outerCache[ node.uniqueID ] = {});

  								cache = uniqueCache[ type ] || [];
  								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
  								diff = nodeIndex;
  							}

  							// xml :nth-child(...)
  							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
  							if ( diff === false ) {
  								// Use the same loop as above to seek `elem` from the start
  								while ( (node = ++nodeIndex && node && node[ dir ] ||
  									(diff = nodeIndex = 0) || start.pop()) ) {

  									if ( ( ofType ?
  										node.nodeName.toLowerCase() === name :
  										node.nodeType === 1 ) &&
  										++diff ) {

  										// Cache the index of each encountered element
  										if ( useCache ) {
  											outerCache = node[ expando ] || (node[ expando ] = {});

  											// Support: IE <9 only
  											// Defend against cloned attroperties (jQuery gh-1709)
  											uniqueCache = outerCache[ node.uniqueID ] ||
  												(outerCache[ node.uniqueID ] = {});

  											uniqueCache[ type ] = [ dirruns, diff ];
  										}

  										if ( node === elem ) {
  											break;
  										}
  									}
  								}
  							}
  						}

  						// Incorporate the offset, then check against cycle size
  						diff -= last;
  						return diff === first || ( diff % first === 0 && diff / first >= 0 );
  					}
  				};
  		},

  		"PSEUDO": function( pseudo, argument ) {
  			// pseudo-class names are case-insensitive
  			// http://www.w3.org/TR/selectors/#pseudo-classes
  			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
  			// Remember that setFilters inherits from pseudos
  			var args,
  				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
  					Sizzle.error( "unsupported pseudo: " + pseudo );

  			// The user may use createPseudo to indicate that
  			// arguments are needed to create the filter function
  			// just as Sizzle does
  			if ( fn[ expando ] ) {
  				return fn( argument );
  			}

  			// But maintain support for old signatures
  			if ( fn.length > 1 ) {
  				args = [ pseudo, pseudo, "", argument ];
  				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
  					markFunction(function( seed, matches ) {
  						var idx,
  							matched = fn( seed, argument ),
  							i = matched.length;
  						while ( i-- ) {
  							idx = indexOf( seed, matched[i] );
  							seed[ idx ] = !( matches[ idx ] = matched[i] );
  						}
  					}) :
  					function( elem ) {
  						return fn( elem, 0, args );
  					};
  			}

  			return fn;
  		}
  	},

  	pseudos: {
  		// Potentially complex pseudos
  		"not": markFunction(function( selector ) {
  			// Trim the selector passed to compile
  			// to avoid treating leading and trailing
  			// spaces as combinators
  			var input = [],
  				results = [],
  				matcher = compile( selector.replace( rtrim, "$1" ) );

  			return matcher[ expando ] ?
  				markFunction(function( seed, matches, context, xml ) {
  					var elem,
  						unmatched = matcher( seed, null, xml, [] ),
  						i = seed.length;

  					// Match elements unmatched by `matcher`
  					while ( i-- ) {
  						if ( (elem = unmatched[i]) ) {
  							seed[i] = !(matches[i] = elem);
  						}
  					}
  				}) :
  				function( elem, context, xml ) {
  					input[0] = elem;
  					matcher( input, null, xml, results );
  					// Don't keep the element (issue #299)
  					input[0] = null;
  					return !results.pop();
  				};
  		}),

  		"has": markFunction(function( selector ) {
  			return function( elem ) {
  				return Sizzle( selector, elem ).length > 0;
  			};
  		}),

  		"contains": markFunction(function( text ) {
  			text = text.replace( runescape, funescape );
  			return function( elem ) {
  				return ( elem.textContent || getText( elem ) ).indexOf( text ) > -1;
  			};
  		}),

  		// "Whether an element is represented by a :lang() selector
  		// is based solely on the element's language value
  		// being equal to the identifier C,
  		// or beginning with the identifier C immediately followed by "-".
  		// The matching of C against the element's language value is performed case-insensitively.
  		// The identifier C does not have to be a valid language name."
  		// http://www.w3.org/TR/selectors/#lang-pseudo
  		"lang": markFunction( function( lang ) {
  			// lang value must be a valid identifier
  			if ( !ridentifier.test(lang || "") ) {
  				Sizzle.error( "unsupported lang: " + lang );
  			}
  			lang = lang.replace( runescape, funescape ).toLowerCase();
  			return function( elem ) {
  				var elemLang;
  				do {
  					if ( (elemLang = documentIsHTML ?
  						elem.lang :
  						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

  						elemLang = elemLang.toLowerCase();
  						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
  					}
  				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
  				return false;
  			};
  		}),

  		// Miscellaneous
  		"target": function( elem ) {
  			var hash = window.location && window.location.hash;
  			return hash && hash.slice( 1 ) === elem.id;
  		},

  		"root": function( elem ) {
  			return elem === docElem;
  		},

  		"focus": function( elem ) {
  			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
  		},

  		// Boolean properties
  		"enabled": createDisabledPseudo( false ),
  		"disabled": createDisabledPseudo( true ),

  		"checked": function( elem ) {
  			// In CSS3, :checked should return both checked and selected elements
  			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
  			var nodeName = elem.nodeName.toLowerCase();
  			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
  		},

  		"selected": function( elem ) {
  			// Accessing this property makes selected-by-default
  			// options in Safari work properly
  			if ( elem.parentNode ) {
  				elem.parentNode.selectedIndex;
  			}

  			return elem.selected === true;
  		},

  		// Contents
  		"empty": function( elem ) {
  			// http://www.w3.org/TR/selectors/#empty-pseudo
  			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
  			//   but not by others (comment: 8; processing instruction: 7; etc.)
  			// nodeType < 6 works because attributes (2) do not appear as children
  			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
  				if ( elem.nodeType < 6 ) {
  					return false;
  				}
  			}
  			return true;
  		},

  		"parent": function( elem ) {
  			return !Expr.pseudos["empty"]( elem );
  		},

  		// Element/input types
  		"header": function( elem ) {
  			return rheader.test( elem.nodeName );
  		},

  		"input": function( elem ) {
  			return rinputs.test( elem.nodeName );
  		},

  		"button": function( elem ) {
  			var name = elem.nodeName.toLowerCase();
  			return name === "input" && elem.type === "button" || name === "button";
  		},

  		"text": function( elem ) {
  			var attr;
  			return elem.nodeName.toLowerCase() === "input" &&
  				elem.type === "text" &&

  				// Support: IE<8
  				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
  				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
  		},

  		// Position-in-collection
  		"first": createPositionalPseudo(function() {
  			return [ 0 ];
  		}),

  		"last": createPositionalPseudo(function( matchIndexes, length ) {
  			return [ length - 1 ];
  		}),

  		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
  			return [ argument < 0 ? argument + length : argument ];
  		}),

  		"even": createPositionalPseudo(function( matchIndexes, length ) {
  			var i = 0;
  			for ( ; i < length; i += 2 ) {
  				matchIndexes.push( i );
  			}
  			return matchIndexes;
  		}),

  		"odd": createPositionalPseudo(function( matchIndexes, length ) {
  			var i = 1;
  			for ( ; i < length; i += 2 ) {
  				matchIndexes.push( i );
  			}
  			return matchIndexes;
  		}),

  		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
  			var i = argument < 0 ?
  				argument + length :
  				argument > length ?
  					length :
  					argument;
  			for ( ; --i >= 0; ) {
  				matchIndexes.push( i );
  			}
  			return matchIndexes;
  		}),

  		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
  			var i = argument < 0 ? argument + length : argument;
  			for ( ; ++i < length; ) {
  				matchIndexes.push( i );
  			}
  			return matchIndexes;
  		})
  	}
  };

  Expr.pseudos["nth"] = Expr.pseudos["eq"];

  // Add button/input type pseudos
  for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
  	Expr.pseudos[ i ] = createInputPseudo( i );
  }
  for ( i in { submit: true, reset: true } ) {
  	Expr.pseudos[ i ] = createButtonPseudo( i );
  }

  // Easy API for creating new setFilters
  function setFilters() {}
  setFilters.prototype = Expr.filters = Expr.pseudos;
  Expr.setFilters = new setFilters();

  tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
  	var matched, match, tokens, type,
  		soFar, groups, preFilters,
  		cached = tokenCache[ selector + " " ];

  	if ( cached ) {
  		return parseOnly ? 0 : cached.slice( 0 );
  	}

  	soFar = selector;
  	groups = [];
  	preFilters = Expr.preFilter;

  	while ( soFar ) {

  		// Comma and first run
  		if ( !matched || (match = rcomma.exec( soFar )) ) {
  			if ( match ) {
  				// Don't consume trailing commas as valid
  				soFar = soFar.slice( match[0].length ) || soFar;
  			}
  			groups.push( (tokens = []) );
  		}

  		matched = false;

  		// Combinators
  		if ( (match = rcombinators.exec( soFar )) ) {
  			matched = match.shift();
  			tokens.push({
  				value: matched,
  				// Cast descendant combinators to space
  				type: match[0].replace( rtrim, " " )
  			});
  			soFar = soFar.slice( matched.length );
  		}

  		// Filters
  		for ( type in Expr.filter ) {
  			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
  				(match = preFilters[ type ]( match ))) ) {
  				matched = match.shift();
  				tokens.push({
  					value: matched,
  					type: type,
  					matches: match
  				});
  				soFar = soFar.slice( matched.length );
  			}
  		}

  		if ( !matched ) {
  			break;
  		}
  	}

  	// Return the length of the invalid excess
  	// if we're just parsing
  	// Otherwise, throw an error or return tokens
  	return parseOnly ?
  		soFar.length :
  		soFar ?
  			Sizzle.error( selector ) :
  			// Cache the tokens
  			tokenCache( selector, groups ).slice( 0 );
  };

  function toSelector( tokens ) {
  	var i = 0,
  		len = tokens.length,
  		selector = "";
  	for ( ; i < len; i++ ) {
  		selector += tokens[i].value;
  	}
  	return selector;
  }

  function addCombinator( matcher, combinator, base ) {
  	var dir = combinator.dir,
  		skip = combinator.next,
  		key = skip || dir,
  		checkNonElements = base && key === "parentNode",
  		doneName = done++;

  	return combinator.first ?
  		// Check against closest ancestor/preceding element
  		function( elem, context, xml ) {
  			while ( (elem = elem[ dir ]) ) {
  				if ( elem.nodeType === 1 || checkNonElements ) {
  					return matcher( elem, context, xml );
  				}
  			}
  			return false;
  		} :

  		// Check against all ancestor/preceding elements
  		function( elem, context, xml ) {
  			var oldCache, uniqueCache, outerCache,
  				newCache = [ dirruns, doneName ];

  			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
  			if ( xml ) {
  				while ( (elem = elem[ dir ]) ) {
  					if ( elem.nodeType === 1 || checkNonElements ) {
  						if ( matcher( elem, context, xml ) ) {
  							return true;
  						}
  					}
  				}
  			} else {
  				while ( (elem = elem[ dir ]) ) {
  					if ( elem.nodeType === 1 || checkNonElements ) {
  						outerCache = elem[ expando ] || (elem[ expando ] = {});

  						// Support: IE <9 only
  						// Defend against cloned attroperties (jQuery gh-1709)
  						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

  						if ( skip && skip === elem.nodeName.toLowerCase() ) {
  							elem = elem[ dir ] || elem;
  						} else if ( (oldCache = uniqueCache[ key ]) &&
  							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

  							// Assign to newCache so results back-propagate to previous elements
  							return (newCache[ 2 ] = oldCache[ 2 ]);
  						} else {
  							// Reuse newcache so results back-propagate to previous elements
  							uniqueCache[ key ] = newCache;

  							// A match means we're done; a fail means we have to keep checking
  							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
  								return true;
  							}
  						}
  					}
  				}
  			}
  			return false;
  		};
  }

  function elementMatcher( matchers ) {
  	return matchers.length > 1 ?
  		function( elem, context, xml ) {
  			var i = matchers.length;
  			while ( i-- ) {
  				if ( !matchers[i]( elem, context, xml ) ) {
  					return false;
  				}
  			}
  			return true;
  		} :
  		matchers[0];
  }

  function multipleContexts( selector, contexts, results ) {
  	var i = 0,
  		len = contexts.length;
  	for ( ; i < len; i++ ) {
  		Sizzle( selector, contexts[i], results );
  	}
  	return results;
  }

  function condense( unmatched, map, filter, context, xml ) {
  	var elem,
  		newUnmatched = [],
  		i = 0,
  		len = unmatched.length,
  		mapped = map != null;

  	for ( ; i < len; i++ ) {
  		if ( (elem = unmatched[i]) ) {
  			if ( !filter || filter( elem, context, xml ) ) {
  				newUnmatched.push( elem );
  				if ( mapped ) {
  					map.push( i );
  				}
  			}
  		}
  	}

  	return newUnmatched;
  }

  function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
  	if ( postFilter && !postFilter[ expando ] ) {
  		postFilter = setMatcher( postFilter );
  	}
  	if ( postFinder && !postFinder[ expando ] ) {
  		postFinder = setMatcher( postFinder, postSelector );
  	}
  	return markFunction(function( seed, results, context, xml ) {
  		var temp, i, elem,
  			preMap = [],
  			postMap = [],
  			preexisting = results.length,

  			// Get initial elements from seed or context
  			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

  			// Prefilter to get matcher input, preserving a map for seed-results synchronization
  			matcherIn = preFilter && ( seed || !selector ) ?
  				condense( elems, preMap, preFilter, context, xml ) :
  				elems,

  			matcherOut = matcher ?
  				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
  				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

  					// ...intermediate processing is necessary
  					[] :

  					// ...otherwise use results directly
  					results :
  				matcherIn;

  		// Find primary matches
  		if ( matcher ) {
  			matcher( matcherIn, matcherOut, context, xml );
  		}

  		// Apply postFilter
  		if ( postFilter ) {
  			temp = condense( matcherOut, postMap );
  			postFilter( temp, [], context, xml );

  			// Un-match failing elements by moving them back to matcherIn
  			i = temp.length;
  			while ( i-- ) {
  				if ( (elem = temp[i]) ) {
  					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
  				}
  			}
  		}

  		if ( seed ) {
  			if ( postFinder || preFilter ) {
  				if ( postFinder ) {
  					// Get the final matcherOut by condensing this intermediate into postFinder contexts
  					temp = [];
  					i = matcherOut.length;
  					while ( i-- ) {
  						if ( (elem = matcherOut[i]) ) {
  							// Restore matcherIn since elem is not yet a final match
  							temp.push( (matcherIn[i] = elem) );
  						}
  					}
  					postFinder( null, (matcherOut = []), temp, xml );
  				}

  				// Move matched elements from seed to results to keep them synchronized
  				i = matcherOut.length;
  				while ( i-- ) {
  					if ( (elem = matcherOut[i]) &&
  						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

  						seed[temp] = !(results[temp] = elem);
  					}
  				}
  			}

  		// Add elements to results, through postFinder if defined
  		} else {
  			matcherOut = condense(
  				matcherOut === results ?
  					matcherOut.splice( preexisting, matcherOut.length ) :
  					matcherOut
  			);
  			if ( postFinder ) {
  				postFinder( null, results, matcherOut, xml );
  			} else {
  				push.apply( results, matcherOut );
  			}
  		}
  	});
  }

  function matcherFromTokens( tokens ) {
  	var checkContext, matcher, j,
  		len = tokens.length,
  		leadingRelative = Expr.relative[ tokens[0].type ],
  		implicitRelative = leadingRelative || Expr.relative[" "],
  		i = leadingRelative ? 1 : 0,

  		// The foundational matcher ensures that elements are reachable from top-level context(s)
  		matchContext = addCombinator( function( elem ) {
  			return elem === checkContext;
  		}, implicitRelative, true ),
  		matchAnyContext = addCombinator( function( elem ) {
  			return indexOf( checkContext, elem ) > -1;
  		}, implicitRelative, true ),
  		matchers = [ function( elem, context, xml ) {
  			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
  				(checkContext = context).nodeType ?
  					matchContext( elem, context, xml ) :
  					matchAnyContext( elem, context, xml ) );
  			// Avoid hanging onto element (issue #299)
  			checkContext = null;
  			return ret;
  		} ];

  	for ( ; i < len; i++ ) {
  		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
  			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
  		} else {
  			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

  			// Return special upon seeing a positional matcher
  			if ( matcher[ expando ] ) {
  				// Find the next relative operator (if any) for proper handling
  				j = ++i;
  				for ( ; j < len; j++ ) {
  					if ( Expr.relative[ tokens[j].type ] ) {
  						break;
  					}
  				}
  				return setMatcher(
  					i > 1 && elementMatcher( matchers ),
  					i > 1 && toSelector(
  						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
  						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
  					).replace( rtrim, "$1" ),
  					matcher,
  					i < j && matcherFromTokens( tokens.slice( i, j ) ),
  					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
  					j < len && toSelector( tokens )
  				);
  			}
  			matchers.push( matcher );
  		}
  	}

  	return elementMatcher( matchers );
  }

  function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
  	var bySet = setMatchers.length > 0,
  		byElement = elementMatchers.length > 0,
  		superMatcher = function( seed, context, xml, results, outermost ) {
  			var elem, j, matcher,
  				matchedCount = 0,
  				i = "0",
  				unmatched = seed && [],
  				setMatched = [],
  				contextBackup = outermostContext,
  				// We must always have either seed elements or outermost context
  				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
  				// Use integer dirruns iff this is the outermost matcher
  				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
  				len = elems.length;

  			if ( outermost ) {
  				outermostContext = context === document || context || outermost;
  			}

  			// Add elements passing elementMatchers directly to results
  			// Support: IE<9, Safari
  			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
  			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
  				if ( byElement && elem ) {
  					j = 0;
  					if ( !context && elem.ownerDocument !== document ) {
  						setDocument( elem );
  						xml = !documentIsHTML;
  					}
  					while ( (matcher = elementMatchers[j++]) ) {
  						if ( matcher( elem, context || document, xml) ) {
  							results.push( elem );
  							break;
  						}
  					}
  					if ( outermost ) {
  						dirruns = dirrunsUnique;
  					}
  				}

  				// Track unmatched elements for set filters
  				if ( bySet ) {
  					// They will have gone through all possible matchers
  					if ( (elem = !matcher && elem) ) {
  						matchedCount--;
  					}

  					// Lengthen the array for every element, matched or not
  					if ( seed ) {
  						unmatched.push( elem );
  					}
  				}
  			}

  			// `i` is now the count of elements visited above, and adding it to `matchedCount`
  			// makes the latter nonnegative.
  			matchedCount += i;

  			// Apply set filters to unmatched elements
  			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
  			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
  			// no element matchers and no seed.
  			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
  			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
  			// numerically zero.
  			if ( bySet && i !== matchedCount ) {
  				j = 0;
  				while ( (matcher = setMatchers[j++]) ) {
  					matcher( unmatched, setMatched, context, xml );
  				}

  				if ( seed ) {
  					// Reintegrate element matches to eliminate the need for sorting
  					if ( matchedCount > 0 ) {
  						while ( i-- ) {
  							if ( !(unmatched[i] || setMatched[i]) ) {
  								setMatched[i] = pop.call( results );
  							}
  						}
  					}

  					// Discard index placeholder values to get only actual matches
  					setMatched = condense( setMatched );
  				}

  				// Add matches to results
  				push.apply( results, setMatched );

  				// Seedless set matches succeeding multiple successful matchers stipulate sorting
  				if ( outermost && !seed && setMatched.length > 0 &&
  					( matchedCount + setMatchers.length ) > 1 ) {

  					Sizzle.uniqueSort( results );
  				}
  			}

  			// Override manipulation of globals by nested matchers
  			if ( outermost ) {
  				dirruns = dirrunsUnique;
  				outermostContext = contextBackup;
  			}

  			return unmatched;
  		};

  	return bySet ?
  		markFunction( superMatcher ) :
  		superMatcher;
  }

  compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
  	var i,
  		setMatchers = [],
  		elementMatchers = [],
  		cached = compilerCache[ selector + " " ];

  	if ( !cached ) {
  		// Generate a function of recursive functions that can be used to check each element
  		if ( !match ) {
  			match = tokenize( selector );
  		}
  		i = match.length;
  		while ( i-- ) {
  			cached = matcherFromTokens( match[i] );
  			if ( cached[ expando ] ) {
  				setMatchers.push( cached );
  			} else {
  				elementMatchers.push( cached );
  			}
  		}

  		// Cache the compiled function
  		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

  		// Save selector and tokenization
  		cached.selector = selector;
  	}
  	return cached;
  };

  /**
   * A low-level selection function that works with Sizzle's compiled
   *  selector functions
   * @param {String|Function} selector A selector or a pre-compiled
   *  selector function built with Sizzle.compile
   * @param {Element} context
   * @param {Array} [results]
   * @param {Array} [seed] A set of elements to match against
   */
  select = Sizzle.select = function( selector, context, results, seed ) {
  	var i, tokens, token, type, find,
  		compiled = typeof selector === "function" && selector,
  		match = !seed && tokenize( (selector = compiled.selector || selector) );

  	results = results || [];

  	// Try to minimize operations if there is only one selector in the list and no seed
  	// (the latter of which guarantees us context)
  	if ( match.length === 1 ) {

  		// Reduce context if the leading compound selector is an ID
  		tokens = match[0] = match[0].slice( 0 );
  		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
  				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

  			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
  			if ( !context ) {
  				return results;

  			// Precompiled matchers will still verify ancestry, so step up a level
  			} else if ( compiled ) {
  				context = context.parentNode;
  			}

  			selector = selector.slice( tokens.shift().value.length );
  		}

  		// Fetch a seed set for right-to-left matching
  		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
  		while ( i-- ) {
  			token = tokens[i];

  			// Abort if we hit a combinator
  			if ( Expr.relative[ (type = token.type) ] ) {
  				break;
  			}
  			if ( (find = Expr.find[ type ]) ) {
  				// Search, expanding context for leading sibling combinators
  				if ( (seed = find(
  					token.matches[0].replace( runescape, funescape ),
  					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
  				)) ) {

  					// If seed is empty or no tokens remain, we can return early
  					tokens.splice( i, 1 );
  					selector = seed.length && toSelector( tokens );
  					if ( !selector ) {
  						push.apply( results, seed );
  						return results;
  					}

  					break;
  				}
  			}
  		}
  	}

  	// Compile and execute a filtering function if one is not provided
  	// Provide `match` to avoid retokenization if we modified the selector above
  	( compiled || compile( selector, match ) )(
  		seed,
  		context,
  		!documentIsHTML,
  		results,
  		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
  	);
  	return results;
  };

  // One-time assignments

  // Sort stability
  support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

  // Support: Chrome 14-35+
  // Always assume duplicates if they aren't passed to the comparison function
  support.detectDuplicates = !!hasDuplicate;

  // Initialize against the default document
  setDocument();

  // Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
  // Detached nodes confoundingly follow *each other*
  support.sortDetached = assert(function( el ) {
  	// Should return 1, but returns 4 (following)
  	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
  });

  // Support: IE<8
  // Prevent attribute/property "interpolation"
  // https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
  if ( !assert(function( el ) {
  	el.innerHTML = "<a href='#'></a>";
  	return el.firstChild.getAttribute("href") === "#" ;
  }) ) {
  	addHandle( "type|href|height|width", function( elem, name, isXML ) {
  		if ( !isXML ) {
  			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
  		}
  	});
  }

  // Support: IE<9
  // Use defaultValue in place of getAttribute("value")
  if ( !support.attributes || !assert(function( el ) {
  	el.innerHTML = "<input/>";
  	el.firstChild.setAttribute( "value", "" );
  	return el.firstChild.getAttribute( "value" ) === "";
  }) ) {
  	addHandle( "value", function( elem, name, isXML ) {
  		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
  			return elem.defaultValue;
  		}
  	});
  }

  // Support: IE<9
  // Use getAttributeNode to fetch booleans when getAttribute lies
  if ( !assert(function( el ) {
  	return el.getAttribute("disabled") == null;
  }) ) {
  	addHandle( booleans, function( elem, name, isXML ) {
  		var val;
  		if ( !isXML ) {
  			return elem[ name ] === true ? name.toLowerCase() :
  					(val = elem.getAttributeNode( name )) && val.specified ?
  					val.value :
  				null;
  		}
  	});
  }

  return Sizzle;

  })( window );



  jQuery.find = Sizzle;
  jQuery.expr = Sizzle.selectors;

  // Deprecated
  jQuery.expr[ ":" ] = jQuery.expr.pseudos;
  jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
  jQuery.text = Sizzle.getText;
  jQuery.isXMLDoc = Sizzle.isXML;
  jQuery.contains = Sizzle.contains;
  jQuery.escapeSelector = Sizzle.escape;




  var dir = function( elem, dir, until ) {
  	var matched = [],
  		truncate = until !== undefined;

  	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
  		if ( elem.nodeType === 1 ) {
  			if ( truncate && jQuery( elem ).is( until ) ) {
  				break;
  			}
  			matched.push( elem );
  		}
  	}
  	return matched;
  };


  var siblings = function( n, elem ) {
  	var matched = [];

  	for ( ; n; n = n.nextSibling ) {
  		if ( n.nodeType === 1 && n !== elem ) {
  			matched.push( n );
  		}
  	}

  	return matched;
  };


  var rneedsContext = jQuery.expr.match.needsContext;



  function nodeName( elem, name ) {

    return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

  }var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



  // Implement the identical functionality for filter and not
  function winnow( elements, qualifier, not ) {
  	if ( isFunction( qualifier ) ) {
  		return jQuery.grep( elements, function( elem, i ) {
  			return !!qualifier.call( elem, i, elem ) !== not;
  		} );
  	}

  	// Single element
  	if ( qualifier.nodeType ) {
  		return jQuery.grep( elements, function( elem ) {
  			return ( elem === qualifier ) !== not;
  		} );
  	}

  	// Arraylike of elements (jQuery, arguments, Array)
  	if ( typeof qualifier !== "string" ) {
  		return jQuery.grep( elements, function( elem ) {
  			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
  		} );
  	}

  	// Filtered directly for both simple and complex selectors
  	return jQuery.filter( qualifier, elements, not );
  }

  jQuery.filter = function( expr, elems, not ) {
  	var elem = elems[ 0 ];

  	if ( not ) {
  		expr = ":not(" + expr + ")";
  	}

  	if ( elems.length === 1 && elem.nodeType === 1 ) {
  		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
  	}

  	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
  		return elem.nodeType === 1;
  	} ) );
  };

  jQuery.fn.extend( {
  	find: function( selector ) {
  		var i, ret,
  			len = this.length,
  			self = this;

  		if ( typeof selector !== "string" ) {
  			return this.pushStack( jQuery( selector ).filter( function() {
  				for ( i = 0; i < len; i++ ) {
  					if ( jQuery.contains( self[ i ], this ) ) {
  						return true;
  					}
  				}
  			} ) );
  		}

  		ret = this.pushStack( [] );

  		for ( i = 0; i < len; i++ ) {
  			jQuery.find( selector, self[ i ], ret );
  		}

  		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
  	},
  	filter: function( selector ) {
  		return this.pushStack( winnow( this, selector || [], false ) );
  	},
  	not: function( selector ) {
  		return this.pushStack( winnow( this, selector || [], true ) );
  	},
  	is: function( selector ) {
  		return !!winnow(
  			this,

  			// If this is a positional/relative selector, check membership in the returned set
  			// so $("p:first").is("p:last") won't return true for a doc with two "p".
  			typeof selector === "string" && rneedsContext.test( selector ) ?
  				jQuery( selector ) :
  				selector || [],
  			false
  		).length;
  	}
  } );


  // Initialize a jQuery object


  // A central reference to the root jQuery(document)
  var rootjQuery,

  	// A simple way to check for HTML strings
  	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
  	// Strict HTML recognition (#11290: must start with <)
  	// Shortcut simple #id case for speed
  	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

  	init = jQuery.fn.init = function( selector, context, root ) {
  		var match, elem;

  		// HANDLE: $(""), $(null), $(undefined), $(false)
  		if ( !selector ) {
  			return this;
  		}

  		// Method init() accepts an alternate rootjQuery
  		// so migrate can support jQuery.sub (gh-2101)
  		root = root || rootjQuery;

  		// Handle HTML strings
  		if ( typeof selector === "string" ) {
  			if ( selector[ 0 ] === "<" &&
  				selector[ selector.length - 1 ] === ">" &&
  				selector.length >= 3 ) {

  				// Assume that strings that start and end with <> are HTML and skip the regex check
  				match = [ null, selector, null ];

  			} else {
  				match = rquickExpr.exec( selector );
  			}

  			// Match html or make sure no context is specified for #id
  			if ( match && ( match[ 1 ] || !context ) ) {

  				// HANDLE: $(html) -> $(array)
  				if ( match[ 1 ] ) {
  					context = context instanceof jQuery ? context[ 0 ] : context;

  					// Option to run scripts is true for back-compat
  					// Intentionally let the error be thrown if parseHTML is not present
  					jQuery.merge( this, jQuery.parseHTML(
  						match[ 1 ],
  						context && context.nodeType ? context.ownerDocument || context : document,
  						true
  					) );

  					// HANDLE: $(html, props)
  					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
  						for ( match in context ) {

  							// Properties of context are called as methods if possible
  							if ( isFunction( this[ match ] ) ) {
  								this[ match ]( context[ match ] );

  							// ...and otherwise set as attributes
  							} else {
  								this.attr( match, context[ match ] );
  							}
  						}
  					}

  					return this;

  				// HANDLE: $(#id)
  				} else {
  					elem = document.getElementById( match[ 2 ] );

  					if ( elem ) {

  						// Inject the element directly into the jQuery object
  						this[ 0 ] = elem;
  						this.length = 1;
  					}
  					return this;
  				}

  			// HANDLE: $(expr, $(...))
  			} else if ( !context || context.jquery ) {
  				return ( context || root ).find( selector );

  			// HANDLE: $(expr, context)
  			// (which is just equivalent to: $(context).find(expr)
  			} else {
  				return this.constructor( context ).find( selector );
  			}

  		// HANDLE: $(DOMElement)
  		} else if ( selector.nodeType ) {
  			this[ 0 ] = selector;
  			this.length = 1;
  			return this;

  		// HANDLE: $(function)
  		// Shortcut for document ready
  		} else if ( isFunction( selector ) ) {
  			return root.ready !== undefined ?
  				root.ready( selector ) :

  				// Execute immediately if ready is not present
  				selector( jQuery );
  		}

  		return jQuery.makeArray( selector, this );
  	};

  // Give the init function the jQuery prototype for later instantiation
  init.prototype = jQuery.fn;

  // Initialize central reference
  rootjQuery = jQuery( document );


  var rparentsprev = /^(?:parents|prev(?:Until|All))/,

  	// Methods guaranteed to produce a unique set when starting from a unique set
  	guaranteedUnique = {
  		children: true,
  		contents: true,
  		next: true,
  		prev: true
  	};

  jQuery.fn.extend( {
  	has: function( target ) {
  		var targets = jQuery( target, this ),
  			l = targets.length;

  		return this.filter( function() {
  			var i = 0;
  			for ( ; i < l; i++ ) {
  				if ( jQuery.contains( this, targets[ i ] ) ) {
  					return true;
  				}
  			}
  		} );
  	},

  	closest: function( selectors, context ) {
  		var cur,
  			i = 0,
  			l = this.length,
  			matched = [],
  			targets = typeof selectors !== "string" && jQuery( selectors );

  		// Positional selectors never match, since there's no _selection_ context
  		if ( !rneedsContext.test( selectors ) ) {
  			for ( ; i < l; i++ ) {
  				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

  					// Always skip document fragments
  					if ( cur.nodeType < 11 && ( targets ?
  						targets.index( cur ) > -1 :

  						// Don't pass non-elements to Sizzle
  						cur.nodeType === 1 &&
  							jQuery.find.matchesSelector( cur, selectors ) ) ) {

  						matched.push( cur );
  						break;
  					}
  				}
  			}
  		}

  		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
  	},

  	// Determine the position of an element within the set
  	index: function( elem ) {

  		// No argument, return index in parent
  		if ( !elem ) {
  			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
  		}

  		// Index in selector
  		if ( typeof elem === "string" ) {
  			return indexOf.call( jQuery( elem ), this[ 0 ] );
  		}

  		// Locate the position of the desired element
  		return indexOf.call( this,

  			// If it receives a jQuery object, the first element is used
  			elem.jquery ? elem[ 0 ] : elem
  		);
  	},

  	add: function( selector, context ) {
  		return this.pushStack(
  			jQuery.uniqueSort(
  				jQuery.merge( this.get(), jQuery( selector, context ) )
  			)
  		);
  	},

  	addBack: function( selector ) {
  		return this.add( selector == null ?
  			this.prevObject : this.prevObject.filter( selector )
  		);
  	}
  } );

  function sibling( cur, dir ) {
  	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
  	return cur;
  }

  jQuery.each( {
  	parent: function( elem ) {
  		var parent = elem.parentNode;
  		return parent && parent.nodeType !== 11 ? parent : null;
  	},
  	parents: function( elem ) {
  		return dir( elem, "parentNode" );
  	},
  	parentsUntil: function( elem, i, until ) {
  		return dir( elem, "parentNode", until );
  	},
  	next: function( elem ) {
  		return sibling( elem, "nextSibling" );
  	},
  	prev: function( elem ) {
  		return sibling( elem, "previousSibling" );
  	},
  	nextAll: function( elem ) {
  		return dir( elem, "nextSibling" );
  	},
  	prevAll: function( elem ) {
  		return dir( elem, "previousSibling" );
  	},
  	nextUntil: function( elem, i, until ) {
  		return dir( elem, "nextSibling", until );
  	},
  	prevUntil: function( elem, i, until ) {
  		return dir( elem, "previousSibling", until );
  	},
  	siblings: function( elem ) {
  		return siblings( ( elem.parentNode || {} ).firstChild, elem );
  	},
  	children: function( elem ) {
  		return siblings( elem.firstChild );
  	},
  	contents: function( elem ) {
  		if ( typeof elem.contentDocument !== "undefined" ) {
  			return elem.contentDocument;
  		}

  		// Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
  		// Treat the template element as a regular one in browsers that
  		// don't support it.
  		if ( nodeName( elem, "template" ) ) {
  			elem = elem.content || elem;
  		}

  		return jQuery.merge( [], elem.childNodes );
  	}
  }, function( name, fn ) {
  	jQuery.fn[ name ] = function( until, selector ) {
  		var matched = jQuery.map( this, fn, until );

  		if ( name.slice( -5 ) !== "Until" ) {
  			selector = until;
  		}

  		if ( selector && typeof selector === "string" ) {
  			matched = jQuery.filter( selector, matched );
  		}

  		if ( this.length > 1 ) {

  			// Remove duplicates
  			if ( !guaranteedUnique[ name ] ) {
  				jQuery.uniqueSort( matched );
  			}

  			// Reverse order for parents* and prev-derivatives
  			if ( rparentsprev.test( name ) ) {
  				matched.reverse();
  			}
  		}

  		return this.pushStack( matched );
  	};
  } );
  var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



  // Convert String-formatted options into Object-formatted ones
  function createOptions( options ) {
  	var object = {};
  	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
  		object[ flag ] = true;
  	} );
  	return object;
  }

  /*
   * Create a callback list using the following parameters:
   *
   *	options: an optional list of space-separated options that will change how
   *			the callback list behaves or a more traditional option object
   *
   * By default a callback list will act like an event callback list and can be
   * "fired" multiple times.
   *
   * Possible options:
   *
   *	once:			will ensure the callback list can only be fired once (like a Deferred)
   *
   *	memory:			will keep track of previous values and will call any callback added
   *					after the list has been fired right away with the latest "memorized"
   *					values (like a Deferred)
   *
   *	unique:			will ensure a callback can only be added once (no duplicate in the list)
   *
   *	stopOnFalse:	interrupt callings when a callback returns false
   *
   */
  jQuery.Callbacks = function( options ) {

  	// Convert options from String-formatted to Object-formatted if needed
  	// (we check in cache first)
  	options = typeof options === "string" ?
  		createOptions( options ) :
  		jQuery.extend( {}, options );

  	var // Flag to know if list is currently firing
  		firing,

  		// Last fire value for non-forgettable lists
  		memory,

  		// Flag to know if list was already fired
  		fired,

  		// Flag to prevent firing
  		locked,

  		// Actual callback list
  		list = [],

  		// Queue of execution data for repeatable lists
  		queue = [],

  		// Index of currently firing callback (modified by add/remove as needed)
  		firingIndex = -1,

  		// Fire callbacks
  		fire = function() {

  			// Enforce single-firing
  			locked = locked || options.once;

  			// Execute callbacks for all pending executions,
  			// respecting firingIndex overrides and runtime changes
  			fired = firing = true;
  			for ( ; queue.length; firingIndex = -1 ) {
  				memory = queue.shift();
  				while ( ++firingIndex < list.length ) {

  					// Run callback and check for early termination
  					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
  						options.stopOnFalse ) {

  						// Jump to end and forget the data so .add doesn't re-fire
  						firingIndex = list.length;
  						memory = false;
  					}
  				}
  			}

  			// Forget the data if we're done with it
  			if ( !options.memory ) {
  				memory = false;
  			}

  			firing = false;

  			// Clean up if we're done firing for good
  			if ( locked ) {

  				// Keep an empty list if we have data for future add calls
  				if ( memory ) {
  					list = [];

  				// Otherwise, this object is spent
  				} else {
  					list = "";
  				}
  			}
  		},

  		// Actual Callbacks object
  		self = {

  			// Add a callback or a collection of callbacks to the list
  			add: function() {
  				if ( list ) {

  					// If we have memory from a past run, we should fire after adding
  					if ( memory && !firing ) {
  						firingIndex = list.length - 1;
  						queue.push( memory );
  					}

  					( function add( args ) {
  						jQuery.each( args, function( _, arg ) {
  							if ( isFunction( arg ) ) {
  								if ( !options.unique || !self.has( arg ) ) {
  									list.push( arg );
  								}
  							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

  								// Inspect recursively
  								add( arg );
  							}
  						} );
  					} )( arguments );

  					if ( memory && !firing ) {
  						fire();
  					}
  				}
  				return this;
  			},

  			// Remove a callback from the list
  			remove: function() {
  				jQuery.each( arguments, function( _, arg ) {
  					var index;
  					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
  						list.splice( index, 1 );

  						// Handle firing indexes
  						if ( index <= firingIndex ) {
  							firingIndex--;
  						}
  					}
  				} );
  				return this;
  			},

  			// Check if a given callback is in the list.
  			// If no argument is given, return whether or not list has callbacks attached.
  			has: function( fn ) {
  				return fn ?
  					jQuery.inArray( fn, list ) > -1 :
  					list.length > 0;
  			},

  			// Remove all callbacks from the list
  			empty: function() {
  				if ( list ) {
  					list = [];
  				}
  				return this;
  			},

  			// Disable .fire and .add
  			// Abort any current/pending executions
  			// Clear all callbacks and values
  			disable: function() {
  				locked = queue = [];
  				list = memory = "";
  				return this;
  			},
  			disabled: function() {
  				return !list;
  			},

  			// Disable .fire
  			// Also disable .add unless we have memory (since it would have no effect)
  			// Abort any pending executions
  			lock: function() {
  				locked = queue = [];
  				if ( !memory && !firing ) {
  					list = memory = "";
  				}
  				return this;
  			},
  			locked: function() {
  				return !!locked;
  			},

  			// Call all callbacks with the given context and arguments
  			fireWith: function( context, args ) {
  				if ( !locked ) {
  					args = args || [];
  					args = [ context, args.slice ? args.slice() : args ];
  					queue.push( args );
  					if ( !firing ) {
  						fire();
  					}
  				}
  				return this;
  			},

  			// Call all the callbacks with the given arguments
  			fire: function() {
  				self.fireWith( this, arguments );
  				return this;
  			},

  			// To know if the callbacks have already been called at least once
  			fired: function() {
  				return !!fired;
  			}
  		};

  	return self;
  };


  function Identity( v ) {
  	return v;
  }
  function Thrower( ex ) {
  	throw ex;
  }

  function adoptValue( value, resolve, reject, noValue ) {
  	var method;

  	try {

  		// Check for promise aspect first to privilege synchronous behavior
  		if ( value && isFunction( ( method = value.promise ) ) ) {
  			method.call( value ).done( resolve ).fail( reject );

  		// Other thenables
  		} else if ( value && isFunction( ( method = value.then ) ) ) {
  			method.call( value, resolve, reject );

  		// Other non-thenables
  		} else {

  			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
  			// * false: [ value ].slice( 0 ) => resolve( value )
  			// * true: [ value ].slice( 1 ) => resolve()
  			resolve.apply( undefined, [ value ].slice( noValue ) );
  		}

  	// For Promises/A+, convert exceptions into rejections
  	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
  	// Deferred#then to conditionally suppress rejection.
  	} catch ( value ) {

  		// Support: Android 4.0 only
  		// Strict mode functions invoked without .call/.apply get global-object context
  		reject.apply( undefined, [ value ] );
  	}
  }

  jQuery.extend( {

  	Deferred: function( func ) {
  		var tuples = [

  				// action, add listener, callbacks,
  				// ... .then handlers, argument index, [final state]
  				[ "notify", "progress", jQuery.Callbacks( "memory" ),
  					jQuery.Callbacks( "memory" ), 2 ],
  				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
  					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
  				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
  					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
  			],
  			state = "pending",
  			promise = {
  				state: function() {
  					return state;
  				},
  				always: function() {
  					deferred.done( arguments ).fail( arguments );
  					return this;
  				},
  				"catch": function( fn ) {
  					return promise.then( null, fn );
  				},

  				// Keep pipe for back-compat
  				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
  					var fns = arguments;

  					return jQuery.Deferred( function( newDefer ) {
  						jQuery.each( tuples, function( i, tuple ) {

  							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
  							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

  							// deferred.progress(function() { bind to newDefer or newDefer.notify })
  							// deferred.done(function() { bind to newDefer or newDefer.resolve })
  							// deferred.fail(function() { bind to newDefer or newDefer.reject })
  							deferred[ tuple[ 1 ] ]( function() {
  								var returned = fn && fn.apply( this, arguments );
  								if ( returned && isFunction( returned.promise ) ) {
  									returned.promise()
  										.progress( newDefer.notify )
  										.done( newDefer.resolve )
  										.fail( newDefer.reject );
  								} else {
  									newDefer[ tuple[ 0 ] + "With" ](
  										this,
  										fn ? [ returned ] : arguments
  									);
  								}
  							} );
  						} );
  						fns = null;
  					} ).promise();
  				},
  				then: function( onFulfilled, onRejected, onProgress ) {
  					var maxDepth = 0;
  					function resolve( depth, deferred, handler, special ) {
  						return function() {
  							var that = this,
  								args = arguments,
  								mightThrow = function() {
  									var returned, then;

  									// Support: Promises/A+ section 2.3.3.3.3
  									// https://promisesaplus.com/#point-59
  									// Ignore double-resolution attempts
  									if ( depth < maxDepth ) {
  										return;
  									}

  									returned = handler.apply( that, args );

  									// Support: Promises/A+ section 2.3.1
  									// https://promisesaplus.com/#point-48
  									if ( returned === deferred.promise() ) {
  										throw new TypeError( "Thenable self-resolution" );
  									}

  									// Support: Promises/A+ sections 2.3.3.1, 3.5
  									// https://promisesaplus.com/#point-54
  									// https://promisesaplus.com/#point-75
  									// Retrieve `then` only once
  									then = returned &&

  										// Support: Promises/A+ section 2.3.4
  										// https://promisesaplus.com/#point-64
  										// Only check objects and functions for thenability
  										( typeof returned === "object" ||
  											typeof returned === "function" ) &&
  										returned.then;

  									// Handle a returned thenable
  									if ( isFunction( then ) ) {

  										// Special processors (notify) just wait for resolution
  										if ( special ) {
  											then.call(
  												returned,
  												resolve( maxDepth, deferred, Identity, special ),
  												resolve( maxDepth, deferred, Thrower, special )
  											);

  										// Normal processors (resolve) also hook into progress
  										} else {

  											// ...and disregard older resolution values
  											maxDepth++;

  											then.call(
  												returned,
  												resolve( maxDepth, deferred, Identity, special ),
  												resolve( maxDepth, deferred, Thrower, special ),
  												resolve( maxDepth, deferred, Identity,
  													deferred.notifyWith )
  											);
  										}

  									// Handle all other returned values
  									} else {

  										// Only substitute handlers pass on context
  										// and multiple values (non-spec behavior)
  										if ( handler !== Identity ) {
  											that = undefined;
  											args = [ returned ];
  										}

  										// Process the value(s)
  										// Default process is resolve
  										( special || deferred.resolveWith )( that, args );
  									}
  								},

  								// Only normal processors (resolve) catch and reject exceptions
  								process = special ?
  									mightThrow :
  									function() {
  										try {
  											mightThrow();
  										} catch ( e ) {

  											if ( jQuery.Deferred.exceptionHook ) {
  												jQuery.Deferred.exceptionHook( e,
  													process.stackTrace );
  											}

  											// Support: Promises/A+ section 2.3.3.3.4.1
  											// https://promisesaplus.com/#point-61
  											// Ignore post-resolution exceptions
  											if ( depth + 1 >= maxDepth ) {

  												// Only substitute handlers pass on context
  												// and multiple values (non-spec behavior)
  												if ( handler !== Thrower ) {
  													that = undefined;
  													args = [ e ];
  												}

  												deferred.rejectWith( that, args );
  											}
  										}
  									};

  							// Support: Promises/A+ section 2.3.3.3.1
  							// https://promisesaplus.com/#point-57
  							// Re-resolve promises immediately to dodge false rejection from
  							// subsequent errors
  							if ( depth ) {
  								process();
  							} else {

  								// Call an optional hook to record the stack, in case of exception
  								// since it's otherwise lost when execution goes async
  								if ( jQuery.Deferred.getStackHook ) {
  									process.stackTrace = jQuery.Deferred.getStackHook();
  								}
  								window.setTimeout( process );
  							}
  						};
  					}

  					return jQuery.Deferred( function( newDefer ) {

  						// progress_handlers.add( ... )
  						tuples[ 0 ][ 3 ].add(
  							resolve(
  								0,
  								newDefer,
  								isFunction( onProgress ) ?
  									onProgress :
  									Identity,
  								newDefer.notifyWith
  							)
  						);

  						// fulfilled_handlers.add( ... )
  						tuples[ 1 ][ 3 ].add(
  							resolve(
  								0,
  								newDefer,
  								isFunction( onFulfilled ) ?
  									onFulfilled :
  									Identity
  							)
  						);

  						// rejected_handlers.add( ... )
  						tuples[ 2 ][ 3 ].add(
  							resolve(
  								0,
  								newDefer,
  								isFunction( onRejected ) ?
  									onRejected :
  									Thrower
  							)
  						);
  					} ).promise();
  				},

  				// Get a promise for this deferred
  				// If obj is provided, the promise aspect is added to the object
  				promise: function( obj ) {
  					return obj != null ? jQuery.extend( obj, promise ) : promise;
  				}
  			},
  			deferred = {};

  		// Add list-specific methods
  		jQuery.each( tuples, function( i, tuple ) {
  			var list = tuple[ 2 ],
  				stateString = tuple[ 5 ];

  			// promise.progress = list.add
  			// promise.done = list.add
  			// promise.fail = list.add
  			promise[ tuple[ 1 ] ] = list.add;

  			// Handle state
  			if ( stateString ) {
  				list.add(
  					function() {

  						// state = "resolved" (i.e., fulfilled)
  						// state = "rejected"
  						state = stateString;
  					},

  					// rejected_callbacks.disable
  					// fulfilled_callbacks.disable
  					tuples[ 3 - i ][ 2 ].disable,

  					// rejected_handlers.disable
  					// fulfilled_handlers.disable
  					tuples[ 3 - i ][ 3 ].disable,

  					// progress_callbacks.lock
  					tuples[ 0 ][ 2 ].lock,

  					// progress_handlers.lock
  					tuples[ 0 ][ 3 ].lock
  				);
  			}

  			// progress_handlers.fire
  			// fulfilled_handlers.fire
  			// rejected_handlers.fire
  			list.add( tuple[ 3 ].fire );

  			// deferred.notify = function() { deferred.notifyWith(...) }
  			// deferred.resolve = function() { deferred.resolveWith(...) }
  			// deferred.reject = function() { deferred.rejectWith(...) }
  			deferred[ tuple[ 0 ] ] = function() {
  				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
  				return this;
  			};

  			// deferred.notifyWith = list.fireWith
  			// deferred.resolveWith = list.fireWith
  			// deferred.rejectWith = list.fireWith
  			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
  		} );

  		// Make the deferred a promise
  		promise.promise( deferred );

  		// Call given func if any
  		if ( func ) {
  			func.call( deferred, deferred );
  		}

  		// All done!
  		return deferred;
  	},

  	// Deferred helper
  	when: function( singleValue ) {
  		var

  			// count of uncompleted subordinates
  			remaining = arguments.length,

  			// count of unprocessed arguments
  			i = remaining,

  			// subordinate fulfillment data
  			resolveContexts = Array( i ),
  			resolveValues = slice.call( arguments ),

  			// the master Deferred
  			master = jQuery.Deferred(),

  			// subordinate callback factory
  			updateFunc = function( i ) {
  				return function( value ) {
  					resolveContexts[ i ] = this;
  					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
  					if ( !( --remaining ) ) {
  						master.resolveWith( resolveContexts, resolveValues );
  					}
  				};
  			};

  		// Single- and empty arguments are adopted like Promise.resolve
  		if ( remaining <= 1 ) {
  			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
  				!remaining );

  			// Use .then() to unwrap secondary thenables (cf. gh-3000)
  			if ( master.state() === "pending" ||
  				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

  				return master.then();
  			}
  		}

  		// Multiple arguments are aggregated like Promise.all array elements
  		while ( i-- ) {
  			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
  		}

  		return master.promise();
  	}
  } );


  // These usually indicate a programmer mistake during development,
  // warn about them ASAP rather than swallowing them by default.
  var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

  jQuery.Deferred.exceptionHook = function( error, stack ) {

  	// Support: IE 8 - 9 only
  	// Console exists when dev tools are open, which can happen at any time
  	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
  		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
  	}
  };




  jQuery.readyException = function( error ) {
  	window.setTimeout( function() {
  		throw error;
  	} );
  };




  // The deferred used on DOM ready
  var readyList = jQuery.Deferred();

  jQuery.fn.ready = function( fn ) {

  	readyList
  		.then( fn )

  		// Wrap jQuery.readyException in a function so that the lookup
  		// happens at the time of error handling instead of callback
  		// registration.
  		.catch( function( error ) {
  			jQuery.readyException( error );
  		} );

  	return this;
  };

  jQuery.extend( {

  	// Is the DOM ready to be used? Set to true once it occurs.
  	isReady: false,

  	// A counter to track how many items to wait for before
  	// the ready event fires. See #6781
  	readyWait: 1,

  	// Handle when the DOM is ready
  	ready: function( wait ) {

  		// Abort if there are pending holds or we're already ready
  		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
  			return;
  		}

  		// Remember that the DOM is ready
  		jQuery.isReady = true;

  		// If a normal DOM Ready event fired, decrement, and wait if need be
  		if ( wait !== true && --jQuery.readyWait > 0 ) {
  			return;
  		}

  		// If there are functions bound, to execute
  		readyList.resolveWith( document, [ jQuery ] );
  	}
  } );

  jQuery.ready.then = readyList.then;

  // The ready event handler and self cleanup method
  function completed() {
  	document.removeEventListener( "DOMContentLoaded", completed );
  	window.removeEventListener( "load", completed );
  	jQuery.ready();
  }

  // Catch cases where $(document).ready() is called
  // after the browser event has already occurred.
  // Support: IE <=9 - 10 only
  // Older IE sometimes signals "interactive" too soon
  if ( document.readyState === "complete" ||
  	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

  	// Handle it asynchronously to allow scripts the opportunity to delay ready
  	window.setTimeout( jQuery.ready );

  } else {

  	// Use the handy event callback
  	document.addEventListener( "DOMContentLoaded", completed );

  	// A fallback to window.onload, that will always work
  	window.addEventListener( "load", completed );
  }




  // Multifunctional method to get and set values of a collection
  // The value/s can optionally be executed if it's a function
  var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
  	var i = 0,
  		len = elems.length,
  		bulk = key == null;

  	// Sets many values
  	if ( toType( key ) === "object" ) {
  		chainable = true;
  		for ( i in key ) {
  			access( elems, fn, i, key[ i ], true, emptyGet, raw );
  		}

  	// Sets one value
  	} else if ( value !== undefined ) {
  		chainable = true;

  		if ( !isFunction( value ) ) {
  			raw = true;
  		}

  		if ( bulk ) {

  			// Bulk operations run against the entire set
  			if ( raw ) {
  				fn.call( elems, value );
  				fn = null;

  			// ...except when executing function values
  			} else {
  				bulk = fn;
  				fn = function( elem, key, value ) {
  					return bulk.call( jQuery( elem ), value );
  				};
  			}
  		}

  		if ( fn ) {
  			for ( ; i < len; i++ ) {
  				fn(
  					elems[ i ], key, raw ?
  					value :
  					value.call( elems[ i ], i, fn( elems[ i ], key ) )
  				);
  			}
  		}
  	}

  	if ( chainable ) {
  		return elems;
  	}

  	// Gets
  	if ( bulk ) {
  		return fn.call( elems );
  	}

  	return len ? fn( elems[ 0 ], key ) : emptyGet;
  };


  // Matches dashed string for camelizing
  var rmsPrefix = /^-ms-/,
  	rdashAlpha = /-([a-z])/g;

  // Used by camelCase as callback to replace()
  function fcamelCase( all, letter ) {
  	return letter.toUpperCase();
  }

  // Convert dashed to camelCase; used by the css and data modules
  // Support: IE <=9 - 11, Edge 12 - 15
  // Microsoft forgot to hump their vendor prefix (#9572)
  function camelCase( string ) {
  	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
  }
  var acceptData = function( owner ) {

  	// Accepts only:
  	//  - Node
  	//    - Node.ELEMENT_NODE
  	//    - Node.DOCUMENT_NODE
  	//  - Object
  	//    - Any
  	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
  };




  function Data() {
  	this.expando = jQuery.expando + Data.uid++;
  }

  Data.uid = 1;

  Data.prototype = {

  	cache: function( owner ) {

  		// Check if the owner object already has a cache
  		var value = owner[ this.expando ];

  		// If not, create one
  		if ( !value ) {
  			value = {};

  			// We can accept data for non-element nodes in modern browsers,
  			// but we should not, see #8335.
  			// Always return an empty object.
  			if ( acceptData( owner ) ) {

  				// If it is a node unlikely to be stringify-ed or looped over
  				// use plain assignment
  				if ( owner.nodeType ) {
  					owner[ this.expando ] = value;

  				// Otherwise secure it in a non-enumerable property
  				// configurable must be true to allow the property to be
  				// deleted when data is removed
  				} else {
  					Object.defineProperty( owner, this.expando, {
  						value: value,
  						configurable: true
  					} );
  				}
  			}
  		}

  		return value;
  	},
  	set: function( owner, data, value ) {
  		var prop,
  			cache = this.cache( owner );

  		// Handle: [ owner, key, value ] args
  		// Always use camelCase key (gh-2257)
  		if ( typeof data === "string" ) {
  			cache[ camelCase( data ) ] = value;

  		// Handle: [ owner, { properties } ] args
  		} else {

  			// Copy the properties one-by-one to the cache object
  			for ( prop in data ) {
  				cache[ camelCase( prop ) ] = data[ prop ];
  			}
  		}
  		return cache;
  	},
  	get: function( owner, key ) {
  		return key === undefined ?
  			this.cache( owner ) :

  			// Always use camelCase key (gh-2257)
  			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
  	},
  	access: function( owner, key, value ) {

  		// In cases where either:
  		//
  		//   1. No key was specified
  		//   2. A string key was specified, but no value provided
  		//
  		// Take the "read" path and allow the get method to determine
  		// which value to return, respectively either:
  		//
  		//   1. The entire cache object
  		//   2. The data stored at the key
  		//
  		if ( key === undefined ||
  				( ( key && typeof key === "string" ) && value === undefined ) ) {

  			return this.get( owner, key );
  		}

  		// When the key is not a string, or both a key and value
  		// are specified, set or extend (existing objects) with either:
  		//
  		//   1. An object of properties
  		//   2. A key and value
  		//
  		this.set( owner, key, value );

  		// Since the "set" path can have two possible entry points
  		// return the expected data based on which path was taken[*]
  		return value !== undefined ? value : key;
  	},
  	remove: function( owner, key ) {
  		var i,
  			cache = owner[ this.expando ];

  		if ( cache === undefined ) {
  			return;
  		}

  		if ( key !== undefined ) {

  			// Support array or space separated string of keys
  			if ( Array.isArray( key ) ) {

  				// If key is an array of keys...
  				// We always set camelCase keys, so remove that.
  				key = key.map( camelCase );
  			} else {
  				key = camelCase( key );

  				// If a key with the spaces exists, use it.
  				// Otherwise, create an array by matching non-whitespace
  				key = key in cache ?
  					[ key ] :
  					( key.match( rnothtmlwhite ) || [] );
  			}

  			i = key.length;

  			while ( i-- ) {
  				delete cache[ key[ i ] ];
  			}
  		}

  		// Remove the expando if there's no more data
  		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

  			// Support: Chrome <=35 - 45
  			// Webkit & Blink performance suffers when deleting properties
  			// from DOM nodes, so set to undefined instead
  			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
  			if ( owner.nodeType ) {
  				owner[ this.expando ] = undefined;
  			} else {
  				delete owner[ this.expando ];
  			}
  		}
  	},
  	hasData: function( owner ) {
  		var cache = owner[ this.expando ];
  		return cache !== undefined && !jQuery.isEmptyObject( cache );
  	}
  };
  var dataPriv = new Data();

  var dataUser = new Data();



  //	Implementation Summary
  //
  //	1. Enforce API surface and semantic compatibility with 1.9.x branch
  //	2. Improve the module's maintainability by reducing the storage
  //		paths to a single mechanism.
  //	3. Use the same single mechanism to support "private" and "user" data.
  //	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
  //	5. Avoid exposing implementation details on user objects (eg. expando properties)
  //	6. Provide a clear path for implementation upgrade to WeakMap in 2014

  var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
  	rmultiDash = /[A-Z]/g;

  function getData( data ) {
  	if ( data === "true" ) {
  		return true;
  	}

  	if ( data === "false" ) {
  		return false;
  	}

  	if ( data === "null" ) {
  		return null;
  	}

  	// Only convert to a number if it doesn't change the string
  	if ( data === +data + "" ) {
  		return +data;
  	}

  	if ( rbrace.test( data ) ) {
  		return JSON.parse( data );
  	}

  	return data;
  }

  function dataAttr( elem, key, data ) {
  	var name;

  	// If nothing was found internally, try to fetch any
  	// data from the HTML5 data-* attribute
  	if ( data === undefined && elem.nodeType === 1 ) {
  		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
  		data = elem.getAttribute( name );

  		if ( typeof data === "string" ) {
  			try {
  				data = getData( data );
  			} catch ( e ) {}

  			// Make sure we set the data so it isn't changed later
  			dataUser.set( elem, key, data );
  		} else {
  			data = undefined;
  		}
  	}
  	return data;
  }

  jQuery.extend( {
  	hasData: function( elem ) {
  		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
  	},

  	data: function( elem, name, data ) {
  		return dataUser.access( elem, name, data );
  	},

  	removeData: function( elem, name ) {
  		dataUser.remove( elem, name );
  	},

  	// TODO: Now that all calls to _data and _removeData have been replaced
  	// with direct calls to dataPriv methods, these can be deprecated.
  	_data: function( elem, name, data ) {
  		return dataPriv.access( elem, name, data );
  	},

  	_removeData: function( elem, name ) {
  		dataPriv.remove( elem, name );
  	}
  } );

  jQuery.fn.extend( {
  	data: function( key, value ) {
  		var i, name, data,
  			elem = this[ 0 ],
  			attrs = elem && elem.attributes;

  		// Gets all values
  		if ( key === undefined ) {
  			if ( this.length ) {
  				data = dataUser.get( elem );

  				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
  					i = attrs.length;
  					while ( i-- ) {

  						// Support: IE 11 only
  						// The attrs elements can be null (#14894)
  						if ( attrs[ i ] ) {
  							name = attrs[ i ].name;
  							if ( name.indexOf( "data-" ) === 0 ) {
  								name = camelCase( name.slice( 5 ) );
  								dataAttr( elem, name, data[ name ] );
  							}
  						}
  					}
  					dataPriv.set( elem, "hasDataAttrs", true );
  				}
  			}

  			return data;
  		}

  		// Sets multiple values
  		if ( typeof key === "object" ) {
  			return this.each( function() {
  				dataUser.set( this, key );
  			} );
  		}

  		return access( this, function( value ) {
  			var data;

  			// The calling jQuery object (element matches) is not empty
  			// (and therefore has an element appears at this[ 0 ]) and the
  			// `value` parameter was not undefined. An empty jQuery object
  			// will result in `undefined` for elem = this[ 0 ] which will
  			// throw an exception if an attempt to read a data cache is made.
  			if ( elem && value === undefined ) {

  				// Attempt to get data from the cache
  				// The key will always be camelCased in Data
  				data = dataUser.get( elem, key );
  				if ( data !== undefined ) {
  					return data;
  				}

  				// Attempt to "discover" the data in
  				// HTML5 custom data-* attrs
  				data = dataAttr( elem, key );
  				if ( data !== undefined ) {
  					return data;
  				}

  				// We tried really hard, but the data doesn't exist.
  				return;
  			}

  			// Set the data...
  			this.each( function() {

  				// We always store the camelCased key
  				dataUser.set( this, key, value );
  			} );
  		}, null, value, arguments.length > 1, null, true );
  	},

  	removeData: function( key ) {
  		return this.each( function() {
  			dataUser.remove( this, key );
  		} );
  	}
  } );


  jQuery.extend( {
  	queue: function( elem, type, data ) {
  		var queue;

  		if ( elem ) {
  			type = ( type || "fx" ) + "queue";
  			queue = dataPriv.get( elem, type );

  			// Speed up dequeue by getting out quickly if this is just a lookup
  			if ( data ) {
  				if ( !queue || Array.isArray( data ) ) {
  					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
  				} else {
  					queue.push( data );
  				}
  			}
  			return queue || [];
  		}
  	},

  	dequeue: function( elem, type ) {
  		type = type || "fx";

  		var queue = jQuery.queue( elem, type ),
  			startLength = queue.length,
  			fn = queue.shift(),
  			hooks = jQuery._queueHooks( elem, type ),
  			next = function() {
  				jQuery.dequeue( elem, type );
  			};

  		// If the fx queue is dequeued, always remove the progress sentinel
  		if ( fn === "inprogress" ) {
  			fn = queue.shift();
  			startLength--;
  		}

  		if ( fn ) {

  			// Add a progress sentinel to prevent the fx queue from being
  			// automatically dequeued
  			if ( type === "fx" ) {
  				queue.unshift( "inprogress" );
  			}

  			// Clear up the last queue stop function
  			delete hooks.stop;
  			fn.call( elem, next, hooks );
  		}

  		if ( !startLength && hooks ) {
  			hooks.empty.fire();
  		}
  	},

  	// Not public - generate a queueHooks object, or return the current one
  	_queueHooks: function( elem, type ) {
  		var key = type + "queueHooks";
  		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
  			empty: jQuery.Callbacks( "once memory" ).add( function() {
  				dataPriv.remove( elem, [ type + "queue", key ] );
  			} )
  		} );
  	}
  } );

  jQuery.fn.extend( {
  	queue: function( type, data ) {
  		var setter = 2;

  		if ( typeof type !== "string" ) {
  			data = type;
  			type = "fx";
  			setter--;
  		}

  		if ( arguments.length < setter ) {
  			return jQuery.queue( this[ 0 ], type );
  		}

  		return data === undefined ?
  			this :
  			this.each( function() {
  				var queue = jQuery.queue( this, type, data );

  				// Ensure a hooks for this queue
  				jQuery._queueHooks( this, type );

  				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
  					jQuery.dequeue( this, type );
  				}
  			} );
  	},
  	dequeue: function( type ) {
  		return this.each( function() {
  			jQuery.dequeue( this, type );
  		} );
  	},
  	clearQueue: function( type ) {
  		return this.queue( type || "fx", [] );
  	},

  	// Get a promise resolved when queues of a certain type
  	// are emptied (fx is the type by default)
  	promise: function( type, obj ) {
  		var tmp,
  			count = 1,
  			defer = jQuery.Deferred(),
  			elements = this,
  			i = this.length,
  			resolve = function() {
  				if ( !( --count ) ) {
  					defer.resolveWith( elements, [ elements ] );
  				}
  			};

  		if ( typeof type !== "string" ) {
  			obj = type;
  			type = undefined;
  		}
  		type = type || "fx";

  		while ( i-- ) {
  			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
  			if ( tmp && tmp.empty ) {
  				count++;
  				tmp.empty.add( resolve );
  			}
  		}
  		resolve();
  		return defer.promise( obj );
  	}
  } );
  var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

  var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


  var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

  var documentElement = document.documentElement;



  	var isAttached = function( elem ) {
  			return jQuery.contains( elem.ownerDocument, elem );
  		},
  		composed = { composed: true };

  	// Support: IE 9 - 11+, Edge 12 - 18+, iOS 10.0 - 10.2 only
  	// Check attachment across shadow DOM boundaries when possible (gh-3504)
  	// Support: iOS 10.0-10.2 only
  	// Early iOS 10 versions support `attachShadow` but not `getRootNode`,
  	// leading to errors. We need to check for `getRootNode`.
  	if ( documentElement.getRootNode ) {
  		isAttached = function( elem ) {
  			return jQuery.contains( elem.ownerDocument, elem ) ||
  				elem.getRootNode( composed ) === elem.ownerDocument;
  		};
  	}
  var isHiddenWithinTree = function( elem, el ) {

  		// isHiddenWithinTree might be called from jQuery#filter function;
  		// in that case, element will be second argument
  		elem = el || elem;

  		// Inline style trumps all
  		return elem.style.display === "none" ||
  			elem.style.display === "" &&

  			// Otherwise, check computed style
  			// Support: Firefox <=43 - 45
  			// Disconnected elements can have computed display: none, so first confirm that elem is
  			// in the document.
  			isAttached( elem ) &&

  			jQuery.css( elem, "display" ) === "none";
  	};

  var swap = function( elem, options, callback, args ) {
  	var ret, name,
  		old = {};

  	// Remember the old values, and insert the new ones
  	for ( name in options ) {
  		old[ name ] = elem.style[ name ];
  		elem.style[ name ] = options[ name ];
  	}

  	ret = callback.apply( elem, args || [] );

  	// Revert the old values
  	for ( name in options ) {
  		elem.style[ name ] = old[ name ];
  	}

  	return ret;
  };




  function adjustCSS( elem, prop, valueParts, tween ) {
  	var adjusted, scale,
  		maxIterations = 20,
  		currentValue = tween ?
  			function() {
  				return tween.cur();
  			} :
  			function() {
  				return jQuery.css( elem, prop, "" );
  			},
  		initial = currentValue(),
  		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

  		// Starting value computation is required for potential unit mismatches
  		initialInUnit = elem.nodeType &&
  			( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
  			rcssNum.exec( jQuery.css( elem, prop ) );

  	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

  		// Support: Firefox <=54
  		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
  		initial = initial / 2;

  		// Trust units reported by jQuery.css
  		unit = unit || initialInUnit[ 3 ];

  		// Iteratively approximate from a nonzero starting point
  		initialInUnit = +initial || 1;

  		while ( maxIterations-- ) {

  			// Evaluate and update our best guess (doubling guesses that zero out).
  			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
  			jQuery.style( elem, prop, initialInUnit + unit );
  			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
  				maxIterations = 0;
  			}
  			initialInUnit = initialInUnit / scale;

  		}

  		initialInUnit = initialInUnit * 2;
  		jQuery.style( elem, prop, initialInUnit + unit );

  		// Make sure we update the tween properties later on
  		valueParts = valueParts || [];
  	}

  	if ( valueParts ) {
  		initialInUnit = +initialInUnit || +initial || 0;

  		// Apply relative offset (+=/-=) if specified
  		adjusted = valueParts[ 1 ] ?
  			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
  			+valueParts[ 2 ];
  		if ( tween ) {
  			tween.unit = unit;
  			tween.start = initialInUnit;
  			tween.end = adjusted;
  		}
  	}
  	return adjusted;
  }


  var defaultDisplayMap = {};

  function getDefaultDisplay( elem ) {
  	var temp,
  		doc = elem.ownerDocument,
  		nodeName = elem.nodeName,
  		display = defaultDisplayMap[ nodeName ];

  	if ( display ) {
  		return display;
  	}

  	temp = doc.body.appendChild( doc.createElement( nodeName ) );
  	display = jQuery.css( temp, "display" );

  	temp.parentNode.removeChild( temp );

  	if ( display === "none" ) {
  		display = "block";
  	}
  	defaultDisplayMap[ nodeName ] = display;

  	return display;
  }

  function showHide( elements, show ) {
  	var display, elem,
  		values = [],
  		index = 0,
  		length = elements.length;

  	// Determine new display value for elements that need to change
  	for ( ; index < length; index++ ) {
  		elem = elements[ index ];
  		if ( !elem.style ) {
  			continue;
  		}

  		display = elem.style.display;
  		if ( show ) {

  			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
  			// check is required in this first loop unless we have a nonempty display value (either
  			// inline or about-to-be-restored)
  			if ( display === "none" ) {
  				values[ index ] = dataPriv.get( elem, "display" ) || null;
  				if ( !values[ index ] ) {
  					elem.style.display = "";
  				}
  			}
  			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
  				values[ index ] = getDefaultDisplay( elem );
  			}
  		} else {
  			if ( display !== "none" ) {
  				values[ index ] = "none";

  				// Remember what we're overwriting
  				dataPriv.set( elem, "display", display );
  			}
  		}
  	}

  	// Set the display of the elements in a second loop to avoid constant reflow
  	for ( index = 0; index < length; index++ ) {
  		if ( values[ index ] != null ) {
  			elements[ index ].style.display = values[ index ];
  		}
  	}

  	return elements;
  }

  jQuery.fn.extend( {
  	show: function() {
  		return showHide( this, true );
  	},
  	hide: function() {
  		return showHide( this );
  	},
  	toggle: function( state ) {
  		if ( typeof state === "boolean" ) {
  			return state ? this.show() : this.hide();
  		}

  		return this.each( function() {
  			if ( isHiddenWithinTree( this ) ) {
  				jQuery( this ).show();
  			} else {
  				jQuery( this ).hide();
  			}
  		} );
  	}
  } );
  var rcheckableType = ( /^(?:checkbox|radio)$/i );

  var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]*)/i );

  var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



  // We have to close these tags to support XHTML (#13200)
  var wrapMap = {

  	// Support: IE <=9 only
  	option: [ 1, "<select multiple='multiple'>", "</select>" ],

  	// XHTML parsers do not magically insert elements in the
  	// same way that tag soup parsers do. So we cannot shorten
  	// this by omitting <tbody> or other required elements.
  	thead: [ 1, "<table>", "</table>" ],
  	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
  	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
  	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

  	_default: [ 0, "", "" ]
  };

  // Support: IE <=9 only
  wrapMap.optgroup = wrapMap.option;

  wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
  wrapMap.th = wrapMap.td;


  function getAll( context, tag ) {

  	// Support: IE <=9 - 11 only
  	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
  	var ret;

  	if ( typeof context.getElementsByTagName !== "undefined" ) {
  		ret = context.getElementsByTagName( tag || "*" );

  	} else if ( typeof context.querySelectorAll !== "undefined" ) {
  		ret = context.querySelectorAll( tag || "*" );

  	} else {
  		ret = [];
  	}

  	if ( tag === undefined || tag && nodeName( context, tag ) ) {
  		return jQuery.merge( [ context ], ret );
  	}

  	return ret;
  }


  // Mark scripts as having already been evaluated
  function setGlobalEval( elems, refElements ) {
  	var i = 0,
  		l = elems.length;

  	for ( ; i < l; i++ ) {
  		dataPriv.set(
  			elems[ i ],
  			"globalEval",
  			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
  		);
  	}
  }


  var rhtml = /<|&#?\w+;/;

  function buildFragment( elems, context, scripts, selection, ignored ) {
  	var elem, tmp, tag, wrap, attached, j,
  		fragment = context.createDocumentFragment(),
  		nodes = [],
  		i = 0,
  		l = elems.length;

  	for ( ; i < l; i++ ) {
  		elem = elems[ i ];

  		if ( elem || elem === 0 ) {

  			// Add nodes directly
  			if ( toType( elem ) === "object" ) {

  				// Support: Android <=4.0 only, PhantomJS 1 only
  				// push.apply(_, arraylike) throws on ancient WebKit
  				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

  			// Convert non-html into a text node
  			} else if ( !rhtml.test( elem ) ) {
  				nodes.push( context.createTextNode( elem ) );

  			// Convert html into DOM nodes
  			} else {
  				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

  				// Deserialize a standard representation
  				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
  				wrap = wrapMap[ tag ] || wrapMap._default;
  				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

  				// Descend through wrappers to the right content
  				j = wrap[ 0 ];
  				while ( j-- ) {
  					tmp = tmp.lastChild;
  				}

  				// Support: Android <=4.0 only, PhantomJS 1 only
  				// push.apply(_, arraylike) throws on ancient WebKit
  				jQuery.merge( nodes, tmp.childNodes );

  				// Remember the top-level container
  				tmp = fragment.firstChild;

  				// Ensure the created nodes are orphaned (#12392)
  				tmp.textContent = "";
  			}
  		}
  	}

  	// Remove wrapper from fragment
  	fragment.textContent = "";

  	i = 0;
  	while ( ( elem = nodes[ i++ ] ) ) {

  		// Skip elements already in the context collection (trac-4087)
  		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
  			if ( ignored ) {
  				ignored.push( elem );
  			}
  			continue;
  		}

  		attached = isAttached( elem );

  		// Append to fragment
  		tmp = getAll( fragment.appendChild( elem ), "script" );

  		// Preserve script evaluation history
  		if ( attached ) {
  			setGlobalEval( tmp );
  		}

  		// Capture executables
  		if ( scripts ) {
  			j = 0;
  			while ( ( elem = tmp[ j++ ] ) ) {
  				if ( rscriptType.test( elem.type || "" ) ) {
  					scripts.push( elem );
  				}
  			}
  		}
  	}

  	return fragment;
  }


  ( function() {
  	var fragment = document.createDocumentFragment(),
  		div = fragment.appendChild( document.createElement( "div" ) ),
  		input = document.createElement( "input" );

  	// Support: Android 4.0 - 4.3 only
  	// Check state lost if the name is set (#11217)
  	// Support: Windows Web Apps (WWA)
  	// `name` and `type` must use .setAttribute for WWA (#14901)
  	input.setAttribute( "type", "radio" );
  	input.setAttribute( "checked", "checked" );
  	input.setAttribute( "name", "t" );

  	div.appendChild( input );

  	// Support: Android <=4.1 only
  	// Older WebKit doesn't clone checked state correctly in fragments
  	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

  	// Support: IE <=11 only
  	// Make sure textarea (and checkbox) defaultValue is properly cloned
  	div.innerHTML = "<textarea>x</textarea>";
  	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
  } )();


  var
  	rkeyEvent = /^key/,
  	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
  	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

  function returnTrue() {
  	return true;
  }

  function returnFalse() {
  	return false;
  }

  // Support: IE <=9 - 11+
  // focus() and blur() are asynchronous, except when they are no-op.
  // So expect focus to be synchronous when the element is already active,
  // and blur to be synchronous when the element is not already active.
  // (focus and blur are always synchronous in other supported browsers,
  // this just defines when we can count on it).
  function expectSync( elem, type ) {
  	return ( elem === safeActiveElement() ) === ( type === "focus" );
  }

  // Support: IE <=9 only
  // Accessing document.activeElement can throw unexpectedly
  // https://bugs.jquery.com/ticket/13393
  function safeActiveElement() {
  	try {
  		return document.activeElement;
  	} catch ( err ) { }
  }

  function on( elem, types, selector, data, fn, one ) {
  	var origFn, type;

  	// Types can be a map of types/handlers
  	if ( typeof types === "object" ) {

  		// ( types-Object, selector, data )
  		if ( typeof selector !== "string" ) {

  			// ( types-Object, data )
  			data = data || selector;
  			selector = undefined;
  		}
  		for ( type in types ) {
  			on( elem, type, selector, data, types[ type ], one );
  		}
  		return elem;
  	}

  	if ( data == null && fn == null ) {

  		// ( types, fn )
  		fn = selector;
  		data = selector = undefined;
  	} else if ( fn == null ) {
  		if ( typeof selector === "string" ) {

  			// ( types, selector, fn )
  			fn = data;
  			data = undefined;
  		} else {

  			// ( types, data, fn )
  			fn = data;
  			data = selector;
  			selector = undefined;
  		}
  	}
  	if ( fn === false ) {
  		fn = returnFalse;
  	} else if ( !fn ) {
  		return elem;
  	}

  	if ( one === 1 ) {
  		origFn = fn;
  		fn = function( event ) {

  			// Can use an empty set, since event contains the info
  			jQuery().off( event );
  			return origFn.apply( this, arguments );
  		};

  		// Use same guid so caller can remove using origFn
  		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
  	}
  	return elem.each( function() {
  		jQuery.event.add( this, types, fn, data, selector );
  	} );
  }

  /*
   * Helper functions for managing events -- not part of the public interface.
   * Props to Dean Edwards' addEvent library for many of the ideas.
   */
  jQuery.event = {

  	global: {},

  	add: function( elem, types, handler, data, selector ) {

  		var handleObjIn, eventHandle, tmp,
  			events, t, handleObj,
  			special, handlers, type, namespaces, origType,
  			elemData = dataPriv.get( elem );

  		// Don't attach events to noData or text/comment nodes (but allow plain objects)
  		if ( !elemData ) {
  			return;
  		}

  		// Caller can pass in an object of custom data in lieu of the handler
  		if ( handler.handler ) {
  			handleObjIn = handler;
  			handler = handleObjIn.handler;
  			selector = handleObjIn.selector;
  		}

  		// Ensure that invalid selectors throw exceptions at attach time
  		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
  		if ( selector ) {
  			jQuery.find.matchesSelector( documentElement, selector );
  		}

  		// Make sure that the handler has a unique ID, used to find/remove it later
  		if ( !handler.guid ) {
  			handler.guid = jQuery.guid++;
  		}

  		// Init the element's event structure and main handler, if this is the first
  		if ( !( events = elemData.events ) ) {
  			events = elemData.events = {};
  		}
  		if ( !( eventHandle = elemData.handle ) ) {
  			eventHandle = elemData.handle = function( e ) {

  				// Discard the second event of a jQuery.event.trigger() and
  				// when an event is called after a page has unloaded
  				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
  					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
  			};
  		}

  		// Handle multiple events separated by a space
  		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
  		t = types.length;
  		while ( t-- ) {
  			tmp = rtypenamespace.exec( types[ t ] ) || [];
  			type = origType = tmp[ 1 ];
  			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

  			// There *must* be a type, no attaching namespace-only handlers
  			if ( !type ) {
  				continue;
  			}

  			// If event changes its type, use the special event handlers for the changed type
  			special = jQuery.event.special[ type ] || {};

  			// If selector defined, determine special event api type, otherwise given type
  			type = ( selector ? special.delegateType : special.bindType ) || type;

  			// Update special based on newly reset type
  			special = jQuery.event.special[ type ] || {};

  			// handleObj is passed to all event handlers
  			handleObj = jQuery.extend( {
  				type: type,
  				origType: origType,
  				data: data,
  				handler: handler,
  				guid: handler.guid,
  				selector: selector,
  				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
  				namespace: namespaces.join( "." )
  			}, handleObjIn );

  			// Init the event handler queue if we're the first
  			if ( !( handlers = events[ type ] ) ) {
  				handlers = events[ type ] = [];
  				handlers.delegateCount = 0;

  				// Only use addEventListener if the special events handler returns false
  				if ( !special.setup ||
  					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

  					if ( elem.addEventListener ) {
  						elem.addEventListener( type, eventHandle );
  					}
  				}
  			}

  			if ( special.add ) {
  				special.add.call( elem, handleObj );

  				if ( !handleObj.handler.guid ) {
  					handleObj.handler.guid = handler.guid;
  				}
  			}

  			// Add to the element's handler list, delegates in front
  			if ( selector ) {
  				handlers.splice( handlers.delegateCount++, 0, handleObj );
  			} else {
  				handlers.push( handleObj );
  			}

  			// Keep track of which events have ever been used, for event optimization
  			jQuery.event.global[ type ] = true;
  		}

  	},

  	// Detach an event or set of events from an element
  	remove: function( elem, types, handler, selector, mappedTypes ) {

  		var j, origCount, tmp,
  			events, t, handleObj,
  			special, handlers, type, namespaces, origType,
  			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

  		if ( !elemData || !( events = elemData.events ) ) {
  			return;
  		}

  		// Once for each type.namespace in types; type may be omitted
  		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
  		t = types.length;
  		while ( t-- ) {
  			tmp = rtypenamespace.exec( types[ t ] ) || [];
  			type = origType = tmp[ 1 ];
  			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

  			// Unbind all events (on this namespace, if provided) for the element
  			if ( !type ) {
  				for ( type in events ) {
  					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
  				}
  				continue;
  			}

  			special = jQuery.event.special[ type ] || {};
  			type = ( selector ? special.delegateType : special.bindType ) || type;
  			handlers = events[ type ] || [];
  			tmp = tmp[ 2 ] &&
  				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

  			// Remove matching events
  			origCount = j = handlers.length;
  			while ( j-- ) {
  				handleObj = handlers[ j ];

  				if ( ( mappedTypes || origType === handleObj.origType ) &&
  					( !handler || handler.guid === handleObj.guid ) &&
  					( !tmp || tmp.test( handleObj.namespace ) ) &&
  					( !selector || selector === handleObj.selector ||
  						selector === "**" && handleObj.selector ) ) {
  					handlers.splice( j, 1 );

  					if ( handleObj.selector ) {
  						handlers.delegateCount--;
  					}
  					if ( special.remove ) {
  						special.remove.call( elem, handleObj );
  					}
  				}
  			}

  			// Remove generic event handler if we removed something and no more handlers exist
  			// (avoids potential for endless recursion during removal of special event handlers)
  			if ( origCount && !handlers.length ) {
  				if ( !special.teardown ||
  					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

  					jQuery.removeEvent( elem, type, elemData.handle );
  				}

  				delete events[ type ];
  			}
  		}

  		// Remove data and the expando if it's no longer used
  		if ( jQuery.isEmptyObject( events ) ) {
  			dataPriv.remove( elem, "handle events" );
  		}
  	},

  	dispatch: function( nativeEvent ) {
  		var arguments$1 = arguments;


  		// Make a writable jQuery.Event from the native event object
  		var event = jQuery.event.fix( nativeEvent );

  		var i, j, ret, matched, handleObj, handlerQueue,
  			args = new Array( arguments.length ),
  			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
  			special = jQuery.event.special[ event.type ] || {};

  		// Use the fix-ed jQuery.Event rather than the (read-only) native event
  		args[ 0 ] = event;

  		for ( i = 1; i < arguments.length; i++ ) {
  			args[ i ] = arguments$1[ i ];
  		}

  		event.delegateTarget = this;

  		// Call the preDispatch hook for the mapped type, and let it bail if desired
  		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
  			return;
  		}

  		// Determine handlers
  		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

  		// Run delegates first; they may want to stop propagation beneath us
  		i = 0;
  		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
  			event.currentTarget = matched.elem;

  			j = 0;
  			while ( ( handleObj = matched.handlers[ j++ ] ) &&
  				!event.isImmediatePropagationStopped() ) {

  				// If the event is namespaced, then each handler is only invoked if it is
  				// specially universal or its namespaces are a superset of the event's.
  				if ( !event.rnamespace || handleObj.namespace === false ||
  					event.rnamespace.test( handleObj.namespace ) ) {

  					event.handleObj = handleObj;
  					event.data = handleObj.data;

  					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
  						handleObj.handler ).apply( matched.elem, args );

  					if ( ret !== undefined ) {
  						if ( ( event.result = ret ) === false ) {
  							event.preventDefault();
  							event.stopPropagation();
  						}
  					}
  				}
  			}
  		}

  		// Call the postDispatch hook for the mapped type
  		if ( special.postDispatch ) {
  			special.postDispatch.call( this, event );
  		}

  		return event.result;
  	},

  	handlers: function( event, handlers ) {
  		var i, handleObj, sel, matchedHandlers, matchedSelectors,
  			handlerQueue = [],
  			delegateCount = handlers.delegateCount,
  			cur = event.target;

  		// Find delegate handlers
  		if ( delegateCount &&

  			// Support: IE <=9
  			// Black-hole SVG <use> instance trees (trac-13180)
  			cur.nodeType &&

  			// Support: Firefox <=42
  			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
  			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
  			// Support: IE 11 only
  			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
  			!( event.type === "click" && event.button >= 1 ) ) {

  			for ( ; cur !== this; cur = cur.parentNode || this ) {

  				// Don't check non-elements (#13208)
  				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
  				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
  					matchedHandlers = [];
  					matchedSelectors = {};
  					for ( i = 0; i < delegateCount; i++ ) {
  						handleObj = handlers[ i ];

  						// Don't conflict with Object.prototype properties (#13203)
  						sel = handleObj.selector + " ";

  						if ( matchedSelectors[ sel ] === undefined ) {
  							matchedSelectors[ sel ] = handleObj.needsContext ?
  								jQuery( sel, this ).index( cur ) > -1 :
  								jQuery.find( sel, this, null, [ cur ] ).length;
  						}
  						if ( matchedSelectors[ sel ] ) {
  							matchedHandlers.push( handleObj );
  						}
  					}
  					if ( matchedHandlers.length ) {
  						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
  					}
  				}
  			}
  		}

  		// Add the remaining (directly-bound) handlers
  		cur = this;
  		if ( delegateCount < handlers.length ) {
  			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
  		}

  		return handlerQueue;
  	},

  	addProp: function( name, hook ) {
  		Object.defineProperty( jQuery.Event.prototype, name, {
  			enumerable: true,
  			configurable: true,

  			get: isFunction( hook ) ?
  				function() {
  					if ( this.originalEvent ) {
  							return hook( this.originalEvent );
  					}
  				} :
  				function() {
  					if ( this.originalEvent ) {
  							return this.originalEvent[ name ];
  					}
  				},

  			set: function( value ) {
  				Object.defineProperty( this, name, {
  					enumerable: true,
  					configurable: true,
  					writable: true,
  					value: value
  				} );
  			}
  		} );
  	},

  	fix: function( originalEvent ) {
  		return originalEvent[ jQuery.expando ] ?
  			originalEvent :
  			new jQuery.Event( originalEvent );
  	},

  	special: {
  		load: {

  			// Prevent triggered image.load events from bubbling to window.load
  			noBubble: true
  		},
  		click: {

  			// Utilize native event to ensure correct state for checkable inputs
  			setup: function( data ) {

  				// For mutual compressibility with _default, replace `this` access with a local var.
  				// `|| data` is dead code meant only to preserve the variable through minification.
  				var el = this || data;

  				// Claim the first handler
  				if ( rcheckableType.test( el.type ) &&
  					el.click && nodeName( el, "input" ) ) {

  					// dataPriv.set( el, "click", ... )
  					leverageNative( el, "click", returnTrue );
  				}

  				// Return false to allow normal processing in the caller
  				return false;
  			},
  			trigger: function( data ) {

  				// For mutual compressibility with _default, replace `this` access with a local var.
  				// `|| data` is dead code meant only to preserve the variable through minification.
  				var el = this || data;

  				// Force setup before triggering a click
  				if ( rcheckableType.test( el.type ) &&
  					el.click && nodeName( el, "input" ) ) {

  					leverageNative( el, "click" );
  				}

  				// Return non-false to allow normal event-path propagation
  				return true;
  			},

  			// For cross-browser consistency, suppress native .click() on links
  			// Also prevent it if we're currently inside a leveraged native-event stack
  			_default: function( event ) {
  				var target = event.target;
  				return rcheckableType.test( target.type ) &&
  					target.click && nodeName( target, "input" ) &&
  					dataPriv.get( target, "click" ) ||
  					nodeName( target, "a" );
  			}
  		},

  		beforeunload: {
  			postDispatch: function( event ) {

  				// Support: Firefox 20+
  				// Firefox doesn't alert if the returnValue field is not set.
  				if ( event.result !== undefined && event.originalEvent ) {
  					event.originalEvent.returnValue = event.result;
  				}
  			}
  		}
  	}
  };

  // Ensure the presence of an event listener that handles manually-triggered
  // synthetic events by interrupting progress until reinvoked in response to
  // *native* events that it fires directly, ensuring that state changes have
  // already occurred before other listeners are invoked.
  function leverageNative( el, type, expectSync ) {

  	// Missing expectSync indicates a trigger call, which must force setup through jQuery.event.add
  	if ( !expectSync ) {
  		if ( dataPriv.get( el, type ) === undefined ) {
  			jQuery.event.add( el, type, returnTrue );
  		}
  		return;
  	}

  	// Register the controller as a special universal handler for all event namespaces
  	dataPriv.set( el, type, false );
  	jQuery.event.add( el, type, {
  		namespace: false,
  		handler: function( event ) {
  			var notAsync, result,
  				saved = dataPriv.get( this, type );

  			if ( ( event.isTrigger & 1 ) && this[ type ] ) {

  				// Interrupt processing of the outer synthetic .trigger()ed event
  				// Saved data should be false in such cases, but might be a leftover capture object
  				// from an async native handler (gh-4350)
  				if ( !saved.length ) {

  					// Store arguments for use when handling the inner native event
  					// There will always be at least one argument (an event object), so this array
  					// will not be confused with a leftover capture object.
  					saved = slice.call( arguments );
  					dataPriv.set( this, type, saved );

  					// Trigger the native event and capture its result
  					// Support: IE <=9 - 11+
  					// focus() and blur() are asynchronous
  					notAsync = expectSync( this, type );
  					this[ type ]();
  					result = dataPriv.get( this, type );
  					if ( saved !== result || notAsync ) {
  						dataPriv.set( this, type, false );
  					} else {
  						result = {};
  					}
  					if ( saved !== result ) {

  						// Cancel the outer synthetic event
  						event.stopImmediatePropagation();
  						event.preventDefault();
  						return result.value;
  					}

  				// If this is an inner synthetic event for an event with a bubbling surrogate
  				// (focus or blur), assume that the surrogate already propagated from triggering the
  				// native event and prevent that from happening again here.
  				// This technically gets the ordering wrong w.r.t. to `.trigger()` (in which the
  				// bubbling surrogate propagates *after* the non-bubbling base), but that seems
  				// less bad than duplication.
  				} else if ( ( jQuery.event.special[ type ] || {} ).delegateType ) {
  					event.stopPropagation();
  				}

  			// If this is a native event triggered above, everything is now in order
  			// Fire an inner synthetic event with the original arguments
  			} else if ( saved.length ) {

  				// ...and capture the result
  				dataPriv.set( this, type, {
  					value: jQuery.event.trigger(

  						// Support: IE <=9 - 11+
  						// Extend with the prototype to reset the above stopImmediatePropagation()
  						jQuery.extend( saved[ 0 ], jQuery.Event.prototype ),
  						saved.slice( 1 ),
  						this
  					)
  				} );

  				// Abort handling of the native event
  				event.stopImmediatePropagation();
  			}
  		}
  	} );
  }

  jQuery.removeEvent = function( elem, type, handle ) {

  	// This "if" is needed for plain objects
  	if ( elem.removeEventListener ) {
  		elem.removeEventListener( type, handle );
  	}
  };

  jQuery.Event = function( src, props ) {

  	// Allow instantiation without the 'new' keyword
  	if ( !( this instanceof jQuery.Event ) ) {
  		return new jQuery.Event( src, props );
  	}

  	// Event object
  	if ( src && src.type ) {
  		this.originalEvent = src;
  		this.type = src.type;

  		// Events bubbling up the document may have been marked as prevented
  		// by a handler lower down the tree; reflect the correct value.
  		this.isDefaultPrevented = src.defaultPrevented ||
  				src.defaultPrevented === undefined &&

  				// Support: Android <=2.3 only
  				src.returnValue === false ?
  			returnTrue :
  			returnFalse;

  		// Create target properties
  		// Support: Safari <=6 - 7 only
  		// Target should not be a text node (#504, #13143)
  		this.target = ( src.target && src.target.nodeType === 3 ) ?
  			src.target.parentNode :
  			src.target;

  		this.currentTarget = src.currentTarget;
  		this.relatedTarget = src.relatedTarget;

  	// Event type
  	} else {
  		this.type = src;
  	}

  	// Put explicitly provided properties onto the event object
  	if ( props ) {
  		jQuery.extend( this, props );
  	}

  	// Create a timestamp if incoming event doesn't have one
  	this.timeStamp = src && src.timeStamp || Date.now();

  	// Mark it as fixed
  	this[ jQuery.expando ] = true;
  };

  // jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
  // https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
  jQuery.Event.prototype = {
  	constructor: jQuery.Event,
  	isDefaultPrevented: returnFalse,
  	isPropagationStopped: returnFalse,
  	isImmediatePropagationStopped: returnFalse,
  	isSimulated: false,

  	preventDefault: function() {
  		var e = this.originalEvent;

  		this.isDefaultPrevented = returnTrue;

  		if ( e && !this.isSimulated ) {
  			e.preventDefault();
  		}
  	},
  	stopPropagation: function() {
  		var e = this.originalEvent;

  		this.isPropagationStopped = returnTrue;

  		if ( e && !this.isSimulated ) {
  			e.stopPropagation();
  		}
  	},
  	stopImmediatePropagation: function() {
  		var e = this.originalEvent;

  		this.isImmediatePropagationStopped = returnTrue;

  		if ( e && !this.isSimulated ) {
  			e.stopImmediatePropagation();
  		}

  		this.stopPropagation();
  	}
  };

  // Includes all common event props including KeyEvent and MouseEvent specific props
  jQuery.each( {
  	altKey: true,
  	bubbles: true,
  	cancelable: true,
  	changedTouches: true,
  	ctrlKey: true,
  	detail: true,
  	eventPhase: true,
  	metaKey: true,
  	pageX: true,
  	pageY: true,
  	shiftKey: true,
  	view: true,
  	"char": true,
  	code: true,
  	charCode: true,
  	key: true,
  	keyCode: true,
  	button: true,
  	buttons: true,
  	clientX: true,
  	clientY: true,
  	offsetX: true,
  	offsetY: true,
  	pointerId: true,
  	pointerType: true,
  	screenX: true,
  	screenY: true,
  	targetTouches: true,
  	toElement: true,
  	touches: true,

  	which: function( event ) {
  		var button = event.button;

  		// Add which for key events
  		if ( event.which == null && rkeyEvent.test( event.type ) ) {
  			return event.charCode != null ? event.charCode : event.keyCode;
  		}

  		// Add which for click: 1 === left; 2 === middle; 3 === right
  		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
  			if ( button & 1 ) {
  				return 1;
  			}

  			if ( button & 2 ) {
  				return 3;
  			}

  			if ( button & 4 ) {
  				return 2;
  			}

  			return 0;
  		}

  		return event.which;
  	}
  }, jQuery.event.addProp );

  jQuery.each( { focus: "focusin", blur: "focusout" }, function( type, delegateType ) {
  	jQuery.event.special[ type ] = {

  		// Utilize native event if possible so blur/focus sequence is correct
  		setup: function() {

  			// Claim the first handler
  			// dataPriv.set( this, "focus", ... )
  			// dataPriv.set( this, "blur", ... )
  			leverageNative( this, type, expectSync );

  			// Return false to allow normal processing in the caller
  			return false;
  		},
  		trigger: function() {

  			// Force setup before trigger
  			leverageNative( this, type );

  			// Return non-false to allow normal event-path propagation
  			return true;
  		},

  		delegateType: delegateType
  	};
  } );

  // Create mouseenter/leave events using mouseover/out and event-time checks
  // so that event delegation works in jQuery.
  // Do the same for pointerenter/pointerleave and pointerover/pointerout
  //
  // Support: Safari 7 only
  // Safari sends mouseenter too often; see:
  // https://bugs.chromium.org/p/chromium/issues/detail?id=470258
  // for the description of the bug (it existed in older Chrome versions as well).
  jQuery.each( {
  	mouseenter: "mouseover",
  	mouseleave: "mouseout",
  	pointerenter: "pointerover",
  	pointerleave: "pointerout"
  }, function( orig, fix ) {
  	jQuery.event.special[ orig ] = {
  		delegateType: fix,
  		bindType: fix,

  		handle: function( event ) {
  			var ret,
  				target = this,
  				related = event.relatedTarget,
  				handleObj = event.handleObj;

  			// For mouseenter/leave call the handler if related is outside the target.
  			// NB: No relatedTarget if the mouse left/entered the browser window
  			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
  				event.type = handleObj.origType;
  				ret = handleObj.handler.apply( this, arguments );
  				event.type = fix;
  			}
  			return ret;
  		}
  	};
  } );

  jQuery.fn.extend( {

  	on: function( types, selector, data, fn ) {
  		return on( this, types, selector, data, fn );
  	},
  	one: function( types, selector, data, fn ) {
  		return on( this, types, selector, data, fn, 1 );
  	},
  	off: function( types, selector, fn ) {
  		var handleObj, type;
  		if ( types && types.preventDefault && types.handleObj ) {

  			// ( event )  dispatched jQuery.Event
  			handleObj = types.handleObj;
  			jQuery( types.delegateTarget ).off(
  				handleObj.namespace ?
  					handleObj.origType + "." + handleObj.namespace :
  					handleObj.origType,
  				handleObj.selector,
  				handleObj.handler
  			);
  			return this;
  		}
  		if ( typeof types === "object" ) {

  			// ( types-object [, selector] )
  			for ( type in types ) {
  				this.off( type, selector, types[ type ] );
  			}
  			return this;
  		}
  		if ( selector === false || typeof selector === "function" ) {

  			// ( types [, fn] )
  			fn = selector;
  			selector = undefined;
  		}
  		if ( fn === false ) {
  			fn = returnFalse;
  		}
  		return this.each( function() {
  			jQuery.event.remove( this, types, fn, selector );
  		} );
  	}
  } );


  var

  	/* eslint-disable max-len */

  	// See https://github.com/eslint/eslint/issues/3229
  	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

  	/* eslint-enable */

  	// Support: IE <=10 - 11, Edge 12 - 13 only
  	// In IE/Edge using regex groups here causes severe slowdowns.
  	// See https://connect.microsoft.com/IE/feedback/details/1736512/
  	rnoInnerhtml = /<script|<style|<link/i,

  	// checked="checked" or checked
  	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
  	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

  // Prefer a tbody over its parent table for containing new rows
  function manipulationTarget( elem, content ) {
  	if ( nodeName( elem, "table" ) &&
  		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

  		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
  	}

  	return elem;
  }

  // Replace/restore the type attribute of script elements for safe DOM manipulation
  function disableScript( elem ) {
  	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
  	return elem;
  }
  function restoreScript( elem ) {
  	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
  		elem.type = elem.type.slice( 5 );
  	} else {
  		elem.removeAttribute( "type" );
  	}

  	return elem;
  }

  function cloneCopyEvent( src, dest ) {
  	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

  	if ( dest.nodeType !== 1 ) {
  		return;
  	}

  	// 1. Copy private data: events, handlers, etc.
  	if ( dataPriv.hasData( src ) ) {
  		pdataOld = dataPriv.access( src );
  		pdataCur = dataPriv.set( dest, pdataOld );
  		events = pdataOld.events;

  		if ( events ) {
  			delete pdataCur.handle;
  			pdataCur.events = {};

  			for ( type in events ) {
  				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
  					jQuery.event.add( dest, type, events[ type ][ i ] );
  				}
  			}
  		}
  	}

  	// 2. Copy user data
  	if ( dataUser.hasData( src ) ) {
  		udataOld = dataUser.access( src );
  		udataCur = jQuery.extend( {}, udataOld );

  		dataUser.set( dest, udataCur );
  	}
  }

  // Fix IE bugs, see support tests
  function fixInput( src, dest ) {
  	var nodeName = dest.nodeName.toLowerCase();

  	// Fails to persist the checked state of a cloned checkbox or radio button.
  	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
  		dest.checked = src.checked;

  	// Fails to return the selected option to the default selected state when cloning options
  	} else if ( nodeName === "input" || nodeName === "textarea" ) {
  		dest.defaultValue = src.defaultValue;
  	}
  }

  function domManip( collection, args, callback, ignored ) {

  	// Flatten any nested arrays
  	args = concat.apply( [], args );

  	var fragment, first, scripts, hasScripts, node, doc,
  		i = 0,
  		l = collection.length,
  		iNoClone = l - 1,
  		value = args[ 0 ],
  		valueIsFunction = isFunction( value );

  	// We can't cloneNode fragments that contain checked, in WebKit
  	if ( valueIsFunction ||
  			( l > 1 && typeof value === "string" &&
  				!support.checkClone && rchecked.test( value ) ) ) {
  		return collection.each( function( index ) {
  			var self = collection.eq( index );
  			if ( valueIsFunction ) {
  				args[ 0 ] = value.call( this, index, self.html() );
  			}
  			domManip( self, args, callback, ignored );
  		} );
  	}

  	if ( l ) {
  		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
  		first = fragment.firstChild;

  		if ( fragment.childNodes.length === 1 ) {
  			fragment = first;
  		}

  		// Require either new content or an interest in ignored elements to invoke the callback
  		if ( first || ignored ) {
  			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
  			hasScripts = scripts.length;

  			// Use the original fragment for the last item
  			// instead of the first because it can end up
  			// being emptied incorrectly in certain situations (#8070).
  			for ( ; i < l; i++ ) {
  				node = fragment;

  				if ( i !== iNoClone ) {
  					node = jQuery.clone( node, true, true );

  					// Keep references to cloned scripts for later restoration
  					if ( hasScripts ) {

  						// Support: Android <=4.0 only, PhantomJS 1 only
  						// push.apply(_, arraylike) throws on ancient WebKit
  						jQuery.merge( scripts, getAll( node, "script" ) );
  					}
  				}

  				callback.call( collection[ i ], node, i );
  			}

  			if ( hasScripts ) {
  				doc = scripts[ scripts.length - 1 ].ownerDocument;

  				// Reenable scripts
  				jQuery.map( scripts, restoreScript );

  				// Evaluate executable scripts on first document insertion
  				for ( i = 0; i < hasScripts; i++ ) {
  					node = scripts[ i ];
  					if ( rscriptType.test( node.type || "" ) &&
  						!dataPriv.access( node, "globalEval" ) &&
  						jQuery.contains( doc, node ) ) {

  						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

  							// Optional AJAX dependency, but won't run scripts if not present
  							if ( jQuery._evalUrl && !node.noModule ) {
  								jQuery._evalUrl( node.src, {
  									nonce: node.nonce || node.getAttribute( "nonce" )
  								} );
  							}
  						} else {
  							DOMEval( node.textContent.replace( rcleanScript, "" ), node, doc );
  						}
  					}
  				}
  			}
  		}
  	}

  	return collection;
  }

  function remove( elem, selector, keepData ) {
  	var node,
  		nodes = selector ? jQuery.filter( selector, elem ) : elem,
  		i = 0;

  	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
  		if ( !keepData && node.nodeType === 1 ) {
  			jQuery.cleanData( getAll( node ) );
  		}

  		if ( node.parentNode ) {
  			if ( keepData && isAttached( node ) ) {
  				setGlobalEval( getAll( node, "script" ) );
  			}
  			node.parentNode.removeChild( node );
  		}
  	}

  	return elem;
  }

  jQuery.extend( {
  	htmlPrefilter: function( html ) {
  		return html.replace( rxhtmlTag, "<$1></$2>" );
  	},

  	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
  		var i, l, srcElements, destElements,
  			clone = elem.cloneNode( true ),
  			inPage = isAttached( elem );

  		// Fix IE cloning issues
  		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
  				!jQuery.isXMLDoc( elem ) ) {

  			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
  			destElements = getAll( clone );
  			srcElements = getAll( elem );

  			for ( i = 0, l = srcElements.length; i < l; i++ ) {
  				fixInput( srcElements[ i ], destElements[ i ] );
  			}
  		}

  		// Copy the events from the original to the clone
  		if ( dataAndEvents ) {
  			if ( deepDataAndEvents ) {
  				srcElements = srcElements || getAll( elem );
  				destElements = destElements || getAll( clone );

  				for ( i = 0, l = srcElements.length; i < l; i++ ) {
  					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
  				}
  			} else {
  				cloneCopyEvent( elem, clone );
  			}
  		}

  		// Preserve script evaluation history
  		destElements = getAll( clone, "script" );
  		if ( destElements.length > 0 ) {
  			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
  		}

  		// Return the cloned set
  		return clone;
  	},

  	cleanData: function( elems ) {
  		var data, elem, type,
  			special = jQuery.event.special,
  			i = 0;

  		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
  			if ( acceptData( elem ) ) {
  				if ( ( data = elem[ dataPriv.expando ] ) ) {
  					if ( data.events ) {
  						for ( type in data.events ) {
  							if ( special[ type ] ) {
  								jQuery.event.remove( elem, type );

  							// This is a shortcut to avoid jQuery.event.remove's overhead
  							} else {
  								jQuery.removeEvent( elem, type, data.handle );
  							}
  						}
  					}

  					// Support: Chrome <=35 - 45+
  					// Assign undefined instead of using delete, see Data#remove
  					elem[ dataPriv.expando ] = undefined;
  				}
  				if ( elem[ dataUser.expando ] ) {

  					// Support: Chrome <=35 - 45+
  					// Assign undefined instead of using delete, see Data#remove
  					elem[ dataUser.expando ] = undefined;
  				}
  			}
  		}
  	}
  } );

  jQuery.fn.extend( {
  	detach: function( selector ) {
  		return remove( this, selector, true );
  	},

  	remove: function( selector ) {
  		return remove( this, selector );
  	},

  	text: function( value ) {
  		return access( this, function( value ) {
  			return value === undefined ?
  				jQuery.text( this ) :
  				this.empty().each( function() {
  					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
  						this.textContent = value;
  					}
  				} );
  		}, null, value, arguments.length );
  	},

  	append: function() {
  		return domManip( this, arguments, function( elem ) {
  			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
  				var target = manipulationTarget( this, elem );
  				target.appendChild( elem );
  			}
  		} );
  	},

  	prepend: function() {
  		return domManip( this, arguments, function( elem ) {
  			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
  				var target = manipulationTarget( this, elem );
  				target.insertBefore( elem, target.firstChild );
  			}
  		} );
  	},

  	before: function() {
  		return domManip( this, arguments, function( elem ) {
  			if ( this.parentNode ) {
  				this.parentNode.insertBefore( elem, this );
  			}
  		} );
  	},

  	after: function() {
  		return domManip( this, arguments, function( elem ) {
  			if ( this.parentNode ) {
  				this.parentNode.insertBefore( elem, this.nextSibling );
  			}
  		} );
  	},

  	empty: function() {
  		var elem,
  			i = 0;

  		for ( ; ( elem = this[ i ] ) != null; i++ ) {
  			if ( elem.nodeType === 1 ) {

  				// Prevent memory leaks
  				jQuery.cleanData( getAll( elem, false ) );

  				// Remove any remaining nodes
  				elem.textContent = "";
  			}
  		}

  		return this;
  	},

  	clone: function( dataAndEvents, deepDataAndEvents ) {
  		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
  		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

  		return this.map( function() {
  			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
  		} );
  	},

  	html: function( value ) {
  		return access( this, function( value ) {
  			var elem = this[ 0 ] || {},
  				i = 0,
  				l = this.length;

  			if ( value === undefined && elem.nodeType === 1 ) {
  				return elem.innerHTML;
  			}

  			// See if we can take a shortcut and just use innerHTML
  			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
  				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

  				value = jQuery.htmlPrefilter( value );

  				try {
  					for ( ; i < l; i++ ) {
  						elem = this[ i ] || {};

  						// Remove element nodes and prevent memory leaks
  						if ( elem.nodeType === 1 ) {
  							jQuery.cleanData( getAll( elem, false ) );
  							elem.innerHTML = value;
  						}
  					}

  					elem = 0;

  				// If using innerHTML throws an exception, use the fallback method
  				} catch ( e ) {}
  			}

  			if ( elem ) {
  				this.empty().append( value );
  			}
  		}, null, value, arguments.length );
  	},

  	replaceWith: function() {
  		var ignored = [];

  		// Make the changes, replacing each non-ignored context element with the new content
  		return domManip( this, arguments, function( elem ) {
  			var parent = this.parentNode;

  			if ( jQuery.inArray( this, ignored ) < 0 ) {
  				jQuery.cleanData( getAll( this ) );
  				if ( parent ) {
  					parent.replaceChild( elem, this );
  				}
  			}

  		// Force callback invocation
  		}, ignored );
  	}
  } );

  jQuery.each( {
  	appendTo: "append",
  	prependTo: "prepend",
  	insertBefore: "before",
  	insertAfter: "after",
  	replaceAll: "replaceWith"
  }, function( name, original ) {
  	jQuery.fn[ name ] = function( selector ) {
  		var elems,
  			ret = [],
  			insert = jQuery( selector ),
  			last = insert.length - 1,
  			i = 0;

  		for ( ; i <= last; i++ ) {
  			elems = i === last ? this : this.clone( true );
  			jQuery( insert[ i ] )[ original ]( elems );

  			// Support: Android <=4.0 only, PhantomJS 1 only
  			// .get() because push.apply(_, arraylike) throws on ancient WebKit
  			push.apply( ret, elems.get() );
  		}

  		return this.pushStack( ret );
  	};
  } );
  var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

  var getStyles = function( elem ) {

  		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
  		// IE throws on elements created in popups
  		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
  		var view = elem.ownerDocument.defaultView;

  		if ( !view || !view.opener ) {
  			view = window;
  		}

  		return view.getComputedStyle( elem );
  	};

  var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



  ( function() {

  	// Executing both pixelPosition & boxSizingReliable tests require only one layout
  	// so they're executed at the same time to save the second computation.
  	function computeStyleTests() {

  		// This is a singleton, we need to execute it only once
  		if ( !div ) {
  			return;
  		}

  		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
  			"margin-top:1px;padding:0;border:0";
  		div.style.cssText =
  			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
  			"margin:auto;border:1px;padding:1px;" +
  			"width:60%;top:1%";
  		documentElement.appendChild( container ).appendChild( div );

  		var divStyle = window.getComputedStyle( div );
  		pixelPositionVal = divStyle.top !== "1%";

  		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
  		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

  		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
  		// Some styles come back with percentage values, even though they shouldn't
  		div.style.right = "60%";
  		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

  		// Support: IE 9 - 11 only
  		// Detect misreporting of content dimensions for box-sizing:border-box elements
  		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

  		// Support: IE 9 only
  		// Detect overflow:scroll screwiness (gh-3699)
  		// Support: Chrome <=64
  		// Don't get tricked when zoom affects offsetWidth (gh-4029)
  		div.style.position = "absolute";
  		scrollboxSizeVal = roundPixelMeasures( div.offsetWidth / 3 ) === 12;

  		documentElement.removeChild( container );

  		// Nullify the div so it wouldn't be stored in the memory and
  		// it will also be a sign that checks already performed
  		div = null;
  	}

  	function roundPixelMeasures( measure ) {
  		return Math.round( parseFloat( measure ) );
  	}

  	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
  		reliableMarginLeftVal,
  		container = document.createElement( "div" ),
  		div = document.createElement( "div" );

  	// Finish early in limited (non-browser) environments
  	if ( !div.style ) {
  		return;
  	}

  	// Support: IE <=9 - 11 only
  	// Style of cloned element affects source element cloned (#8908)
  	div.style.backgroundClip = "content-box";
  	div.cloneNode( true ).style.backgroundClip = "";
  	support.clearCloneStyle = div.style.backgroundClip === "content-box";

  	jQuery.extend( support, {
  		boxSizingReliable: function() {
  			computeStyleTests();
  			return boxSizingReliableVal;
  		},
  		pixelBoxStyles: function() {
  			computeStyleTests();
  			return pixelBoxStylesVal;
  		},
  		pixelPosition: function() {
  			computeStyleTests();
  			return pixelPositionVal;
  		},
  		reliableMarginLeft: function() {
  			computeStyleTests();
  			return reliableMarginLeftVal;
  		},
  		scrollboxSize: function() {
  			computeStyleTests();
  			return scrollboxSizeVal;
  		}
  	} );
  } )();


  function curCSS( elem, name, computed ) {
  	var width, minWidth, maxWidth, ret,

  		// Support: Firefox 51+
  		// Retrieving style before computed somehow
  		// fixes an issue with getting wrong values
  		// on detached elements
  		style = elem.style;

  	computed = computed || getStyles( elem );

  	// getPropertyValue is needed for:
  	//   .css('filter') (IE 9 only, #12537)
  	//   .css('--customProperty) (#3144)
  	if ( computed ) {
  		ret = computed.getPropertyValue( name ) || computed[ name ];

  		if ( ret === "" && !isAttached( elem ) ) {
  			ret = jQuery.style( elem, name );
  		}

  		// A tribute to the "awesome hack by Dean Edwards"
  		// Android Browser returns percentage for some values,
  		// but width seems to be reliably pixels.
  		// This is against the CSSOM draft spec:
  		// https://drafts.csswg.org/cssom/#resolved-values
  		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

  			// Remember the original values
  			width = style.width;
  			minWidth = style.minWidth;
  			maxWidth = style.maxWidth;

  			// Put in the new values to get a computed value out
  			style.minWidth = style.maxWidth = style.width = ret;
  			ret = computed.width;

  			// Revert the changed values
  			style.width = width;
  			style.minWidth = minWidth;
  			style.maxWidth = maxWidth;
  		}
  	}

  	return ret !== undefined ?

  		// Support: IE <=9 - 11 only
  		// IE returns zIndex value as an integer.
  		ret + "" :
  		ret;
  }


  function addGetHookIf( conditionFn, hookFn ) {

  	// Define the hook, we'll check on the first run if it's really needed.
  	return {
  		get: function() {
  			if ( conditionFn() ) {

  				// Hook not needed (or it's not possible to use it due
  				// to missing dependency), remove it.
  				delete this.get;
  				return;
  			}

  			// Hook needed; redefine it so that the support test is not executed again.
  			return ( this.get = hookFn ).apply( this, arguments );
  		}
  	};
  }


  var cssPrefixes = [ "Webkit", "Moz", "ms" ],
  	emptyStyle = document.createElement( "div" ).style,
  	vendorProps = {};

  // Return a vendor-prefixed property or undefined
  function vendorPropName( name ) {

  	// Check for vendor prefixed names
  	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
  		i = cssPrefixes.length;

  	while ( i-- ) {
  		name = cssPrefixes[ i ] + capName;
  		if ( name in emptyStyle ) {
  			return name;
  		}
  	}
  }

  // Return a potentially-mapped jQuery.cssProps or vendor prefixed property
  function finalPropName( name ) {
  	var final = jQuery.cssProps[ name ] || vendorProps[ name ];

  	if ( final ) {
  		return final;
  	}
  	if ( name in emptyStyle ) {
  		return name;
  	}
  	return vendorProps[ name ] = vendorPropName( name ) || name;
  }


  var

  	// Swappable if display is none or starts with table
  	// except "table", "table-cell", or "table-caption"
  	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
  	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
  	rcustomProp = /^--/,
  	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
  	cssNormalTransform = {
  		letterSpacing: "0",
  		fontWeight: "400"
  	};

  function setPositiveNumber( elem, value, subtract ) {

  	// Any relative (+/-) values have already been
  	// normalized at this point
  	var matches = rcssNum.exec( value );
  	return matches ?

  		// Guard against undefined "subtract", e.g., when used as in cssHooks
  		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
  		value;
  }

  function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
  	var i = dimension === "width" ? 1 : 0,
  		extra = 0,
  		delta = 0;

  	// Adjustment may not be necessary
  	if ( box === ( isBorderBox ? "border" : "content" ) ) {
  		return 0;
  	}

  	for ( ; i < 4; i += 2 ) {

  		// Both box models exclude margin
  		if ( box === "margin" ) {
  			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
  		}

  		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
  		if ( !isBorderBox ) {

  			// Add padding
  			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

  			// For "border" or "margin", add border
  			if ( box !== "padding" ) {
  				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

  			// But still keep track of it otherwise
  			} else {
  				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
  			}

  		// If we get here with a border-box (content + padding + border), we're seeking "content" or
  		// "padding" or "margin"
  		} else {

  			// For "content", subtract padding
  			if ( box === "content" ) {
  				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
  			}

  			// For "content" or "padding", subtract border
  			if ( box !== "margin" ) {
  				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
  			}
  		}
  	}

  	// Account for positive content-box scroll gutter when requested by providing computedVal
  	if ( !isBorderBox && computedVal >= 0 ) {

  		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
  		// Assuming integer scroll gutter, subtract the rest and round down
  		delta += Math.max( 0, Math.ceil(
  			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
  			computedVal -
  			delta -
  			extra -
  			0.5

  		// If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
  		// Use an explicit zero to avoid NaN (gh-3964)
  		) ) || 0;
  	}

  	return delta;
  }

  function getWidthOrHeight( elem, dimension, extra ) {

  	// Start with computed style
  	var styles = getStyles( elem ),

  		// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-4322).
  		// Fake content-box until we know it's needed to know the true value.
  		boxSizingNeeded = !support.boxSizingReliable() || extra,
  		isBorderBox = boxSizingNeeded &&
  			jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
  		valueIsBorderBox = isBorderBox,

  		val = curCSS( elem, dimension, styles ),
  		offsetProp = "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 );

  	// Support: Firefox <=54
  	// Return a confounding non-pixel value or feign ignorance, as appropriate.
  	if ( rnumnonpx.test( val ) ) {
  		if ( !extra ) {
  			return val;
  		}
  		val = "auto";
  	}


  	// Fall back to offsetWidth/offsetHeight when value is "auto"
  	// This happens for inline elements with no explicit setting (gh-3571)
  	// Support: Android <=4.1 - 4.3 only
  	// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
  	// Support: IE 9-11 only
  	// Also use offsetWidth/offsetHeight for when box sizing is unreliable
  	// We use getClientRects() to check for hidden/disconnected.
  	// In those cases, the computed value can be trusted to be border-box
  	if ( ( !support.boxSizingReliable() && isBorderBox ||
  		val === "auto" ||
  		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) &&
  		elem.getClientRects().length ) {

  		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

  		// Where available, offsetWidth/offsetHeight approximate border box dimensions.
  		// Where not available (e.g., SVG), assume unreliable box-sizing and interpret the
  		// retrieved value as a content box dimension.
  		valueIsBorderBox = offsetProp in elem;
  		if ( valueIsBorderBox ) {
  			val = elem[ offsetProp ];
  		}
  	}

  	// Normalize "" and auto
  	val = parseFloat( val ) || 0;

  	// Adjust for the element's box model
  	return ( val +
  		boxModelAdjustment(
  			elem,
  			dimension,
  			extra || ( isBorderBox ? "border" : "content" ),
  			valueIsBorderBox,
  			styles,

  			// Provide the current computed size to request scroll gutter calculation (gh-3589)
  			val
  		)
  	) + "px";
  }

  jQuery.extend( {

  	// Add in style property hooks for overriding the default
  	// behavior of getting and setting a style property
  	cssHooks: {
  		opacity: {
  			get: function( elem, computed ) {
  				if ( computed ) {

  					// We should always get a number back from opacity
  					var ret = curCSS( elem, "opacity" );
  					return ret === "" ? "1" : ret;
  				}
  			}
  		}
  	},

  	// Don't automatically add "px" to these possibly-unitless properties
  	cssNumber: {
  		"animationIterationCount": true,
  		"columnCount": true,
  		"fillOpacity": true,
  		"flexGrow": true,
  		"flexShrink": true,
  		"fontWeight": true,
  		"gridArea": true,
  		"gridColumn": true,
  		"gridColumnEnd": true,
  		"gridColumnStart": true,
  		"gridRow": true,
  		"gridRowEnd": true,
  		"gridRowStart": true,
  		"lineHeight": true,
  		"opacity": true,
  		"order": true,
  		"orphans": true,
  		"widows": true,
  		"zIndex": true,
  		"zoom": true
  	},

  	// Add in properties whose names you wish to fix before
  	// setting or getting the value
  	cssProps: {},

  	// Get and set the style property on a DOM Node
  	style: function( elem, name, value, extra ) {

  		// Don't set styles on text and comment nodes
  		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
  			return;
  		}

  		// Make sure that we're working with the right name
  		var ret, type, hooks,
  			origName = camelCase( name ),
  			isCustomProp = rcustomProp.test( name ),
  			style = elem.style;

  		// Make sure that we're working with the right name. We don't
  		// want to query the value if it is a CSS custom property
  		// since they are user-defined.
  		if ( !isCustomProp ) {
  			name = finalPropName( origName );
  		}

  		// Gets hook for the prefixed version, then unprefixed version
  		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

  		// Check if we're setting a value
  		if ( value !== undefined ) {
  			type = typeof value;

  			// Convert "+=" or "-=" to relative numbers (#7345)
  			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
  				value = adjustCSS( elem, name, ret );

  				// Fixes bug #9237
  				type = "number";
  			}

  			// Make sure that null and NaN values aren't set (#7116)
  			if ( value == null || value !== value ) {
  				return;
  			}

  			// If a number was passed in, add the unit (except for certain CSS properties)
  			// The isCustomProp check can be removed in jQuery 4.0 when we only auto-append
  			// "px" to a few hardcoded values.
  			if ( type === "number" && !isCustomProp ) {
  				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
  			}

  			// background-* props affect original clone's values
  			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
  				style[ name ] = "inherit";
  			}

  			// If a hook was provided, use that value, otherwise just set the specified value
  			if ( !hooks || !( "set" in hooks ) ||
  				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

  				if ( isCustomProp ) {
  					style.setProperty( name, value );
  				} else {
  					style[ name ] = value;
  				}
  			}

  		} else {

  			// If a hook was provided get the non-computed value from there
  			if ( hooks && "get" in hooks &&
  				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

  				return ret;
  			}

  			// Otherwise just get the value from the style object
  			return style[ name ];
  		}
  	},

  	css: function( elem, name, extra, styles ) {
  		var val, num, hooks,
  			origName = camelCase( name ),
  			isCustomProp = rcustomProp.test( name );

  		// Make sure that we're working with the right name. We don't
  		// want to modify the value if it is a CSS custom property
  		// since they are user-defined.
  		if ( !isCustomProp ) {
  			name = finalPropName( origName );
  		}

  		// Try prefixed name followed by the unprefixed name
  		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

  		// If a hook was provided get the computed value from there
  		if ( hooks && "get" in hooks ) {
  			val = hooks.get( elem, true, extra );
  		}

  		// Otherwise, if a way to get the computed value exists, use that
  		if ( val === undefined ) {
  			val = curCSS( elem, name, styles );
  		}

  		// Convert "normal" to computed value
  		if ( val === "normal" && name in cssNormalTransform ) {
  			val = cssNormalTransform[ name ];
  		}

  		// Make numeric if forced or a qualifier was provided and val looks numeric
  		if ( extra === "" || extra ) {
  			num = parseFloat( val );
  			return extra === true || isFinite( num ) ? num || 0 : val;
  		}

  		return val;
  	}
  } );

  jQuery.each( [ "height", "width" ], function( i, dimension ) {
  	jQuery.cssHooks[ dimension ] = {
  		get: function( elem, computed, extra ) {
  			if ( computed ) {

  				// Certain elements can have dimension info if we invisibly show them
  				// but it must have a current display style that would benefit
  				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

  					// Support: Safari 8+
  					// Table columns in Safari have non-zero offsetWidth & zero
  					// getBoundingClientRect().width unless display is changed.
  					// Support: IE <=11 only
  					// Running getBoundingClientRect on a disconnected node
  					// in IE throws an error.
  					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
  						swap( elem, cssShow, function() {
  							return getWidthOrHeight( elem, dimension, extra );
  						} ) :
  						getWidthOrHeight( elem, dimension, extra );
  			}
  		},

  		set: function( elem, value, extra ) {
  			var matches,
  				styles = getStyles( elem ),

  				// Only read styles.position if the test has a chance to fail
  				// to avoid forcing a reflow.
  				scrollboxSizeBuggy = !support.scrollboxSize() &&
  					styles.position === "absolute",

  				// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-3991)
  				boxSizingNeeded = scrollboxSizeBuggy || extra,
  				isBorderBox = boxSizingNeeded &&
  					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
  				subtract = extra ?
  					boxModelAdjustment(
  						elem,
  						dimension,
  						extra,
  						isBorderBox,
  						styles
  					) :
  					0;

  			// Account for unreliable border-box dimensions by comparing offset* to computed and
  			// faking a content-box to get border and padding (gh-3699)
  			if ( isBorderBox && scrollboxSizeBuggy ) {
  				subtract -= Math.ceil(
  					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
  					parseFloat( styles[ dimension ] ) -
  					boxModelAdjustment( elem, dimension, "border", false, styles ) -
  					0.5
  				);
  			}

  			// Convert to pixels if value adjustment is needed
  			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
  				( matches[ 3 ] || "px" ) !== "px" ) {

  				elem.style[ dimension ] = value;
  				value = jQuery.css( elem, dimension );
  			}

  			return setPositiveNumber( elem, value, subtract );
  		}
  	};
  } );

  jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
  	function( elem, computed ) {
  		if ( computed ) {
  			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
  				elem.getBoundingClientRect().left -
  					swap( elem, { marginLeft: 0 }, function() {
  						return elem.getBoundingClientRect().left;
  					} )
  				) + "px";
  		}
  	}
  );

  // These hooks are used by animate to expand properties
  jQuery.each( {
  	margin: "",
  	padding: "",
  	border: "Width"
  }, function( prefix, suffix ) {
  	jQuery.cssHooks[ prefix + suffix ] = {
  		expand: function( value ) {
  			var i = 0,
  				expanded = {},

  				// Assumes a single number if not a string
  				parts = typeof value === "string" ? value.split( " " ) : [ value ];

  			for ( ; i < 4; i++ ) {
  				expanded[ prefix + cssExpand[ i ] + suffix ] =
  					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
  			}

  			return expanded;
  		}
  	};

  	if ( prefix !== "margin" ) {
  		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
  	}
  } );

  jQuery.fn.extend( {
  	css: function( name, value ) {
  		return access( this, function( elem, name, value ) {
  			var styles, len,
  				map = {},
  				i = 0;

  			if ( Array.isArray( name ) ) {
  				styles = getStyles( elem );
  				len = name.length;

  				for ( ; i < len; i++ ) {
  					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
  				}

  				return map;
  			}

  			return value !== undefined ?
  				jQuery.style( elem, name, value ) :
  				jQuery.css( elem, name );
  		}, name, value, arguments.length > 1 );
  	}
  } );


  function Tween( elem, options, prop, end, easing ) {
  	return new Tween.prototype.init( elem, options, prop, end, easing );
  }
  jQuery.Tween = Tween;

  Tween.prototype = {
  	constructor: Tween,
  	init: function( elem, options, prop, end, easing, unit ) {
  		this.elem = elem;
  		this.prop = prop;
  		this.easing = easing || jQuery.easing._default;
  		this.options = options;
  		this.start = this.now = this.cur();
  		this.end = end;
  		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
  	},
  	cur: function() {
  		var hooks = Tween.propHooks[ this.prop ];

  		return hooks && hooks.get ?
  			hooks.get( this ) :
  			Tween.propHooks._default.get( this );
  	},
  	run: function( percent ) {
  		var eased,
  			hooks = Tween.propHooks[ this.prop ];

  		if ( this.options.duration ) {
  			this.pos = eased = jQuery.easing[ this.easing ](
  				percent, this.options.duration * percent, 0, 1, this.options.duration
  			);
  		} else {
  			this.pos = eased = percent;
  		}
  		this.now = ( this.end - this.start ) * eased + this.start;

  		if ( this.options.step ) {
  			this.options.step.call( this.elem, this.now, this );
  		}

  		if ( hooks && hooks.set ) {
  			hooks.set( this );
  		} else {
  			Tween.propHooks._default.set( this );
  		}
  		return this;
  	}
  };

  Tween.prototype.init.prototype = Tween.prototype;

  Tween.propHooks = {
  	_default: {
  		get: function( tween ) {
  			var result;

  			// Use a property on the element directly when it is not a DOM element,
  			// or when there is no matching style property that exists.
  			if ( tween.elem.nodeType !== 1 ||
  				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
  				return tween.elem[ tween.prop ];
  			}

  			// Passing an empty string as a 3rd parameter to .css will automatically
  			// attempt a parseFloat and fallback to a string if the parse fails.
  			// Simple values such as "10px" are parsed to Float;
  			// complex values such as "rotate(1rad)" are returned as-is.
  			result = jQuery.css( tween.elem, tween.prop, "" );

  			// Empty strings, null, undefined and "auto" are converted to 0.
  			return !result || result === "auto" ? 0 : result;
  		},
  		set: function( tween ) {

  			// Use step hook for back compat.
  			// Use cssHook if its there.
  			// Use .style if available and use plain properties where available.
  			if ( jQuery.fx.step[ tween.prop ] ) {
  				jQuery.fx.step[ tween.prop ]( tween );
  			} else if ( tween.elem.nodeType === 1 && (
  					jQuery.cssHooks[ tween.prop ] ||
  					tween.elem.style[ finalPropName( tween.prop ) ] != null ) ) {
  				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
  			} else {
  				tween.elem[ tween.prop ] = tween.now;
  			}
  		}
  	}
  };

  // Support: IE <=9 only
  // Panic based approach to setting things on disconnected nodes
  Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
  	set: function( tween ) {
  		if ( tween.elem.nodeType && tween.elem.parentNode ) {
  			tween.elem[ tween.prop ] = tween.now;
  		}
  	}
  };

  jQuery.easing = {
  	linear: function( p ) {
  		return p;
  	},
  	swing: function( p ) {
  		return 0.5 - Math.cos( p * Math.PI ) / 2;
  	},
  	_default: "swing"
  };

  jQuery.fx = Tween.prototype.init;

  // Back compat <1.8 extension point
  jQuery.fx.step = {};




  var
  	fxNow, inProgress,
  	rfxtypes = /^(?:toggle|show|hide)$/,
  	rrun = /queueHooks$/;

  function schedule() {
  	if ( inProgress ) {
  		if ( document.hidden === false && window.requestAnimationFrame ) {
  			window.requestAnimationFrame( schedule );
  		} else {
  			window.setTimeout( schedule, jQuery.fx.interval );
  		}

  		jQuery.fx.tick();
  	}
  }

  // Animations created synchronously will run synchronously
  function createFxNow() {
  	window.setTimeout( function() {
  		fxNow = undefined;
  	} );
  	return ( fxNow = Date.now() );
  }

  // Generate parameters to create a standard animation
  function genFx( type, includeWidth ) {
  	var which,
  		i = 0,
  		attrs = { height: type };

  	// If we include width, step value is 1 to do all cssExpand values,
  	// otherwise step value is 2 to skip over Left and Right
  	includeWidth = includeWidth ? 1 : 0;
  	for ( ; i < 4; i += 2 - includeWidth ) {
  		which = cssExpand[ i ];
  		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
  	}

  	if ( includeWidth ) {
  		attrs.opacity = attrs.width = type;
  	}

  	return attrs;
  }

  function createTween( value, prop, animation ) {
  	var tween,
  		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
  		index = 0,
  		length = collection.length;
  	for ( ; index < length; index++ ) {
  		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

  			// We're done with this property
  			return tween;
  		}
  	}
  }

  function defaultPrefilter( elem, props, opts ) {
  	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
  		isBox = "width" in props || "height" in props,
  		anim = this,
  		orig = {},
  		style = elem.style,
  		hidden = elem.nodeType && isHiddenWithinTree( elem ),
  		dataShow = dataPriv.get( elem, "fxshow" );

  	// Queue-skipping animations hijack the fx hooks
  	if ( !opts.queue ) {
  		hooks = jQuery._queueHooks( elem, "fx" );
  		if ( hooks.unqueued == null ) {
  			hooks.unqueued = 0;
  			oldfire = hooks.empty.fire;
  			hooks.empty.fire = function() {
  				if ( !hooks.unqueued ) {
  					oldfire();
  				}
  			};
  		}
  		hooks.unqueued++;

  		anim.always( function() {

  			// Ensure the complete handler is called before this completes
  			anim.always( function() {
  				hooks.unqueued--;
  				if ( !jQuery.queue( elem, "fx" ).length ) {
  					hooks.empty.fire();
  				}
  			} );
  		} );
  	}

  	// Detect show/hide animations
  	for ( prop in props ) {
  		value = props[ prop ];
  		if ( rfxtypes.test( value ) ) {
  			delete props[ prop ];
  			toggle = toggle || value === "toggle";
  			if ( value === ( hidden ? "hide" : "show" ) ) {

  				// Pretend to be hidden if this is a "show" and
  				// there is still data from a stopped show/hide
  				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
  					hidden = true;

  				// Ignore all other no-op show/hide data
  				} else {
  					continue;
  				}
  			}
  			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
  		}
  	}

  	// Bail out if this is a no-op like .hide().hide()
  	propTween = !jQuery.isEmptyObject( props );
  	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
  		return;
  	}

  	// Restrict "overflow" and "display" styles during box animations
  	if ( isBox && elem.nodeType === 1 ) {

  		// Support: IE <=9 - 11, Edge 12 - 15
  		// Record all 3 overflow attributes because IE does not infer the shorthand
  		// from identically-valued overflowX and overflowY and Edge just mirrors
  		// the overflowX value there.
  		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

  		// Identify a display type, preferring old show/hide data over the CSS cascade
  		restoreDisplay = dataShow && dataShow.display;
  		if ( restoreDisplay == null ) {
  			restoreDisplay = dataPriv.get( elem, "display" );
  		}
  		display = jQuery.css( elem, "display" );
  		if ( display === "none" ) {
  			if ( restoreDisplay ) {
  				display = restoreDisplay;
  			} else {

  				// Get nonempty value(s) by temporarily forcing visibility
  				showHide( [ elem ], true );
  				restoreDisplay = elem.style.display || restoreDisplay;
  				display = jQuery.css( elem, "display" );
  				showHide( [ elem ] );
  			}
  		}

  		// Animate inline elements as inline-block
  		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
  			if ( jQuery.css( elem, "float" ) === "none" ) {

  				// Restore the original display value at the end of pure show/hide animations
  				if ( !propTween ) {
  					anim.done( function() {
  						style.display = restoreDisplay;
  					} );
  					if ( restoreDisplay == null ) {
  						display = style.display;
  						restoreDisplay = display === "none" ? "" : display;
  					}
  				}
  				style.display = "inline-block";
  			}
  		}
  	}

  	if ( opts.overflow ) {
  		style.overflow = "hidden";
  		anim.always( function() {
  			style.overflow = opts.overflow[ 0 ];
  			style.overflowX = opts.overflow[ 1 ];
  			style.overflowY = opts.overflow[ 2 ];
  		} );
  	}

  	// Implement show/hide animations
  	propTween = false;
  	for ( prop in orig ) {

  		// General show/hide setup for this element animation
  		if ( !propTween ) {
  			if ( dataShow ) {
  				if ( "hidden" in dataShow ) {
  					hidden = dataShow.hidden;
  				}
  			} else {
  				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
  			}

  			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
  			if ( toggle ) {
  				dataShow.hidden = !hidden;
  			}

  			// Show elements before animating them
  			if ( hidden ) {
  				showHide( [ elem ], true );
  			}

  			/* eslint-disable no-loop-func */

  			anim.done( function() {

  			/* eslint-enable no-loop-func */

  				// The final step of a "hide" animation is actually hiding the element
  				if ( !hidden ) {
  					showHide( [ elem ] );
  				}
  				dataPriv.remove( elem, "fxshow" );
  				for ( prop in orig ) {
  					jQuery.style( elem, prop, orig[ prop ] );
  				}
  			} );
  		}

  		// Per-property setup
  		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
  		if ( !( prop in dataShow ) ) {
  			dataShow[ prop ] = propTween.start;
  			if ( hidden ) {
  				propTween.end = propTween.start;
  				propTween.start = 0;
  			}
  		}
  	}
  }

  function propFilter( props, specialEasing ) {
  	var index, name, easing, value, hooks;

  	// camelCase, specialEasing and expand cssHook pass
  	for ( index in props ) {
  		name = camelCase( index );
  		easing = specialEasing[ name ];
  		value = props[ index ];
  		if ( Array.isArray( value ) ) {
  			easing = value[ 1 ];
  			value = props[ index ] = value[ 0 ];
  		}

  		if ( index !== name ) {
  			props[ name ] = value;
  			delete props[ index ];
  		}

  		hooks = jQuery.cssHooks[ name ];
  		if ( hooks && "expand" in hooks ) {
  			value = hooks.expand( value );
  			delete props[ name ];

  			// Not quite $.extend, this won't overwrite existing keys.
  			// Reusing 'index' because we have the correct "name"
  			for ( index in value ) {
  				if ( !( index in props ) ) {
  					props[ index ] = value[ index ];
  					specialEasing[ index ] = easing;
  				}
  			}
  		} else {
  			specialEasing[ name ] = easing;
  		}
  	}
  }

  function Animation( elem, properties, options ) {
  	var result,
  		stopped,
  		index = 0,
  		length = Animation.prefilters.length,
  		deferred = jQuery.Deferred().always( function() {

  			// Don't match elem in the :animated selector
  			delete tick.elem;
  		} ),
  		tick = function() {
  			if ( stopped ) {
  				return false;
  			}
  			var currentTime = fxNow || createFxNow(),
  				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

  				// Support: Android 2.3 only
  				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
  				temp = remaining / animation.duration || 0,
  				percent = 1 - temp,
  				index = 0,
  				length = animation.tweens.length;

  			for ( ; index < length; index++ ) {
  				animation.tweens[ index ].run( percent );
  			}

  			deferred.notifyWith( elem, [ animation, percent, remaining ] );

  			// If there's more to do, yield
  			if ( percent < 1 && length ) {
  				return remaining;
  			}

  			// If this was an empty animation, synthesize a final progress notification
  			if ( !length ) {
  				deferred.notifyWith( elem, [ animation, 1, 0 ] );
  			}

  			// Resolve the animation and report its conclusion
  			deferred.resolveWith( elem, [ animation ] );
  			return false;
  		},
  		animation = deferred.promise( {
  			elem: elem,
  			props: jQuery.extend( {}, properties ),
  			opts: jQuery.extend( true, {
  				specialEasing: {},
  				easing: jQuery.easing._default
  			}, options ),
  			originalProperties: properties,
  			originalOptions: options,
  			startTime: fxNow || createFxNow(),
  			duration: options.duration,
  			tweens: [],
  			createTween: function( prop, end ) {
  				var tween = jQuery.Tween( elem, animation.opts, prop, end,
  						animation.opts.specialEasing[ prop ] || animation.opts.easing );
  				animation.tweens.push( tween );
  				return tween;
  			},
  			stop: function( gotoEnd ) {
  				var index = 0,

  					// If we are going to the end, we want to run all the tweens
  					// otherwise we skip this part
  					length = gotoEnd ? animation.tweens.length : 0;
  				if ( stopped ) {
  					return this;
  				}
  				stopped = true;
  				for ( ; index < length; index++ ) {
  					animation.tweens[ index ].run( 1 );
  				}

  				// Resolve when we played the last frame; otherwise, reject
  				if ( gotoEnd ) {
  					deferred.notifyWith( elem, [ animation, 1, 0 ] );
  					deferred.resolveWith( elem, [ animation, gotoEnd ] );
  				} else {
  					deferred.rejectWith( elem, [ animation, gotoEnd ] );
  				}
  				return this;
  			}
  		} ),
  		props = animation.props;

  	propFilter( props, animation.opts.specialEasing );

  	for ( ; index < length; index++ ) {
  		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
  		if ( result ) {
  			if ( isFunction( result.stop ) ) {
  				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
  					result.stop.bind( result );
  			}
  			return result;
  		}
  	}

  	jQuery.map( props, createTween, animation );

  	if ( isFunction( animation.opts.start ) ) {
  		animation.opts.start.call( elem, animation );
  	}

  	// Attach callbacks from options
  	animation
  		.progress( animation.opts.progress )
  		.done( animation.opts.done, animation.opts.complete )
  		.fail( animation.opts.fail )
  		.always( animation.opts.always );

  	jQuery.fx.timer(
  		jQuery.extend( tick, {
  			elem: elem,
  			anim: animation,
  			queue: animation.opts.queue
  		} )
  	);

  	return animation;
  }

  jQuery.Animation = jQuery.extend( Animation, {

  	tweeners: {
  		"*": [ function( prop, value ) {
  			var tween = this.createTween( prop, value );
  			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
  			return tween;
  		} ]
  	},

  	tweener: function( props, callback ) {
  		if ( isFunction( props ) ) {
  			callback = props;
  			props = [ "*" ];
  		} else {
  			props = props.match( rnothtmlwhite );
  		}

  		var prop,
  			index = 0,
  			length = props.length;

  		for ( ; index < length; index++ ) {
  			prop = props[ index ];
  			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
  			Animation.tweeners[ prop ].unshift( callback );
  		}
  	},

  	prefilters: [ defaultPrefilter ],

  	prefilter: function( callback, prepend ) {
  		if ( prepend ) {
  			Animation.prefilters.unshift( callback );
  		} else {
  			Animation.prefilters.push( callback );
  		}
  	}
  } );

  jQuery.speed = function( speed, easing, fn ) {
  	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
  		complete: fn || !fn && easing ||
  			isFunction( speed ) && speed,
  		duration: speed,
  		easing: fn && easing || easing && !isFunction( easing ) && easing
  	};

  	// Go to the end state if fx are off
  	if ( jQuery.fx.off ) {
  		opt.duration = 0;

  	} else {
  		if ( typeof opt.duration !== "number" ) {
  			if ( opt.duration in jQuery.fx.speeds ) {
  				opt.duration = jQuery.fx.speeds[ opt.duration ];

  			} else {
  				opt.duration = jQuery.fx.speeds._default;
  			}
  		}
  	}

  	// Normalize opt.queue - true/undefined/null -> "fx"
  	if ( opt.queue == null || opt.queue === true ) {
  		opt.queue = "fx";
  	}

  	// Queueing
  	opt.old = opt.complete;

  	opt.complete = function() {
  		if ( isFunction( opt.old ) ) {
  			opt.old.call( this );
  		}

  		if ( opt.queue ) {
  			jQuery.dequeue( this, opt.queue );
  		}
  	};

  	return opt;
  };

  jQuery.fn.extend( {
  	fadeTo: function( speed, to, easing, callback ) {

  		// Show any hidden elements after setting opacity to 0
  		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

  			// Animate to the value specified
  			.end().animate( { opacity: to }, speed, easing, callback );
  	},
  	animate: function( prop, speed, easing, callback ) {
  		var empty = jQuery.isEmptyObject( prop ),
  			optall = jQuery.speed( speed, easing, callback ),
  			doAnimation = function() {

  				// Operate on a copy of prop so per-property easing won't be lost
  				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

  				// Empty animations, or finishing resolves immediately
  				if ( empty || dataPriv.get( this, "finish" ) ) {
  					anim.stop( true );
  				}
  			};
  			doAnimation.finish = doAnimation;

  		return empty || optall.queue === false ?
  			this.each( doAnimation ) :
  			this.queue( optall.queue, doAnimation );
  	},
  	stop: function( type, clearQueue, gotoEnd ) {
  		var stopQueue = function( hooks ) {
  			var stop = hooks.stop;
  			delete hooks.stop;
  			stop( gotoEnd );
  		};

  		if ( typeof type !== "string" ) {
  			gotoEnd = clearQueue;
  			clearQueue = type;
  			type = undefined;
  		}
  		if ( clearQueue && type !== false ) {
  			this.queue( type || "fx", [] );
  		}

  		return this.each( function() {
  			var dequeue = true,
  				index = type != null && type + "queueHooks",
  				timers = jQuery.timers,
  				data = dataPriv.get( this );

  			if ( index ) {
  				if ( data[ index ] && data[ index ].stop ) {
  					stopQueue( data[ index ] );
  				}
  			} else {
  				for ( index in data ) {
  					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
  						stopQueue( data[ index ] );
  					}
  				}
  			}

  			for ( index = timers.length; index--; ) {
  				if ( timers[ index ].elem === this &&
  					( type == null || timers[ index ].queue === type ) ) {

  					timers[ index ].anim.stop( gotoEnd );
  					dequeue = false;
  					timers.splice( index, 1 );
  				}
  			}

  			// Start the next in the queue if the last step wasn't forced.
  			// Timers currently will call their complete callbacks, which
  			// will dequeue but only if they were gotoEnd.
  			if ( dequeue || !gotoEnd ) {
  				jQuery.dequeue( this, type );
  			}
  		} );
  	},
  	finish: function( type ) {
  		if ( type !== false ) {
  			type = type || "fx";
  		}
  		return this.each( function() {
  			var index,
  				data = dataPriv.get( this ),
  				queue = data[ type + "queue" ],
  				hooks = data[ type + "queueHooks" ],
  				timers = jQuery.timers,
  				length = queue ? queue.length : 0;

  			// Enable finishing flag on private data
  			data.finish = true;

  			// Empty the queue first
  			jQuery.queue( this, type, [] );

  			if ( hooks && hooks.stop ) {
  				hooks.stop.call( this, true );
  			}

  			// Look for any active animations, and finish them
  			for ( index = timers.length; index--; ) {
  				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
  					timers[ index ].anim.stop( true );
  					timers.splice( index, 1 );
  				}
  			}

  			// Look for any animations in the old queue and finish them
  			for ( index = 0; index < length; index++ ) {
  				if ( queue[ index ] && queue[ index ].finish ) {
  					queue[ index ].finish.call( this );
  				}
  			}

  			// Turn off finishing flag
  			delete data.finish;
  		} );
  	}
  } );

  jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
  	var cssFn = jQuery.fn[ name ];
  	jQuery.fn[ name ] = function( speed, easing, callback ) {
  		return speed == null || typeof speed === "boolean" ?
  			cssFn.apply( this, arguments ) :
  			this.animate( genFx( name, true ), speed, easing, callback );
  	};
  } );

  // Generate shortcuts for custom animations
  jQuery.each( {
  	slideDown: genFx( "show" ),
  	slideUp: genFx( "hide" ),
  	slideToggle: genFx( "toggle" ),
  	fadeIn: { opacity: "show" },
  	fadeOut: { opacity: "hide" },
  	fadeToggle: { opacity: "toggle" }
  }, function( name, props ) {
  	jQuery.fn[ name ] = function( speed, easing, callback ) {
  		return this.animate( props, speed, easing, callback );
  	};
  } );

  jQuery.timers = [];
  jQuery.fx.tick = function() {
  	var timer,
  		i = 0,
  		timers = jQuery.timers;

  	fxNow = Date.now();

  	for ( ; i < timers.length; i++ ) {
  		timer = timers[ i ];

  		// Run the timer and safely remove it when done (allowing for external removal)
  		if ( !timer() && timers[ i ] === timer ) {
  			timers.splice( i--, 1 );
  		}
  	}

  	if ( !timers.length ) {
  		jQuery.fx.stop();
  	}
  	fxNow = undefined;
  };

  jQuery.fx.timer = function( timer ) {
  	jQuery.timers.push( timer );
  	jQuery.fx.start();
  };

  jQuery.fx.interval = 13;
  jQuery.fx.start = function() {
  	if ( inProgress ) {
  		return;
  	}

  	inProgress = true;
  	schedule();
  };

  jQuery.fx.stop = function() {
  	inProgress = null;
  };

  jQuery.fx.speeds = {
  	slow: 600,
  	fast: 200,

  	// Default speed
  	_default: 400
  };


  // Based off of the plugin by Clint Helfers, with permission.
  // https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
  jQuery.fn.delay = function( time, type ) {
  	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
  	type = type || "fx";

  	return this.queue( type, function( next, hooks ) {
  		var timeout = window.setTimeout( next, time );
  		hooks.stop = function() {
  			window.clearTimeout( timeout );
  		};
  	} );
  };


  ( function() {
  	var input = document.createElement( "input" ),
  		select = document.createElement( "select" ),
  		opt = select.appendChild( document.createElement( "option" ) );

  	input.type = "checkbox";

  	// Support: Android <=4.3 only
  	// Default value for a checkbox should be "on"
  	support.checkOn = input.value !== "";

  	// Support: IE <=11 only
  	// Must access selectedIndex to make default options select
  	support.optSelected = opt.selected;

  	// Support: IE <=11 only
  	// An input loses its value after becoming a radio
  	input = document.createElement( "input" );
  	input.value = "t";
  	input.type = "radio";
  	support.radioValue = input.value === "t";
  } )();


  var boolHook,
  	attrHandle = jQuery.expr.attrHandle;

  jQuery.fn.extend( {
  	attr: function( name, value ) {
  		return access( this, jQuery.attr, name, value, arguments.length > 1 );
  	},

  	removeAttr: function( name ) {
  		return this.each( function() {
  			jQuery.removeAttr( this, name );
  		} );
  	}
  } );

  jQuery.extend( {
  	attr: function( elem, name, value ) {
  		var ret, hooks,
  			nType = elem.nodeType;

  		// Don't get/set attributes on text, comment and attribute nodes
  		if ( nType === 3 || nType === 8 || nType === 2 ) {
  			return;
  		}

  		// Fallback to prop when attributes are not supported
  		if ( typeof elem.getAttribute === "undefined" ) {
  			return jQuery.prop( elem, name, value );
  		}

  		// Attribute hooks are determined by the lowercase version
  		// Grab necessary hook if one is defined
  		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
  			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
  				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
  		}

  		if ( value !== undefined ) {
  			if ( value === null ) {
  				jQuery.removeAttr( elem, name );
  				return;
  			}

  			if ( hooks && "set" in hooks &&
  				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
  				return ret;
  			}

  			elem.setAttribute( name, value + "" );
  			return value;
  		}

  		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
  			return ret;
  		}

  		ret = jQuery.find.attr( elem, name );

  		// Non-existent attributes return null, we normalize to undefined
  		return ret == null ? undefined : ret;
  	},

  	attrHooks: {
  		type: {
  			set: function( elem, value ) {
  				if ( !support.radioValue && value === "radio" &&
  					nodeName( elem, "input" ) ) {
  					var val = elem.value;
  					elem.setAttribute( "type", value );
  					if ( val ) {
  						elem.value = val;
  					}
  					return value;
  				}
  			}
  		}
  	},

  	removeAttr: function( elem, value ) {
  		var name,
  			i = 0,

  			// Attribute names can contain non-HTML whitespace characters
  			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
  			attrNames = value && value.match( rnothtmlwhite );

  		if ( attrNames && elem.nodeType === 1 ) {
  			while ( ( name = attrNames[ i++ ] ) ) {
  				elem.removeAttribute( name );
  			}
  		}
  	}
  } );

  // Hooks for boolean attributes
  boolHook = {
  	set: function( elem, value, name ) {
  		if ( value === false ) {

  			// Remove boolean attributes when set to false
  			jQuery.removeAttr( elem, name );
  		} else {
  			elem.setAttribute( name, name );
  		}
  		return name;
  	}
  };

  jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
  	var getter = attrHandle[ name ] || jQuery.find.attr;

  	attrHandle[ name ] = function( elem, name, isXML ) {
  		var ret, handle,
  			lowercaseName = name.toLowerCase();

  		if ( !isXML ) {

  			// Avoid an infinite loop by temporarily removing this function from the getter
  			handle = attrHandle[ lowercaseName ];
  			attrHandle[ lowercaseName ] = ret;
  			ret = getter( elem, name, isXML ) != null ?
  				lowercaseName :
  				null;
  			attrHandle[ lowercaseName ] = handle;
  		}
  		return ret;
  	};
  } );




  var rfocusable = /^(?:input|select|textarea|button)$/i,
  	rclickable = /^(?:a|area)$/i;

  jQuery.fn.extend( {
  	prop: function( name, value ) {
  		return access( this, jQuery.prop, name, value, arguments.length > 1 );
  	},

  	removeProp: function( name ) {
  		return this.each( function() {
  			delete this[ jQuery.propFix[ name ] || name ];
  		} );
  	}
  } );

  jQuery.extend( {
  	prop: function( elem, name, value ) {
  		var ret, hooks,
  			nType = elem.nodeType;

  		// Don't get/set properties on text, comment and attribute nodes
  		if ( nType === 3 || nType === 8 || nType === 2 ) {
  			return;
  		}

  		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

  			// Fix name and attach hooks
  			name = jQuery.propFix[ name ] || name;
  			hooks = jQuery.propHooks[ name ];
  		}

  		if ( value !== undefined ) {
  			if ( hooks && "set" in hooks &&
  				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
  				return ret;
  			}

  			return ( elem[ name ] = value );
  		}

  		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
  			return ret;
  		}

  		return elem[ name ];
  	},

  	propHooks: {
  		tabIndex: {
  			get: function( elem ) {

  				// Support: IE <=9 - 11 only
  				// elem.tabIndex doesn't always return the
  				// correct value when it hasn't been explicitly set
  				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
  				// Use proper attribute retrieval(#12072)
  				var tabindex = jQuery.find.attr( elem, "tabindex" );

  				if ( tabindex ) {
  					return parseInt( tabindex, 10 );
  				}

  				if (
  					rfocusable.test( elem.nodeName ) ||
  					rclickable.test( elem.nodeName ) &&
  					elem.href
  				) {
  					return 0;
  				}

  				return -1;
  			}
  		}
  	},

  	propFix: {
  		"for": "htmlFor",
  		"class": "className"
  	}
  } );

  // Support: IE <=11 only
  // Accessing the selectedIndex property
  // forces the browser to respect setting selected
  // on the option
  // The getter ensures a default option is selected
  // when in an optgroup
  // eslint rule "no-unused-expressions" is disabled for this code
  // since it considers such accessions noop
  if ( !support.optSelected ) {
  	jQuery.propHooks.selected = {
  		get: function( elem ) {

  			/* eslint no-unused-expressions: "off" */

  			var parent = elem.parentNode;
  			if ( parent && parent.parentNode ) {
  				parent.parentNode.selectedIndex;
  			}
  			return null;
  		},
  		set: function( elem ) {

  			/* eslint no-unused-expressions: "off" */

  			var parent = elem.parentNode;
  			if ( parent ) {
  				parent.selectedIndex;

  				if ( parent.parentNode ) {
  					parent.parentNode.selectedIndex;
  				}
  			}
  		}
  	};
  }

  jQuery.each( [
  	"tabIndex",
  	"readOnly",
  	"maxLength",
  	"cellSpacing",
  	"cellPadding",
  	"rowSpan",
  	"colSpan",
  	"useMap",
  	"frameBorder",
  	"contentEditable"
  ], function() {
  	jQuery.propFix[ this.toLowerCase() ] = this;
  } );




  	// Strip and collapse whitespace according to HTML spec
  	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
  	function stripAndCollapse( value ) {
  		var tokens = value.match( rnothtmlwhite ) || [];
  		return tokens.join( " " );
  	}


  function getClass( elem ) {
  	return elem.getAttribute && elem.getAttribute( "class" ) || "";
  }

  function classesToArray( value ) {
  	if ( Array.isArray( value ) ) {
  		return value;
  	}
  	if ( typeof value === "string" ) {
  		return value.match( rnothtmlwhite ) || [];
  	}
  	return [];
  }

  jQuery.fn.extend( {
  	addClass: function( value ) {
  		var classes, elem, cur, curValue, clazz, j, finalValue,
  			i = 0;

  		if ( isFunction( value ) ) {
  			return this.each( function( j ) {
  				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
  			} );
  		}

  		classes = classesToArray( value );

  		if ( classes.length ) {
  			while ( ( elem = this[ i++ ] ) ) {
  				curValue = getClass( elem );
  				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

  				if ( cur ) {
  					j = 0;
  					while ( ( clazz = classes[ j++ ] ) ) {
  						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
  							cur += clazz + " ";
  						}
  					}

  					// Only assign if different to avoid unneeded rendering.
  					finalValue = stripAndCollapse( cur );
  					if ( curValue !== finalValue ) {
  						elem.setAttribute( "class", finalValue );
  					}
  				}
  			}
  		}

  		return this;
  	},

  	removeClass: function( value ) {
  		var classes, elem, cur, curValue, clazz, j, finalValue,
  			i = 0;

  		if ( isFunction( value ) ) {
  			return this.each( function( j ) {
  				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
  			} );
  		}

  		if ( !arguments.length ) {
  			return this.attr( "class", "" );
  		}

  		classes = classesToArray( value );

  		if ( classes.length ) {
  			while ( ( elem = this[ i++ ] ) ) {
  				curValue = getClass( elem );

  				// This expression is here for better compressibility (see addClass)
  				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

  				if ( cur ) {
  					j = 0;
  					while ( ( clazz = classes[ j++ ] ) ) {

  						// Remove *all* instances
  						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
  							cur = cur.replace( " " + clazz + " ", " " );
  						}
  					}

  					// Only assign if different to avoid unneeded rendering.
  					finalValue = stripAndCollapse( cur );
  					if ( curValue !== finalValue ) {
  						elem.setAttribute( "class", finalValue );
  					}
  				}
  			}
  		}

  		return this;
  	},

  	toggleClass: function( value, stateVal ) {
  		var type = typeof value,
  			isValidValue = type === "string" || Array.isArray( value );

  		if ( typeof stateVal === "boolean" && isValidValue ) {
  			return stateVal ? this.addClass( value ) : this.removeClass( value );
  		}

  		if ( isFunction( value ) ) {
  			return this.each( function( i ) {
  				jQuery( this ).toggleClass(
  					value.call( this, i, getClass( this ), stateVal ),
  					stateVal
  				);
  			} );
  		}

  		return this.each( function() {
  			var className, i, self, classNames;

  			if ( isValidValue ) {

  				// Toggle individual class names
  				i = 0;
  				self = jQuery( this );
  				classNames = classesToArray( value );

  				while ( ( className = classNames[ i++ ] ) ) {

  					// Check each className given, space separated list
  					if ( self.hasClass( className ) ) {
  						self.removeClass( className );
  					} else {
  						self.addClass( className );
  					}
  				}

  			// Toggle whole class name
  			} else if ( value === undefined || type === "boolean" ) {
  				className = getClass( this );
  				if ( className ) {

  					// Store className if set
  					dataPriv.set( this, "__className__", className );
  				}

  				// If the element has a class name or if we're passed `false`,
  				// then remove the whole classname (if there was one, the above saved it).
  				// Otherwise bring back whatever was previously saved (if anything),
  				// falling back to the empty string if nothing was stored.
  				if ( this.setAttribute ) {
  					this.setAttribute( "class",
  						className || value === false ?
  						"" :
  						dataPriv.get( this, "__className__" ) || ""
  					);
  				}
  			}
  		} );
  	},

  	hasClass: function( selector ) {
  		var className, elem,
  			i = 0;

  		className = " " + selector + " ";
  		while ( ( elem = this[ i++ ] ) ) {
  			if ( elem.nodeType === 1 &&
  				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
  					return true;
  			}
  		}

  		return false;
  	}
  } );




  var rreturn = /\r/g;

  jQuery.fn.extend( {
  	val: function( value ) {
  		var hooks, ret, valueIsFunction,
  			elem = this[ 0 ];

  		if ( !arguments.length ) {
  			if ( elem ) {
  				hooks = jQuery.valHooks[ elem.type ] ||
  					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

  				if ( hooks &&
  					"get" in hooks &&
  					( ret = hooks.get( elem, "value" ) ) !== undefined
  				) {
  					return ret;
  				}

  				ret = elem.value;

  				// Handle most common string cases
  				if ( typeof ret === "string" ) {
  					return ret.replace( rreturn, "" );
  				}

  				// Handle cases where value is null/undef or number
  				return ret == null ? "" : ret;
  			}

  			return;
  		}

  		valueIsFunction = isFunction( value );

  		return this.each( function( i ) {
  			var val;

  			if ( this.nodeType !== 1 ) {
  				return;
  			}

  			if ( valueIsFunction ) {
  				val = value.call( this, i, jQuery( this ).val() );
  			} else {
  				val = value;
  			}

  			// Treat null/undefined as ""; convert numbers to string
  			if ( val == null ) {
  				val = "";

  			} else if ( typeof val === "number" ) {
  				val += "";

  			} else if ( Array.isArray( val ) ) {
  				val = jQuery.map( val, function( value ) {
  					return value == null ? "" : value + "";
  				} );
  			}

  			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

  			// If set returns undefined, fall back to normal setting
  			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
  				this.value = val;
  			}
  		} );
  	}
  } );

  jQuery.extend( {
  	valHooks: {
  		option: {
  			get: function( elem ) {

  				var val = jQuery.find.attr( elem, "value" );
  				return val != null ?
  					val :

  					// Support: IE <=10 - 11 only
  					// option.text throws exceptions (#14686, #14858)
  					// Strip and collapse whitespace
  					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
  					stripAndCollapse( jQuery.text( elem ) );
  			}
  		},
  		select: {
  			get: function( elem ) {
  				var value, option, i,
  					options = elem.options,
  					index = elem.selectedIndex,
  					one = elem.type === "select-one",
  					values = one ? null : [],
  					max = one ? index + 1 : options.length;

  				if ( index < 0 ) {
  					i = max;

  				} else {
  					i = one ? index : 0;
  				}

  				// Loop through all the selected options
  				for ( ; i < max; i++ ) {
  					option = options[ i ];

  					// Support: IE <=9 only
  					// IE8-9 doesn't update selected after form reset (#2551)
  					if ( ( option.selected || i === index ) &&

  							// Don't return options that are disabled or in a disabled optgroup
  							!option.disabled &&
  							( !option.parentNode.disabled ||
  								!nodeName( option.parentNode, "optgroup" ) ) ) {

  						// Get the specific value for the option
  						value = jQuery( option ).val();

  						// We don't need an array for one selects
  						if ( one ) {
  							return value;
  						}

  						// Multi-Selects return an array
  						values.push( value );
  					}
  				}

  				return values;
  			},

  			set: function( elem, value ) {
  				var optionSet, option,
  					options = elem.options,
  					values = jQuery.makeArray( value ),
  					i = options.length;

  				while ( i-- ) {
  					option = options[ i ];

  					/* eslint-disable no-cond-assign */

  					if ( option.selected =
  						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
  					) {
  						optionSet = true;
  					}

  					/* eslint-enable no-cond-assign */
  				}

  				// Force browsers to behave consistently when non-matching value is set
  				if ( !optionSet ) {
  					elem.selectedIndex = -1;
  				}
  				return values;
  			}
  		}
  	}
  } );

  // Radios and checkboxes getter/setter
  jQuery.each( [ "radio", "checkbox" ], function() {
  	jQuery.valHooks[ this ] = {
  		set: function( elem, value ) {
  			if ( Array.isArray( value ) ) {
  				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
  			}
  		}
  	};
  	if ( !support.checkOn ) {
  		jQuery.valHooks[ this ].get = function( elem ) {
  			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
  		};
  	}
  } );




  // Return jQuery for attributes-only inclusion


  support.focusin = "onfocusin" in window;


  var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
  	stopPropagationCallback = function( e ) {
  		e.stopPropagation();
  	};

  jQuery.extend( jQuery.event, {

  	trigger: function( event, data, elem, onlyHandlers ) {

  		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
  			eventPath = [ elem || document ],
  			type = hasOwn.call( event, "type" ) ? event.type : event,
  			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

  		cur = lastElement = tmp = elem = elem || document;

  		// Don't do events on text and comment nodes
  		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
  			return;
  		}

  		// focus/blur morphs to focusin/out; ensure we're not firing them right now
  		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
  			return;
  		}

  		if ( type.indexOf( "." ) > -1 ) {

  			// Namespaced trigger; create a regexp to match event type in handle()
  			namespaces = type.split( "." );
  			type = namespaces.shift();
  			namespaces.sort();
  		}
  		ontype = type.indexOf( ":" ) < 0 && "on" + type;

  		// Caller can pass in a jQuery.Event object, Object, or just an event type string
  		event = event[ jQuery.expando ] ?
  			event :
  			new jQuery.Event( type, typeof event === "object" && event );

  		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
  		event.isTrigger = onlyHandlers ? 2 : 3;
  		event.namespace = namespaces.join( "." );
  		event.rnamespace = event.namespace ?
  			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
  			null;

  		// Clean up the event in case it is being reused
  		event.result = undefined;
  		if ( !event.target ) {
  			event.target = elem;
  		}

  		// Clone any incoming data and prepend the event, creating the handler arg list
  		data = data == null ?
  			[ event ] :
  			jQuery.makeArray( data, [ event ] );

  		// Allow special events to draw outside the lines
  		special = jQuery.event.special[ type ] || {};
  		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
  			return;
  		}

  		// Determine event propagation path in advance, per W3C events spec (#9951)
  		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
  		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

  			bubbleType = special.delegateType || type;
  			if ( !rfocusMorph.test( bubbleType + type ) ) {
  				cur = cur.parentNode;
  			}
  			for ( ; cur; cur = cur.parentNode ) {
  				eventPath.push( cur );
  				tmp = cur;
  			}

  			// Only add window if we got to document (e.g., not plain obj or detached DOM)
  			if ( tmp === ( elem.ownerDocument || document ) ) {
  				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
  			}
  		}

  		// Fire handlers on the event path
  		i = 0;
  		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
  			lastElement = cur;
  			event.type = i > 1 ?
  				bubbleType :
  				special.bindType || type;

  			// jQuery handler
  			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
  				dataPriv.get( cur, "handle" );
  			if ( handle ) {
  				handle.apply( cur, data );
  			}

  			// Native handler
  			handle = ontype && cur[ ontype ];
  			if ( handle && handle.apply && acceptData( cur ) ) {
  				event.result = handle.apply( cur, data );
  				if ( event.result === false ) {
  					event.preventDefault();
  				}
  			}
  		}
  		event.type = type;

  		// If nobody prevented the default action, do it now
  		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

  			if ( ( !special._default ||
  				special._default.apply( eventPath.pop(), data ) === false ) &&
  				acceptData( elem ) ) {

  				// Call a native DOM method on the target with the same name as the event.
  				// Don't do default actions on window, that's where global variables be (#6170)
  				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

  					// Don't re-trigger an onFOO event when we call its FOO() method
  					tmp = elem[ ontype ];

  					if ( tmp ) {
  						elem[ ontype ] = null;
  					}

  					// Prevent re-triggering of the same event, since we already bubbled it above
  					jQuery.event.triggered = type;

  					if ( event.isPropagationStopped() ) {
  						lastElement.addEventListener( type, stopPropagationCallback );
  					}

  					elem[ type ]();

  					if ( event.isPropagationStopped() ) {
  						lastElement.removeEventListener( type, stopPropagationCallback );
  					}

  					jQuery.event.triggered = undefined;

  					if ( tmp ) {
  						elem[ ontype ] = tmp;
  					}
  				}
  			}
  		}

  		return event.result;
  	},

  	// Piggyback on a donor event to simulate a different one
  	// Used only for `focus(in | out)` events
  	simulate: function( type, elem, event ) {
  		var e = jQuery.extend(
  			new jQuery.Event(),
  			event,
  			{
  				type: type,
  				isSimulated: true
  			}
  		);

  		jQuery.event.trigger( e, null, elem );
  	}

  } );

  jQuery.fn.extend( {

  	trigger: function( type, data ) {
  		return this.each( function() {
  			jQuery.event.trigger( type, data, this );
  		} );
  	},
  	triggerHandler: function( type, data ) {
  		var elem = this[ 0 ];
  		if ( elem ) {
  			return jQuery.event.trigger( type, data, elem, true );
  		}
  	}
  } );


  // Support: Firefox <=44
  // Firefox doesn't have focus(in | out) events
  // Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
  //
  // Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
  // focus(in | out) events fire after focus & blur events,
  // which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
  // Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
  if ( !support.focusin ) {
  	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

  		// Attach a single capturing handler on the document while someone wants focusin/focusout
  		var handler = function( event ) {
  			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
  		};

  		jQuery.event.special[ fix ] = {
  			setup: function() {
  				var doc = this.ownerDocument || this,
  					attaches = dataPriv.access( doc, fix );

  				if ( !attaches ) {
  					doc.addEventListener( orig, handler, true );
  				}
  				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
  			},
  			teardown: function() {
  				var doc = this.ownerDocument || this,
  					attaches = dataPriv.access( doc, fix ) - 1;

  				if ( !attaches ) {
  					doc.removeEventListener( orig, handler, true );
  					dataPriv.remove( doc, fix );

  				} else {
  					dataPriv.access( doc, fix, attaches );
  				}
  			}
  		};
  	} );
  }
  var location = window.location;

  var nonce = Date.now();

  var rquery = ( /\?/ );



  // Cross-browser xml parsing
  jQuery.parseXML = function( data ) {
  	var xml;
  	if ( !data || typeof data !== "string" ) {
  		return null;
  	}

  	// Support: IE 9 - 11 only
  	// IE throws on parseFromString with invalid input.
  	try {
  		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
  	} catch ( e ) {
  		xml = undefined;
  	}

  	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
  		jQuery.error( "Invalid XML: " + data );
  	}
  	return xml;
  };


  var
  	rbracket = /\[\]$/,
  	rCRLF = /\r?\n/g,
  	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
  	rsubmittable = /^(?:input|select|textarea|keygen)/i;

  function buildParams( prefix, obj, traditional, add ) {
  	var name;

  	if ( Array.isArray( obj ) ) {

  		// Serialize array item.
  		jQuery.each( obj, function( i, v ) {
  			if ( traditional || rbracket.test( prefix ) ) {

  				// Treat each array item as a scalar.
  				add( prefix, v );

  			} else {

  				// Item is non-scalar (array or object), encode its numeric index.
  				buildParams(
  					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
  					v,
  					traditional,
  					add
  				);
  			}
  		} );

  	} else if ( !traditional && toType( obj ) === "object" ) {

  		// Serialize object item.
  		for ( name in obj ) {
  			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
  		}

  	} else {

  		// Serialize scalar item.
  		add( prefix, obj );
  	}
  }

  // Serialize an array of form elements or a set of
  // key/values into a query string
  jQuery.param = function( a, traditional ) {
  	var prefix,
  		s = [],
  		add = function( key, valueOrFunction ) {

  			// If value is a function, invoke it and use its return value
  			var value = isFunction( valueOrFunction ) ?
  				valueOrFunction() :
  				valueOrFunction;

  			s[ s.length ] = encodeURIComponent( key ) + "=" +
  				encodeURIComponent( value == null ? "" : value );
  		};

  	if ( a == null ) {
  		return "";
  	}

  	// If an array was passed in, assume that it is an array of form elements.
  	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

  		// Serialize the form elements
  		jQuery.each( a, function() {
  			add( this.name, this.value );
  		} );

  	} else {

  		// If traditional, encode the "old" way (the way 1.3.2 or older
  		// did it), otherwise encode params recursively.
  		for ( prefix in a ) {
  			buildParams( prefix, a[ prefix ], traditional, add );
  		}
  	}

  	// Return the resulting serialization
  	return s.join( "&" );
  };

  jQuery.fn.extend( {
  	serialize: function() {
  		return jQuery.param( this.serializeArray() );
  	},
  	serializeArray: function() {
  		return this.map( function() {

  			// Can add propHook for "elements" to filter or add form elements
  			var elements = jQuery.prop( this, "elements" );
  			return elements ? jQuery.makeArray( elements ) : this;
  		} )
  		.filter( function() {
  			var type = this.type;

  			// Use .is( ":disabled" ) so that fieldset[disabled] works
  			return this.name && !jQuery( this ).is( ":disabled" ) &&
  				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
  				( this.checked || !rcheckableType.test( type ) );
  		} )
  		.map( function( i, elem ) {
  			var val = jQuery( this ).val();

  			if ( val == null ) {
  				return null;
  			}

  			if ( Array.isArray( val ) ) {
  				return jQuery.map( val, function( val ) {
  					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
  				} );
  			}

  			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
  		} ).get();
  	}
  } );


  var
  	r20 = /%20/g,
  	rhash = /#.*$/,
  	rantiCache = /([?&])_=[^&]*/,
  	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

  	// #7653, #8125, #8152: local protocol detection
  	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
  	rnoContent = /^(?:GET|HEAD)$/,
  	rprotocol = /^\/\//,

  	/* Prefilters
  	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
  	 * 2) These are called:
  	 *    - BEFORE asking for a transport
  	 *    - AFTER param serialization (s.data is a string if s.processData is true)
  	 * 3) key is the dataType
  	 * 4) the catchall symbol "*" can be used
  	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
  	 */
  	prefilters = {},

  	/* Transports bindings
  	 * 1) key is the dataType
  	 * 2) the catchall symbol "*" can be used
  	 * 3) selection will start with transport dataType and THEN go to "*" if needed
  	 */
  	transports = {},

  	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
  	allTypes = "*/".concat( "*" ),

  	// Anchor tag for parsing the document origin
  	originAnchor = document.createElement( "a" );
  	originAnchor.href = location.href;

  // Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
  function addToPrefiltersOrTransports( structure ) {

  	// dataTypeExpression is optional and defaults to "*"
  	return function( dataTypeExpression, func ) {

  		if ( typeof dataTypeExpression !== "string" ) {
  			func = dataTypeExpression;
  			dataTypeExpression = "*";
  		}

  		var dataType,
  			i = 0,
  			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

  		if ( isFunction( func ) ) {

  			// For each dataType in the dataTypeExpression
  			while ( ( dataType = dataTypes[ i++ ] ) ) {

  				// Prepend if requested
  				if ( dataType[ 0 ] === "+" ) {
  					dataType = dataType.slice( 1 ) || "*";
  					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

  				// Otherwise append
  				} else {
  					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
  				}
  			}
  		}
  	};
  }

  // Base inspection function for prefilters and transports
  function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

  	var inspected = {},
  		seekingTransport = ( structure === transports );

  	function inspect( dataType ) {
  		var selected;
  		inspected[ dataType ] = true;
  		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
  			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
  			if ( typeof dataTypeOrTransport === "string" &&
  				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

  				options.dataTypes.unshift( dataTypeOrTransport );
  				inspect( dataTypeOrTransport );
  				return false;
  			} else if ( seekingTransport ) {
  				return !( selected = dataTypeOrTransport );
  			}
  		} );
  		return selected;
  	}

  	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
  }

  // A special extend for ajax options
  // that takes "flat" options (not to be deep extended)
  // Fixes #9887
  function ajaxExtend( target, src ) {
  	var key, deep,
  		flatOptions = jQuery.ajaxSettings.flatOptions || {};

  	for ( key in src ) {
  		if ( src[ key ] !== undefined ) {
  			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
  		}
  	}
  	if ( deep ) {
  		jQuery.extend( true, target, deep );
  	}

  	return target;
  }

  /* Handles responses to an ajax request:
   * - finds the right dataType (mediates between content-type and expected dataType)
   * - returns the corresponding response
   */
  function ajaxHandleResponses( s, jqXHR, responses ) {

  	var ct, type, finalDataType, firstDataType,
  		contents = s.contents,
  		dataTypes = s.dataTypes;

  	// Remove auto dataType and get content-type in the process
  	while ( dataTypes[ 0 ] === "*" ) {
  		dataTypes.shift();
  		if ( ct === undefined ) {
  			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
  		}
  	}

  	// Check if we're dealing with a known content-type
  	if ( ct ) {
  		for ( type in contents ) {
  			if ( contents[ type ] && contents[ type ].test( ct ) ) {
  				dataTypes.unshift( type );
  				break;
  			}
  		}
  	}

  	// Check to see if we have a response for the expected dataType
  	if ( dataTypes[ 0 ] in responses ) {
  		finalDataType = dataTypes[ 0 ];
  	} else {

  		// Try convertible dataTypes
  		for ( type in responses ) {
  			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
  				finalDataType = type;
  				break;
  			}
  			if ( !firstDataType ) {
  				firstDataType = type;
  			}
  		}

  		// Or just use first one
  		finalDataType = finalDataType || firstDataType;
  	}

  	// If we found a dataType
  	// We add the dataType to the list if needed
  	// and return the corresponding response
  	if ( finalDataType ) {
  		if ( finalDataType !== dataTypes[ 0 ] ) {
  			dataTypes.unshift( finalDataType );
  		}
  		return responses[ finalDataType ];
  	}
  }

  /* Chain conversions given the request and the original response
   * Also sets the responseXXX fields on the jqXHR instance
   */
  function ajaxConvert( s, response, jqXHR, isSuccess ) {
  	var conv2, current, conv, tmp, prev,
  		converters = {},

  		// Work with a copy of dataTypes in case we need to modify it for conversion
  		dataTypes = s.dataTypes.slice();

  	// Create converters map with lowercased keys
  	if ( dataTypes[ 1 ] ) {
  		for ( conv in s.converters ) {
  			converters[ conv.toLowerCase() ] = s.converters[ conv ];
  		}
  	}

  	current = dataTypes.shift();

  	// Convert to each sequential dataType
  	while ( current ) {

  		if ( s.responseFields[ current ] ) {
  			jqXHR[ s.responseFields[ current ] ] = response;
  		}

  		// Apply the dataFilter if provided
  		if ( !prev && isSuccess && s.dataFilter ) {
  			response = s.dataFilter( response, s.dataType );
  		}

  		prev = current;
  		current = dataTypes.shift();

  		if ( current ) {

  			// There's only work to do if current dataType is non-auto
  			if ( current === "*" ) {

  				current = prev;

  			// Convert response if prev dataType is non-auto and differs from current
  			} else if ( prev !== "*" && prev !== current ) {

  				// Seek a direct converter
  				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

  				// If none found, seek a pair
  				if ( !conv ) {
  					for ( conv2 in converters ) {

  						// If conv2 outputs current
  						tmp = conv2.split( " " );
  						if ( tmp[ 1 ] === current ) {

  							// If prev can be converted to accepted input
  							conv = converters[ prev + " " + tmp[ 0 ] ] ||
  								converters[ "* " + tmp[ 0 ] ];
  							if ( conv ) {

  								// Condense equivalence converters
  								if ( conv === true ) {
  									conv = converters[ conv2 ];

  								// Otherwise, insert the intermediate dataType
  								} else if ( converters[ conv2 ] !== true ) {
  									current = tmp[ 0 ];
  									dataTypes.unshift( tmp[ 1 ] );
  								}
  								break;
  							}
  						}
  					}
  				}

  				// Apply converter (if not an equivalence)
  				if ( conv !== true ) {

  					// Unless errors are allowed to bubble, catch and return them
  					if ( conv && s.throws ) {
  						response = conv( response );
  					} else {
  						try {
  							response = conv( response );
  						} catch ( e ) {
  							return {
  								state: "parsererror",
  								error: conv ? e : "No conversion from " + prev + " to " + current
  							};
  						}
  					}
  				}
  			}
  		}
  	}

  	return { state: "success", data: response };
  }

  jQuery.extend( {

  	// Counter for holding the number of active queries
  	active: 0,

  	// Last-Modified header cache for next request
  	lastModified: {},
  	etag: {},

  	ajaxSettings: {
  		url: location.href,
  		type: "GET",
  		isLocal: rlocalProtocol.test( location.protocol ),
  		global: true,
  		processData: true,
  		async: true,
  		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

  		/*
  		timeout: 0,
  		data: null,
  		dataType: null,
  		username: null,
  		password: null,
  		cache: null,
  		throws: false,
  		traditional: false,
  		headers: {},
  		*/

  		accepts: {
  			"*": allTypes,
  			text: "text/plain",
  			html: "text/html",
  			xml: "application/xml, text/xml",
  			json: "application/json, text/javascript"
  		},

  		contents: {
  			xml: /\bxml\b/,
  			html: /\bhtml/,
  			json: /\bjson\b/
  		},

  		responseFields: {
  			xml: "responseXML",
  			text: "responseText",
  			json: "responseJSON"
  		},

  		// Data converters
  		// Keys separate source (or catchall "*") and destination types with a single space
  		converters: {

  			// Convert anything to text
  			"* text": String,

  			// Text to html (true = no transformation)
  			"text html": true,

  			// Evaluate text as a json expression
  			"text json": JSON.parse,

  			// Parse text as xml
  			"text xml": jQuery.parseXML
  		},

  		// For options that shouldn't be deep extended:
  		// you can add your own custom options here if
  		// and when you create one that shouldn't be
  		// deep extended (see ajaxExtend)
  		flatOptions: {
  			url: true,
  			context: true
  		}
  	},

  	// Creates a full fledged settings object into target
  	// with both ajaxSettings and settings fields.
  	// If target is omitted, writes into ajaxSettings.
  	ajaxSetup: function( target, settings ) {
  		return settings ?

  			// Building a settings object
  			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

  			// Extending ajaxSettings
  			ajaxExtend( jQuery.ajaxSettings, target );
  	},

  	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
  	ajaxTransport: addToPrefiltersOrTransports( transports ),

  	// Main method
  	ajax: function( url, options ) {

  		// If url is an object, simulate pre-1.5 signature
  		if ( typeof url === "object" ) {
  			options = url;
  			url = undefined;
  		}

  		// Force options to be an object
  		options = options || {};

  		var transport,

  			// URL without anti-cache param
  			cacheURL,

  			// Response headers
  			responseHeadersString,
  			responseHeaders,

  			// timeout handle
  			timeoutTimer,

  			// Url cleanup var
  			urlAnchor,

  			// Request state (becomes false upon send and true upon completion)
  			completed,

  			// To know if global events are to be dispatched
  			fireGlobals,

  			// Loop variable
  			i,

  			// uncached part of the url
  			uncached,

  			// Create the final options object
  			s = jQuery.ajaxSetup( {}, options ),

  			// Callbacks context
  			callbackContext = s.context || s,

  			// Context for global events is callbackContext if it is a DOM node or jQuery collection
  			globalEventContext = s.context &&
  				( callbackContext.nodeType || callbackContext.jquery ) ?
  					jQuery( callbackContext ) :
  					jQuery.event,

  			// Deferreds
  			deferred = jQuery.Deferred(),
  			completeDeferred = jQuery.Callbacks( "once memory" ),

  			// Status-dependent callbacks
  			statusCode = s.statusCode || {},

  			// Headers (they are sent all at once)
  			requestHeaders = {},
  			requestHeadersNames = {},

  			// Default abort message
  			strAbort = "canceled",

  			// Fake xhr
  			jqXHR = {
  				readyState: 0,

  				// Builds headers hashtable if needed
  				getResponseHeader: function( key ) {
  					var match;
  					if ( completed ) {
  						if ( !responseHeaders ) {
  							responseHeaders = {};
  							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
  								responseHeaders[ match[ 1 ].toLowerCase() + " " ] =
  									( responseHeaders[ match[ 1 ].toLowerCase() + " " ] || [] )
  										.concat( match[ 2 ] );
  							}
  						}
  						match = responseHeaders[ key.toLowerCase() + " " ];
  					}
  					return match == null ? null : match.join( ", " );
  				},

  				// Raw string
  				getAllResponseHeaders: function() {
  					return completed ? responseHeadersString : null;
  				},

  				// Caches the header
  				setRequestHeader: function( name, value ) {
  					if ( completed == null ) {
  						name = requestHeadersNames[ name.toLowerCase() ] =
  							requestHeadersNames[ name.toLowerCase() ] || name;
  						requestHeaders[ name ] = value;
  					}
  					return this;
  				},

  				// Overrides response content-type header
  				overrideMimeType: function( type ) {
  					if ( completed == null ) {
  						s.mimeType = type;
  					}
  					return this;
  				},

  				// Status-dependent callbacks
  				statusCode: function( map ) {
  					var code;
  					if ( map ) {
  						if ( completed ) {

  							// Execute the appropriate callbacks
  							jqXHR.always( map[ jqXHR.status ] );
  						} else {

  							// Lazy-add the new callbacks in a way that preserves old ones
  							for ( code in map ) {
  								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
  							}
  						}
  					}
  					return this;
  				},

  				// Cancel the request
  				abort: function( statusText ) {
  					var finalText = statusText || strAbort;
  					if ( transport ) {
  						transport.abort( finalText );
  					}
  					done( 0, finalText );
  					return this;
  				}
  			};

  		// Attach deferreds
  		deferred.promise( jqXHR );

  		// Add protocol if not provided (prefilters might expect it)
  		// Handle falsy url in the settings object (#10093: consistency with old signature)
  		// We also use the url parameter if available
  		s.url = ( ( url || s.url || location.href ) + "" )
  			.replace( rprotocol, location.protocol + "//" );

  		// Alias method option to type as per ticket #12004
  		s.type = options.method || options.type || s.method || s.type;

  		// Extract dataTypes list
  		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

  		// A cross-domain request is in order when the origin doesn't match the current origin.
  		if ( s.crossDomain == null ) {
  			urlAnchor = document.createElement( "a" );

  			// Support: IE <=8 - 11, Edge 12 - 15
  			// IE throws exception on accessing the href property if url is malformed,
  			// e.g. http://example.com:80x/
  			try {
  				urlAnchor.href = s.url;

  				// Support: IE <=8 - 11 only
  				// Anchor's host property isn't correctly set when s.url is relative
  				urlAnchor.href = urlAnchor.href;
  				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
  					urlAnchor.protocol + "//" + urlAnchor.host;
  			} catch ( e ) {

  				// If there is an error parsing the URL, assume it is crossDomain,
  				// it can be rejected by the transport if it is invalid
  				s.crossDomain = true;
  			}
  		}

  		// Convert data if not already a string
  		if ( s.data && s.processData && typeof s.data !== "string" ) {
  			s.data = jQuery.param( s.data, s.traditional );
  		}

  		// Apply prefilters
  		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

  		// If request was aborted inside a prefilter, stop there
  		if ( completed ) {
  			return jqXHR;
  		}

  		// We can fire global events as of now if asked to
  		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
  		fireGlobals = jQuery.event && s.global;

  		// Watch for a new set of requests
  		if ( fireGlobals && jQuery.active++ === 0 ) {
  			jQuery.event.trigger( "ajaxStart" );
  		}

  		// Uppercase the type
  		s.type = s.type.toUpperCase();

  		// Determine if request has content
  		s.hasContent = !rnoContent.test( s.type );

  		// Save the URL in case we're toying with the If-Modified-Since
  		// and/or If-None-Match header later on
  		// Remove hash to simplify url manipulation
  		cacheURL = s.url.replace( rhash, "" );

  		// More options handling for requests with no content
  		if ( !s.hasContent ) {

  			// Remember the hash so we can put it back
  			uncached = s.url.slice( cacheURL.length );

  			// If data is available and should be processed, append data to url
  			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
  				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

  				// #9682: remove data so that it's not used in an eventual retry
  				delete s.data;
  			}

  			// Add or update anti-cache param if needed
  			if ( s.cache === false ) {
  				cacheURL = cacheURL.replace( rantiCache, "$1" );
  				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
  			}

  			// Put hash and anti-cache on the URL that will be requested (gh-1732)
  			s.url = cacheURL + uncached;

  		// Change '%20' to '+' if this is encoded form body content (gh-2658)
  		} else if ( s.data && s.processData &&
  			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
  			s.data = s.data.replace( r20, "+" );
  		}

  		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
  		if ( s.ifModified ) {
  			if ( jQuery.lastModified[ cacheURL ] ) {
  				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
  			}
  			if ( jQuery.etag[ cacheURL ] ) {
  				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
  			}
  		}

  		// Set the correct header, if data is being sent
  		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
  			jqXHR.setRequestHeader( "Content-Type", s.contentType );
  		}

  		// Set the Accepts header for the server, depending on the dataType
  		jqXHR.setRequestHeader(
  			"Accept",
  			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
  				s.accepts[ s.dataTypes[ 0 ] ] +
  					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
  				s.accepts[ "*" ]
  		);

  		// Check for headers option
  		for ( i in s.headers ) {
  			jqXHR.setRequestHeader( i, s.headers[ i ] );
  		}

  		// Allow custom headers/mimetypes and early abort
  		if ( s.beforeSend &&
  			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

  			// Abort if not done already and return
  			return jqXHR.abort();
  		}

  		// Aborting is no longer a cancellation
  		strAbort = "abort";

  		// Install callbacks on deferreds
  		completeDeferred.add( s.complete );
  		jqXHR.done( s.success );
  		jqXHR.fail( s.error );

  		// Get transport
  		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

  		// If no transport, we auto-abort
  		if ( !transport ) {
  			done( -1, "No Transport" );
  		} else {
  			jqXHR.readyState = 1;

  			// Send global event
  			if ( fireGlobals ) {
  				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
  			}

  			// If request was aborted inside ajaxSend, stop there
  			if ( completed ) {
  				return jqXHR;
  			}

  			// Timeout
  			if ( s.async && s.timeout > 0 ) {
  				timeoutTimer = window.setTimeout( function() {
  					jqXHR.abort( "timeout" );
  				}, s.timeout );
  			}

  			try {
  				completed = false;
  				transport.send( requestHeaders, done );
  			} catch ( e ) {

  				// Rethrow post-completion exceptions
  				if ( completed ) {
  					throw e;
  				}

  				// Propagate others as results
  				done( -1, e );
  			}
  		}

  		// Callback for when everything is done
  		function done( status, nativeStatusText, responses, headers ) {
  			var isSuccess, success, error, response, modified,
  				statusText = nativeStatusText;

  			// Ignore repeat invocations
  			if ( completed ) {
  				return;
  			}

  			completed = true;

  			// Clear timeout if it exists
  			if ( timeoutTimer ) {
  				window.clearTimeout( timeoutTimer );
  			}

  			// Dereference transport for early garbage collection
  			// (no matter how long the jqXHR object will be used)
  			transport = undefined;

  			// Cache response headers
  			responseHeadersString = headers || "";

  			// Set readyState
  			jqXHR.readyState = status > 0 ? 4 : 0;

  			// Determine if successful
  			isSuccess = status >= 200 && status < 300 || status === 304;

  			// Get response data
  			if ( responses ) {
  				response = ajaxHandleResponses( s, jqXHR, responses );
  			}

  			// Convert no matter what (that way responseXXX fields are always set)
  			response = ajaxConvert( s, response, jqXHR, isSuccess );

  			// If successful, handle type chaining
  			if ( isSuccess ) {

  				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
  				if ( s.ifModified ) {
  					modified = jqXHR.getResponseHeader( "Last-Modified" );
  					if ( modified ) {
  						jQuery.lastModified[ cacheURL ] = modified;
  					}
  					modified = jqXHR.getResponseHeader( "etag" );
  					if ( modified ) {
  						jQuery.etag[ cacheURL ] = modified;
  					}
  				}

  				// if no content
  				if ( status === 204 || s.type === "HEAD" ) {
  					statusText = "nocontent";

  				// if not modified
  				} else if ( status === 304 ) {
  					statusText = "notmodified";

  				// If we have data, let's convert it
  				} else {
  					statusText = response.state;
  					success = response.data;
  					error = response.error;
  					isSuccess = !error;
  				}
  			} else {

  				// Extract error from statusText and normalize for non-aborts
  				error = statusText;
  				if ( status || !statusText ) {
  					statusText = "error";
  					if ( status < 0 ) {
  						status = 0;
  					}
  				}
  			}

  			// Set data for the fake xhr object
  			jqXHR.status = status;
  			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

  			// Success/Error
  			if ( isSuccess ) {
  				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
  			} else {
  				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
  			}

  			// Status-dependent callbacks
  			jqXHR.statusCode( statusCode );
  			statusCode = undefined;

  			if ( fireGlobals ) {
  				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
  					[ jqXHR, s, isSuccess ? success : error ] );
  			}

  			// Complete
  			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

  			if ( fireGlobals ) {
  				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

  				// Handle the global AJAX counter
  				if ( !( --jQuery.active ) ) {
  					jQuery.event.trigger( "ajaxStop" );
  				}
  			}
  		}

  		return jqXHR;
  	},

  	getJSON: function( url, data, callback ) {
  		return jQuery.get( url, data, callback, "json" );
  	},

  	getScript: function( url, callback ) {
  		return jQuery.get( url, undefined, callback, "script" );
  	}
  } );

  jQuery.each( [ "get", "post" ], function( i, method ) {
  	jQuery[ method ] = function( url, data, callback, type ) {

  		// Shift arguments if data argument was omitted
  		if ( isFunction( data ) ) {
  			type = type || callback;
  			callback = data;
  			data = undefined;
  		}

  		// The url can be an options object (which then must have .url)
  		return jQuery.ajax( jQuery.extend( {
  			url: url,
  			type: method,
  			dataType: type,
  			data: data,
  			success: callback
  		}, jQuery.isPlainObject( url ) && url ) );
  	};
  } );


  jQuery._evalUrl = function( url, options ) {
  	return jQuery.ajax( {
  		url: url,

  		// Make this explicit, since user can override this through ajaxSetup (#11264)
  		type: "GET",
  		dataType: "script",
  		cache: true,
  		async: false,
  		global: false,

  		// Only evaluate the response if it is successful (gh-4126)
  		// dataFilter is not invoked for failure responses, so using it instead
  		// of the default converter is kludgy but it works.
  		converters: {
  			"text script": function() {}
  		},
  		dataFilter: function( response ) {
  			jQuery.globalEval( response, options );
  		}
  	} );
  };


  jQuery.fn.extend( {
  	wrapAll: function( html ) {
  		var wrap;

  		if ( this[ 0 ] ) {
  			if ( isFunction( html ) ) {
  				html = html.call( this[ 0 ] );
  			}

  			// The elements to wrap the target around
  			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

  			if ( this[ 0 ].parentNode ) {
  				wrap.insertBefore( this[ 0 ] );
  			}

  			wrap.map( function() {
  				var elem = this;

  				while ( elem.firstElementChild ) {
  					elem = elem.firstElementChild;
  				}

  				return elem;
  			} ).append( this );
  		}

  		return this;
  	},

  	wrapInner: function( html ) {
  		if ( isFunction( html ) ) {
  			return this.each( function( i ) {
  				jQuery( this ).wrapInner( html.call( this, i ) );
  			} );
  		}

  		return this.each( function() {
  			var self = jQuery( this ),
  				contents = self.contents();

  			if ( contents.length ) {
  				contents.wrapAll( html );

  			} else {
  				self.append( html );
  			}
  		} );
  	},

  	wrap: function( html ) {
  		var htmlIsFunction = isFunction( html );

  		return this.each( function( i ) {
  			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
  		} );
  	},

  	unwrap: function( selector ) {
  		this.parent( selector ).not( "body" ).each( function() {
  			jQuery( this ).replaceWith( this.childNodes );
  		} );
  		return this;
  	}
  } );


  jQuery.expr.pseudos.hidden = function( elem ) {
  	return !jQuery.expr.pseudos.visible( elem );
  };
  jQuery.expr.pseudos.visible = function( elem ) {
  	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
  };




  jQuery.ajaxSettings.xhr = function() {
  	try {
  		return new window.XMLHttpRequest();
  	} catch ( e ) {}
  };

  var xhrSuccessStatus = {

  		// File protocol always yields status code 0, assume 200
  		0: 200,

  		// Support: IE <=9 only
  		// #1450: sometimes IE returns 1223 when it should be 204
  		1223: 204
  	},
  	xhrSupported = jQuery.ajaxSettings.xhr();

  support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
  support.ajax = xhrSupported = !!xhrSupported;

  jQuery.ajaxTransport( function( options ) {
  	var callback, errorCallback;

  	// Cross domain only allowed if supported through XMLHttpRequest
  	if ( support.cors || xhrSupported && !options.crossDomain ) {
  		return {
  			send: function( headers, complete ) {
  				var i,
  					xhr = options.xhr();

  				xhr.open(
  					options.type,
  					options.url,
  					options.async,
  					options.username,
  					options.password
  				);

  				// Apply custom fields if provided
  				if ( options.xhrFields ) {
  					for ( i in options.xhrFields ) {
  						xhr[ i ] = options.xhrFields[ i ];
  					}
  				}

  				// Override mime type if needed
  				if ( options.mimeType && xhr.overrideMimeType ) {
  					xhr.overrideMimeType( options.mimeType );
  				}

  				// X-Requested-With header
  				// For cross-domain requests, seeing as conditions for a preflight are
  				// akin to a jigsaw puzzle, we simply never set it to be sure.
  				// (it can always be set on a per-request basis or even using ajaxSetup)
  				// For same-domain requests, won't change header if already provided.
  				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
  					headers[ "X-Requested-With" ] = "XMLHttpRequest";
  				}

  				// Set headers
  				for ( i in headers ) {
  					xhr.setRequestHeader( i, headers[ i ] );
  				}

  				// Callback
  				callback = function( type ) {
  					return function() {
  						if ( callback ) {
  							callback = errorCallback = xhr.onload =
  								xhr.onerror = xhr.onabort = xhr.ontimeout =
  									xhr.onreadystatechange = null;

  							if ( type === "abort" ) {
  								xhr.abort();
  							} else if ( type === "error" ) {

  								// Support: IE <=9 only
  								// On a manual native abort, IE9 throws
  								// errors on any property access that is not readyState
  								if ( typeof xhr.status !== "number" ) {
  									complete( 0, "error" );
  								} else {
  									complete(

  										// File: protocol always yields status 0; see #8605, #14207
  										xhr.status,
  										xhr.statusText
  									);
  								}
  							} else {
  								complete(
  									xhrSuccessStatus[ xhr.status ] || xhr.status,
  									xhr.statusText,

  									// Support: IE <=9 only
  									// IE9 has no XHR2 but throws on binary (trac-11426)
  									// For XHR2 non-text, let the caller handle it (gh-2498)
  									( xhr.responseType || "text" ) !== "text"  ||
  									typeof xhr.responseText !== "string" ?
  										{ binary: xhr.response } :
  										{ text: xhr.responseText },
  									xhr.getAllResponseHeaders()
  								);
  							}
  						}
  					};
  				};

  				// Listen to events
  				xhr.onload = callback();
  				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

  				// Support: IE 9 only
  				// Use onreadystatechange to replace onabort
  				// to handle uncaught aborts
  				if ( xhr.onabort !== undefined ) {
  					xhr.onabort = errorCallback;
  				} else {
  					xhr.onreadystatechange = function() {

  						// Check readyState before timeout as it changes
  						if ( xhr.readyState === 4 ) {

  							// Allow onerror to be called first,
  							// but that will not handle a native abort
  							// Also, save errorCallback to a variable
  							// as xhr.onerror cannot be accessed
  							window.setTimeout( function() {
  								if ( callback ) {
  									errorCallback();
  								}
  							} );
  						}
  					};
  				}

  				// Create the abort callback
  				callback = callback( "abort" );

  				try {

  					// Do send the request (this may raise an exception)
  					xhr.send( options.hasContent && options.data || null );
  				} catch ( e ) {

  					// #14683: Only rethrow if this hasn't been notified as an error yet
  					if ( callback ) {
  						throw e;
  					}
  				}
  			},

  			abort: function() {
  				if ( callback ) {
  					callback();
  				}
  			}
  		};
  	}
  } );




  // Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
  jQuery.ajaxPrefilter( function( s ) {
  	if ( s.crossDomain ) {
  		s.contents.script = false;
  	}
  } );

  // Install script dataType
  jQuery.ajaxSetup( {
  	accepts: {
  		script: "text/javascript, application/javascript, " +
  			"application/ecmascript, application/x-ecmascript"
  	},
  	contents: {
  		script: /\b(?:java|ecma)script\b/
  	},
  	converters: {
  		"text script": function( text ) {
  			jQuery.globalEval( text );
  			return text;
  		}
  	}
  } );

  // Handle cache's special case and crossDomain
  jQuery.ajaxPrefilter( "script", function( s ) {
  	if ( s.cache === undefined ) {
  		s.cache = false;
  	}
  	if ( s.crossDomain ) {
  		s.type = "GET";
  	}
  } );

  // Bind script tag hack transport
  jQuery.ajaxTransport( "script", function( s ) {

  	// This transport only deals with cross domain or forced-by-attrs requests
  	if ( s.crossDomain || s.scriptAttrs ) {
  		var script, callback;
  		return {
  			send: function( _, complete ) {
  				script = jQuery( "<script>" )
  					.attr( s.scriptAttrs || {} )
  					.prop( { charset: s.scriptCharset, src: s.url } )
  					.on( "load error", callback = function( evt ) {
  						script.remove();
  						callback = null;
  						if ( evt ) {
  							complete( evt.type === "error" ? 404 : 200, evt.type );
  						}
  					} );

  				// Use native DOM manipulation to avoid our domManip AJAX trickery
  				document.head.appendChild( script[ 0 ] );
  			},
  			abort: function() {
  				if ( callback ) {
  					callback();
  				}
  			}
  		};
  	}
  } );




  var oldCallbacks = [],
  	rjsonp = /(=)\?(?=&|$)|\?\?/;

  // Default jsonp settings
  jQuery.ajaxSetup( {
  	jsonp: "callback",
  	jsonpCallback: function() {
  		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
  		this[ callback ] = true;
  		return callback;
  	}
  } );

  // Detect, normalize options and install callbacks for jsonp requests
  jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

  	var callbackName, overwritten, responseContainer,
  		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
  			"url" :
  			typeof s.data === "string" &&
  				( s.contentType || "" )
  					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
  				rjsonp.test( s.data ) && "data"
  		);

  	// Handle iff the expected data type is "jsonp" or we have a parameter to set
  	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

  		// Get callback name, remembering preexisting value associated with it
  		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
  			s.jsonpCallback() :
  			s.jsonpCallback;

  		// Insert callback into url or form data
  		if ( jsonProp ) {
  			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
  		} else if ( s.jsonp !== false ) {
  			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
  		}

  		// Use data converter to retrieve json after script execution
  		s.converters[ "script json" ] = function() {
  			if ( !responseContainer ) {
  				jQuery.error( callbackName + " was not called" );
  			}
  			return responseContainer[ 0 ];
  		};

  		// Force json dataType
  		s.dataTypes[ 0 ] = "json";

  		// Install callback
  		overwritten = window[ callbackName ];
  		window[ callbackName ] = function() {
  			responseContainer = arguments;
  		};

  		// Clean-up function (fires after converters)
  		jqXHR.always( function() {

  			// If previous value didn't exist - remove it
  			if ( overwritten === undefined ) {
  				jQuery( window ).removeProp( callbackName );

  			// Otherwise restore preexisting value
  			} else {
  				window[ callbackName ] = overwritten;
  			}

  			// Save back as free
  			if ( s[ callbackName ] ) {

  				// Make sure that re-using the options doesn't screw things around
  				s.jsonpCallback = originalSettings.jsonpCallback;

  				// Save the callback name for future use
  				oldCallbacks.push( callbackName );
  			}

  			// Call if it was a function and we have a response
  			if ( responseContainer && isFunction( overwritten ) ) {
  				overwritten( responseContainer[ 0 ] );
  			}

  			responseContainer = overwritten = undefined;
  		} );

  		// Delegate to script
  		return "script";
  	}
  } );




  // Support: Safari 8 only
  // In Safari 8 documents created via document.implementation.createHTMLDocument
  // collapse sibling forms: the second one becomes a child of the first one.
  // Because of that, this security measure has to be disabled in Safari 8.
  // https://bugs.webkit.org/show_bug.cgi?id=137337
  support.createHTMLDocument = ( function() {
  	var body = document.implementation.createHTMLDocument( "" ).body;
  	body.innerHTML = "<form></form><form></form>";
  	return body.childNodes.length === 2;
  } )();


  // Argument "data" should be string of html
  // context (optional): If specified, the fragment will be created in this context,
  // defaults to document
  // keepScripts (optional): If true, will include scripts passed in the html string
  jQuery.parseHTML = function( data, context, keepScripts ) {
  	if ( typeof data !== "string" ) {
  		return [];
  	}
  	if ( typeof context === "boolean" ) {
  		keepScripts = context;
  		context = false;
  	}

  	var base, parsed, scripts;

  	if ( !context ) {

  		// Stop scripts or inline event handlers from being executed immediately
  		// by using document.implementation
  		if ( support.createHTMLDocument ) {
  			context = document.implementation.createHTMLDocument( "" );

  			// Set the base href for the created document
  			// so any parsed elements with URLs
  			// are based on the document's URL (gh-2965)
  			base = context.createElement( "base" );
  			base.href = document.location.href;
  			context.head.appendChild( base );
  		} else {
  			context = document;
  		}
  	}

  	parsed = rsingleTag.exec( data );
  	scripts = !keepScripts && [];

  	// Single tag
  	if ( parsed ) {
  		return [ context.createElement( parsed[ 1 ] ) ];
  	}

  	parsed = buildFragment( [ data ], context, scripts );

  	if ( scripts && scripts.length ) {
  		jQuery( scripts ).remove();
  	}

  	return jQuery.merge( [], parsed.childNodes );
  };


  /**
   * Load a url into a page
   */
  jQuery.fn.load = function( url, params, callback ) {
  	var selector, type, response,
  		self = this,
  		off = url.indexOf( " " );

  	if ( off > -1 ) {
  		selector = stripAndCollapse( url.slice( off ) );
  		url = url.slice( 0, off );
  	}

  	// If it's a function
  	if ( isFunction( params ) ) {

  		// We assume that it's the callback
  		callback = params;
  		params = undefined;

  	// Otherwise, build a param string
  	} else if ( params && typeof params === "object" ) {
  		type = "POST";
  	}

  	// If we have elements to modify, make the request
  	if ( self.length > 0 ) {
  		jQuery.ajax( {
  			url: url,

  			// If "type" variable is undefined, then "GET" method will be used.
  			// Make value of this field explicit since
  			// user can override it through ajaxSetup method
  			type: type || "GET",
  			dataType: "html",
  			data: params
  		} ).done( function( responseText ) {

  			// Save response for use in complete callback
  			response = arguments;

  			self.html( selector ?

  				// If a selector was specified, locate the right elements in a dummy div
  				// Exclude scripts to avoid IE 'Permission Denied' errors
  				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

  				// Otherwise use the full result
  				responseText );

  		// If the request succeeds, this function gets "data", "status", "jqXHR"
  		// but they are ignored because response was set above.
  		// If it fails, this function gets "jqXHR", "status", "error"
  		} ).always( callback && function( jqXHR, status ) {
  			self.each( function() {
  				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
  			} );
  		} );
  	}

  	return this;
  };




  // Attach a bunch of functions for handling common AJAX events
  jQuery.each( [
  	"ajaxStart",
  	"ajaxStop",
  	"ajaxComplete",
  	"ajaxError",
  	"ajaxSuccess",
  	"ajaxSend"
  ], function( i, type ) {
  	jQuery.fn[ type ] = function( fn ) {
  		return this.on( type, fn );
  	};
  } );




  jQuery.expr.pseudos.animated = function( elem ) {
  	return jQuery.grep( jQuery.timers, function( fn ) {
  		return elem === fn.elem;
  	} ).length;
  };




  jQuery.offset = {
  	setOffset: function( elem, options, i ) {
  		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
  			position = jQuery.css( elem, "position" ),
  			curElem = jQuery( elem ),
  			props = {};

  		// Set position first, in-case top/left are set even on static elem
  		if ( position === "static" ) {
  			elem.style.position = "relative";
  		}

  		curOffset = curElem.offset();
  		curCSSTop = jQuery.css( elem, "top" );
  		curCSSLeft = jQuery.css( elem, "left" );
  		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
  			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

  		// Need to be able to calculate position if either
  		// top or left is auto and position is either absolute or fixed
  		if ( calculatePosition ) {
  			curPosition = curElem.position();
  			curTop = curPosition.top;
  			curLeft = curPosition.left;

  		} else {
  			curTop = parseFloat( curCSSTop ) || 0;
  			curLeft = parseFloat( curCSSLeft ) || 0;
  		}

  		if ( isFunction( options ) ) {

  			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
  			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
  		}

  		if ( options.top != null ) {
  			props.top = ( options.top - curOffset.top ) + curTop;
  		}
  		if ( options.left != null ) {
  			props.left = ( options.left - curOffset.left ) + curLeft;
  		}

  		if ( "using" in options ) {
  			options.using.call( elem, props );

  		} else {
  			curElem.css( props );
  		}
  	}
  };

  jQuery.fn.extend( {

  	// offset() relates an element's border box to the document origin
  	offset: function( options ) {

  		// Preserve chaining for setter
  		if ( arguments.length ) {
  			return options === undefined ?
  				this :
  				this.each( function( i ) {
  					jQuery.offset.setOffset( this, options, i );
  				} );
  		}

  		var rect, win,
  			elem = this[ 0 ];

  		if ( !elem ) {
  			return;
  		}

  		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
  		// Support: IE <=11 only
  		// Running getBoundingClientRect on a
  		// disconnected node in IE throws an error
  		if ( !elem.getClientRects().length ) {
  			return { top: 0, left: 0 };
  		}

  		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
  		rect = elem.getBoundingClientRect();
  		win = elem.ownerDocument.defaultView;
  		return {
  			top: rect.top + win.pageYOffset,
  			left: rect.left + win.pageXOffset
  		};
  	},

  	// position() relates an element's margin box to its offset parent's padding box
  	// This corresponds to the behavior of CSS absolute positioning
  	position: function() {
  		if ( !this[ 0 ] ) {
  			return;
  		}

  		var offsetParent, offset, doc,
  			elem = this[ 0 ],
  			parentOffset = { top: 0, left: 0 };

  		// position:fixed elements are offset from the viewport, which itself always has zero offset
  		if ( jQuery.css( elem, "position" ) === "fixed" ) {

  			// Assume position:fixed implies availability of getBoundingClientRect
  			offset = elem.getBoundingClientRect();

  		} else {
  			offset = this.offset();

  			// Account for the *real* offset parent, which can be the document or its root element
  			// when a statically positioned element is identified
  			doc = elem.ownerDocument;
  			offsetParent = elem.offsetParent || doc.documentElement;
  			while ( offsetParent &&
  				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
  				jQuery.css( offsetParent, "position" ) === "static" ) {

  				offsetParent = offsetParent.parentNode;
  			}
  			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

  				// Incorporate borders into its offset, since they are outside its content origin
  				parentOffset = jQuery( offsetParent ).offset();
  				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
  				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
  			}
  		}

  		// Subtract parent offsets and element margins
  		return {
  			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
  			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
  		};
  	},

  	// This method will return documentElement in the following cases:
  	// 1) For the element inside the iframe without offsetParent, this method will return
  	//    documentElement of the parent window
  	// 2) For the hidden or detached element
  	// 3) For body or html element, i.e. in case of the html node - it will return itself
  	//
  	// but those exceptions were never presented as a real life use-cases
  	// and might be considered as more preferable results.
  	//
  	// This logic, however, is not guaranteed and can change at any point in the future
  	offsetParent: function() {
  		return this.map( function() {
  			var offsetParent = this.offsetParent;

  			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
  				offsetParent = offsetParent.offsetParent;
  			}

  			return offsetParent || documentElement;
  		} );
  	}
  } );

  // Create scrollLeft and scrollTop methods
  jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
  	var top = "pageYOffset" === prop;

  	jQuery.fn[ method ] = function( val ) {
  		return access( this, function( elem, method, val ) {

  			// Coalesce documents and windows
  			var win;
  			if ( isWindow( elem ) ) {
  				win = elem;
  			} else if ( elem.nodeType === 9 ) {
  				win = elem.defaultView;
  			}

  			if ( val === undefined ) {
  				return win ? win[ prop ] : elem[ method ];
  			}

  			if ( win ) {
  				win.scrollTo(
  					!top ? val : win.pageXOffset,
  					top ? val : win.pageYOffset
  				);

  			} else {
  				elem[ method ] = val;
  			}
  		}, method, val, arguments.length );
  	};
  } );

  // Support: Safari <=7 - 9.1, Chrome <=37 - 49
  // Add the top/left cssHooks using jQuery.fn.position
  // Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
  // Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
  // getComputedStyle returns percent when specified for top/left/bottom/right;
  // rather than make the css module depend on the offset module, just check for it here
  jQuery.each( [ "top", "left" ], function( i, prop ) {
  	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
  		function( elem, computed ) {
  			if ( computed ) {
  				computed = curCSS( elem, prop );

  				// If curCSS returns percentage, fallback to offset
  				return rnumnonpx.test( computed ) ?
  					jQuery( elem ).position()[ prop ] + "px" :
  					computed;
  			}
  		}
  	);
  } );


  // Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
  jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
  	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
  		function( defaultExtra, funcName ) {

  		// Margin is only for outerHeight, outerWidth
  		jQuery.fn[ funcName ] = function( margin, value ) {
  			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
  				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

  			return access( this, function( elem, type, value ) {
  				var doc;

  				if ( isWindow( elem ) ) {

  					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
  					return funcName.indexOf( "outer" ) === 0 ?
  						elem[ "inner" + name ] :
  						elem.document.documentElement[ "client" + name ];
  				}

  				// Get document width or height
  				if ( elem.nodeType === 9 ) {
  					doc = elem.documentElement;

  					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
  					// whichever is greatest
  					return Math.max(
  						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
  						elem.body[ "offset" + name ], doc[ "offset" + name ],
  						doc[ "client" + name ]
  					);
  				}

  				return value === undefined ?

  					// Get width or height on the element, requesting but not forcing parseFloat
  					jQuery.css( elem, type, extra ) :

  					// Set width or height on the element
  					jQuery.style( elem, type, value, extra );
  			}, type, chainable ? margin : undefined, chainable );
  		};
  	} );
  } );


  jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
  	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
  	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
  	function( i, name ) {

  	// Handle event binding
  	jQuery.fn[ name ] = function( data, fn ) {
  		return arguments.length > 0 ?
  			this.on( name, null, data, fn ) :
  			this.trigger( name );
  	};
  } );

  jQuery.fn.extend( {
  	hover: function( fnOver, fnOut ) {
  		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
  	}
  } );




  jQuery.fn.extend( {

  	bind: function( types, data, fn ) {
  		return this.on( types, null, data, fn );
  	},
  	unbind: function( types, fn ) {
  		return this.off( types, null, fn );
  	},

  	delegate: function( selector, types, data, fn ) {
  		return this.on( types, selector, data, fn );
  	},
  	undelegate: function( selector, types, fn ) {

  		// ( namespace ) or ( selector, types [, fn] )
  		return arguments.length === 1 ?
  			this.off( selector, "**" ) :
  			this.off( types, selector || "**", fn );
  	}
  } );

  // Bind a function to a context, optionally partially applying any
  // arguments.
  // jQuery.proxy is deprecated to promote standards (specifically Function#bind)
  // However, it is not slated for removal any time soon
  jQuery.proxy = function( fn, context ) {
  	var tmp, args, proxy;

  	if ( typeof context === "string" ) {
  		tmp = fn[ context ];
  		context = fn;
  		fn = tmp;
  	}

  	// Quick check to determine if target is callable, in the spec
  	// this throws a TypeError, but we will just return undefined.
  	if ( !isFunction( fn ) ) {
  		return undefined;
  	}

  	// Simulated bind
  	args = slice.call( arguments, 2 );
  	proxy = function() {
  		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
  	};

  	// Set the guid of unique handler to the same of original handler, so it can be removed
  	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

  	return proxy;
  };

  jQuery.holdReady = function( hold ) {
  	if ( hold ) {
  		jQuery.readyWait++;
  	} else {
  		jQuery.ready( true );
  	}
  };
  jQuery.isArray = Array.isArray;
  jQuery.parseJSON = JSON.parse;
  jQuery.nodeName = nodeName;
  jQuery.isFunction = isFunction;
  jQuery.isWindow = isWindow;
  jQuery.camelCase = camelCase;
  jQuery.type = toType;

  jQuery.now = Date.now;

  jQuery.isNumeric = function( obj ) {

  	// As of jQuery 3.0, isNumeric is limited to
  	// strings and numbers (primitives or objects)
  	// that can be coerced to finite numbers (gh-2662)
  	var type = jQuery.type( obj );
  	return ( type === "number" || type === "string" ) &&

  		// parseFloat NaNs numeric-cast false positives ("")
  		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
  		// subtraction forces infinities to NaN
  		!isNaN( obj - parseFloat( obj ) );
  };




  // Register as a named AMD module, since jQuery can be concatenated with other
  // files that may use define, but not via a proper concatenation script that
  // understands anonymous AMD modules. A named AMD is safest and most robust
  // way to register. Lowercase jquery is used because AMD module names are
  // derived from file names, and jQuery is normally delivered in a lowercase
  // file name. Do this after creating the global so that if an AMD module wants
  // to call noConflict to hide this version of jQuery, it will work.

  // Note that for maximum portability, libraries that are not jQuery should
  // declare themselves as anonymous modules, and avoid setting a global if an
  // AMD loader is present. jQuery is a special case. For more information, see
  // https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

  if ( typeof undefined === "function" && undefined.amd ) {
  	undefined( "jquery", [], function() {
  		return jQuery;
  	} );
  }




  var

  	// Map over jQuery in case of overwrite
  	_jQuery = window.jQuery,

  	// Map over the $ in case of overwrite
  	_$ = window.$;

  jQuery.noConflict = function( deep ) {
  	if ( window.$ === jQuery ) {
  		window.$ = _$;
  	}

  	if ( deep && window.jQuery === jQuery ) {
  		window.jQuery = _jQuery;
  	}

  	return jQuery;
  };

  // Expose jQuery and $ identifiers, even in AMD
  // (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
  // and CommonJS for browser emulators (#13566)
  if ( !noGlobal ) {
  	window.jQuery = window.$ = jQuery;
  }




  return jQuery;
  } );
  });

  /*
   * Connects Inbenta's chatbot with Zendesk Live Agents
   */

  function handleZendesk(zendeskConf, zChat, storageMgr) {
    return function(chatbot) {
      var defaultZendeskConf = {
        preForm: false,
        getUserInfo: true,
        sendTranscript: true
      };
      if (zendeskConf) { defaultZendeskConf = zendeskConf; }
      // let zdScript = 'https://static.zdassets.com/ekr/snippet.js?key=7a106c83-d43c-4fdb-ade6-0e25da8dc857';
      // SANDBOX Gympass
      var zdAccountKey = 'NljGOiowTmEeawTXeHYV8Aw0ZR8Ad45H';
      var eventsLoaded = false;

      chatbot.subscriptions.onReady(function(next) {
        if (storageMgr.has('status')) {
          var status = storageMgr.get('status');
          if (status === 'inbenta-bot') {
            // hide & close zendesk
            window.zE('webWidget', 'hide');
          } else if (status === 'zendesk-chat') {
            // hide inbenta launcher & show zendesk chat
            hideLauncher();
            window.zE('webWidget', 'open');
            window.zE('webWidget', 'show');
            addListeners();
          }
        } else {
          storageMgr.set('status', 'inbenta-bot');
          window.zE('webWidget', 'hide');
        }
        return next();
      });

      chatbot.subscriptions.onEscalateToAgent(function(next) {
        chatbot.actions.displaySystemMessage({
          message: 'Aguarde enquanto transfiro para um atendente'
        });
        if (defaultZendeskConf.getUserInfo) {
          chatbot.api.getVariables({ revealValues: true }).then(function(data) {
            var params = prepareInfoVisitor(data);
            importZendeskScript(params);
          }); // get variables
        } else { // transfer chat to ZD
          importZendeskScript();
        }
      });

      function removeHtml(data){
        return data.replace(/<.*?>/g, '');
      }

      function createNewTag(data){
        return $zopim.livechat.addTags(data);
      }

      function prepareInfoVisitor(data) {
        var conversation = chatbot.actions.getConversationTranscript();
        
        var transcriptText = '';

        var d = new Date();
        var dayCurrent = d.getDay() - 1;
        var month = d.getMonth() + 1;

        conversation.forEach(function(element) {
          //console.log(element.message);
          if (element.user && element.user === "assistant") {
            transcriptText += '[ ' + dayCurrent + '/' + month + ', '+ d.getHours() + ':' + d.getMinutes() +' ] ChatBot: ' + element.message + '\r\n';
          }else{
            transcriptText += '[ ' + dayCurrent + '/' + month + ', ' + d.getHours() + ':' + d.getMinutes() + ' ] User: ' + element.message + '\r\n';
          }
            transcriptText = removeHtml(transcriptText);
        });

        var department = '';

        switch (data.data.usuario.value) {
          case 'cliente':
            department = data.data.queues_cliente.value;
            break;
          case 'nao_cliente':
            department = data.data.queues_nao_cliente.value;
            break;
          case 'hr':
            department = data.data.queues_hr.value;
            break;
          case 'gym':
            department = data.data.queues_gyms.value;
            break;
        }

        var params = {
          email: data.data.email_address.value,
          first_name: data.data.first_name.value,
          last_name: data.data.cpf.value,
          inquiry: transcriptText,
          message: transcriptText,
          display_name: data.data.first_name.value
        };

        if (department) {
          window.$zopim.livechat.departments.setVisitorDepartment(department);
        }

        createNewTag(params.last_name);
        createNewTag('Chatbot');

        chatbot.api.track("CONTACT_TICKET");

        // transcriptFile = new File([transcriptText], 'chatTranscript.txt', { type: 'text/plain' });
        return params;
      }

      function hideLauncher() {
        setTimeout(function(){
          jquery('.inbenta-bot__launcher').addClass('inb-hidden');
        }, 500);
       
      }
      /**
       * [importZendeskScript import snippet from ZD]
       * @param  {Object} params [description]
       * @param  {String} file   [description]
       * @return {[type]}        [description]
       */
      function importZendeskScript(params) {
        if ( params === void 0 ) params = {};

        // importScript({
        //   src: zdScript,
        //   id: 'ze-snippet'
        // }, () => {
        storageMgr.set('status', 'zendesk-chat');
        window.zE(function() {
          window.$zopim(function() {
            var connectionStatus = zChat.getConnectionStatus();
            // console.log('connection status: ', connectionStatus);
            if (connectionStatus === 'closed') {
              zChat.init({
                account_key: zdAccountKey
              });
              hideLauncher();
              window.zE('webWidget', 'show');
              window.zE('webWidget', 'open');
              
              // setTimeout(function(){
              //   $("#webWidget").contents().find("textarea").val(params.message);
              // },2000);
            } else {
              hideLauncher();
              setTimeout(function(){
                // console.log('entrei no setTimeout');
                window.zE('webWidget', 'show');
                window.zE('webWidget', 'open');
              }, 3000);

              chatbot.actions.hideConversationWindow();
              
            }
            window.zChat1 = zChat;
            if (!eventsLoaded) { handleZendeskChat(params); }
          });
        });
        // });
      }

      function handleZendeskChat(params) {
        if ( params === void 0 ) params = {};

        // console.log('handle zendesk events');
        if (defaultZendeskConf.preForm) {
          
          prefillForm(params);  
          window.zE('webWidget', 'open');
          window.zE('webWidget', 'chat:send', params.message || 'Oi');
          window.zE('webWidget', 'identify', {
            name: params.display_name || '',
            email: params.email || ''
          });
          hideLauncher();
          chatbot.actions.hideConversationWindow();
          
        } else {
          
          hideLauncher();
          prefillForm(params);
          window.zE('webWidget', 'open');
          window.zE('webWidget', 'chat:send', params.message || 'Oi');
          
        }
        addListeners();
        eventsLoaded = true;
      }

      function addListeners() {
        window.zE('webWidget:on', 'chat:start', function() {
          // console.log('start chat');
          // if (defaultZendeskConf.sendTranscript && !fileSent) sendChatTranscript();
          // window.zE('webWidget', 'chat:send', params.message || 'Oi');
        });

        window.zE('webWidget:on', 'chat:end', function() {
          storageMgr.set('status', 'inbenta-bot');
          // console.log('chat end');
          window.zE('webWidget', 'hide');
          // zChat.endChat();
          var resetInterval = setInterval(function() {
            var launcher = document.querySelector('.inbenta-bot__launcher');
            if (launcher && launcher.classList.length > 0 && launcher.classList.contains('inb-hidden')) {
              launcher.classList.remove('inb-hidden');
              clearInterval(resetInterval);
            }
          }, 1000);
        });
      }

      function prefillForm(params) {
        if ( params === void 0 ) params = {};

        if (defaultZendeskConf.preForm) {
          // console.log('>>>>>>>>  entrei IF defaultZendeskConf');
          window.zE('webWidget', 'prefill', {
            name: {
              value: params.display_name || '',
              readOnly: false // optional
            },
            email: {
              value: params.email || '',
              readOnly: false // optional
            },
            message: {
              value: params.message || '',
              readOnly: false // optional
            }
          });
        } else {
          // console.log('  entrei ELSE defaultZendeskConf <<<<<<<<<<');
          if ('display_name' in params) {
            // console.log('><><><><><><  entrei IF display_name ');
            window.zE('webWidget', 'identify', {
              name: params.display_name || '',
              email: params.email || ''
            });
          }
        }
      }
    } // return chatbot
  } // export default

  function customMessage(){
  	return function(chatbot) {
  		chatbot.subscriptions.onDisplayChatbotMessage(function(messageData, next) {
  			// console.log(messageData);
  			if(messageData.message == "A sua consulta foi enviada"){
  				messageData.message = "Ok";
  			}	
  			return next(messageData);
  		});

  		chatbot.subscriptions.onDisplayUserMessage(function(messageDataUser, next) {
  			// console.log(messageDataUser);

  			if(messageDataUser.userActivityOptions == "Sou cliente"){
  				inbChatbotApp.sdkConfig.source = "cliente";
  			}else if(messageDataUser.userActivityOptions == "Não sou cliente"){
  				inbChatbotApp.sdkConfig.source = "nao_cliente";
  			}

  			return next(messageDataUser);
  		});
  	}
  }

  /**
   * Store data in localStorage with the current chatbotId.
   * Remove the data when the session finishes
   */

  var StorageManager = function StorageManager(chatbotId, Chatbot) {
    this.DATA_INDEX = chatbotId + "_storage_data";
  };

  // Remove localStorage data when the session finishes
  StorageManager.prototype.removeDataOnResetSession = function removeDataOnResetSession (Chatbot) {
    Chatbot.subscriptions.onResetSession(function(next) {
      this.clear();
    });
  };

  // Checks if a given index has been stored in our data object
  StorageManager.prototype.has = function has (index) {
    var data = this.get();
    return data.hasOwnProperty(index);
  };

  // Retrieves an index value from our data object. If no index provided return the whole data object
  StorageManager.prototype.get = function get (index) {
    var data = JSON.parse(localStorage.getItem(this.DATA_INDEX));
    if (typeof data !== "object" || data === null) {
      data = {};
      this.set(null, data);
    }
    return index ? data[index] : data;
  };

  // Store a value in our data object
  StorageManager.prototype.set = function set (index, value) {
    if (index) {
      var data = this.get();
      data[index] = value;
    } else {
      var data = value;
    }
    localStorage.setItem(this.DATA_INDEX, JSON.stringify(data));
  };

  // Remove a given index from the data object.
  StorageManager.prototype.clear = function clear (index) {
    if (index) {
      var data = this.get();
      delete data[index];
      localStorage.setItem(this.DATA_INDEX, JSON.stringify(data));
    } else {
      localStorage.removeItem(this.DATA_INDEX);
    }
  };

  var webSdk = createCommonjsModule(function (module, exports) {
  /*!
   * Copyright Zendesk, Inc.
   * 
   * By downloading or accessing this software, You agree to the Zendesk Terms of Service (https://www.zendesk.com/company/terms) and Application Developer and API License Agreement (https://www.zendesk.com/company/application-developer-and-api-license-agreement) and acknowledge that such terms govern Your use of and access to the software.
   * 
   */
  !function(e, t) {
  module.exports = t();
  }(window, function() {
  return function(e) {
  function t(i) {
  if (n[i]) { return n[i].exports; }
  var o = n[i] = {
  i: i,
  l: !1,
  exports: {}
  };
  e[i].call(o.exports, o, o.exports, t);
  o.l = !0;
  return o.exports;
  }
  var n = {};
  t.m = e;
  t.c = n;
  t.d = function(e, n, i) {
  t.o(e, n) || Object.defineProperty(e, n, {
  enumerable: !0,
  get: i
  });
  };
  t.r = function(e) {
  "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
  value: "Module"
  });
  Object.defineProperty(e, "__esModule", {
  value: !0
  });
  };
  t.t = function(e, n) {
  1 & n && (e = t(e));
  if (8 & n) { return e; }
  if (4 & n && "object" == typeof e && e && e.__esModule) { return e; }
  var i = Object.create(null);
  t.r(i);
  Object.defineProperty(i, "default", {
  enumerable: !0,
  value: e
  });
  if (2 & n && "string" != typeof e) { for (var o in e) { t.d(i, o, function(t) {
  return e[t];
  }.bind(null, o)); } }
  return i;
  };
  t.n = function(e) {
  var n = e && e.__esModule ? function() {
  return e.default;
  } : function() {
  return e;
  };
  t.d(n, "a", n);
  return n;
  };
  t.o = function(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
  };
  t.p = "../../bin/";
  return t(t.s = 52);
  }([ function(e, t, n) {
  function i(e, t) {
  var n = {}, i = {}, o = function(t) {
  return !e.nodeType && e != window && e != document || ("FORM" != e.tagName || "submit" != t) && (!h.isCustomEvents && (h.isFF && h.isFF < 9 ? !document.createEvent("event")[t.toUpperCase()] : void 0 === e["on" + t]));
  }, r = function(t, i, r) {
  if (!t && "function" != typeof i) { throw "bad arguments to on / addEventListener"; }
  if (!(t in n)) {
  n[t] = [];
  o(t) || s(t);
  }
  n[t].push(i);
  return e;
  }, s = function(t) {
  if (!(t in i)) {
  i[t] = function(i) {
  i && (i.stopPropagation || f(i));
  var o, r = n[t], s = r.length, a = !0;
  r._active = !0;
  for (o = 0; o < s; o++) { try {
  if (!r[o]) { continue; }
  !1 === r[o].call(e, h.isCustomEvents && i instanceof h.CustomEvent ? i.detail : i) && (a = !1);
  } catch (e) {
  d.fire("error", e);
  } }
  r._active = !1;
  if (r._dirty) {
  for (o = 0; o < s; o++) { if (!r[o]) {
  o == s - 1 ? r.pop() : r[o--] = r.pop();
  s--;
  } }
  r._dirty = !1;
  }
  if (!1 === a) {
  if (i) {
  i.preventDefault();
  i.returnValue = !1;
  }
  return !1;
  }
  };
  e.attachEvent ? e.attachEvent("on" + t, i[t]) : e.addEventListener && e.addEventListener(t, i[t], !1);
  }
  }, a = function(t) {
  var o = i[t];
  if (o) {
  e.attachEvent ? e.detachEvent("on" + t, o) : e.addEventListener && e.removeEventListener(t, o, !1);
  delete i[t];
  delete n[t];
  }
  }, c = function(t, o) {
  var r = n[t];
  if (r) {
  for (var s = 0, c = r.length; s < c; s++) { if (r[s] === o) {
  1 == r.length ? i[t] ? a(t) : delete n[t] : r._active ? (r[s] = null, r._dirty = !0) : s == c - 1 ? r.pop() : r[s] = r.pop();
  break;
  } }
  return e;
  }
  }, u = function() {
  if (n && i) {
  for (var e in i) { i.hasOwnProperty(e) && a(e); }
  n = i = null;
  }
  }, l = function(t, i) {
  if (!h.isCustomEvents || o(t)) {
  var r = n[t], s = !0;
  if (r && r.length) {
  r._active = !0;
  var a, c, u;
  for (a = 0, c = r.length; a < c; a++) { try {
  if (!r[a]) { continue; }
  u = r[a].call(e, i);
  !1 === u && (s = !1);
  } catch (e) {
  d.fire("error", e);
  } }
  r._active = !1;
  if (r._dirty) {
  for (a = 0; a < c; a++) { if (!r[a]) {
  a == c - 1 ? r.pop() : r[a--] = r.pop();
  c--;
  } }
  r._dirty = !1;
  }
  }
  return s;
  }
  return e.dispatchEvent(new h.CustomEvent(t, {
  bubbles: !1,
  cancelable: !0,
  detail: i
  }));
  }, f = function(e) {
  e.preventDefault = f.preventDefault;
  e.stopPropagation = f.stopPropagation;
  e.target = e.srcElement;
  };
  f.preventDefault = function() {
  this.returnValue = !1;
  };
  f.stopPropagation = function() {
  this.cancelBubble = !0;
  };
  var p = {
  fire: l,
  on: r,
  un: c,
  unextendEvents: u
  };
  if (t) { return p; }
  for (var m in p) { p.hasOwnProperty(m) && (e[m] = p[m]); }
  h.bugs.leaksMemory && h.bugs.leaksMemory(function() {
  for (var t in p) { p.hasOwnProperty(t) && (e[t] = null); }
  });
  return e;
  }
  function o(e) {
  a(0, e);
  }
  function r(e) {
  a(1, e);
  }
  function s(e) {
  a(2, e);
  }
  function a(e, t) {
  e <= f ? t() : p[e].push(t);
  }
  function c(e) {
  for (;f < e; ) {
  f++;
  for (var t = 0; t < p[f].length; t++) { p[f][t](); }
  p[f] = null;
  }
  }
  function u() {
  f > 0 || (document.body && document.body.firstChild ? c(1) : window.setTimeout(u, 200));
  }
  function l() {
  c(2);
  }
  var h = n(3), d = {
  extend: i,
  body: i(document.body, !0),
  window: i(window, !0),
  document: i(document, !0),
  runAfterScriptReady: o,
  runAfterFirstChildReady: r,
  runAfterDomReady: s
  };
  d.extend(d);
  var f = 0, p = [ [], [], [], [] ];
  u();
  !function() {
  var e;
  if (h.isSafari) { e = window.setInterval(function() {
  if (/loaded|complete/i.test(document.readyState)) {
  window.clearInterval(e);
  l();
  }
  }, 20); } else if (document.addEventListener) { /loaded|complete/i.test(document.readyState) ? l() : document.addEventListener("DOMContentLoaded", l, !1); } else if (h.isIE) {
  window.attachEvent("onload", l);
  var t = document.createElement("document:ready");
  e = window.setInterval(function() {
  if (/loaded|complete/i.test(document.readyState)) {
  t = null;
  window.clearInterval(e);
  l();
  } else {
  try {
  t.doScroll("left");
  } catch (e) {
  return;
  }
  t = null;
  window.clearInterval(e);
  l();
  }
  }, 200);
  }
  }();
  e.exports = d;
  }, function(e, t) {
  var n = function(e) {
  return function(e, t) {
  return t ? null == e : void 0 === e;
  };
  }();
  e.exports = n;
  }, function(e, t) {
  function n(e) {
  return "function" == typeof e;
  }
  e.exports = n;
  }, function(e, t, n) {
  var i = (n(9), n(26)), o = (n(2), n(1)), r = function() {
  function e(e) {
  return e.replace(/^http:/, N ? "https:" : "http:");
  }
  function t() {
  if (void 0 !== window.innerHeight) { return window.innerHeight; }
  if (document.documentElement) { return document.documentElement.offsetHeight; }
  var e = document.getElementsByTagName("body");
  return e.length ? e[0].clientHeight : 0;
  }
  function n() {
  if (void 0 !== window.innerWidth) { return window.innerWidth; }
  if (document.documentElement) { return document.documentElement.offsetWidth; }
  var e = document.getElementsByTagName("body");
  return e.length ? e[0].clientWidth : 0;
  }
  function r() {
  if (!o(s)) { return s; }
  var e = document.createElement("div"), t = document.createElement("div"), n = e.style, i = t.style;
  n.overflow = "auto";
  n.width = n.height = "100px";
  n.position = "absolute";
  n.top = "-1000px";
  i.width = "100%";
  i.height = "200px";
  e.appendChild(t);
  document.body.appendChild(e);
  s = e.offsetWidth - e.clientWidth;
  document.body.removeChild(e);
  return s;
  }
  var s, a, c = navigator, u = c.userAgent.toLowerCase(), l = +(/trident.*rv:? *([0-9]+)/.exec(u) || [])[1] || !1, h = function() {
  for (var e = 3, t = document.createElement("div"), n = t.getElementsByTagName("i"); t.innerHTML = "<!--[if gt IE " + ++e + "]><i></i><![endif]-->", n[0]; ) { }
  return e > 4 ? e : document.documentMode;
  }(), d = 8 === h, f = 7 === h, p = 6 === h, m = !!window.opera && "[object Opera]" === Object.prototype.toString.call(window.opera), g = u.indexOf("edge") > -1, _ = "Google Inc." === c.vendor, v = "Apple Computer, Inc." === c.vendor, y = !g && !h && !m && (_ || v || /webkit|khtml/.test(u)), w = +/\d+/.exec(/firefox\/\d+/i.exec(c.userAgent) || ""), b = -1 !== u.indexOf("iphone"), $ = -1 !== u.indexOf("ipod"), E = -1 !== u.indexOf("ipad"), T = b || E || $, k = -1 !== u.indexOf("android"), A = -1 !== u.indexOf("wp7"), L = T || k || A, O = h && "msie" || w && "firefox" || m && "opera" || _ && "chrome" || v && "safari", x = "CSS1Compat" === document.compatMode, S = !x, D = h && S && document.documentElement && !!document.documentElement.style.setExpression, R = document.documentMode || h, C = -1 !== u.indexOf("windows") || -1 !== u.indexOf("win32"), I = -1 !== u.indexOf("macintosh") || -1 !== u.indexOf("mac os x"), N = "https:" === document.location.protocol, P = c.language || c.browserLanguage || c.userLanguage || c.systemLanguage, M = {
  noBoxSizing: R <= 7,
  ie: {
  cssBottomRight: p,
  cssFixed: p || D,
  buggyCSS: p || D
  }
  }, U = "textContent" in document.createElement("div"), V = !1, j = null;
  try {
  if (window.CustomEvent && /\[native code\]|\[object CustomEventConstructor\]/.test(window.CustomEvent.toString())) {
  new window.CustomEvent("testevent", {
  bubbles: !1,
  cancelable: !0,
  detail: !0
  });
  V = !0;
  j = window.CustomEvent;
  }
  } catch (e) {}
  switch (O) {
  case "msie":
  case "firefox":
  case "chrome":
  a = +/\d+/.exec(new RegExp(O + "[ /]\\d+").exec(u) || "");
  break;

  default:
  a = +/\d+/.exec(/version[ \/]\d+/.exec(u) || "");
  }
  var z = !1;
  try {
  var q = {
  get passive() {
  z = !0;
  }
  }, K = function() {};
  window.addEventListener("test", K, q);
  window.removeEventListener("test", K, q);
  } catch (e) {
  z = !1;
  }
  if (p) {
  var F = [];
  M.leaksMemory = function(e) {
  i.isFunction(e);
  F.push(e);
  };
  var H = function() {
  for (var e = 0; e < F.length; e++) { F[e](); }
  };
  M.leaksMemory.remove = function(e) {
  for (var t = F.length - 1; t >= 0; t--) { e == F[t] && F.splice(t, 1); }
  };
  window.attachEvent("onunload", H);
  }
  var G = "Shockwave Flash", B = "ShockwaveFlash.ShockwaveFlash", W = "application/x-shockwave-flash", Y = "application/x-java-vm";
  return {
  browser: O,
  version: a,
  isStrict: x,
  isQuirks: S,
  isOpera: m,
  isSafari: v,
  isWebKit: y,
  isChrome: _,
  isAndroid: k,
  isIPhone: b,
  isIPod: $,
  isIPad: E,
  isIOS: T,
  isWP7: A,
  isMobile: L,
  isNewIE: l,
  isEdge: g,
  isIE: h,
  isIE6: p,
  isIE7: f,
  isIE8: d,
  isFF: w,
  isCustomEvents: V,
  CustomEvent: j,
  engineIE: R,
  bugs: M,
  isWindows: C,
  isMac: I,
  isSecure: N,
  secureURL: e,
  hasFlash: function() {
  var e, t = c.plugins && c.plugins[G];
  if (t) {
  e = c.mimeTypes && c.mimeTypes[W];
  return e && !e.enabledPlugin ? null : t.description;
  }
  if (window.ActiveXObject) { try {
  t = new window.ActiveXObject(B);
  t.AllowScriptAccess = "always";
  return t.GetVariable("$version");
  } catch (e) {} }
  }(),
  hasJava: function() {
  var e = c.mimeTypes;
  return h ? !A && ("javaEnabled" in c && c.javaEnabled()) : e && (e = e[Y]) && (e = e.enabledPlugin) ? e.name : void 0;
  }(),
  language: P,
  getScrollbarSize: r,
  getWindowClientHeight: t,
  getWindowClientWidth: n,
  isTextContent: U,
  hasPassiveListeners: z
  };
  }();
  e.exports = r;
  }, function(e, t, n) {
  function i() {
  if (window.$zopim && window.$zopim.s) { return window.$zopim.s.src; }
  for (var e, t = document.getElementsByTagName("script"), n = /.*zopim.(com|net|org)\//, i = 0, o = t.length; i < o; i++) {
  e = t[i].src || "";
  if (n.test(e)) { return e; }
  }
  return "";
  }
  function o(e) {
  e && !p.test(e) && (e = null);
  var t = "id." + (l.brandDomain || "zopim.com");
  return "https://" + (e || t) + "/authenticated/web/jwt";
  }
  var r = n(1), s = n(5), a = n(3), c = n(23), u = n(13), l = function() {
  for (var e = i(), t = [ /\/?[?]/, /\/livechat\// ], n = [], o = 0; o < t.length; o++) {
  n = e.split(t[o]);
  if (n.length) { break; }
  }
  var r = n[1], s = n[0], a = /^(https?:)?\/\/[^\/]+/.exec(s), c = s.replace(/^(https?:)?\/\//i, "").split("/")[0], u = c.replace(/(.+\.)(?=.+\..+)/, ""), l = n[0].split("/");
  l = l.pop() == c ? n[0] : l.join("/");
  a = a && "zopim.com" !== c ? a[0] : "https://v2.zopim.com";
  return {
  accountKey: r,
  brandDomain: u,
  baseURL: l,
  rootURL: a
  };
  }(), h = "https://v2.zopim.com/widget", d = h + "/images", f = c.map([ ".zopim.com", ".zopim.org", ".zdch.at" ], u.escape), p = new RegExp("^[a-z][a-z0-9_-]*(\\.[a-z][a-z0-9_-]*)*(" + f.join("|") + ")(:\\d+)?$", "i");
  r(s.baseURL, !0) && (s.baseURL = a.secureURL(l.baseURL));
  var m = {
  ASSETS_URL: h,
  IMAGES_URL: d,
  SOUNDS_URL: "https://v2.zopim.com/widget/sounds",
  FONTS_URL: "https://v2.zopim.com/widget/fonts",
  ASSETS_LEGACY: document.location.protocol + "//cdn.zopim.com/assets",
  BRANDING_URL: "https://www.zopim.com",
  AVATARS: {
  CONCIERGE: d + "/avatar_simple_agent.png",
  AGENT: d + "/avatar_simple_agent.png",
  VISITOR: d + "/avatar_simple_visitor.png",
  DEFAULT: d + "/avatar_simple_visitor.png"
  },
  ACCOUNT_KEY: l.accountKey,
  BRAND_DOMAIN: l.brandDomain,
  COUNTRY_CODE: function() {
  var e = '<!--# echo var="http_cf_ipcountry" default="geo" -->'.toUpperCase();
  "<" == e.charAt(0) && (e = "geo");
  return e;
  }(),
  AUTH_URL: "https://www.zopim.com/auth/$NAME/$KEY-$MID",
  AUTH_LOGOUT_URL: "https://www.zopim.com/auth/logout/$KEY-$MID",
  AUTH_SERVER_URL: o(),
  IS_POPOUT: window.$zopim_popout,
  POPOUT_WINDOW_PREFIX: "zlivechatpopout_",
  POPOUT_URL: l.rootURL + "/widget/livechat.html",
  CALLBACK_FILE_UPLOAD_PATH: "/client/widget/upload",
  FILE_UPLOAD_PATH: "/client/widget/uploads",
  FILE_UPLOAD_MAX: 20971520,
  RESEND_MSG_TIMEOUT: 5e3,
  FILE_REPLACE_SOURCE: /^(\s*https?\:\/\/v2(?:assets|uploads)\.zopim\.)com(\/)/i,
  FILE_REPLACE_RESULT: "$1io$2",
  CHAT_LOG_REMEMBER_COUNT: 10,
  getAuthServerURL: o
  };
  e.exports = m;
  }, function(e, t) {
  var n = {
  build_number: "20190312.045123",
  git_commit: "6a98867ed130c98803ae12e96dcec4a218bde5f9",
  release_tag: "1.8.1"
  };
  e.exports = n;
  }, function(e, t, n) {
  function i(e, t) {
  for (var n, i = document.createElement("div"), o = 0, r = P.length; o < r; o++) { if (void 0 !== i.style[P[o]]) {
  n = t[o];
  break;
  } }
  return n ? e ? function(e, t, i) {
  e.autobind(t, n, i);
  } : function(e, t, i) {
  M && e.autounbind(t, n, i);
  } : function() {};
  }
  function o(e, t) {
  for (var n = {}, i = 0, o = t.length; i < o; i++) {
  var r = t[i];
  r in e && (n[r] = e[r]);
  }
  return n;
  }
  function r() {
  var arguments$1 = arguments;

  for (var e, t, n = arguments.length, i = 1, o = arguments[0] || {}; i < n; i++) { if (null != (e = arguments$1[i])) { for (t in e) { e.hasOwnProperty(t) && o !== e[t] && (o[t] = e[t]); } } }
  return o;
  }
  function s(e, t) {
  for (var n in t) { if (t.hasOwnProperty(n)) { if (t[n] && t[n].constructor && t[n].constructor === Object) {
  e[n] = e[n] || {};
  s(e[n], t[n]);
  } else { e[n] = t[n]; } } }
  return e;
  }
  function a(e, t) {
  for (var n in t) { if (t.hasOwnProperty(n)) {
  if (!(n in e)) { continue; }
  t[n] && t[n].constructor && t[n].constructor === Object ? a(e[n], t[n]) : delete e[n];
  } }
  return e;
  }
  function c() {
  if (void 0 === O) { try {
  O = u();
  } catch (e) {} }
  return O;
  }
  function u() {
  if (!window.getComputedStyle) { return !1; }
  var e = document.createElement("div"), t = "border-box";
  document.body.appendChild(e);
  e.style.height = "10px";
  e.style.padding = "5px";
  e.style.boxSizing = t;
  e.style.webkitBoxSizing = t;
  e.style.mozBoxSizing = t;
  var n = parseInt(window.getComputedStyle(e).height, 10);
  document.body.removeChild(e);
  return 10 != n;
  }
  function l(e) {
  var t = e.getComputedStyle();
  if ("auto" == t.height) { return e.getHeight(); }
  var n = parseInt(t.height, 10) || 0;
  V.computedHeightBoxSizingBug() && (n += (parseInt(t.paddingTop, 10) || 0) + (parseInt(t.paddingBottom, 10) || 0) + (parseInt(t.borderTopWidth, 10) || 0) + (parseInt(t.borderBottomWidth, 10) || 0));
  return n + "px";
  }
  function h(e) {
  function t() {
  this.addClass("hover");
  }
  function n() {
  this.removeClass("hover");
  }
  if (x.bugs.noBoxSizing) {
  e.on("mouseover", t);
  e.on("mouseout", n);
  }
  }
  function d(e, t) {
  for (var n, i = t.split("."); i.length; ) {
  n = i.shift();
  S(e[n], !0) && (e[n] = {});
  e = e[n];
  }
  return e;
  }
  function f(e, t) {
  if (0 === t.indexOf(e.path)) {
  for (var n, i = e.path.split(".").length, o = t.split(".").slice(i), r = e.update; o.length; ) {
  n = o.shift();
  if (!(n in r)) { return; }
  r = r[n];
  }
  return r;
  }
  }
  function p(e, t, n) {
  e = e.split(".");
  var i = e.pop();
  if (i) {
  for (var o = 0, r = e.length; o < r; o++) {
  e[o] in n || (n[e[o]] = {});
  n = n[e[o]];
  }
  n[i] = t;
  }
  }
  function m(e) {
  for (var t = e.split("."), n = "." + t.splice(t.length - 2, 2).join("."); t.length; ) {
  var i = {
  domain: n,
  path: "/"
  };
  R.set("zte2095", "1", i);
  if ("1" == R.get("zte2095")) {
  R.remove("zte2095", i);
  break;
  }
  n = "." + t.pop() + n;
  }
  return n;
  }
  function g(e) {
  return z.test(e);
  }
  function _(e) {
  return j.test(e);
  }
  function v(e) {
  if (e && "object" == typeof e) {
  var t = [];
  for (var n in e) { e.hasOwnProperty(n) && t.push(n); }
  return t;
  }
  }
  function y(e) {
  if (window.Image) { try {
  var t = new window.Image();
  t.onload = t.onerror = function() {
  e(!(1 != this.width || 1 != this.height));
  };
  t.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
  } catch (t) {
  e();
  } } else { e(); }
  }
  function w(e, t) {
  e = parseInt(e, 10);
  isNaN(e) && (e = 0);
  var n = e < 0;
  e = Math.abs(e).toString().split("");
  for (var i = Math.max(t - e.length, 0); i--; ) { e.unshift("0"); }
  n && e.unshift("-");
  return e.join("");
  }
  function b(e, t) {
  function n(e, t, n) {
  return n.replace("<hours>", e).replace("<minutes>", t);
  }
  var i = D("<hours>:<minutes>"), o = D("<hours>:<minutes> am"), r = D("<hours>:<minutes> pm"), s = "24" === t ? 24 : 12, a = function(e, t) {
  return e - Math[e > 0 ? "floor" : "ceil"](e / t) * t;
  }(Math[e > 0 ? "floor" : "ceil"](e / 60), s), c = V.pad(Math.abs(e) % 60, 2);
  if (24 === s) { return n(V.pad(a, 2), c, i); }
  var u = 0 === a ? 12 : a;
  return Math.abs(e / 60) % 24 < 12 ? n(u, c, o) : n(u, c, r);
  }
  function $(e) {
  return e && e.replace(C.FILE_REPLACE_SOURCE, C.FILE_REPLACE_RESULT);
  }
  function E(e, t) {
  t = parseInt(t, 10);
  if (!t) { return e.getValue(); }
  var n = e.getKeys(), i = n.length, o = {};
  if (i <= t) { return e.getValue() || o; }
  for (var r = 0; r < i; r++) { n[r] = parseInt(n[r], 10); }
  n = n.sort().slice(-t);
  var s, a = e.getValue();
  if (!a) { return o; }
  for (r = 0, i = n.length; r < i; r++) {
  s = n[r];
  o[s] = a[s];
  }
  return o;
  }
  function T(e, t) {
  var n;
  if (e.leaf && e.parentNode) {
  n = {};
  n[e.name] = t;
  e.parentNode.write(n);
  } else { e.write(t); }
  }
  function k() {
  if (x.isNewIE) { try {
  "body" !== document.activeElement.nodeName.toLowerCase() && document.activeElement.focus();
  } catch (e) {} }
  }
  function A() {
  window.console && window.console.warn && window.console.warn("The Zopim widget embed code is invalid. Please email chat@zendesk.com with your account key: " + C.ACCOUNT_KEY);
  }
  function L(e, t, n) {
  return C.AUTH_URL.replace("$NAME", e).replace("$KEY", t).replace("$MID", n);
  }
  var O, x = n(3), S = n(1), D = n(12), R = n(19), C = n(4), I = "-webkit- -moz- -o- -ms- ".split(" "), N = "webkit Moz O ms ".split(" "), P = [ "transition", "MozTransition", "OTransition", "WebkitTransition" ], M = [ "transitionend", "transitionend", "otransitionend", "webkitTransitionEnd" ], U = [ "animationend", "animationend", "oanimationend", "webkitAnimationEnd" ], V = {
  contains: function() {
  var e = document.documentElement;
  return e.compareDocumentPosition ? function(e, t) {
  e = e.dom || e;
  t = t.dom || t;
  return !!(16 & e.compareDocumentPosition(t));
  } : e.contains ? function(e, t) {
  e = e.dom || e;
  t = t.dom || t;
  var n = 9 === e.nodeType ? e.documentElement : e, i = t.parentNode;
  return e === i || !!(i && 1 === i.nodeType && n.contains && n.contains(i));
  } : function(e, t) {
  e = e.dom || e;
  t = t.dom || t;
  for (;t = t.parentNode; ) { if (t === e) { return !0; } }
  return !1;
  };
  }(),
  onTransitionEnd: i(!0, M),
  unTransitionEnd: i(!1, M),
  onAnimationEnd: i(!0, U),
  unAnimationEnd: i(!1, U),
  css_prefixes: I,
  cssom_prefixes: N,
  isStyleSupported: function() {
  function e(e) {
  for (var t = e.charAt(0).toUpperCase() + e.slice(1), i = (e + " " + N.join(t + " ") + t).split(" "), o = 0; o < i.length; o++) { if (void 0 !== n[i[o]]) { return !0; } }
  return !1;
  }
  var t = document.createElement("div"), n = t.style;
  return e;
  }(),
  pick: o,
  shallowExtend: r,
  fullyExtend: s,
  fullyDelete: a,
  computedHeightBoxSizingBug: c,
  getComputedHeight: l,
  hoverFix: h,
  getEffectiveTLD: m,
  descendsObj: d,
  insertObj: p,
  getValueByReference: f,
  isDefaultName: _,
  getKeys: v,
  supportsDataURI: y,
  isIE: function() {
  return x.isIE || /Trident\//.test(window.navigator.userAgent);
  }(),
  pad: w,
  formatMinutesAsHours: b,
  replaceFileHostname: $,
  getLastLogEntries: E,
  writeNode: T,
  isAgentNick: g,
  refocusActiveElement: k,
  warnBadEmbed: A,
  getAuthLoginUrl: L
  }, j = /^Visitor [0-9]{3,}$/, z = /^agent:[0-9]+/i;
  e.exports = V;
  }, function(e, t) {
  function n(e) {
  return "[object Array]" == Object.prototype.toString.call(e);
  }
  e.exports = n;
  }, function(e, t, n) {
  function i(e, t) {
  if (!r(e)) { throw new TypeError("FunctionUtils.bind - what is trying to be bound is not callable"); }
  if (r(e.bind) && !("prototype" in e.bind)) { return e.bind.apply(e, a.call(arguments, 1)); }
  var n = a.call(arguments, 2), i = function() {}, o = function() {
  return e.apply(this instanceof i && t ? this : t, n.concat(a.call(arguments)));
  };
  i.prototype = o.prototype;
  o.prototype = new i();
  return o;
  }
  function o(e) {
  var t;
  return function() {
  if (!t) {
  t = !0;
  return e.apply(this, a.call(arguments));
  }
  };
  }
  var r = n(2), s = {
  bind: i,
  once: o
  }, a = Array.prototype.slice;
  e.exports = s;
  }, function(e, t) {
  function n(e) {
  if (null == this) { throw new TypeError(); }
  var t = Object(this), n = t.length >>> 0;
  if (0 === n) { return -1; }
  var i = 0;
  if (arguments.length > 0) {
  i = Number(arguments[1]);
  i != i ? i = 0 : 0 != i && i != 1 / 0 && i != -1 / 0 && (i = (i > 0 || -1) * Math.floor(Math.abs(i)));
  }
  if (i >= n) { return -1; }
  for (var o = i >= 0 ? i : Math.max(n - Math.abs(i), 0); o < n; o++) { if (o in t && t[o] === e) { return o; } }
  return -1;
  }
  function i(e, t, n) {
  return o.call(t, e, n);
  }
  var o = Array.prototype.indexOf;
  "function" == typeof o && /\[native code\]/.test(o.toString()) || (o = n);
  e.exports = i;
  }, function(e, t, n) {
  function i(e) {
  if (!(this instanceof i)) {
  c || i._initSingleton(window);
  return c;
  }
  if (e) { return i.parseQuery(e); }
  this.store = {};
  }
  function o(e, t, n) {
  if (void 0 === t && void 0 === n) { return e; }
  void 0 === t && (t = "string");
  if (!(t in a)) { throw "invalid type requested"; }
  return void 0 === e ? void 0 !== n ? n : a[t] : "boolean" === t ? s.test(e) : "integer" === t ? !0 === e ? 1 : parseInt(e, 10) : "float" === t ? !0 === e ? 1 : parseFloat(e) : e;
  }
  var r = n(7), s = /^(1|on|true)$/i, a = {
  boolean: !1,
  integer: 0,
  float: 0,
  string: ""
  }, c = null;
  i._initSingleton = function(e) {
  c = new i(e.location.search);
  };
  i.buildQuery = function(e) {
  var t, n, i, o, s, a, c = [], u = [];
  for (s in e) { e.hasOwnProperty(s) && c.push(s); }
  c.sort();
  for (t = 0, i = c.length; t < i; t++) {
  s = c[t];
  a = e[s];
  s = window.encodeURIComponent(s);
  if (r(a)) { if (1 !== a.length || !0 !== a[0]) { for (n = 0, o = a.length; n < o; n++) { u.push(s + "=" + window.encodeURIComponent(a[n] + "")); } } else { u.push(s); } } else { u.push(s + "=" + window.encodeURIComponent(a + "")); }
  }
  return u.join("&");
  };
  i.parseQuery = function(e) {
  var t, n, o = new i();
  e = e.replace(/^\?|\/+$/g, "");
  var r, s, a = e.split("&");
  for (t = 0, n = a.length; t < n; t++) {
  var c = a[t];
  if (c.length) {
  var u = c.indexOf("=");
  if (u <= -1) {
  r = c;
  s = !0;
  } else {
  r = c.slice(0, u);
  s = window.decodeURIComponent(c.slice(u + 1));
  }
  o.add(window.decodeURIComponent(r), s);
  }
  }
  return o;
  };
  i.getHash = function(e, t) {
  var n = t || window.location.hash;
  return i.parseQuery(n.replace(/^#/, "")).get(e);
  };
  var u = i.prototype;
  u.add = function(e, t) {
  this.has(e) ? this.store[e].push(t) : this.store[e] = [ t ];
  };
  u.has = function(e) {
  return this.store.hasOwnProperty(e);
  };
  u.getLast = function(e, t, n) {
  return this.has(e) ? this.getAt(e, this.store[e].length - 1, t, n) : o(void 0, t, n);
  };
  u.getFirst = function(e, t, n) {
  return this.getAt(e, 0, t, n);
  };
  u.getAt = function(e, t, n, i) {
  return o(this.has(e) ? this.store[e][t] : void 0, n, i);
  };
  u.getRaw = function(e) {
  return this.has(e) ? this.store[e].concat() : [];
  };
  u.get = u.getLast;
  u.toString = function() {
  return i.buildQuery(this.store);
  };
  e.exports = i;
  }, function(e, t, n) {
  function i(e) {
  return '"' + e.replace(h, o) + '"';
  }
  function o(e) {
  return d[e] || "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4);
  }
  function r(e) {
  switch (typeof e) {
  case "string":
  return i(e);

  case "number":
  return isFinite(e) ? e.toString() : "null";

  case "boolean":
  return String(e);

  case "object":
  if (!e) { return "null"; }
  var t, n, o = [];
  if (u(e)) {
  for (t = 0, n = e.length; t < n; t++) { o[t] = r(e[t]) || "null"; }
  return "[" + o.join(",") + "]";
  }
  var s, a, c = [];
  for (s in e) { e.hasOwnProperty(s) && c.push(s); }
  c.sort();
  for (t = 0, n = c.length; t < n; t++) {
  s = c[t];
  a = r(e[s]);
  a && o.push(i(s) + ":" + a);
  }
  if (o.length) { return "{" + o.join(",") + "}"; }
  }
  }
  function s(e, t, n) {
  return t ? m[t] : String.fromCharCode(parseInt(n, 16));
  }
  function a(e) {
  var t, n, i, o, r, a = e.match(f), c = a.length, u = a[0];
  "{" == u ? (t = {}, r = 1) : "[" == u ? (t = [], r = 1) : (t = [], r = 0, n = !0);
  var l = [ t ];
  for (c = a.length; r < c; ++r) {
  u = a[r];
  switch (u.charCodeAt(0)) {
  case 91:
  o = l[0];
  l.unshift(o[i || o.length] = []);
  i = void 0;
  break;

  case 93:
  l.shift();
  break;

  case 123:
  o = l[0];
  l.unshift(o[i || o.length] = {});
  i = void 0;
  break;

  case 125:
  l.shift();
  break;

  case 102:
  o = l[0];
  o[i || o.length] = !1;
  i = void 0;
  break;

  case 110:
  o = l[0];
  o[i || o.length] = null;
  i = void 0;
  break;

  case 116:
  o = l[0];
  o[i || o.length] = !0;
  i = void 0;
  break;

  case 34:
  u = u.substring(1, u.length - 1);
  -1 !== u.indexOf(_) && (u = u.replace(p, s));
  o = l[0];
  if (void 0 == i) {
  if (!(o instanceof Array)) {
  i = u || g;
  break;
  }
  i = o.length;
  }
  o[i] = u;
  i = void 0;
  break;

  default:
  o = l[0];
  o[i || o.length] = +u;
  i = void 0;
  }
  }
  if (n) {
  if (1 == l.length) { return t[0]; }
  } else if (!l.length) { return t; }
  throw "error";
  }
  var c = n(1), u = n(7), l = (n(9), !c(window) && window.JSON || {
  parse: a,
  stringify: r
  }), h = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, d = {
  "\b": "\\b",
  "\t": "\\t",
  "\n": "\\n",
  "\f": "\\f",
  "\r": "\\r",
  "\\": "\\\\",
  '"': '\\"'
  }, f = new RegExp('(?:false|true|null|[\\{\\}\\[\\]]|(?:-?\\b(?:0|[1-9][0-9]*)(?:\\.[0-9]+)?(?:[eE][+-]?[0-9]+)?\\b)|(?:"(?:[^\\0-\\x08\\x0a-\\x1f"\\\\]|\\\\(?:["/\\\\bfnrt]|u[0-9A-Fa-f]{4}))*"))', "g"), p = new RegExp("\\\\(?:([^u])|u(.{4}))", "g"), m = {
  '"': '"',
  "/": "/",
  "\\": "\\",
  b: "\b",
  f: "\f",
  n: "\n",
  r: "\r",
  t: "\t"
  }, g = new String(""), _ = "\\";
  e.exports = l;
  }, function(e, t, n) {
  function i(e, t) {
  if (isNaN(e)) {
  var n = new o();
  n.add("_", e);
  return n;
  }
  -1 == e && (e = v.length);
  var i = v[e];
  i || (v[e] = i = new o());
  if ("string" == typeof t) { i.add("_", t); } else { for (var r in t) { t.hasOwnProperty(r) && i.add(r, t[r]); } }
  return i;
  }
  function o() {
  function e(e, t) {
  u[e] = t;
  }
  function t(e) {
  r(e, h);
  }
  function n(e) {
  l.push(e);
  }
  function i() {
  return s();
  }
  function s(e) {
  return u[e || y] || u._;
  }
  function a(e) {
  var t, n = s(e);
  for (t = 0; t < l.length; t++) { l[t](n); }
  }
  function c(e, t) {
  var n, i = new o();
  v[u._] = i;
  for (var r in u) { if (u.hasOwnProperty(r)) {
  n = u[r];
  if ("string" != typeof n) { continue; }
  n = n[e].apply(n, t);
  i.add(r, n);
  } }
  return i;
  }
  for (var u = {}, l = [], h = {
  add: e,
  bind: t,
  onTranslate: n,
  toJSON: i,
  toString: s,
  update: a
  }, d = [ "concat", "replace", "toLowerCase", "toUpperCase" ], f = 0; f < d.length; f++) { h[d[f]] = function(e) {
  return function() {
  return c(e, arguments);
  };
  }(d[f]); }
  return h;
  }
  function r(e, t) {
  for (var n = 0; n < w.length; n++) { if (w[n] == e) {
  b[n] = t;
  return;
  } }
  w.push(e);
  b.push(t);
  }
  function s(e) {
  for (var t = 0; t < w.length; t++) { if (w[t] == e) {
  w.splice(t, 1);
  b.splice(t, 1);
  return;
  } }
  }
  function a(e) {
  e = e.split(/-|_/).slice(0, 2);
  var t = e[0] = e[0].toLowerCase();
  e[1] && (e[1] = e[1].toUpperCase());
  e = e.join("_");
  return m.languages ? e in m.languages ? e : t in m.languages ? t : null : null;
  }
  function c(e) {
  var t, n, o, r, s, c;
  e = a(e);
  if (e) {
  s = m.languages[e];
  if (s) {
  c = g[m.languages[e]];
  if (c) {
  i.language = y = e;
  _.ensureLoaded(c, function(i) {
  i && u(e);
  if (e == y) {
  for (t = 0, n = v.length; t < n; t++) { v[t].update instanceof Function && v[t].update(e); }
  for (t = 0, n = w.length; t < n; t++) {
  o = w[t];
  r = b[t].toString();
  if (E) { o.textContent = r; } else if ("string" == typeof o.innerText) { o.innerText = r; } else if ("string" == typeof o.nodeValue) { try {
  o.data = r;
  } catch (e) {} }
  }
  $._active = !0;
  n = $.length;
  for (t = 0; t < n; t++) { try {
  $[t] && $[t](e);
  } catch (e) {} }
  $._active = !1;
  if ($._dirty) {
  for (t = 0; t < n; t++) { if (!$[t]) {
  t == n - 1 ? $.pop() : $[t--] = $.pop();
  n--;
  } }
  $._dirty = !1;
  }
  }
  });
  }
  }
  }
  }
  function u(e) {
  var t, n = g[m.languages[e]];
  for (t = 0; t < n.length; t++) { 0 !== n[t] && v[t].add(e, n[t]); }
  }
  function l(e) {
  $.push(e);
  }
  function h(e) {
  for (var t = 0, n = $.length; t < n; t++) { if ($[t] == e) {
  $._active ? ($[t] = null, $._dirty = !0) : t == n - 1 ? $.pop() : $[t] = $.pop();
  break;
  } }
  }
  function d() {
  return !(-1 == y.search(T));
  }
  function f(e) {
  return d() ? e.replace(/left/, "%left%").replace(/right/, "left").replace(/%left%/, "right").replace(/ltr/, "%ltr%").replace(/rtl/, "ltr").replace(/%ltr%/, "rtl") : e;
  }
  var p = n(3), m = n(5), g = n(22), _ = n(47), v = [], y = "_", w = [], b = [], $ = [], E = p.isTextContent, T = /^ar|^fa|^he|^ku|^ur/, k = m.strings;
  if (k) { for (var A = 0; A < k.length; A++) { i(A, k[A]); } }
  i.bind = r;
  i.flip = f;
  i.onLanguage = l;
  i.unLanguage = h;
  i.update = c;
  i.unbind = s;
  i.rtl = d;
  i.findClosestLanguage = a;
  e.exports = i;
  }, function(e, t) {
  var n = "[a-z0-9!#$%&'*+\\/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+\\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+([a-z0-9][a-z0-9-]*[a-z0-9])", i = "(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)", o = {
  email: new RegExp("^" + n + "$", "i"),
  ip_token: new RegExp("^" + i + "$"),
  ip: new RegExp("^(?:" + i + "\\.){3}" + i + "$"),
  tld: /^(AERO|ARPA|ASIA|A[CDEFGILMNOQRSTUWXZ]|BIZ|B[ABDEFGHIJMNORSTVWYZ]|CAT|COM|COOP|C[ACDFGHIKLMNORUVXYZ]|D[EJKMOZ]|EDU|E[CEGRSTU]|F[IJKMOR]|GOV|G[ABDEFGHILMNPQRSTUWY]|H[KMNRTU]|INFO|INT|I[DELMNOQRST]|JOBS|J[EMOP]|K[EGHIMNPRWYZ]|L[ABCIKRSTUVY]||MIL|MOBI|MUSEUM|M[ACDEGHKLMNOPQRSTUVWXYZ]|NAME|NET|N[ACEFGILOPRUZ]|ORG|OM|PRO|P[AEFGHKLMNRSTWY]|QA|R[EOSUW]|S[ABCDEGHIJKLMNORTUVYZ]|TEL|TRAVEL|T[CDFGHJKLMNOPRTVWZ]|U[AGKSYZ]|V[ACEGINU]|W[FS]|XN|Y[ET]|Z[AMW])$/i,
  search: {
  email: new RegExp(n, "ig"),
  email_lws: new RegExp("(^|\\s+)" + n, "ig"),
  hurl: /(^|\s+)(?:(?:https?|ftps?):\/\/)(?:\S+)/gi,
  url: /(^|\s+)(?:[\w-]+\.)+(\w{2,})(?::[0-9]+)?(?:\/\S*)?/g,
  phone_number: /(?:^|\s+)(?:(?:\+?\d{1,3}|\(\d{1,3}\))([-.\s])?)?\d{3,10}(?:([-.\s])\d{3,10})?/gi
  },
  escape: function(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
  };
  e.exports = o;
  }, function(e, t) {
  function n(e) {
  return "string" == typeof e;
  }
  e.exports = n;
  }, function(e, t) {
  function n(e) {
  return "number" == typeof e;
  }
  e.exports = n;
  }, function(e, t, n) {
  function i(e) {
  p = e;
  }
  function o(e) {
  E = e ? v.getAuthServerURL(e) : v.AUTH_SERVER_URL;
  }
  function r(e) {
  d = e;
  }
  function s() {
  return d;
  }
  function a(e) {
  if (f) {
  +new Date() - f.issued_at >= f.expires_in - 6e4 ? y.authenticate(function(t) {
  if (t) {
  p && p.$("visitor").$("auth_status$string").update("failed");
  e(t, null);
  } else { e(null, f.id_token); }
  }) : e(null, f.id_token);
  } else { e(null, null); }
  }
  function c() {
  d = void 0;
  f = void 0;
  p && p.$("visitor").$("authenticated$bool").update(!1);
  }
  function u() {
  return !!f;
  }
  function l(e) {
  d && d(g.once(function(t) {
  t && m(t) ? y.exchangeToken({
  account_key: v.ACCOUNT_KEY,
  auth_url: E,
  site_jwt: t,
  state: f && f.state ? f.state : null
  }, function(t, n) {
  f = n;
  p && p.$("visitor").$("authenticated$bool").update(!t);
  e(t);
  }) : e({
  reason: "invalid jwt in callback"
  });
  }));
  }
  function h(e, t) {
  var n = new XMLHttpRequest();
  n.open("POST", e.auth_url, !0);
  n.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  n.onload = function() {
  if (t) {
  var e;
  try {
  var i = n.response;
  if ("" === i) { throw w; }
  e = JSON.parse(i);
  } catch (e) {
  t({
  reason: w
  });
  return;
  }
  200 === n.status ? t(void 0, {
  issued_at: +new Date(),
  id_token: e.id_token,
  expires_in: 1e3 * e.expires_in,
  state: e.state
  }) : t({
  reason: $,
  details: e.details
  });
  }
  };
  n.onerror = function() {
  t && t({
  reason: b
  });
  };
  var i = {
  account_key: e.account_key,
  token: e.site_jwt,
  format: "json"
  };
  e.state && (i.state = e.state);
  var o = _.buildQuery(i);
  n.send(o);
  }
  var d, f, p, m = n(14), g = n(8), _ = n(10), v = n(4), y = {
  authenticate: l,
  isAuthenticated: u,
  getSiteJWTFunc: s,
  retrieveIDToken: a,
  clearIdentity: c,
  setOverrideHost: o,
  setSiteJWTFunc: r,
  setDataNode: i,
  exchangeToken: h
  }, w = "format error", b = "network/security error", $ = "jwt verification error", E = v.AUTH_SERVER_URL;
  e.exports = y;
  }, function(e, t, n) {
  function i(e) {
  b.setActivityWindow(e);
  k = $.ACCOUNT_KEY;
  g = (e || window).location.hostname;
  _ = /\b(?:\d{1,3}\.){3}\d{1,3}/.test(g) ? g : E.getEffectiveTLD(g);
  }
  function o() {
  if ($.IS_POPOUT) { return b.get(O) || y().get("mid"); }
  var e = h();
  return e || (b.get(L) || "");
  }
  function r(e) {
  b.set(L, e, {
  path: "/",
  ttl: 365,
  domain: _
  });
  }
  function s() {
  b.remove(L, {
  path: "/",
  domain: _
  });
  }
  function a() {
  var e = d();
  if ("boolean" == typeof e) { return e; }
  var t = b.get(x);
  t = parseInt(t, 10);
  return 0 !== t && (1 === t || void 0);
  }
  function c() {
  b.remove(x, {
  path: "/",
  domain: _
  });
  }
  function u(e) {
  e = v(e);
  e = e ? 1 : 0;
  b.set(x, e, {
  path: "/",
  ttl: 365,
  domain: _
  });
  }
  function l() {
  s();
  w.remove(A);
  }
  function h() {
  var e = b.getJSONCookie("__zlcid");
  b.remove("__zlcid", {
  path: "/"
  });
  if (e.mID) { return e.mID; }
  var t = f("__zlcstore");
  b.remove("__zlcstore", {
  path: "/",
  domain: _
  });
  return t && t.mID ? t.mID : void 0;
  }
  function d() {
  var e, t = f("__zlcprivacy");
  if ("boolean" == typeof t) {
  e = t;
  u(t);
  }
  return e;
  }
  function f(e) {
  return b.getJSONCookie(e)[k];
  }
  function p(e, t) {
  var n = w.get(A) || {};
  n[k] || (n[k] = {});
  var i = n[k];
  i[e] = t;
  i.timestamp = +new Date();
  w.set(A, n);
  }
  function m(e) {
  var t = w.get(A) || {};
  if (!t[k]) { return {}; }
  var n = t[k];
  return n.timestamp ? +new Date() - n.timestamp > T ? {} : n[e] : n[e] || {};
  }
  var g, _, v = n(42), y = n(10), w = n(41), b = n(19), $ = n(4), E = n(6), T = 48e4, k = $.ACCOUNT_KEY, A = "__zlcstore", L = "__zlcmid", O = "__zlcpomid", x = "__zlcprivacy", S = {
  init: i,
  DOM: {
  saveVariable: p,
  getVariable: m
  },
  Cookie: b,
  clearAll: l,
  setIdentity: r,
  getIdentity: o,
  clearIdentity: s,
  clearAllowCookieLaw: c,
  getAllowCookieLaw: a,
  setAllowCookieLaw: u
  };
  e.exports = S;
  }, function(e, t, n) {
  function i() {
  var e = this;
  this.arr = [];
  this.validate = y.bind(this.validate, this);
  $.concat([ "validateAndThrow", "validateAndLog" ]).forEach(function(t) {
  e.validate[t] = e[t].bind(e);
  });
  return this.validate;
  }
  function o(e) {
  return function(t) {
  if (0 === e.length) { return !1; }
  for (var n = 0, i = e.length; n < i; n++) {
  if (!(0, e[n])(t)) { return !1; }
  }
  return new _('Expect "' + t + '" to fulfill at least one condition', t);
  };
  }
  function r(e) {
  return function(t) {
  if (t !== e) { return new _('expect "' + t + '" to equal "' + e + '"', t); }
  };
  }
  function s(e, t) {
  return function(n) {
  if ("object" != typeof n || !n) { return new _('Expect "' + n + '" to be an object', n); }
  if (t && t.requiredKeys) { for (var i = 0, o = t.requiredKeys.length; i < o; i++) {
  var r = t.requiredKeys[i];
  if (!(r in n)) {
  var s = new _('Expect key "' + r + '" to be defined', n);
  return s.unshiftPath(r);
  }
  } }
  for (var a in n) { if (n.hasOwnProperty(a)) {
  var c, u = n[a], l = e[a];
  if (l) { c = l(u); } else {
  if (t && !t.whitelistedKeysOnly) { continue; }
  c = new _('The key "' + a + '" is not whitelisted', n);
  }
  if (c) { return c.unshiftPath(a); }
  } }
  };
  }
  function a(e) {
  return function(t) {
  if (typeof t !== e) { return new _('Expect "' + t + '" to have type "' + e + '"', t); }
  };
  }
  function c() {
  return function(e) {
  if (!e) { return new _('Expect "' + e + '" to be truthty', e); }
  };
  }
  function u(e) {
  return function(t) {
  e.lastIndex = 0;
  if (!e.test(t)) { return new _('Expect "' + t + '" to match predefined format', t); }
  };
  }
  function l(e) {
  return function(t) {
  if (t.length < e) { return new _('Expect the length of "' + t + '" to be at least ' + e, t); }
  };
  }
  function h(e) {
  return function(t) {
  if (t.length > e) { return new _('Expect the length of "' + t + '" to be at most ' + e, t); }
  };
  }
  function d() {
  return function(e) {
  if (!v(e)) { return new _('Expect "' + e + '" to be an Array', e); }
  };
  }
  function f(e) {
  return function(t) {
  var n;
  if (!v(t)) { return new _('Expect "' + t + '" to be an Array', t); }
  for (var i = 0, o = t.length; i < o; i++) {
  n = e(t[i]);
  if (n) { return n.unshiftPath(i); }
  }
  };
  }
  function p(e, t) {
  return function(n) {
  if (!e(n)) { return new _('Expect "' + n + '" to ' + t, n); }
  };
  }
  function m(e) {
  return e;
  }
  function g(e) {
  var t = window.console;
  t.error ? t.error(e) : t.log && t.log(e);
  }
  function _(e, t) {
  this.message = e;
  this.actual = t;
  this.paths = void 0;
  this.unshiftPath = function(e) {
  this.paths || (this.paths = []);
  this.paths.unshift(e);
  return this;
  };
  }
  var v = n(7), y = n(8), w = window.Error, b = {
  any: o,
  equal: r,
  obj: s,
  type: a,
  ok: c,
  chain: m,
  regex: u,
  minLength: l,
  maxLength: h,
  array: d,
  each: f,
  predicate: p
  }, $ = Object.keys(b), E = i.prototype;
  $.forEach(function(e) {
  var t = b[e];
  i[e] = E[e] = function() {
  if (!(this instanceof i)) {
  var n = new i();
  return n[e].apply(n, arguments);
  }
  var o = t.apply(null, arguments);
  this.arr.push(o);
  return this.validate;
  };
  });
  E.validate = function(e) {
  for (var t, n, i = 0, o = this.arr.length; i < o; i++) {
  t = this.arr[i];
  n = t(e);
  if (n) { return n; }
  }
  };
  E.validateAndThrow = function(e, t) {
  var n = this.validate(e);
  t = t ? t + " - " : "";
  if (n) { throw new w(t + n.message); }
  };
  E.validateAndLog = function(e, t) {
  var n = this.validate(e);
  t = t ? t + " - " : "";
  if (n) {
  g(new w(t + n.message));
  return n;
  }
  };
  e.exports = i;
  _.prototype = Object.create(w.prototype);
  _.prototype.name = "ValidationError";
  }, function(e, t, n) {
  function i(e) {
  m = e || window;
  f = m.encodeURIComponent;
  p = m.decodeURIComponent;
  }
  function o(e) {
  return "string" == typeof e && "" != e;
  }
  function r() {
  var e, t, n, i, o = m.document.cookie, r = {};
  if (!o || "string" != typeof o) { return {}; }
  o = o.split(/;\s/);
  for (e = o.length; e--; ) { try {
  t = o[e].match(/^([^=]+)(=(.*))?$/);
  if (!t) { continue; }
  n = p(t[1]);
  i = p(t[3] || "");
  r[n] = i;
  } catch (e) {} }
  return r;
  }
  function s(e) {
  return o(e) ? r()[e] || null : null;
  }
  function a(e) {
  var t = s(e), n = {};
  try {
  n = h.parse(t);
  } catch (e) {}
  return n && "object" == typeof n ? n : {};
  }
  function c(e, t, n) {
  n = n || {};
  var i = f(e) + "=" + f(t);
  if ("ttl" in n) {
  var o = new Date(), r = 24 * n.ttl * 60 * 60 * 1e3;
  o.setTime(o.getTime() + r);
  i += "; expires=" + o.toGMTString();
  }
  "path" in n && (i += "; path=" + n.path);
  "domain" in n && (i += "; domain=" + n.domain);
  n.secure && (i += "; secure");
  m.document.cookie = i;
  }
  function u(e, t, n) {
  "object" != typeof t && (t = {});
  c(e, h.stringify(t), n);
  }
  function l(e, t) {
  t = t || {};
  t.ttl = -1;
  c(e, "", t);
  }
  var h = n(11), d = {
  set: c,
  get: s,
  getJSONCookie: a,
  setJSONCookie: u,
  remove: l,
  setActivityWindow: i
  }, f = window.encodeURIComponent, p = window.decodeURIComponent, m = window;
  e.exports = d;
  }, function(e, t, n) {
  function i(e, t, n) {
  s.ok("function" == typeof e, "1st argument to nextTick must be a function");
  if (n) { for (var i = u.length; i-- > 0; ) { if (u[i][0] === e && u[i][1] === t) { return; } } }
  u.push([ e, t ]);
  r || (r = setTimeout(o, 0));
  }
  function o() {
  var e = +new Date() + c, t = u;
  u = [];
  r && (r = clearTimeout(r));
  for (var n = 0, i = t.length; n < i; n++) {
  try {
  t[n][0].apply(t[n][1]);
  } catch (e) {
  a.fire("error", e);
  }
  if (+new Date() > e) {
  if (n < i - 1) {
  t.splice(0, n + 1);
  if (u.length) { u = t.concat(u); } else {
  u = t;
  r = setTimeout(o, 0);
  }
  }
  break;
  }
  }
  }
  var r, s = n(26), a = n(0), c = 100, u = [];
  i.tick = o;
  e.exports = i;
  }, function(e, t, n) {
  function i(e) {
  var t, n, i = r.extend(this);
  try {
  t = new window.ActiveXObject("htmlfile");
  t.open();
  t.write("<script>document.win = window</script>");
  t.close();
  n = t.win;
  } catch (e) {}
  if (!n) {
  var o = this.iframe = document.createElement("iframe"), a = o.style;
  i.allowTransparency = "true";
  i.frameBorder = "0";
  a.backgroundColor = "transparent";
  a.position = "absolute";
  a.width = a.height = "1px";
  a.left = a.top = "-9999px";
  a.border = 0;
  document.body.appendChild(o);
  try {
  n = o.contentWindow;
  t = n.document;
  t.open();
  t.close();
  } catch (e) {
  i.fire("error");
  i.destroy();
  return;
  }
  }
  i.doc = t;
  i.win = n;
  i.$Loader = {
  cleanup: function() {
  s(function() {
  i.$Loader.payload ? i.fire("success", i.$Loader.payload) : i.fire("error");
  i.$Loader.payload = null;
  e || i.destroy();
  });
  }
  };
  i.reusable = e;
  }
  function o(e) {
  return e && e.replace(a, function(e) {
  return "&#" + e.charCodeAt(0) + ";";
  });
  }
  var r = n(0), s = n(20);
  i.prototype.setScope = function(e) {
  this.scope = e;
  };
  var a = /[&<>"']/g;
  i.prototype.load = function(e) {
  if (/^(?:https?:)?\/\//i.test(e)) {
  e = o(e);
  try {
  this.doc.open();
  this.win.$Loader = this.$Loader;
  this.win.$Loader.scope = this.scope || {};
  this.doc.write('<html><head><script src="' + e + '"></script><script>document.addEventListener && document.addEventListener("DOMContentLoaded", function() {try { $Loader.cleanup() } catch(e) {}})</script></head><body></body></html>');
  this.doc.close();
  } catch (e) {
  this.$Loader.cleanup();
  }
  } else { this.$Loader.cleanup(); }
  };
  i.prototype.destroy = function() {
  try {
  this.iframe && document.body.removeChild(this.iframe);
  this.doc = this.win = this.iframe = this.win.$Loader = null;
  } catch (e) {}
  };
  e.exports = i;
  }, function(e, t, n) {
  var i = n(5), o = {};
  o.$Data = i;
  e.exports = o;
  }, function(e, t, n) {
  function i(e, t) {
  return t ? s(e, t) : o(e);
  }
  function o(e) {
  for (var t, n, i = e.length; i > 1; ) {
  t = Math.floor(i-- * Math.random());
  n = e[t];
  e[t] = e[i];
  e[i] = n;
  }
  return e;
  }
  function r(e, t) {
  if (!e || e.length <= 0) { return -1; }
  if (!t) { return Math.floor(Math.random() * e.length); }
  t = a(e, t);
  var n, i = 0;
  for (n = t.length; n--; ) { i += t[n]; }
  var o = Math.random() * i, r = 0, s = t.length;
  for (n = 0; n < s - 1; n++) {
  r += t[n];
  if (o <= r) { return n; }
  }
  return n;
  }
  function s(e, t) {
  var n, i, o, r, s, c = e.concat();
  t = a(e, t);
  e.length = 0;
  s = 0;
  for (n = t.length; n--; ) { s += t[n]; }
  o = Math.random() * s;
  r = 0;
  n = 0;
  for (;c.length; ) {
  r += t[n];
  if (o <= r) {
  s -= t[n];
  i = c.splice(n, 1)[0];
  t.splice(n, 1);
  e.push(i);
  o = Math.random() * s;
  r = 0;
  n = 0;
  } else { n++; }
  }
  return e;
  }
  function a(e, t) {
  if (u(t)) {
  if (t.length === e.length) { return t.concat(); }
  throw new window.Error("Invalid weights array: length does not match");
  }
  if (l(t)) { return c(e, t); }
  throw new window.Error("Invalid weights supplied");
  }
  function c(e, t, n) {
  var i, o, r;
  if (!u(e)) { throw new TypeError(" arr is not an array"); }
  var s = Object(e), a = s.length >>> 0;
  if (!l(t)) { throw new TypeError(t + " is not a function"); }
  arguments.length > 2 && (i = n);
  o = new Array(a);
  r = 0;
  for (;r < a; ) {
  var c, h;
  if (r in s) {
  c = s[r];
  h = t.call(i, c, r, s);
  o[r] = h;
  }
  r++;
  }
  return o;
  }
  var u = n(7), l = n(2), h = {
  shuffle: i,
  random_index: r,
  map: c
  };
  e.exports = h;
  }, function(e, t, n) {
  function i(e, t) {
  function n() {
  a = !a;
  e.apply(o, i);
  }
  var i, o, r, s, a = !0;
  return function() {
  i = Array.prototype.slice.call(arguments);
  o = this;
  if (a) {
  s = setTimeout(function() {
  a = !0;
  }, t);
  return n();
  }
  s && clearTimeout(s);
  r && clearTimeout(r);
  r = setTimeout(n, t);
  };
  }
  function o(e, t) {
  function n() {
  e.apply(o, i);
  }
  var i, o, r;
  return function() {
  r && clearTimeout(r);
  i = Array.prototype.slice.call(arguments);
  o = this;
  r = setTimeout(n, t);
  };
  }
  function r(e, t) {
  function n() {
  s = +new Date();
  r = null;
  e.apply(o, i);
  }
  var i, o, r, s = 0;
  return function() {
  i = Array.prototype.slice.call(arguments);
  o = this;
  if (!r) {
  var e = +new Date() - s;
  e >= t ? n() : r = setTimeout(n, t - e);
  }
  };
  }
  function s(e, t) {
  function n() {
  s = +new Date();
  i = o.length > 1 ? setTimeout(n, t) : null;
  e.apply(r.shift(), o.shift());
  }
  var i, o = [], r = [], s = 0;
  return function() {
  o.push(Array.prototype.slice.call(arguments));
  r.push(this);
  if (!i) {
  var e = +new Date() - s;
  e >= t ? n() : i = setTimeout(n, t - e);
  }
  };
  }
  var a = (n(8), {
  debounceExceptFirst: i,
  debounce: o,
  throttle: r,
  queue: s
  });
  e.exports = a;
  }, function(e, t) {
  var n = function(e, t) {
  return e === t || e && t && "object" == typeof e && "object" == typeof t && i(e, t);
  }, i = function(e, t) {
  var i;
  for (i in e) { if (!n(e[i], t[i])) { return !1; } }
  for (i in t) { if (!n(e[i], t[i])) { return !1; } }
  return !0;
  }, o = function(e) {
  if ("object" != typeof e || !e) { return e; }
  var t = {};
  for (var n in e) { e.hasOwnProperty(n) && (t[n] = o(e[n])); }
  return t;
  }, r = function(e) {
  var arguments$1 = arguments;

  if (e) { for (var t = 1, n = arguments.length; t < n; t++) {
  var i = arguments$1[t];
  if (i) { for (var o in i) { i.hasOwnProperty(o) && (e[o] = i[o]); } }
  } }
  return e;
  }, s = {
  equal: n,
  clone: o,
  extend: r
  };
  e.exports = s;
  }, function(e, t, n) {
  function i(e, t) {
  e || r.log(t);
  }
  var o = n(2), r = {
  ok: i,
  isFunction: function(e, t) {
  i(o(e), t);
  }
  };
  r.log = function() {};
  e.exports = r;
  }, function(e, t) {
  function n(e, t) {
  c = e.$("connection");
  u = t.$("tmp");
  d = c.$("status$string");
  f = c.$("socket_status$string");
  p = c.$("disconnection_status$string");
  m = c.$("socket_resume_timestamp$int");
  g = c.$("socket_open_timestamp$int");
  _ = c.$("client_reattached_timestamp$int");
  v = e.$("livechat").$("account").$("status$string");
  y = e.$("visitor").$("auth_status$string");
  c.bindValue(r);
  }
  function i() {
  c && c.unbindValue(r);
  }
  function o() {
  i();
  l = clearTimeout(l);
  c = u = null;
  d = f = p = m = g = _ = v = y = null;
  h = void 0;
  }
  function r(e) {
  e && "resume" == e.socket_status$string && (l = setTimeout(r, 1e3));
  var t = s();
  if (t && t !== h) {
  u.update({
  friendly_connection_status$string: t
  });
  h = t;
  }
  }
  function s() {
  var e = +new Date(), t = d.getValue(), n = f.getValue(), i = p.getValue(), o = m.getValue(), r = g.getValue(), s = _.getValue();
  if ((n || t || i) && "disconnecting" !== i) {
  if ("break" == n) {
  if (w.indexOf(t) > -1) { return "closed"; }
  if ("disconnected" === i) { return "closed"; }
  }
  return (null === n || "reconnect" == n || "resume" == n && e - o >= 1e3) && "reattached" === t && r <= s ? "connected" : "connecting";
  }
  }
  function a() {
  var e = d.getValue(), t = v.getValue(), n = p.getValue(), i = y.getValue();
  return "banned" === t ? "banned" : "disconnected" === n ? "failed" === i ? "authentication_failed" : "logged_out" : "idle_disconnect" === e ? "idle_disconnect" : "error" === e || "shutdown" === e ? "server_error" : "unknown";
  }
  var c, u, l, h, d, f, p, m, g, _, v, y, w = [ "idle_disconnect", "shutdown", "error" ], b = {
  init: n,
  reset: o,
  destroy: i,
  getConnectionClosedReason: a
  };
  e.exports = b;
  }, function(e, t, n) {
  function i(e, t) {
  t = t || window;
  r = e.$("livechat").$("profile");
  var n = {
  window: s.extend(t, !0),
  document: s.extend(t.document, !0)
  }, i = a.throttle(o, u);
  n.document.on("mousemove", i);
  n.window.on("click", i);
  n.window.on("scroll", i);
  n.window.on("keypress", i);
  i();
  }
  function o() {
  r.write({
  active$int: +new Date()
  });
  }
  var r, s = n(0), a = n(24), c = {
  init: i
  }, u = 3e5;
  e.exports = c;
  }, function(e, t, n) {
  var i = n(12), o = {
  livechat: {
  timestamp$int: +new Date(),
  settings: {
  file_sending: {
  enabled$bool: !0
  },
  behavior: {
  do_not_display$bool: !1
  },
  theme: {
  name$string: "simple",
  message_type$string: "bubble_avatar",
  colors: {
  placeholder$string: "_"
  },
  chat_button: {
  position$string: "br",
  position_mobile$string: "br"
  },
  chat_window: {
  position$string: "br",
  size$string: "medium",
  profile_card: {
  display_avatar$bool: !0,
  display_rating$bool: !0,
  display_title_name$bool: !0
  },
  use_banner$bool: !0,
  title_bar: {
  hide_minimize$bool: !1,
  hide_popout$bool: !1
  }
  },
  branding: {
  type$string: "icon_font_zopim"
  }
  },
  greetings: {
  online$string: i("Chat With Us"),
  offline$string: i("Leave a Message")
  },
  banner: {
  enabled$bool: !0,
  layout$string: "image_right",
  text$string: i("Chat with us"),
  image_path$string: "",
  image_data$string: ""
  },
  chat_button: {
  hide_when_offline$bool: !1
  },
  chat_window: {
  mobile_mode$string: "popout",
  title_bar: {
  title$string: i("support"),
  status_messages: {
  online$string: i("We're online."),
  away$string: i("We're away."),
  offline$string: i("We're offline.")
  }
  }
  },
  login: {
  allowed_types: {
  email$bool: !0,
  facebook$bool: !0,
  twitter$bool: !1,
  google$bool: !0
  },
  phone_display$bool: !1,
  restrict_profile$bool: !1
  },
  concierge: {
  display_name$string: i("Live Support"),
  title$string: i("Ask us anything"),
  avatar_path$string: "",
  avatar_data$string: "",
  greeting: {
  enabled$bool: !1,
  message$string: i("Hi, welcome to our website!")
  }
  },
  branding: {
  hide_branding$bool: !1,
  hide_favicon$bool: !1,
  custom_favicon_path$string: ""
  },
  language: {
  language$string: "--"
  },
  cookie_law: {
  enabled$bool: !1
  },
  sound: {
  disabled$bool: !1
  },
  popout: {
  enabled$bool: !0
  },
  rating: {
  enabled$bool: !0
  },
  end_chat_menu: {
  enabled$bool: !0,
  message$string: ""
  },
  emoticons: {
  enabled$bool: !1
  },
  bubble: {
  enabled$bool: !0,
  title$string: i("Questions?"),
  text$string: i("Click here to chat with us")
  },
  forms: {
  pre_chat_form: {
  required$bool: !1,
  profile_required$bool: !1,
  message$string: "",
  form: {
  0: {
  name$string: "name",
  required$bool: 0
  },
  1: {
  name$string: "email",
  required$bool: 0
  },
  2: {
  label$string: i("Choose a department"),
  name$string: "department",
  required$bool: 0,
  type$string: "department"
  },
  3: {
  label$string: i("Message"),
  name$string: "message",
  required$bool: 0,
  type$string: "textarea"
  },
  4: {
  label$string: i("Phone"),
  name$string: "phone",
  required$bool: 0,
  type$string: "text",
  hidden$bool: !0
  }
  }
  },
  offline_form: {
  message$string: i("Sorry, we aren't online at the moment. Leave a message and we'll get back to you."),
  message_disabled$string: i("Sorry, we aren't online at the moment."),
  post_submit_message$string: i("Thanks for the message! We'll get back to you as soon as we can."),
  profile_required$bool: !0,
  form: {
  0: {
  name$string: "name",
  required$bool: 1
  },
  1: {
  name$string: "email",
  required$bool: 1
  },
  2: {
  label$string: i("Message"),
  name$string: "message",
  required$bool: 1,
  type$string: "textarea"
  },
  3: {
  label$string: i("Phone"),
  name$string: "phone",
  required$bool: 0,
  type$string: "text",
  hidden$bool: !0
  }
  }
  },
  post_chat_form: {
  header$string: i("Nice chatting with you!"),
  message$string: i("How would you rate the chat experience you just had?"),
  comments_enabled$bool: !0,
  comments_messages: {
  good: {
  message$string: i("Thanks for the good rating! Would you like to leave a comment?"),
  placeholder$string: i("What did you like about this chat?")
  },
  bad: {
  message$string: i("Sorry that we disappointed you. We'd appreciate it if you could tell us how to improve."),
  placeholder$string: i("What did you dislike about this chat?")
  }
  }
  },
  card_form: {}
  }
  }
  }
  };
  e.exports = o;
  }, function(e, t, n) {
  var i = n(12), o = n(9), r = n(1), s = i("File size too large. Maximum limit is <size>."), a = i("The file you are trying to send is not supported."), c = i("File sending is temporarily disabled. Please try again later."), u = i("<size> bytes"), l = i("<size> KB"), h = i("<size> MB"), d = {};
  d.ERR_SIZE = "TOO_LARGE";
  d.ERR_FORMAT = "ILLEGAL_TYPE";
  d.ERR_DISABLED = "FILE_UPLOADS_TEMPORARILY_DISABLED";
  var f = /^(x-|vnd\.)/i, p = [ "png", "jpg", "jpeg", "gif", "txt", "pdf" ], m = {}, g = i("Failed to send. Please try again.");
  m[d.ERR_SIZE] = s;
  m[d.ERR_FORMAT] = a;
  m[d.ERR_DISABLED] = c;
  d.prettySize = function() {
  var e = [ u, l, h ], t = [ 0, 1, 2 ];
  return function(n, i) {
  n = Math.max(parseInt(n, 10) || 0, 0);
  i = i || {};
  for (var o, r = i.base2 ? 1024 : 1e3, s = e.length; s--; ) {
  o = Math.pow(r, s);
  if (n >= o) { return e[s].replace("<size>", (n / o).toFixed(t[s])); }
  }
  };
  }();
  d.prettyType = function(e, t, n) {
  n = n || window.Infinity;
  var i = e.split("/")[1];
  i = i && i.replace(f, "");
  if (i && i.length < n) { return i.toLowerCase(); }
  i = t.split(".").pop();
  return (i || "").toLowerCase();
  };
  d.isValidType = function(e, t) {
  if (e) {
  t = t || p;
  var n = e.substr(e.lastIndexOf(".") + 1).toLowerCase();
  return -1 !== o(n, t);
  }
  };
  d.prettyError = function(e, t) {
  var n = e in m ? m[e] : g;
  r(t) || (n = n.replace("<size>", d.prettySize(t || 5e6)));
  return n;
  };
  d.blobToFile = function(e, t, n) {
  e.lastModifiedDate = new Date();
  e.name = t;
  return new window.File([ e ], t, {
  type: n
  });
  };
  d.getExtension = function(e) {
  var t = e.lastIndexOf(".");
  return -1 === t ? null : e.substr(t + 1).toLowerCase();
  };
  e.exports = d;
  }, function(e, t, n) {
  function i(e, t) {
  h = e;
  d = t;
  h.$("livechat").$("channel").$("department_id$int").on("value", function(e) {
  e && (f = e);
  });
  }
  function o(e, t, n) {
  var i = parseInt(t, 10) || parseInt(d.getServerTime().toFixed(0), 10), o = i + "", r = h.$("livechat").$("profile"), s = f, a = (e.msg || "") + "";
  "department" in e && (s = e.department);
  h.$("livechat").$("channel").$("log").$(o).write({
  timestamp$int: i,
  type$string: "chat.msg",
  msg$string: a,
  nick$string: r.$("nick$string").getValue() || "",
  display_name$string: r.$("display_name$string").getValue() || "",
  department_id$int: s,
  unverified$bool: !0,
  __client$bool: !0
  }, n);
  }
  function r(e, t) {
  var n = parseInt(t, 10) || parseInt(d.getServerTime().toFixed(0), 10), i = n + "";
  h.$("livechat").$("channel").$("log").$(i).write({
  timestamp$int: n,
  nick$string: h.$("livechat").$("profile").$("nick$string").getValue() || "",
  display_name$string: h.$("livechat").$("profile").$("display_name$string").getValue() || "",
  type$string: "chat.file.upload",
  file_name$string: e.file_name || "",
  file_type$string: e.file_type || "",
  file_size$int: e.file_size || 0,
  unverified$bool: !0,
  __client$bool: !0
  });
  return n;
  }
  function s(e, t) {
  function n(e) {
  if ("ok" !== e.raw.__status) { return t(new window.Error(l(e.raw.error))); }
  if (!e.raw.data || "chat.file" !== e.raw.data.type) { return t(new window.Error("INTERNAL_ERROR")); }
  t(null, w.pick(e.raw.data, [ "mime_type", "name", "size", "url", "metadata" ]));
  }
  var i = E._validateAndPrepareData([ e ]);
  t = g.once(t);
  if (p(i)) { m(function() {
  t(new window.Error(i));
  }); } else {
  var o = d.registerCallback(n), r = "https://" + i.host + _.CALLBACK_FILE_UPLOAD_PATH, s = {
  ts: parseInt(d.getServerTime().toFixed(0), 10),
  __messageID: o,
  __socketID: d.getSocketID()
  }, a = {
  "X-Zopim-MID": i.mid,
  "X-Zopim-UID": i.uid
  }, c = {
  error: function() {
  t(new window.Error("CONN_ERROR"));
  },
  load: function() {
  if (200 !== this.status) {
  var e;
  try {
  e = JSON.parse(this.responseText);
  } catch (e) {}
  t(e && e.error ? new window.Error(l(e.error)) : new window.Error("INTERNAL_ERROR"));
  }
  }
  };
  E._uploadFiles(i.form_data, r, s, a, c);
  }
  }
  function a(e, t) {
  var n = E._validateAndPrepareData(e);
  if (p(n)) { return n; }
  var i = r({
  file_name: n.name,
  file_type: n.type,
  file_size: n.size
  }, t), o = "https://" + n.host + _.FILE_UPLOAD_PATH, s = {
  ts: i
  }, a = {
  "X-Zopim-MID": n.mid,
  "X-Zopim-UID": n.uid
  };
  E._uploadFiles(n.form_data, o, s, a);
  }
  function c(e) {
  if (!window.FormData) { return "NOT_SUPPORTED"; }
  var t = h.$("livechat"), n = t.$("settings").$("file_sending"), i = t.$("settings").$("package"), o = n.$("enabled$bool").getValue(), r = (n.$("allowed_extensions$string").getValue() || "").trim().replace(/\s*,\s*/g, ",").split(","), s = i.$("color_customization_enabled$int").getValue() || i.$("widget_customization_enabled$int").getValue(), a = t.$("profile").$("mid$string").getValue(), c = t.$("profile").$("uid$string").getValue(), u = d.getHost(), l = new window.FormData(), f = [], p = [], m = 0;
  if (!u) { return "CONN_ERROR"; }
  if (!s) { return "INVALID_PLAN"; }
  if (!o) { return "NOT_ALLOWED"; }
  for (var g = 0, y = e.length; g < y; g++) {
  if (!v.isValidType(e[g].name, r)) { return "INVALID_EXTENSION"; }
  f.push(e[g].name);
  p.push(e[g].type);
  m += e[g].size || 0;
  l.append("file_" + e[g].name, e[g]);
  }
  return m > _.FILE_UPLOAD_MAX ? "EXCEED_SIZE_LIMIT" : {
  form_data: l,
  name: f.join(", "),
  type: p.join(", "),
  size: m,
  host: u,
  mid: a,
  uid: c
  };
  }
  function u(e, t, n, i, o) {
  var r = new window.XMLHttpRequest(), s = t + (Object.keys(n).length ? "?" + y.buildQuery(n) : "");
  if (r.upload) {
  r.open("POST", s, !0);
  for (var a in i) { i.hasOwnProperty(a) && r.setRequestHeader(a, i[a]); }
  for (var c in o) { o.hasOwnProperty(c) && r.addEventListener(c, o[c]); }
  r.send(e);
  }
  }
  function l(e) {
  return $[e] || "UNKNOWN_ERROR";
  }
  var h, d, f, p = n(14), m = n(20), g = n(8), _ = n(4), v = n(30), y = n(10), w = n(6), b = {
  NOT_SUPPORTED: "NOT_SUPPORTED",
  NOT_ALLOWED: "NOT_ALLOWED",
  CONN_ERROR: "CONN_ERROR",
  INVALID_EXTENSION: "INVALID_EXTENSION",
  INVALID_PLAN: "INVALID_PLAN",
  EXCEED_SIZE_LIMIT: "EXCEED_SIZE_LIMIT",
  INTERNAL_ERROR: "INTERNAL_ERROR",
  UNKNOWN_ERROR: "UNKNOWN_ERROR"
  }, $ = {
  TOO_LARGE: "EXCEED_SIZE_LIMIT",
  ILLEGAL_TYPE: "INVALID_EXTENSION",
  NO_SESSION: "INTERNAL_ERROR",
  UNEXPECTED_ERROR: "INTERNAL_ERROR",
  UNABLE_TO_GET_SETTINGS: "INTERNAL_ERROR",
  S3_UPLOAD_ERROR: "INTERNAL_ERROR",
  NO_GATES: "INTERNAL_ERROR",
  FILE_UPLOADS_DISABLED: "NOT_ALLOWED",
  FILE_UPLOADS_TEMPORARILY_DISABLED: "INVALID_PLAN"
  }, E = {
  FILE_SENDING_ERRORS: b,
  init: i,
  sendChatMsg: o,
  sendFiles: a,
  sendFileWithCallback: s,
  _validateAndPrepareData: c,
  _uploadFiles: u
  };
  e.exports = E;
  }, function(e, t) {
  var n = {};
  n.SECOND = 1e3;
  n.MINUTE = 60 * n.SECOND;
  n.HOUR = 60 * n.MINUTE;
  n.DAY = 24 * n.HOUR;
  n.WEEK = 7 * n.DAY;
  e.exports = n;
  }, function(e, t, n) {
  function i(e, t, n, i, o, r, c, u) {
  this.CLUSTERS = e.CLUSTERS;
  this.WEIGHTS = e.WEIGHTS;
  this.NEAR_MAP = e.NEAR_MAP;
  this.FALLBACKS = e.FALLBACKS;
  this.geo_code = n || "geo";
  this.default_domain = t;
  this.supported_domains = (u || []).concat(this.default_domain);
  var l = s.map(this.supported_domains, a.escape);
  this.supported_proxy_re = new RegExp("^[a-z][a-z0-9_-]*(\\.[a-z][a-z0-9_-]*)*(" + l.join("|") + ")(:\\d+)?$", "i");
  this.cluster_hosts = [];
  this.host_list = [];
  this.host_index = 0;
  this.last_connected_host = o && this.getValidatedHost(o);
  this.override_proxy = i && this.getValidatedHost(i);
  this.num_primary_hosts = r || 0;
  this.num_fallback_hosts = c || 0;
  this.init();
  }
  var o = n(15), r = n(9), s = n(23), a = n(13), c = /^([a-z][a-z0-9_-]*)(:\d+)?$/i, u = i.prototype;
  u.init = function() {
  var e = this.geo_code && this.geo_code in this.NEAR_MAP ? this.NEAR_MAP[this.geo_code] : this.NEAR_MAP.DEFAULT;
  if (!e) { throw "Error: no cluster code found for " + this.geo_code; }
  if (e in this.CLUSTERS) { this._growClusterHosts(e, this.num_primary_hosts); } else if (!this.override_proxy && !this.last_connected_host) { throw "Error: " + e + " has no cluster definition"; }
  if (e in this.FALLBACKS) { for (var t = this.FALLBACKS[e], n = 0, i = t.length; n < i; n++) {
  var o = t[n];
  o in this.CLUSTERS && this._growClusterHosts(o, this.num_fallback_hosts);
  } }
  this._makeHostList();
  };
  u._verifyHostInGeoConfig = function(e) {
  var t = this;
  return Object.keys(t.CLUSTERS).some(function(n) {
  return t.CLUSTERS[n].some(function(n) {
  return e === t.getValidatedHost(n);
  });
  });
  };
  u._growClusterHosts = function(e, t) {
  var n = this.CLUSTERS[e], i = this.getWeights(e);
  s.shuffle(n, i);
  t && (n = n.slice(0, t));
  this.cluster_hosts = this.cluster_hosts.concat(n);
  };
  u.getWeights = function(e) {
  if (!(e in this.CLUSTERS)) { return []; }
  var t, n = this.CLUSTERS[e], i = n.length, r = new Array(i);
  if (this.WEIGHTS && this.WEIGHTS[e]) {
  var s = this.WEIGHTS[e];
  for (t = i; t--; ) {
  var a = n[t];
  r[t] = o(s[a]) ? s[a] : 1;
  }
  } else { for (t = i; t--; ) { r[t] = 1; } }
  return r;
  };
  u.getValidatedHost = function(e, t) {
  if (e) {
  if (!t && c.test(e)) { return this._expandSimpleHost(e); }
  if (this.supported_proxy_re.test(e)) { return e; }
  }
  return !1;
  };
  u._expandSimpleHost = function(e) {
  return e.replace(c, "$1" + this.default_domain + "$2");
  };
  u._makeHostList = function() {
  var e = this, t = s.map(this.cluster_hosts, function(t) {
  return e._expandSimpleHost(t);
  }), n = [];
  this.override_proxy && n.push(this.override_proxy);
  this.last_connected_host && this.last_connected_host !== this.override_proxy && this._verifyHostInGeoConfig(this.last_connected_host) && n.push(this.last_connected_host);
  t = t.filter(function(e) {
  return -1 === r(e, n);
  });
  this.host_list = n.concat(t);
  this.host_index = 0;
  };
  u.getHostList = function() {
  return this.host_list;
  };
  u.getNextHost = function() {
  return this.host_index >= this.host_list.length ? "" : this.host_list[this.host_index++];
  };
  u.hasNext = function() {
  return this.host_index < this.host_list.length;
  };
  u.rewind = function() {
  this.host_index = 0;
  };
  u.pushHostToLast = function(e) {
  var t, n = this.getValidatedHost(e), i = r(n, this.host_list);
  if (-1 !== i) {
  t = this.host_list.splice(i, 1);
  this.host_list = this.host_list.concat(t);
  }
  };
  e.exports = i;
  }, function(e, t, n) {
  function i(e) {
  window.__$__GEO = e;
  }
  function o(e, t) {
  this.clusters_config = e;
  this.setGeoCode("geo" === a ? c : a);
  try {
  if (t.length <= 0) { throw "SSI cluster definition not found"; }
  if ("<" == t.charAt(0)) { throw "SSI not processed"; }
  this.clusters_config = JSON.parse(t);
  } catch (e) {}
  }
  var r = n(33), s = n(25), a = '<!--# echo var="http_cf_ipcountry" default="geo" -->'.toUpperCase(), c = '<!--# echo var="geoip_country_code" default="geo" -->'.toUpperCase(), u = [ ".zopim.net", ".zopim.org", ".zdch.at" ];
  "<" == a.charAt(0) && (a = "geo");
  "<" == c.charAt(0) && (c = "geo");
  o.SUPPORTED_DOMAINS = u;
  var l = o.prototype;
  l.getGeoCode = function() {
  return this.countryCode;
  };
  l.setGeoCode = function(e) {
  if (e && "--" !== e) {
  this.countryCode = e;
  i(e);
  }
  };
  l.updateClustersConfig = function(e) {
  try {
  s.extend(this.clusters_config, JSON.parse(e));
  } catch (e) {
  window.console && window.console.log("Unable to process update");
  }
  };
  l.getGeoAccess = function(e, t, n, i, o, s) {
  return new r(this.clusters_config, o || ".zopim.com", this.countryCode, e, t, n, i, s || u);
  };
  e.exports = o;
  }, function(e, t) {
  var n = {
  CLUSTERS: {
  US: [ "us08", "us10", "us12", "us14", "us16", "us18", "us20", "us22", "us24", "us26", "us28", "us30", "us32", "us34", "us36", "us38", "us40", "us42", "us44", "us46" ],
  DE: [ "de04", "de06", "de08", "de10", "de12", "ie02", "ie04", "ie06", "ie08", "ie10", "ie12", "ie14", "ie16", "de14", "de16", "de18", "de20", "ie18", "ie20", "ie22", "ie24", "de22", "de24", "de26", "de28" ],
  SG: [ "sg06", "sg08", "sg10", "sg12", "sg14", "sg16", "sg18", "sg20" ],
  JP: [ "jp02", "jp04", "jp06", "jp08" ],
  AU: [ "au02", "au04" ],
  BR: [ "br02", "br04", "br06", "br08", "br10", "br12" ]
  },
  FALLBACKS: {
  US: [ "DE" ],
  DE: [ "US" ],
  SG: [ "US" ],
  JP: [ "US" ],
  AU: [ "SG", "US" ],
  BR: [ "US" ]
  },
  NEAR_MAP: {
  AL: "DE",
  AD: "DE",
  AM: "DE",
  AT: "DE",
  BY: "DE",
  BE: "DE",
  BA: "DE",
  BG: "DE",
  CH: "DE",
  CY: "DE",
  CZ: "DE",
  DE: "DE",
  DK: "DE",
  EE: "DE",
  ES: "DE",
  EU: "DE",
  FO: "DE",
  FI: "DE",
  FR: "DE",
  GB: "DE",
  GE: "DE",
  GI: "DE",
  GR: "DE",
  HU: "DE",
  HR: "DE",
  IE: "DE",
  IM: "DE",
  IS: "DE",
  IT: "DE",
  LT: "DE",
  LU: "DE",
  LV: "DE",
  MC: "DE",
  MK: "DE",
  MT: "DE",
  NO: "DE",
  NL: "DE",
  PK: "DE",
  PO: "DE",
  PT: "DE",
  RO: "DE",
  SA: "DE",
  SE: "DE",
  SI: "DE",
  SK: "DE",
  SM: "DE",
  TR: "DE",
  UA: "DE",
  VA: "DE",
  ZA: "DE",
  NG: "DE",
  MA: "DE",
  AP: "SG",
  BD: "SG",
  BN: "SG",
  CN: "SG",
  ID: "SG",
  IN: "SG",
  LA: "SG",
  KH: "SG",
  LK: "SG",
  MM: "SG",
  MY: "SG",
  SG: "SG",
  TH: "SG",
  VN: "SG",
  AU: "AU",
  NZ: "AU",
  HK: "JP",
  KR: "JP",
  JP: "JP",
  PH: "US",
  RU: "JP",
  TW: "JP",
  AR: "BR",
  BO: "BR",
  BR: "BR",
  CL: "BR",
  PE: "BR",
  PY: "BR",
  UY: "BR",
  DEFAULT: "US"
  }
  };
  e.exports = n;
  }, function(e, t, n) {
  function i(e) {
  var t = this, n = this.longpoll = new s(!0), i = this.sender = new s(!0);
  n.on("success", function(e) {
  t.process_data(e);
  });
  n.on("error", function() {
  t.abort("longpoll error");
  });
  i.on("success", function() {
  t.ondrain && t.ondrain();
  });
  i.on("error", function() {
  t.abort("sender error");
  });
  this.url = "https://" + e;
  o.window.on("unload", this.unload = function() {
  t.abort("unload");
  });
  this.longpoll.load(this.url + [ "c", +new Date() ].join("/"));
  }
  var o = n(0), r = i;
  i.protocol = "xdds";
  var s = n(21);
  i.prototype.process_data = function(e) {
  if (e && !this._abort) {
  !this.ts && this.onopen && this.onopen();
  this.ts = +new Date();
  this.onmessage && this.onmessage(e, this.ts);
  this.longpoll && this.longpoll.load(this.url + [ "p", +new Date() ].join("/"));
  }
  };
  i.prototype.send = function(e) {
  if (this._abort) { return !1; }
  var t = this.url + [ "d", +new Date(), window.encodeURIComponent(e) ].join("/");
  this.sender && this.sender.load(t);
  return !1;
  };
  i.prototype.abort = function(e) {
  if (!this._abort) {
  this._abort = !0;
  o.window.un("unload", this.unload);
  this.longpoll.destroy();
  this.sender.destroy();
  this.longpoll = this.sender = this.unload = null;
  this.onclose && this.onclose(e);
  window.CollectGarbage && window.CollectGarbage();
  }
  };
  e.exports = r;
  }, function(e, t) {
  function n(e) {
  var t, n = this;
  try {
  t = new i("wss://" + e + [ "c", +new Date() ].join("/"));
  } catch (e) {}
  if (t) {
  t.onclose = function(e) {
  n.onclose && n.onclose(e);
  };
  t.onerror = function(e) {
  n.onerror && n.onerror(e);
  };
  t.onmessage = function(e) {
  n.onmessage && n.onmessage(e.data, +new Date());
  };
  t.onopen = function(e) {
  n.onopen && n.onopen(e);
  };
  this.ws = t;
  }
  }
  var i = window.WebSocket || window.MozWebSocket, o = i ? n : null;
  n.prototype.abort = function() {
  if (this.ws && !this._aborted) {
  this._aborted = !0;
  var e = this.ws;
  e.readyState == i.CONNECTING ? e.onopen = function() {
  e.close();
  } : e.close();
  }
  };
  n.prototype.send = function(e) {
  this.ws && this.ws.send(e);
  return !0;
  };
  n.protocol = "ws";
  e.exports = o;
  }, function(e, t, n) {
  function i(e) {
  function t(e) {
  !c && r.onopen && r.onopen();
  c = +new Date();
  e.origin == i && ("event-stream" == e.data ? s.onload = null : r.onmessage && r.onmessage(e.data, c));
  }
  var n, i, r = this, s = this.iframe = o("iframe");
  this.url = "https://" + e;
  s.src = this.src = n = this.url + [ "c", +new Date() ].join("/");
  i = n.match(/https?:\/\/[^\/]+/)[0];
  s.onload = function(e) {
  r.abort(e);
  };
  document.body.insertBefore(s, document.body.firstChild);
  a("SPM connecting to: " + this.url);
  window.addEventListener("message", t, !1);
  this.remove_listeners = function() {
  window.removeEventListener("message", t, !1);
  };
  var c;
  }
  function o(e) {
  var t = document.createElement(e), n = t.style;
  n.position = "absolute";
  n.width = n.height = 0;
  n.overflow = "hidden";
  return t;
  }
  var r = n(3), s = window.postMessage ? !r.isAndroid && i : null;
  i.protocol = "spm";
  i.prototype.send = function(e) {
  this.iframe.contentWindow.postMessage(e, this.src);
  return !0;
  };
  i.prototype.abort = function(e) {
  if (!this._abort) {
  this._abort = !0;
  this.iframe && document.body.removeChild(this.iframe);
  this.onclose && this.onclose(e);
  this.remove_listeners();
  this.iframe = this.remove_listeners = null;
  }
  };
  var a = function() {};
  e.exports = s;
  }, function(e, t, n) {
  function i(e) {
  function t(e) {
  !n && s.onopen && s.onopen();
  n = e;
  u += i.responseText.substr(l);
  l = i.responseText.length;
  u = u.split("\n\n");
  for (var t = 0; t < u.length - 1; t++) { s.onmessage && s.onmessage(u[t], n); }
  u = u[u.length - 1];
  (l > 1048576 && !u.length || l > 4194304) && s.abort();
  }
  var n, i = this.xhr = new r(), s = this, u = "", l = 0;
  this.url = a + e;
  i.open("GET", this.url + [ "c", +new Date() ].join("/"), !0);
  i.onerror = function(e) {
  s.abort(e);
  };
  if (o.isIE) {
  i.onprogress = function() {
  t(+new Date());
  };
  i.onload = function() {
  s.abort("close");
  };
  } else { i.onreadystatechange = function() {
  switch (i.readyState) {
  case 3:
  t(+new Date());
  break;

  case 4:
  s.abort("close");
  }
  }; }
  c("CXHR connecting to: " + this.url);
  i.send();
  }
  var o = n(3), r = o.isIE ? window.XDomainRequest : !o.isOpera && !o.isAndroid && window.XMLHttpRequest, s = r ? i : null, a = o.isIE ? "//" : "https://";
  i.protocol = "cxhr";
  i.prototype.send = function(e) {
  function t() {
  c.abort("send failed");
  }
  function n() {
  c.xhr_sender = null;
  clearTimeout(i);
  c.ondrain && c.ondrain();
  }
  var i, s = this.url + [ "d", +new Date() ].join("/"), a = new r(), c = this;
  a.open("POST", s, !0);
  a.send(e);
  if (o.isIE) {
  a.onerror = t;
  a.onload = n;
  } else { a.onreadystatechange = function() {
  if (4 == a.readyState) {
  200 != a.status && t();
  n();
  }
  }; }
  i = setTimeout(t, 5e3);
  this.xhr_sender = a;
  return !1;
  };
  i.prototype.abort = function(e) {
  if (!this._abort) {
  this._abort = !0;
  this.xhr && this.xhr.abort();
  this.xhr_sender && this.xhr_sender.abort();
  this.onclose && this.onclose(e);
  this.onerror = this.onload = this.onprogress = this.onreadystatechange = this.xhr = this.xhr_sender = null;
  }
  };
  var c = function() {};
  e.exports = s;
  }, function(e, t, n) {
  function i(e, t, n, o) {
  this.options = o = o || {};
  for (var r in _) { r in o || (o[r] = _[r]); }
  if (!m && !o.PREFERRED_PROVIDER) { throw "No available transports"; }
  u.extend(this);
  this.provider = o.PREFERRED_PROVIDER || m;
  this.id = n || i.generateID();
  this.host = e;
  this.ns = t;
  this.path = "/" + [ "s", this.ns, this.provider.protocol, this.id ].join("/");
  this.url = this.host + this.path + "/";
  this.status = "connecting";
  this.connected = !1;
  this.quality = 0;
  this.rtt = o.INITIAL_RTT;
  this.clock_skew = 0;
  this.connect_attempts = 0;
  this.connections = 0;
  this.disconnects = 0;
  this.sent_bytes = 0;
  this.recv_bytes = 0;
  this.sent_messages = 0;
  this.recv_messages = 0;
  this.sent_frames = 0;
  this.recv_frames = 0;
  this.lost_frames = 0;
  this.ooo_frames = 0;
  this.remote_seq = 0;
  this.local_seq = 0;
  this.timeout_server = 0;
  this.timeout_response_soft = 0;
  this.timeout_response_hard = 0;
  this.bytes_at_connect = -1;
  this.time_last_alive = -1;
  this.time_last_open = -1;
  this.starttime = Date.now();
  this.uptime = 0;
  this.connected_time = new a();
  this.idle_time = new a();
  this.last_frame_time = 0;
  this.raw_clock_skew = 0;
  this.smooth_skewed_transit_time_in = 0;
  this.remote_smooth_skewed_transit_time_out = 0;
  this.cur_conn_recv_messages = 0;
  this.drained = !0;
  this.buffer = [];
  this.glitch_timer = this.reconnect_timer = null;
  this.reconnect_delay = o.RECONNECT_DELAY_MS * (.2 * Math.random() + .8);
  this.keep_alive_interval = 15e3;
  this.data_packet_queue = new c(this);
  this.connect();
  var s = this;
  this.onoffline = function() {
  i.prototype.onoffline.call(s);
  };
  this.ononline = function() {
  i.prototype.ononline.call(s);
  };
  u.window.on("offline", this.onoffline);
  u.window.on("online", this.ononline);
  }
  function o() {
  var e = w, t = new Date(), n = t.getUTCFullYear() - 2e3, i = t.getUTCMonth() + 1, o = t.getUTCDate(), r = t.getUTCHours(), s = t.getUTCMinutes(), a = t.getUTCSeconds(), c = t.getUTCMilliseconds();
  return e[n] + e[i] + e[o] + e[r] + e[s] + e[a] + e[c >> 6] + e[63 & c];
  }
  function r(e) {
  for (var t = "", n = w; e-- > 0; ) { t += n.charAt(Math.floor(Math.random() * n.length)); }
  return t;
  }
  function s(e, t, n) {
  return Math.min(n, Math.max(t, e));
  }
  function a() {
  this.count = 0;
  this.sum = 0;
  this.sq_sum = 0;
  this.mean = 0;
  this.stddev = 0;
  }
  function c(e) {
  this.socket = e;
  this.queue = [];
  this.curFrame = null;
  this.curIdx = 0;
  this.last_work_finished_time = 0;
  this.work_timer = null;
  this.processing = !1;
  }
  var u = n(0), l = n(11), h = n(39), d = n(38), f = n(37), p = n(36), m = f || h || d || p, g = p, _ = {
  INITIAL_RTT: 1e3,
  RECONNECT_DELAY_MS: 3e4,
  FAST_RECONNECT_MS: 100,
  FLUSH_DELAY_MS: 75,
  MAX_BLOCKING_TIME_MS: 40,
  MAX_NO_WORK_TIME_MS: 15,
  PREFERRED_PROVIDER: void 0
  };
  i.providers = {};
  [ h, d, f, p ].forEach(function(e) {
  e && (i.providers[e.protocol] = e);
  });
  i.available = function() {
  return !!m;
  };
  i.generateID = function() {
  return r(16);
  };
  i.prototype.connect = function(e) {
  this.debug("connect(" + (e && "glitch" || "") + ")");
  if (!this.reconnect_timer) {
  var t = this, n = this.options, i = !this.connections || !this.cur_conn_recv_messages;
  !n.PREFERRED_PROVIDER && i && (this.provider = 1 & this.connect_attempts ? g : m);
  this.response_timer = clearTimeout(this.response_timer);
  this.timeout_timer = clearTimeout(this.timeout_timer);
  if (this.socket) {
  this.socket.onclose = this.socket.ondrain = this.socket.onerror = this.socket.onmessage = this.socket.onopen = null;
  this.socket.abort("connect");
  this.socket = null;
  }
  this.connected = !1;
  this.cur_conn_recv_messages = 0;
  if (e) {
  this.reconnect_delay = n.RECONNECT_DELAY_MS * (.2 * Math.random() + .9);
  this.glitch_timer = setTimeout(function() {
  t.quality = 0;
  t.glitch_timer = setTimeout(function() {
  t.status = "reconnecting";
  t.fire_break();
  }, s(3 * t.rtt, 1e3, 5e3));
  }, s(3 * this.rtt, 1e3, 5e3));
  }
  this.debug("reconnect_delay: " + this.reconnect_delay);
  clearTimeout(this.reconnect_timer);
  this.reconnect_timer = setTimeout(function() {
  t.reconnect_timer = null;
  t.reconnect_delay = Math.min(1.4 * t.reconnect_delay + 1e3, 6e4);
  t.reconnect_delay *= .2 * Math.random() + .9;
  t.connect();
  }, this.reconnect_delay);
  this.path = "/" + [ "s", this.ns, this.provider.protocol, this.id ].join("/");
  this.url = this.host + this.path + "/";
  this.debug("connecting: " + this.url);
  this.socket = new this.provider(this.url);
  this.transport = this.provider.protocol;
  this.connect_attempts++;
  this.socket.onopen = function() {
  t.status = "connected";
  t.glitch_timer = clearTimeout(t.glitch_timer);
  t.reconnect_timer = clearTimeout(t.reconnect_timer);
  t.connections++;
  t.drained = !0;
  t.connected = !0;
  t.time_last_open = t.time_last_alive = Date.now();
  t.uptime >= 0 && (t.uptime -= t.time_last_open);
  1 == t.connections ? t.fire("open") : t.fire_resume();
  t.flush();
  t.keep_alive();
  t.debug("connected");
  -1 == t.bytes_at_connect && setTimeout(function() {
  t.bytes_at_connect = t.recv_bytes;
  }, 50);
  };
  this.socket.onmessage = function(e, n) {
  t.onmessage(e, n);
  };
  this.socket.onclose = function(e) {
  t._onclose(e);
  };
  this.socket.ondrain = function(e) {
  t._ondrain(e);
  };
  this.socket.onerror = function(e) {
  t._onerror(e);
  };
  }
  };
  i.prototype.reconnect = function() {
  this.reconnect_timer = clearTimeout(this.reconnect_timer);
  this.broken_reason = "FORCED_RECONNECT";
  this.connect();
  };
  i.prototype.send = function(e, t) {
  if ("disconnected" != this.status) {
  "null" == this.buffer[0] && (this.buffer = []);
  this.buffer.push(l.stringify(e));
  this.schedule_flush();
  t && this.response_timeout();
  }
  };
  i.prototype.close = function(e) {
  this.debug("close()");
  this.flush_scheduled = clearTimeout(this.flush_scheduled);
  this.keep_alive_timer = clearTimeout(this.keep_alive_timer);
  this.reconnect_timer = clearTimeout(this.reconnect_timer);
  this.response_timer = clearTimeout(this.response_timer);
  this.timeout_timer = clearTimeout(this.timeout_timer);
  this.broken_reason || (this.broken_reason = "CLOSE");
  this.fire_break();
  this.status = e ? "reconnecting" : "disconnected";
  this.connected = !1;
  this.quality = 0;
  if (this.socket) {
  this.socket.onclose = this.socket.ondrain = this.socket.onerror = this.socket.onmessage = this.socket.onopen = null;
  this.socket.abort("close");
  this.socket = null;
  if (!e) {
  u.window.un("offline", this.onoffline);
  u.window.un("online", this.ononline);
  }
  }
  };
  i.prototype.hibernate = function() {};
  i.prototype.onoffline = function() {
  this.broken_reason = "OFFLINE";
  this.debug("onoffline");
  this.close(!0);
  };
  i.prototype.ononline = function() {
  this.debug("ononline");
  if ("disconnected" != this.status && !this.connected) {
  this.reconnect_timer = clearTimeout(this.reconnect_timer);
  this.connect();
  }
  };
  i.prototype.schedule_flush = function() {
  if ("disconnected" != this.status && !this.flush_scheduled && this.drained && this.connected) {
  var e = this, t = this.options;
  this.flush_scheduled = setTimeout(function() {
  e.flush();
  }, t.FLUSH_DELAY_MS);
  }
  };
  i.prototype.flush = function() {
  if ("disconnected" != this.status && this.buffer.length && this.drained && this.connected) {
  var e = this.buffer;
  this.sent_messages += e.length;
  this.sent_frames++;
  e = this.generate_frame(e.join("\n"));
  this.drained = this.socket.send(e);
  this.sent_bytes += e.length;
  this.flush_scheduled = clearTimeout(this.flush_scheduled);
  this.buffer = [];
  this.keep_alive();
  this.time_last_alive = Date.now();
  }
  };
  i.prototype.keep_alive = function() {
  if ("disconnected" != this.status) {
  clearTimeout(this.keep_alive_timer);
  var e = this;
  this.keep_alive_timer = setTimeout(function() {
  e.debug("pong!");
  e.send(null);
  }, this.keep_alive_interval);
  }
  };
  i.prototype.response_timeout = function() {
  if (!this.response_timer) {
  var e = this, t = s(4 * this.rtt + this.options.FLUSH_DELAY_MS, 2e3, 2e4);
  this.response_timer = setTimeout(function() {
  e.timeout_response_soft++;
  e.debug("response timeout, " + t + "ms");
  e.fire_break("SOFT_RESPONSE_TIMEOUT");
  e.response_timer = setTimeout(function() {
  e.timeout_response_hard++;
  e.debug("response timeout - reconnecting");
  e.broken_reason = "HARD_RESPONSE_TIMEOUT";
  e.connect(!0);
  }, 2 * t);
  }, t);
  }
  };
  i.prototype.reset_server_timeout = function() {
  clearTimeout(this.timeout_timer);
  var e = this, t = 4 * this.keep_alive_interval + s(4 * e.rtt, 2e3, 2e4);
  this.timeout_timer = setTimeout(function() {
  e.timeout_server++;
  e.debug("server " + t + "ms timeout, reconnecting");
  e.broken_reason = "SERVER_TIMEOUT";
  e.connect(!0);
  }, t);
  };
  i.prototype.fire_break = function(e) {
  this.broken || this.fire("break", e || this.broken_reason);
  this.broken = !0;
  this.broken_reason = "";
  this.uptime < 0 && (this.uptime += Date.now());
  };
  i.prototype.fire_resume = function() {
  this.broken_reason = "";
  this.broken && this.fire("resume");
  this.broken = !1;
  this.uptime >= 0 && (this.uptime -= Date.now());
  };
  i.prototype.onmessage = function(e, t) {
  this.recv_bytes += e.length;
  e = e.split("\n");
  if (e.length < 6) { this.debug("Bad data: " + e.join("\n")); } else {
  var n = Date.now(), i = +e[0], o = +e[1], r = +e[2], s = (e[3], e[4]);
  this.calculate_clocks(t || Date.now(), i, o);
  this.reset_server_timeout();
  switch (s) {
  case "a":
  this.broken_reason = "ABORT";
  this.close();
  break;

  case "d":
  this.response_timer = clearTimeout(this.response_timer);
  this.fire_resume();
  this.check_sequence(r);
  this.data_packet_queue.queueFrame(e, 5, n);
  break;

  case "e":
  this.debug("server: Are you still there?");
  this.send(null);
  this.flush();
  break;

  case "n":
  this.remote_seq = r;
  this.keep_alive_interval = +e[5] || 15e3;
  this.debug("keep_alive is " + this.keep_alive_interval + "ms");
  this.reset_server_timeout();
  this.connections > 1 && this.fire("reopen");
  break;

  case "p":
  this.debug("ping!");
  }
  }
  };
  i.prototype._onclose = function() {
  var e = this, t = this.options;
  0 == this.connections && 0 == this.disconnects && this.fire("close");
  this.debug("_onclose");
  this.disconnects++;
  this.broken_reason = "HANGUP";
  if (this.connected) { this.reconnect_timer = setTimeout(function() {
  e.reconnect_timer = null;
  e.connect(!0);
  }, t.FAST_RECONNECT_MS); } else if (!this.connections && 1 == this.connect_attempts) {
  clearTimeout(this.reconnect_timer);
  this.reconnect_timer = setTimeout(function() {
  e.reconnect_timer = null;
  e.connect();
  }, 0);
  }
  this.connected = !1;
  clearTimeout(this.keep_alive_timer);
  this.time_last_alive > 0 && this.idle_time.add(Date.now() - this.time_last_alive);
  this.time_last_open > 0 && this.connected_time.add(Date.now() - this.time_last_open);
  this.time_last_alive = this.time_last_open = -1;
  this.uptime < 0 && (this.uptime += Date.now());
  };
  i.prototype._ondrain = function() {
  this.drained = !0;
  this.flush();
  };
  i.prototype._onerror = function(e) {
  this.debug("_error");
  this.fire("error", e);
  };
  i.prototype.generate_frame = function(e, t) {
  return [ Date.now(), this.smooth_skewed_transit_time_in, ++this.local_seq, this.remote_seq, t || "d", e ].join("\n");
  };
  var v = Math.pow(50, .1), y = Math.pow(1e3, .1) - v;
  i.prototype.calculate_clocks = function(e, t, n) {
  var i = e - t, o = Math.max(0, e - this.last_frame_time), r = 1 / (o / 45e3 + 1);
  this.smooth_skewed_transit_time_in ? this.smooth_skewed_transit_time_in = r * this.smooth_skewed_transit_time_in + (1 - r) * i : this.smooth_skewed_transit_time_in = i;
  this.remote_smooth_skewed_transit_time_out = n;
  if (this.smooth_skewed_transit_time_in && this.remote_smooth_skewed_transit_time_out) {
  this.rtt = this.smooth_skewed_transit_time_in + this.remote_smooth_skewed_transit_time_out;
  this.quality = ~~(100 * (1 - (Math.pow(this.rtt, .1) - v) / y));
  this.quality = Math.min(100, Math.max(0, this.quality));
  this.raw_clock_skew = i - this.rtt / 2;
  this.clock_skew ? this.clock_skew = .9 * this.clock_skew + .1 * this.raw_clock_skew : this.clock_skew = this.raw_clock_skew;
  }
  this.time_last_alive = this.last_frame_time = e;
  };
  i.prototype.check_sequence = function(e) {
  if (this.remote_seq + 1 == e) { this.remote_seq = e; } else if (this.remote_seq < e) {
  var t = e - this.remote_seq + 1;
  this.lost_frames += t;
  this.fire("lost", t);
  this.remote_seq = e;
  } else {
  this.ooo_frames++;
  this.fire("out_of_order");
  }
  };
  m && (i.prototype.transport = m.protocol);
  i.prototype.debug = function() {};
  var w = "+-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  i.genDate = o;
  i.genID = r;
  a.prototype.add = function(e) {
  this.count++;
  this.sum += e;
  this.sq_sum += e * e;
  this.mean = this.sum / this.count;
  this.stddev = Math.sqrt(this.sq_sum / this.count - this.mean * this.mean);
  };
  var b = c.prototype;
  b.queueFrame = function(e, t, n) {
  this.queue.push({
  msgs: e,
  start_idx: t,
  receive_time: n
  });
  this.process();
  };
  b.process = function() {
  var e = Date.now() - this.last_work_finished_time;
  if (!(this.processing && e < this.socket.options.MAX_NO_WORK_TIME_MS)) {
  this.work_timer = window.clearTimeout(this.work_timer);
  this.processing = !0;
  this.work();
  }
  };
  b.work = function() {
  for (var e, t, n, i = Date.now() + this.socket.options.MAX_BLOCKING_TIME_MS, o = !1, r = this.socket.recv_frames, s = this, a = 0; a < this.queue.length; a++) {
  e = this.queue[a];
  if (!("start_time" in e)) {
  e.start_time = Date.now();
  e.ticks = 0;
  e.idx = e.start_idx;
  }
  e.ticks++;
  t = e.msgs;
  n = t.length;
  for (;e.idx < n; ) {
  var c, u = Date.now();
  if (u > i) {
  o = !0;
  break;
  }
  this.socket.dispatch_delay = u - e.receive_time;
  try {
  c = l.parse(t[e.idx]);
  e.idx++;
  } catch (n) {
  this.socket.debug("Invalid json message: " + t[e.idx]);
  continue;
  }
  this.socket.fire("message", c);
  this.socket.recv_messages++;
  this.socket.cur_conn_recv_messages++;
  }
  e.idx >= n && this.socket.recv_frames++;
  if (o) { break; }
  }
  this.queue.splice(0, this.socket.recv_frames - r);
  this.queue.length ? this.work_timer = window.setTimeout(function() {
  s.work();
  }, 0) : this.processing = !1;
  this.last_work_finished_time = Date.now();
  };
  e.exports = i;
  }, function(e, t, n) {
  function i(e) {
  return function() {
  try {
  var t = Array.prototype.slice.call(arguments, 0);
  t.unshift(r);
  h.appendChild(r);
  r.addBehavior("#default#userData");
  r.load(l);
  var n = e.apply(a, t);
  h.removeChild(r);
  return n;
  } catch (e) {}
  };
  }
  function o(e) {
  return e.replace(f, "___");
  }
  var r, s = n(11), a = {}, c = window, u = c.document, l = "localStorage";
  a.disabled = !1;
  a.set = function() {};
  a.get = function() {};
  a.remove = function() {};
  a.clear = function() {};
  a.transact = function(e, t, n) {
  var i = a.get(e);
  if (null == n) {
  n = t;
  t = null;
  }
  void 0 === i && (i = t || {});
  n(i);
  a.set(e, i);
  };
  a.getAll = function() {};
  a.serialize = function(e) {
  return s.stringify(e);
  };
  a.deserialize = function(e) {
  if ("string" == typeof e) { try {
  return s.parse(e);
  } catch (t) {
  return e || void 0;
  } }
  };
  if (function() {
  try {
  return l in c && c[l];
  } catch (e) {
  return !1;
  }
  }()) {
  r = c[l];
  a.set = function(e, t) {
  if (void 0 === t) { return a.remove(e); }
  r.setItem(e, a.serialize(t));
  return t;
  };
  a.get = function(e) {
  return a.deserialize(r.getItem(e));
  };
  a.remove = function(e) {
  r.removeItem(e);
  };
  a.clear = function() {
  r.clear();
  };
  a.getAll = function() {
  for (var e = {}, t = 0; t < r.length; ++t) {
  var n = r.key(t);
  e[n] = a.get(n);
  }
  return e;
  };
  } else if (u.documentElement.addBehavior) {
  var h, d;
  try {
  d = new window.ActiveXObject("htmlfile");
  d.open();
  d.write('<script>document.w=window</script><iframe src="/favicon.ico"></frame>');
  d.close();
  h = d.w.frames[0].document;
  r = h.createElement("div");
  } catch (e) {
  r = u.createElement("div");
  h = u.body;
  }
  var f = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g");
  a.set = i(function(e, t, n) {
  t = o(t);
  if (void 0 === n) { return a.remove(t); }
  e.setAttribute(t, a.serialize(n));
  e.save(l);
  return n;
  });
  a.get = i(function(e, t) {
  t = o(t);
  return a.deserialize(e.getAttribute(t));
  });
  a.remove = i(function(e, t) {
  t = o(t);
  e.removeAttribute(t);
  e.save(l);
  });
  a.clear = i(function(e) {
  var t = e.XMLDocument.documentElement.attributes;
  e.load(l);
  for (var n, i = 0; n = t[i]; i++) { e.removeAttribute(n.name); }
  e.save(l);
  });
  a.getAll = i(function(e) {
  for (var t, n = e.XMLDocument.documentElement.attributes, i = {}, r = 0; t = n[r]; ++r) {
  var s = o(t.name);
  i[t.name] = a.deserialize(e.getAttribute(s));
  }
  return i;
  });
  }
  try {
  a.set("__storejs__", "__storejs__");
  "__storejs__" != a.get("__storejs__") && (a.disabled = !0);
  a.remove("__storejs__");
  } catch (e) {
  a.disabled = !0;
  }
  a.enabled = !a.disabled;
  var p = a;
  e.exports = p;
  }, function(e, t) {
  function n(e) {
  return !!e && "false" != e;
  }
  e.exports = n;
  }, function(e, t, n) {
  function i(e) {
  function t() {
  if ("prerender" != document.visibilityState) {
  document.removeEventListener("visibilitychange", t);
  Pe.connect();
  }
  }
  se = e.isCookieDenied;
  ae = e.overrideProxy;
  ce = e.source;
  ue = e.lastHost;
  le = e.source_ver;
  G = e.activity_window || window;
  B = G.document;
  W = e.root;
  J = W.$("tmp").$("api_settings");
  Q = W.$("tmp").$("server_settings");
  ee = W.$("livechat").$("settings").$("cached$bool");
  Y = W.$("connection");
  te = Y.$("server_retired$bool");
  ie = Y.$("server_ready$bool");
  ie.bindValue(a);
  te.bindValue(s);
  Z = W.$("livechat").$("ui").$("mockup$bool").getValue();
  if (Z) { Y.$("status$string").update("reattached"); } else {
  W.$("livechat").$("profile").bindValue(r);
  Y.$("status$string").bindValue(o);
  Y.$("socket_status$string").bindValue(x);
  W.bindWrite(P);
  Y.$("reconnect$bool").bindValue(g);
  if (window.__z_sdk) { F = !0; } else {
  F = !1;
  "visibilityState" in document && "prerender" == document.visibilityState ? document.addEventListener("visibilitychange", t) : Pe.connect();
  }
  }
  }
  function o(e) {
  Se = "reattached" == e;
  if (Se) {
  Y.update({
  client_reattached_timestamp$int: +new Date()
  });
  P();
  }
  Se && !1 === F && S();
  if ("idle_disconnect" == e || "shutdown" == e || "error" == e) {
  var t = W.$("livechat").$("account").$("status$string").getValue(), n = W.$("connection").$("backoff"), i = n.$("active$int").getValue() || 0, o = n.$("max_seconds$int").getValue();
  "invalid_account_key" == t ? ye.warnBadEmbed() : "widget_v2" == ce && "shutdown" == e && i && o && p(o);
  d();
  }
  x();
  }
  function r(e) {
  e && (se() || ge.IS_POPOUT || e.mid$string && _e.setIdentity(e.mid$string));
  }
  function s(e) {
  ne = !0 === e;
  }
  function a(e) {
  oe = !1 !== e;
  if (oe) {
  Ce = !1;
  c();
  }
  }
  function c() {
  for (var e = 0, t = Re.length; e < t; e++) {
  var n = Re[e];
  de(n) && n();
  }
  Re = [];
  }
  function u(e) {
  if (!oe || ne) {
  Y.update({
  server_ready$bool: !1
  });
  Re.push(e);
  if (!Ce) {
  Ce = !0;
  X.reconnect();
  }
  } else { e(); }
  }
  function l(e) {
  X && X.send(e);
  }
  function h(e) {
  for (var t = -1, n = 0; n < Oe.length; n++) { if (Oe[n].socket == e) {
  t = n;
  break;
  } }
  if (-1 !== t) {
  var i = Oe[t].expiryTimer;
  e.close();
  clearTimeout(i);
  }
  }
  function d(e) {
  X && h(X);
  H = !e;
  X = null;
  xe = "";
  }
  function f() {
  window.clearTimeout(Pe.reconnectTimer);
  d(!0);
  Pe.connect();
  }
  function p(e) {
  window.clearTimeout(Pe.reconnectTimer);
  Pe.reconnectTimer = window.setTimeout(function() {
  Pe.reconnect();
  }, 1e3 * e);
  }
  function m() {
  Y.update({
  status$string: "idle_disconnect"
  });
  }
  function g(e) {
  e && f();
  }
  function _(e) {
  var t = he || new we(e, "W", null, Te);
  t.on("open", function() {
  b(e, t);
  });
  return t;
  }
  function v() {
  var e = y();
  try {
  re = Le.getGeoAccess(ae, e, 3, 2);
  } catch (e) {
  window.console && window.console.log("Unable to compute host list");
  return;
  }
  w(ke);
  }
  function y() {
  return ue || Y.$("server$string").getValue() || "";
  }
  function w(e) {
  function t() {
  clearTimeout(o);
  i.un("close", t);
  w(e);
  }
  if (!X && !H) {
  var n = re.getNextHost();
  if (n) {
  var i = _(n);
  Oe.push({
  socket: i,
  expiryTimer: setTimeout(function() {
  i != X && i.close();
  }, Ae)
  });
  if (re.hasNext()) {
  var o = setTimeout(t, e);
  i.on("close", t);
  }
  }
  }
  }
  function b(e, t) {
  if (!Z) { if (X) { h(t); } else {
  Y.update({
  socket_open_timestamp$int: +new Date(),
  socket_status$string: null,
  disconnection_status$string: null
  });
  xe = e;
  X = t;
  X.on("break", E);
  X.on("message", $);
  X.on("reopen", k);
  X.on("resume", T);
  X.on("error", function() {
  var e = this.connect_attempts, t = this.recv_messages;
  if (e > 3 && 0 == t) {
  d(!0);
  w(ke);
  }
  });
  L();
  } }
  }
  function $(e) {
  if (e) {
  if (e.raw && e.raw.__messageID in Ne) {
  var t = Ne[e.raw.__messageID];
  delete Ne[e.raw.__messageID];
  t(e);
  }
  var n = W;
  if ("update" in e) {
  var i = ye.getValueByReference(e, "livechat.account");
  if (i) {
  Q.$("account").update(i);
  ye.fullyExtend(i, J.getValue("account"));
  }
  var o = ye.getValueByReference(e, "livechat.settings");
  if (o) {
  Q.$("settings").update(o);
  ye.fullyExtend(o, J.getValue("settings"));
  }
  var r = ye.getValueByReference(e, "livechat.profile.mid$string");
  if (r && r !== _e.getIdentity()) {
  W.$("livechat").$("channel").update(null);
  W.$("livechat").$("profile").update(null);
  W.$("livechat").$("ui").$("chat_button").$("unread_count$int").update(0);
  }
  e.path && (n = n.descend(e.path));
  n.update(e.update);
  Pe.fire("message", e);
  }
  }
  }
  function E() {
  Y.update({
  socket_status$string: "break"
  });
  }
  function T() {
  Y.update({
  socket_resume_timestamp$int: +new Date(),
  socket_status$string: "resume"
  });
  }
  function k() {
  Y.update({
  socket_open_timestamp$int: +new Date(),
  socket_status$string: "reconnect"
  });
  Se = !1;
  L();
  }
  function A() {
  var e = _e.getIdentity(), t = se(), n = W.$("livechat").$("ui").getValue("mobile$bool") ? "mobile" : "desktop", i = W.$("livechat").$("settings").$("theme").getValue("name$string"), o = {
  __type: "register",
  accountKey: ge.ACCOUNT_KEY,
  mID: e,
  ua: G.navigator.userAgent,
  dt: n,
  theme: i,
  cookie_law: t,
  rev: fe.git_commit,
  source: ce,
  source_ver: le,
  multisession: !0
  };
  if (W.$("livechat").$("ui").$("popout$bool").getValue()) { o.popout = !0; } else {
  o.title = B.title;
  o.url = G.location.href;
  o.ref = G.document.referrer;
  }
  var r = Pe._register;
  if (r) { for (var s in r) { r.hasOwnProperty(s) && (o[s] = r[s]); } }
  return o;
  }
  function L() {
  if (ge.ACCOUNT_KEY) {
  X || Pe.connect();
  var e = A();
  ve.retrieveIDToken(function(t, n) {
  if (t) { q(); } else {
  if (n) {
  delete e.mID;
  e.idt = n;
  }
  l(e);
  }
  });
  }
  }
  function O() {
  return !!ee.getValue();
  }
  function x() {
  var e = Y.getValue("status$string"), t = Y.getValue("socket_status$string");
  window.clearTimeout(D.timer);
  if ("error" != e) { if ("break" == t) { if ("idle_disconnect" == e) { Y.update({
  message$string: "idle_disconnect"
  }); } else {
  Y.update({
  message$string: "reconnecting"
  });
  D.timer = window.setTimeout(D, 6e4);
  } } else if (null === t && "registered" == e) { Y.update({
  message$string: "resuming"
  }); } else if (pe(e) && pe(t)) {
  var n = O() ? "fast_init" : "first_init";
  Y.update({
  message$string: n
  });
  } else { Y.update({
  message$string: null
  }); } } else { D.timer = window.setTimeout(D, 5e3); }
  }
  function S() {
  X && W.$("livechat").$("profile").write({
  disconnect_timeout$int: U(X.rtt)
  });
  }
  function D() {
  Y.update({
  message$string: "disconnected"
  });
  }
  function R() {
  var e = X;
  return e ? {
  connect_attempts: e.connect_attempts,
  connections: e.connections,
  disconnects: e.disconnects,
  timeout_server: e.timeout_server,
  timeout_response_soft: e.timeout_response_soft,
  timeout_response_hard: e.timeout_response_hard,
  sent_bytes: e.sent_bytes,
  recv_bytes: e.recv_bytes,
  sent_messages: e.sent_messages,
  recv_messages: e.recv_messages,
  sent_frames: e.sent_frames,
  recv_frames: e.recv_frames,
  lost_frames: e.lost_frames,
  ooo_frames: e.ooo_frames,
  bytes_at_connect: e.bytes_at_connect,
  rtt: e.rtt,
  clock_skew: e.clock_skew,
  reconnect_delay: e.reconnect_delay,
  quality: e.quality,
  host: e.host,
  status: e.status,
  zone: window.__$__GEO,
  last_frame_time: e.last_frame_time,
  local_time: +new Date()
  } : {
  status: "not connected"
  };
  }
  function C() {
  return xe;
  }
  function I() {
  return +new Date() - (X ? X.clock_skew : 0);
  }
  function N(e) {
  Ie += 1;
  Ne[Ie] = e;
  return Ie;
  }
  function P(e) {
  if (e) {
  var t = {};
  t.path = e.path;
  t.value = e.value;
  de(e.func) && (t.__messageID = N(e.func));
  De.push(t);
  }
  if (X && Se) { for (;De.length; ) { X.send(De.shift()); } }
  }
  function M(e) {
  return e ? Q.getValue(e) : Q.getValue();
  }
  function U(e) {
  var t, n, i = 10 * Ee.SECOND, o = 1 * Ee.SECOND, r = 120 * Ee.SECOND, s = 20 * Ee.SECOND;
  e = Math.round(e) || 0;
  e = Math.max(o, Math.min(e, i));
  t = (e - o) / (i - o);
  n = s + function(e) {
  return e;
  }(t) * (r - s);
  return Math.floor(n / 1e3);
  }
  function V(e) {
  he = e;
  }
  function j() {
  return X ? X.id : null;
  }
  function z() {
  K();
  }
  function q() {
  Y.update({
  disconnection_status$string: "disconnecting"
  });
  d();
  Oe.forEach(function(e) {
  h(e.socket);
  e.socket.fire("close");
  });
  D.timer = clearTimeout(D.timer);
  Y.update({
  disconnection_status$string: "disconnected"
  });
  }
  function K() {
  ie.unbindValue(a);
  te.unbindValue(s);
  W.$("livechat").$("profile").unbindValue(r);
  Y.$("status$string").unbindValue(o);
  Y.$("socket_status$string").unbindValue(x);
  Y.$("reconnect$bool").unbindValue(g);
  q();
  Oe = [], xe = "", Se = !1, De = [], Re = [], Ce = !1, Ie = 0, Ne = {}, F = H = W = Y = X = Z = J = Q = ee = te = ne = ie = oe = re = se = ae = ce = ue = le = he = null;
  }
  var F, H, G, B, W, Y, X, Z, J, Q, ee, te, ne, ie, oe, re, se, ae, ce, ue, le, he, de = n(2), fe = n(5), pe = n(1), me = n(0), ge = n(4), _e = n(17), ve = n(16), ye = n(6), we = n(40), be = n(35), $e = n(34), Ee = n(32), Te = {
  FLUSH_DELAY_MS: 0,
  RECONNECT_DELAY_MS: 1e4
  }, ke = 3e3, Ae = 6e4, Le = new $e(be, !1), Oe = [], xe = "", Se = !1, De = [], Re = [], Ce = !1, Ie = 0, Ne = {}, Pe = me.extend({
  init: i,
  send: l,
  connect: v,
  reconnect: f,
  clientDisconnect: q,
  destroy: K,
  disconnect: m,
  getConnectionStats: R,
  getHost: C,
  getServerTime: I,
  getServerSettings: M,
  reconnectIfServerRetired: u,
  registerCallback: N,
  getSocketID: j,
  getDCTimeoutValue: U,
  setSocket: V,
  reset: z
  });
  e.exports = Pe;
  }, function(e, t, n) {
  function i(e) {
  var t = e.type, n = u[t];
  if (!n) { return t ? new Error(t + " type is not supported. Please upgrade the Web SDK version.") : new Error('Structured message object should contain "type" property'); }
  var i = n(e);
  if (i) {
  var o = i.paths && "type" === i.paths.pop(), r = o && i.actual ? i.actual + " type is not supported. Please upgrade the Web SDK version." : i.message;
  return new Error(r);
  }
  }
  var o = n(18), r = {
  QUICK_REPLIES: "QUICK_REPLIES",
  BUTTON_TEMPLATE: "BUTTON_TEMPLATE",
  PANEL_TEMPLATE: "PANEL_TEMPLATE",
  PANEL_TEMPLATE_CAROUSEL: "PANEL_TEMPLATE_CAROUSEL",
  LIST_TEMPLATE: "LIST_TEMPLATE"
  }, s = {
  QUICK_REPLY_ACTION: "QUICK_REPLY_ACTION",
  LINK_ACTION: "LINK_ACTION"
  }, a = o.obj({
  text: o.type("string"),
  action: o.obj({
  type: o.any([ o.equal(s.QUICK_REPLY_ACTION), o.equal(s.LINK_ACTION) ]),
  value: o.type("string")
  }, {
  requiredKeys: [ "type", "value" ],
  whitelistedKeysOnly: !0
  })
  }, {
  requiredKeys: [ "text", "action" ],
  whitelistedKeysOnly: !0
  }), c = o.obj({
  type: o.equal(r.PANEL_TEMPLATE),
  panel: o.obj({
  heading: o.type("string"),
  paragraph: o.type("string"),
  image_url: o.type("string"),
  action: o.obj({
  type: o.equal(s.LINK_ACTION),
  value: o.type("string")
  }, {
  requiredKeys: [ "type", "value" ],
  whitelistedKeysOnly: !0
  })
  }, {
  requiredKeys: [ "heading" ],
  whitelistedKeysOnly: !0
  }),
  buttons: o.each(a)
  }, {
  requiredKeys: [ "type", "panel" ],
  whitelistedKeysOnly: !0
  }), u = {
  QUICK_REPLIES: o.obj({
  type: o.equal(r.QUICK_REPLIES),
  msg: o.type("string"),
  quick_replies: o.each(o.obj({
  text: o.type("string"),
  action: o.obj({
  type: o.equal(s.QUICK_REPLY_ACTION),
  value: o.type("string")
  }, {
  requiredKeys: [ "type", "value" ],
  whitelistedKeysOnly: !0
  })
  }, {
  requiredKeys: [ "text", "action" ],
  whitelistedKeysOnly: !0
  }))
  }, {
  requiredKeys: [ "type", "msg", "quick_replies" ],
  whitelistedKeysOnly: !0
  }),
  BUTTON_TEMPLATE: o.obj({
  type: o.equal(r.BUTTON_TEMPLATE),
  msg: o.type("string"),
  buttons: o.each(a)
  }, {
  requiredKeys: [ "type", "msg", "buttons" ],
  whitelistedKeysOnly: !0
  }),
  PANEL_TEMPLATE: c,
  PANEL_TEMPLATE_CAROUSEL: o.obj({
  type: o.equal(r.PANEL_TEMPLATE_CAROUSEL),
  items: o.each(c).minLength(2).maxLength(10)
  }, {
  requiredKeys: [ "type", "items" ],
  whitelistedKeysOnly: !0
  }),
  LIST_TEMPLATE: o.obj({
  type: o.equal(r.LIST_TEMPLATE),
  items: o.each(o.obj({
  heading: o.type("string"),
  paragraph: o.type("string"),
  image_url: o.type("string"),
  action: o.obj({
  type: o.equal(s.LINK_ACTION),
  value: o.type("string")
  }, {
  requiredKeys: [ "type", "value" ],
  whitelistedKeysOnly: !0
  })
  }, {
  requiredKeys: [ "heading", "paragraph", "action" ],
  whitelistedKeysOnly: !0
  })),
  buttons: o.each(a)
  }, {
  requiredKeys: [ "type", "items" ],
  whitelistedKeysOnly: !0
  })
  }, l = {
  validate: i,
  STRUCTURED_MSG_VALIDATOR: u,
  STRUCTURED_MSG_TYPE: r
  };
  e.exports = l;
  }, function(e, t, n) {
  function i(e, t) {
  if (!o(t.interval) || !o(t.limit)) { throw new Error("requires numeric interval and limit"); }
  if (t.callback && !r(t.callback)) { throw new Error("requires callback to be a function"); }
  return function() {
  var n = Date.now();
  if (t.start > n - t.interval) {
  t.count || (t.count = 0);
  t.count++;
  if (t.count > t.limit) {
  t.callback && t.callback();
  return;
  }
  } else {
  t.start = n;
  t.count = 1;
  }
  return e.apply(this, arguments);
  };
  }
  var o = n(15), r = n(2), s = {
  rateLimit: i
  };
  e.exports = s;
  }, function(e, t, n) {
  function i(e, t, n) {
  var i = this;
  o.extend(i);
  var s = new r();
  t = t || {};
  s.setScope(t);
  s.on("success", n);
  s.on("error", function(e) {
  i.onError(e);
  });
  s.load(e);
  }
  var o = n(0), r = n(21);
  i.prototype.onError = function(e) {};
  e.exports = i;
  }, function(e, t, n) {
  function i(e, t) {
  var n = a[e];
  n.module_function = new Function("$Modules", t.toString().replace(h, "$1"));
  n.ready();
  }
  function o(e) {
  var t, n, i, o;
  for (t = l.length - 1; t >= 0; t--) {
  i = l[t];
  o = i.dependencies;
  for (n = o.length - 1; n >= 0; n--) { if (o[n] == e) {
  o.splice(n, 1);
  break;
  } }
  i.ready();
  }
  }
  function r() {
  var e = Array.prototype.slice.call(arguments), t = e.shift();
  this.fqname = t;
  this.name = t.split(".").pop();
  this.callbacks = [];
  this.dependencies = e;
  l.push(this);
  }
  function s(e) {
  e();
  }
  var a = n(22), c = n(5), u = n(46), l = [], h = /^function *\( *\) *{ *([\s\S]*) *}$/;
  r.ensureLoaded = function(e, t) {
  e instanceof r ? e.ensureLoaded(t) : t();
  };
  r.prototype.ensureLoaded = function(e) {
  this.ifLoaded(e);
  this.load();
  };
  r.prototype.ifLoaded = function(e) {
  this.callbacks.push(e);
  };
  r.prototype.load = function() {
  function e(e) {
  i(e[0], e[1]);
  }
  var t, n, o = this.getDependencies();
  for (t = 0; t < o.length; t++) {
  n = o[t];
  n.loader || (n.loader = new u(c.baseURL + "/lib/" + c.build_number + "/" + n.fqname + ".js", a, e));
  }
  };
  r.prototype.getDependencies = function() {
  var e, t = this.dependencies, n = [ this ];
  for (e = 0; e < t.length; e++) {
  var i = a[t[e]];
  n = n.concat(i.getDependencies());
  }
  return n;
  };
  r.prototype.ready = function() {
  if (!this.dependencies.length && this.module_function) {
  for (e = l.length - 1; e >= 0; e--) { if (l[e] == this) {
  l.splice(e, 1);
  break;
  } }
  this.module_function(a);
  var e, t = a[this.fqname];
  t.ifLoaded = t.ensureLoaded = s;
  for (e = 0; e < this.callbacks.length; e++) { this.callbacks[e](t); }
  o(this.fqname);
  delete this.callbacks;
  delete this.fqname;
  delete this.name;
  delete this.dependencies;
  delete this.loader;
  }
  };
  a.Module = r;
  e.exports = r;
  }, function(e, t) {
  function n(e) {
  return window[e];
  }
  var i = {
  getVariable: n
  };
  e.exports = i;
  }, function(e, t, n) {
  function i() {
  var e = o.getVariable("navigator"), t = e.userAgent || "", n = e.vendor || "", i = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino|android|ipad|playbook|silk/i, r = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i, s = t || n || window.opera;
  return i.test(s) || r.test(s.substr(0, 4));
  }
  var o = n(48);
  e.exports = i;
  }, function(e, t) {
  function n(e, t) {
  this.name = e;
  this.leaf = /\$[a-z]+$/.test(e);
  this.parentNode = t;
  if (!this.leaf) {
  this.deleted = !1;
  this.childNodes = {};
  this.keys = {};
  }
  }
  function i(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
  }
  function o(e) {
  for (var t = "", n = 0; n < e.length; n++) { /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(e[n]) ? t += "." + e[n] : t += "[" + JSON.stringify(e[n]) + "]"; }
  return t.substr(1);
  }
  n.prototype.fqname = function() {
  return o(this.path());
  };
  n.prototype.path = function() {
  for (var e = this, t = [ this.name ]; e = e.parentNode; ) { t.unshift(e.name); }
  return t;
  };
  n.prototype._getOrCreateChildNode = function(e) {
  var t;
  if (i(this.childNodes, e)) { t = this.childNodes[e]; } else {
  t = new n(e, this);
  this.childNodes[e] = t;
  this.deleted && t.undeleteParents();
  }
  return t;
  };
  n.prototype.descend = function(e) {
  var t, n, i = this;
  "string" == typeof e && (e = e.split("."));
  for (t = 0, n = e.length; t < n; t++) { i = i._getOrCreateChildNode(e[t]); }
  return i;
  };
  n.prototype.$$ = n.prototype.descend;
  n.prototype.$ = function(e, t, n, i, o, r, s, a, c) {
  var u = this._getOrCreateChildNode(e);
  return t ? u.$(t, n, i, o, r, s, a, c) : u;
  };
  n.prototype.update = function(e, t) {
  var n, i, o, r, s;
  null != e && this.undeleteParents();
  if (this.leaf) {
  if (this.value !== e) {
  this.value = e;
  r = !0;
  this.notifyListeners(e, t);
  }
  } else if (null == e) {
  if (!this.deleted) {
  r = null;
  this.deleted = !0;
  for (n in this.childNodes) { this.childNodes[n].update(null, !0); }
  this.notifyListeners(r, t);
  }
  } else {
  if (this.deleted) {
  this.deleted = !1;
  r = e;
  for (n in e) { this.$(n).update(e[n], !0); }
  } else { for (n in e) {
  o = this.$(n);
  i = e[n];
  if (o.leaf) {
  if (o.update(i, !0)) {
  r || (r = {});
  r[n] = i;
  }
  } else if (void 0 !== (s = o.update(i, !0))) {
  r || (r = {});
  r[n] = s;
  }
  } }
  r && this.notifyListeners(r, t);
  }
  return r;
  };
  n.prototype.replace = function(e, t) {
  var n, o, r, s, a;
  null != e && this.undeleteParents();
  if (this.leaf) {
  if (this.value !== e) {
  this.value = e;
  s = !0;
  this.notifyListeners(e, t);
  }
  } else if (null == e) {
  if (!this.deleted) {
  s = null;
  this.deleted = !0;
  for (n in this.childNodes) { this.childNodes[n].replace(null, !0); }
  this.notifyListeners(s, t);
  }
  } else {
  if (this.deleted) {
  this.deleted = !1;
  s = e;
  for (n in e) { this.$(n).replace(e[n], !0); }
  } else {
  for (n in this.childNodes) { if (!i(e, n)) {
  r = this.childNodes[n];
  if (r.leaf) {
  if (r.replace(null, !0)) {
  s || (s = {});
  s[n] = null;
  }
  } else if (void 0 !== (a = r.replace(null, !0))) {
  s || (s = {});
  s[n] = null;
  }
  } }
  for (n in e) {
  r = this.$(n);
  o = e[n];
  if (r.leaf) {
  if (r.replace(o, !0)) {
  s || (s = {});
  s[n] = o;
  }
  } else if (void 0 !== (a = r.replace(o, !0))) {
  s || (s = {});
  s[n] = a;
  }
  }
  }
  s && this.notifyListeners(s, t);
  }
  return s;
  };
  n.prototype.undeleteParents = function() {
  for (var e = this.parentNode; e && e.deleted; ) {
  e.deleted = !1;
  e = e.parentNode;
  }
  };
  n.prototype.write = function(e, t, n) {
  if ("function" == typeof t) {
  n = t;
  t = !1;
  }
  var i = {
  path: this.path(),
  value: e
  };
  "function" == typeof n && (i.func = n);
  this.update(e, t || !1);
  for (var o = this; o.parentNode; ) { o = o.parentNode; }
  o.notifyWriteListeners(i);
  };
  n.prototype.bindWrite = function(e) {
  this.getWriteListeners().push(e);
  };
  n.prototype.getValueListeners = function() {
  this.listeners_value || (this.listeners_value = []);
  return this.listeners_value;
  };
  n.prototype.getWriteListeners = function() {
  this.listeners_write || (this.listeners_write = []);
  return this.listeners_write;
  };
  n.prototype.getKeysListeners = function() {
  this.listeners_keys || (this.listeners_keys = []);
  return this.listeners_keys;
  };
  n.prototype.bindValue = function(e) {
  var t = this.getValueListeners();
  t.push(e);
  try {
  e.call(this, this.getValue());
  } catch (e) {}
  };
  n.prototype.bindKeys = function(e) {
  if (!this.leaf) {
  var t = this.getKeysListeners();
  t.push(e);
  try {
  e.call(this, this.getKeys(), []);
  } catch (e) {}
  }
  };
  n.prototype.unbindValue = function(e) {
  for (var t = this.getValueListeners(), n = 0; n < t.length; n++) { if (t[n] == e) {
  t.splice(n, 1);
  return;
  } }
  };
  n.prototype.unbindKeys = function(e) {
  if (!this.leaf) { for (var t = this.getKeysListeners(), n = 0; n < t.length; n++) { if (t[n] == e) {
  t.splice(n, 1);
  return;
  } } }
  };
  n.prototype.on = function(e, t) {
  switch (e) {
  case "value":
  this.bindValue(t);
  break;

  case "keys":
  this.bindKeys(t);
  }
  };
  n.prototype.un = function(e, t) {
  switch (e) {
  case "value":
  this.unbindValue(t);
  break;

  case "keys":
  this.unbindKeys(t);
  }
  };
  n.prototype.notifyListeners = function(e, t) {
  var n, o, r, s;
  if (!this.leaf) { if (e) {
  for (n in e) { if (null != e[n]) {
  if (!i(this.keys, n)) {
  this.keys[n] = 1;
  o || (o = []);
  o.push(n);
  }
  } else if (i(this.keys, n)) {
  delete this.keys[n];
  r || (r = []);
  r.push(n);
  } }
  } else { for (n in this.keys) {
  delete this.keys[n];
  r || (r = []);
  r.push(n);
  } } }
  if (this.listeners_value) {
  s = this.getValueListeners().concat();
  for (var a = 0, c = s.length; a < c; a++) { try {
  s[a](e);
  } catch (e) {} }
  }
  if (!this.leaf) {
  if (this.listeners_keys && (o || r)) {
  s = this.getKeysListeners().concat();
  for (a = 0, c = s.length; a < c; a++) { try {
  s[a](o || [], r || []);
  } catch (e) {} }
  }
  if (!t && this.parentNode) {
  var u = {};
  u[this.name] = e;
  this.parentNode.notifyListeners(u, t);
  }
  }
  };
  n.prototype.notifyWriteListeners = function(e) {
  if (this.listeners_write) { for (var t = this.getWriteListeners().concat(), n = 0; n < t.length; n++) { try {
  t[n].call(this, e);
  } catch (e) {} } }
  };
  n.prototype.getValue = function(e) {
  if (e) { return this.descend(e).getValue(); }
  if (this.leaf) { return this.value; }
  if (this.deleted) { return null; }
  var t, n, i = {};
  for (var o in this.childNodes) { if (null != (n = this.childNodes[o].getValue())) {
  i[o] = n;
  t = !0;
  } }
  return t ? i : null;
  };
  n.prototype.hasKey = function(e) {
  return i(this.keys, e);
  };
  n.prototype.getKeys = function() {
  if (this.leaf) { return null; }
  var e = [];
  for (var t in this.keys) { e.push(t); }
  return e;
  };
  n.prototype.gc = function() {
  if (this.leaf) { throw new TypeError("Leaf nodes cannot be collected"); }
  var e = !0;
  for (var t in this.childNodes) {
  var n = this.childNodes[t];
  e = n.leaf ? !(n.listeners_value && n.listeners_value.length) && null == n.value && (delete this.keys[t], delete this.childNodes[t]) && e : n.gc() && (delete this.keys[t], delete this.childNodes[t]) && e;
  }
  return e && this.deleted && !(this.listeners_keys && this.listeners_keys.length) && !(this.listeners_value && this.listeners_value.length);
  };
  n.DataNode = n;
  e.exports = n;
  }, function(e, t, n) {
  function i(e) {
  if (!le([ at ], [ e ], "logout")) { if (Ge.isAuthenticated()) {
  we.destroy();
  s();
  Ge.clearIdentity();
  Be.clearIdentity();
  Je = !1;
  e && setTimeout(function() {
  e(null);
  });
  } else { ue(new Error("This API is only applicable for authenticated visitors"), "logout"); } }
  }
  function o(e) {
  Ee && Qe.un("data", Ee);
  Ee = function(e) {
  Ze.fire(e.type, e.detail);
  };
  Qe.on("data", Ee);
  if (Je) { ue(new Error("Zendesk Chat Web SDK has already been initialized. Please ensure that zChat.init() is only called once in your code"), "init"); } else if (Ae.isIE <= 10) { ue(new Error("The current browser you are on is not supported by the Web SDK. Please refer to the documentation to learn about the system requirements for Zendesk Chat."), "init"); } else {
  var t = nt.obj({
  account_key: nt.type("string").ok(),
  suppress_console_error: nt.type("boolean"),
  override_auth_server_host: nt.type("string").ok(),
  override_proxy: nt.type("string").ok(),
  authentication: nt.obj({
  jwt_fn: nt.type("function").ok()
  }, {
  requiredKeys: [ "jwt_fn" ]
  }),
  activity_window: nt.obj({
  document: nt.type("object").ok()
  }, {
  requiredKeys: [ "document" ]
  }),
  popout: nt.type("boolean")
  }, {
  requiredKeys: [ "account_key" ]
  });
  if (!le([ t ], [ e ], "init")) {
  var n = new Ie("root"), i = new Ie("root"), o = {
  livechat: {
  settings: Ce.clone(He.livechat.settings)
  }
  };
  n.update(o);
  i.update(o);
  Ue() && n.$("livechat").$("ui").$("mobile$bool").update(!0);
  Me.ACCOUNT_KEY = e.account_key;
  if (e.authentication) {
  Ge.setOverrideHost(e.override_auth_server_host);
  Ge.setSiteJWTFunc(e.authentication.jwt_fn);
  Ge.setDataNode(n);
  Ge.authenticate(function(t) {
  t ? ue(new Error("Failed to verify token: " + t.reason + (t.details ? ": " + t.details : "")), "init", {
  reason: t.reason,
  details: t.details
  }) : r(e, Ke, n, i);
  });
  } else { r(e, Ke, n, i); }
  }
  }
  }
  function r(e, t, n, i) {
  we = t;
  be = n;
  $e = i;
  Ye.init(be, $e);
  ee();
  Te = function(e) {
  (e.path ? $e.descend(e.path) : $e).update(e.update);
  };
  we.on("message", Te);
  ke = e.suppress_console_error || !1;
  Be.init(e.activity_window);
  switch (Be.DOM.getVariable("account_status")) {
  case "invalid_account_key":
  Ve.warnBadEmbed();

  case "banned":
  return;
  }
  we.init({
  root: be,
  overrideProxy: e.override_proxy,
  isCookieDenied: function() {
  return !1;
  },
  source: et,
  lastHost: Be.DOM.getVariable("web_sdk_last_host"),
  source_ver: Le.release_tag,
  activity_window: e.activity_window
  });
  be.$("connection").$("server$string").bindValue(function(e) {
  e && Be.DOM.saveVariable("web_sdk_last_host", e);
  });
  $e.$("livechat").$("account").$("status$string").bindValue(function(e) {
  e && Be.DOM.saveVariable("account_status", e);
  });
  Fe.init(be, we);
  We.init(be, e.activity_window);
  Je = !0;
  }
  function s() {
  Qe.un("data", Ee);
  Ye.destroy();
  we.un("message", Te);
  Ee = null;
  Te = null;
  ke = void 0;
  }
  function a() {
  we.reconnect();
  }
  function c() {
  "invalid_account_key" !== Be.DOM.getVariable("account_status") ? "closed" === Ze.getConnectionStatus() ? lt() : ue(new Error("Call has been ignored due to invalid connection status"), "reconnect") : Ve.warnBadEmbed();
  }
  function u() {
  return Qe;
  }
  function l() {
  return gt($e.$("livechat").$("profile").getValue());
  }
  function h(e, t) {
  if (!le([ nt.obj({
  display_name: nt.any([ nt.equal(""), nt.type("string").regex(rt).maxLength(255) ]),
  email: nt.any([ nt.equal(""), nt.type("string").regex(Ne.email) ]),
  phone: st
  }), at ], [ e, t ], "setVisitorInfo")) {
  var n = {};
  t = t || tt;
  "display_name" in e && (n.display_name$string = e.display_name);
  "email" in e && (n.email$string = e.email);
  "phone" in e && (n.phone$string = e.phone);
  be.$("livechat").$("profile").write(n, fe(t));
  }
  }
  function d(e, t) {
  if (!le([ nt.type("string").regex(rt), at ], [ e, t ], "sendChatMsg")) {
  t = t || tt;
  Fe.sendChatMsg({
  msg: e.trim()
  }, null, fe(t));
  }
  }
  function f(e, t) {
  le([ nt.chain(he), at ], [ e, t ], "sendFile") || p(e, t);
  }
  function p(e, t) {
  t = t || tt;
  Ke.reconnectIfServerRetired(function() {
  Fe.sendFileWithCallback(e, t);
  });
  }
  function m(e) {
  if (!le([ nt.type("number") ], [ e ], "getDepartment")) { return g(e); }
  }
  function g(e) {
  var t = $e.$("livechat").$("departments").$(e).getValue();
  if (t) { return _t(t, e); }
  }
  function _() {
  return oe($e.$("livechat").$("departments").getValue(), _t);
  }
  function v() {
  var e = $e.$("livechat").$("profile").$("department_id$int"), t = e.getValue();
  return xe(t) ? t : void 0;
  }
  function y(e, t) {
  if (!le([ nt.type("number").chain(de), at ], [ e, t ], "setVisitorDefaultDepartment")) {
  t = t || tt;
  be.$("livechat").$("profile").write({
  department_id$int: e
  }, fe(t));
  }
  }
  function w(e) {
  if (!le([ at ], [ e ], "clearVisitorDefaultDepartment")) {
  e = e || tt;
  be.$("livechat").$("profile").write({
  department_id$int: null
  }, fe(e));
  }
  }
  function b(e, t) {
  E("added$string", e, "addTag", t);
  }
  function $(e, t) {
  E("removed$string", e, "removeTag", t);
  }
  function E(e, t, n, i) {
  if (!le([ nt.type("string").regex(rt).chain(ct), at ], [ t, i ], n)) {
  i = i || tt;
  var o = {};
  o[e] = t.trim();
  be.$("livechat").$("channel").$("tags").write(o, fe(i));
  }
  }
  function T(e, t) {
  A("added$string", e, "addTags", t);
  }
  function k(e, t) {
  A("removed$string", e, "removeTags", t);
  }
  function A(e, t, n, i) {
  if (!le([ nt.each(nt.type("string").regex(rt).chain(ct)).minLength(1), at ], [ t, i ], n)) {
  i = i || tt;
  for (var o = 0, r = t.length; o < r; o++) { t[o] = t[o].trim(); }
  var s = {};
  s[e] = t.join(",");
  be.$("livechat").$("channel").$("tags").write(s, fe(i));
  }
  }
  function L(e, t) {
  if (!le([ nt.obj({
  title: nt.type("string").regex(rt),
  url: nt.type("string").regex(ot)
  }, {
  requiredKeys: [ "title", "url" ]
  }), at ], [ e, t ], "sendVisitorPath")) {
  t = t || tt;
  be.$("livechat").$("session").$("page_path").write({
  url$string: e.url,
  title$string: e.title
  }, fe(t));
  }
  }
  function O() {
  var e = $e.$("livechat").$("channel").$("rating$string").getValue(), t = $e.$("livechat").$("channel").$("comment$string").getValue(), n = {};
  Se(e) || (n.rating = e);
  Se(t) || (n.comment = t);
  return n;
  }
  function x(e, t) {
  if (!le([ nt.any([ nt.equal(null), nt.equal("good"), nt.equal("bad") ]), at ], [ e, t ], "sendChatRating")) {
  t = t || tt;
  be.$("livechat").$("channel").write({
  rating$string: e
  }, fe(t));
  }
  }
  function S(e, t) {
  if (!le([ nt.type("string"), at ], [ e, t ], "sendChatComment")) {
  t = t || tt;
  be.$("livechat").$("channel").write({
  comment$string: e
  }, fe(t));
  }
  }
  function D(e) {
  var t = be.$("livechat").$("channel");
  if (!le([ at ], [ e ], "endChat")) {
  e = e || tt;
  t.write({
  chatting$bool: !1
  }, fe(e));
  }
  }
  function R() {
  return $e.$("livechat").$("channel").$("chatting$bool").getValue() || !1;
  }
  function C() {
  return oe($e.$("livechat").$("agents").getValue(), vt);
  }
  function I(e) {
  return vt($e.$("livechat").$("agents").$(e).getValue(), e);
  }
  function N() {
  var e = $e.$("livechat"), t = e.$("settings"), n = t.$("operating_hours");
  if (t.hasKey("operating_hours")) {
  var i = n.$("type$string").getValue(), o = {
  enabled: n.$("enabled$bool").getValue(),
  type: i,
  timezone: t.$("timezone$string").getValue() || "UTC"
  };
  "account" == i ? o.account_schedule = pe(n.$("schedule").getValue() || {}) : "department" == i && (o.department_schedule = me(n.$("schedules").getValue(), e.$("departments").getKeys()));
  return o;
  }
  }
  function P(e, t) {
  if (!le([ nt.obj({
  name: nt.type("string").regex(rt).maxLength(255),
  email: nt.type("string").regex(Ne.email),
  message: nt.type("string").regex(rt),
  phone: st
  }, {
  requiredKeys: [ "name", "email", "message" ]
  }), at ], [ e, t ], "sendOfflineMsg")) {
  t = t || tt;
  var n = {
  name: {
  name$string: "name",
  value$string: e.name
  },
  email: {
  name$string: "email",
  value$string: e.email
  },
  message: {
  name$string: "message",
  value$string: e.message
  }
  };
  "phone" in e && (n.phone = {
  name$string: "phone",
  value$string: e.phone
  });
  "department" in e && (n.department = {
  name$string: "department_id",
  value$string: e.department
  });
  be.$("livechat").$("settings").$("forms").$("offline_form").$("form_submitted").write(n, fe(t));
  }
  }
  function M(e) {
  var t = be.$("livechat").$("channel").$("typing"), n = t.$("typing$bool").getValue(), i = nt.type("boolean");
  n !== e && (le([ i ], [ e ], "sendTyping") || t.write({
  typing$bool: e
  }));
  }
  function U(e, t) {
  var n = nt.type("string").regex(Ne.email), i = !!$e.$("livechat").$("channel").$("log").getKeys().length;
  if (!le([ n, at ], [ e, t ], "sendEmailTranscript")) {
  t = t || tt;
  $e.$("livechat").$("channel").$("chatting$bool").getValue() || !1 ? be.$("livechat").$("channel").write({
  email_transcript$string: e
  }, fe(t)) : Ge.isAuthenticated() || i ? be.$("livechat").$("channel").write({
  email_last_transcript$string: e
  }, fe(t)) : ue(new Error("There were no past chat to send a transcript of"), "sendEmailTranscript");
  }
  }
  function V(e, t) {
  return {
  id: parseInt(t, 10)
  };
  }
  function j(e) {
  return e.hasOwnProperty("typing$bool") ? {
  type: "typing"
  } : null;
  }
  function z(e) {
  var t = e.hasOwnProperty("typing$bool"), n = {
  type: "typing",
  nick: "agent:trigger"
  };
  return t ? n : null;
  }
  function q(e) {
  return e.hasOwnProperty("timestamp$int") ? {
  type: "last_read"
  } : null;
  }
  function K(e) {
  return 0 === e.indexOf("visitor:") ? "visitor" : e;
  }
  function F(e) {
  if (!e.type$string) { return null; }
  if (!e.nick$string) { return null; }
  var t = {
  nick: K(e.nick$string),
  type: e.type$string
  }, n = e.msg$string;
  e.first$bool && (t.first = e.first$bool);
  switch (e.type$string) {
  case "chat.msg":
  if ("attachment" in e) {
  if (!0 === e.unverified$bool) { return null; }
  var i, o = e.attachment, r = {
  mime_type: o.mime_type$string,
  name: o.name$string,
  size: o.size$int,
  url: o.url$string
  };
  if ("metadata" in o) {
  i = o.metadata;
  r.metadata = {
  width: i.width$int,
  height: i.height$int
  };
  }
  "deleted$bool" in o && (r.deleted = o.deleted$bool);
  return Ce.extend(t, {
  type: "chat.file",
  display_name: e.display_name$string,
  attachment: r
  });
  }
  if ("structured_msg" in e) {
  var s = ce(e.structured_msg);
  ve(s, [ "items", "buttons", "quick_replies" ]);
  var a = qe.validate(s);
  a ? ue(a, 'Unsupported structured message in "chat.msg" event') : t.structured_msg = s;
  }
  return Ce.extend(t, {
  display_name: e.display_name$string,
  msg: n,
  options: e.options$string ? e.options$string.split("/") : []
  });

  case "chat.rating":
  return Ce.extend(t, {
  display_name: e.display_name$string,
  new_rating: e.new_rating$string,
  rating: e.rating$string
  });

  case "chat.comment":
  return Ce.extend(t, {
  display_name: e.display_name$string,
  comment: e.comment$string,
  new_comment: e.new_comment$string
  });

  case "chat.memberjoin":
  case "chat.memberleave":
  case "chat.request.rating":
  return Ce.extend(t, {
  display_name: e.display_name$string
  });

  case "chat.event":
  var c, u = /Please wait while our agents attend to you. There are currently (\d+) visitor\(s\) waiting to be served\./;
  return "agent:system" === e.nick$string && (c = u.exec(n)) ? {
  type: "chat.wait_queue",
  nick: "system.queue",
  wait_queue: parseInt(c[1], 10)
  } : null;

  case "chat.join":
  var l = e.history;
  if (l && l[0]) {
  var h = Ce.extend({}, l[0]), d = h.timestamp$int;
  h.type$string = h.__type$string;
  h.display_name$string = h.name$string;
  d *= 1e3;
  h.timestamp$int = d;
  return F(h);
  }
  return null;

  case "chat.file.update":
  default:
  return null;
  }
  }
  function H() {
  var e, t, n, i = [ "type$string", "timestamp$int" ], o = $e.$("livechat").$("channel").$("log").getValue(), r = [];
  for (var s in o) { if (o.hasOwnProperty(s)) {
  if (o[s].type$string) { e = o[s]; } else {
  e = be.$("livechat").$("channel").$("log").$(s).getValue();
  if ("chat.msg" === e.type$string && (!0 === e.unverified$bool || !0 === e.failed$bool)) { continue; }
  }
  var a = F(e);
  if (null === a) { continue; }
  for (var c = 0; c < i.length; c++) {
  t = i[c];
  n = ae(t);
  n in a || (a[n] = e[t]);
  }
  r.push(a);
  } }
  return r;
  }
  function G() {
  if (!$e) { return "closed"; }
  var e = $e.$("tmp").$("friendly_connection_status$string").getValue();
  return pt(e)[0];
  }
  function B() {
  var e = $e.$("livechat").$("account").$("status$string").getValue();
  return mt(e)[0];
  }
  function W() {
  return $e.$("livechat").$("channel").$("queue_position$int").getValue() || 0;
  }
  function Y(e) {
  if (!le([ at ], [ e ], "fetchChatHistory")) { if (Ge.isAuthenticated()) {
  var t = $e.$("livechat").$("history"), n = be.$("livechat").$("history"), i = n.$("in_progress$bool").getValue(), o = t.$("has_more$bool").getValue(), r = t.$("cursor$string").getValue();
  if (i) { ue(new Error("Previous fetching of history is still in progress"), "fetchChatHistory"); } else if (!1 !== o) {
  e = e || tt;
  n.$("in_progress$bool").update(!0);
  n.write({
  cursor$string: r || ""
  }, fe(e));
  } else { ue(new Error("No more history to load"), "fetchChatHistory"); }
  } else { ue(new Error("This API is not available for unauthenticated visitors"), "fetchChatHistory"); } }
  }
  function X() {
  R() && be.$("livechat").$("ui").$("chat").write({
  read_ts$int: +new Date()
  });
  }
  function Z(e, t, n) {
  return function(i, o) {
  if (null === i) { return {}; }
  for (var r = {}, s = 0, a = e.length; s < a; s++) {
  var c = e[s];
  c in i && (r[ae(c)] = i[c]);
  }
  De(t) && Object.keys(r).length && (r[t] = o);
  if (Re(n)) {
  var u = n(i, o);
  return null === u ? {} : Ce.extend(r, u);
  }
  return r;
  };
  }
  function J(e, t, n) {
  $e.descend(t).bindValue(function(t) {
  n(t).forEach(function(t) {
  Q(e, t);
  });
  });
  }
  function Q(e, t) {
  if (t) {
  if (t instanceof Error) {
  if (!t.message) { return; }
  } else if ("object" == typeof t && !Object.keys(t).length) { return; }
  Qe.fire("data", {
  type: e,
  detail: t
  });
  }
  }
  function ee() {
  J("connection_update", "tmp.friendly_connection_status$string", pt);
  J("account_status", "livechat.account.status$string", ne(ft));
  J("visitor_update", "livechat.profile", re([ "email$string", "phone$string", "display_name$string" ], l));
  J("department_update", "livechat.departments", se([ "name$string", "status$string" ], g));
  J("agent_update", "livechat.agents", se([ "avatar_path$string", "display_name$string", "title$string" ], I));
  J("chat", "livechat.channel.log", ie(bt));
  J("chat", "livechat.agents", ie(yt));
  J("chat", "livechat.triggers.agents", ie(wt));
  J("chat", "livechat.channel.queue_position$int", te);
  J("history", "livechat.history.log", ie(bt));
  J("chat", "livechat.channel.last_read", ie($t));
  }
  function te(e) {
  return [ "number" != typeof e ? null : {
  type: "chat.queue_position",
  nick: "system.queue",
  queue_position: e
  } ];
  }
  function ne(e) {
  return function(t) {
  return void 0 === t ? [ null ] : [ e[t] || null ];
  };
  }
  function ie(e) {
  return function(t) {
  return oe(t, e);
  };
  }
  function oe(e, t) {
  var n = [];
  for (var i in e) { e.hasOwnProperty(i) && n.push(t(e[i], i)); }
  return n;
  }
  function re(e, t) {
  return function(n) {
  return e.some(function(e) {
  return n && e in n;
  }) ? [ t() ] : [ null ];
  };
  }
  function se(e, t) {
  return function(n) {
  var i = [];
  for (var o in n) { if (n.hasOwnProperty(o)) {
  var r = n[o], s = e.some(function(e) {
  return r && e in r;
  });
  s && i.push(t(o));
  } }
  return i;
  };
  }
  function ae(e) {
  return e.split("$")[0];
  }
  function ce(e) {
  if (!e || "object" != typeof e) { return e; }
  var t = {};
  for (var n in e) { if (e.hasOwnProperty(n)) {
  var i = ae(n), o = ce(e[n]);
  t[i] = o;
  } }
  return t;
  }
  function ue(e, t, n) {
  var i = t ? t + ": " : "";
  e = new Error("Zendesk Chat Web SDK: Error: " + i + e.message);
  e.context = t;
  e.extra = n;
  ke || window.console && window.console.error && console.error(e.message);
  Q("error", e);
  }
  function le(e, t, n) {
  for (var i = 0; i < e.length; i++) {
  var o = e[i], r = o(t[i]);
  if (r) {
  ue(r, n);
  return !0;
  }
  }
  return !1;
  }
  function he(e) {
  if ("[object File]" !== Object.prototype.toString.call(e)) { return new Error("Expect a File object"); }
  }
  function de(e) {
  if (!m(e)) { return new Error("Expect a valid department id"); }
  }
  function fe(e) {
  return function(t) {
  var n = t.raw, i = "ok" === n.__status ? null : new window.Error("Failed");
  for (var o in n) { n.hasOwnProperty(o) && 0 === o.indexOf("__") && delete n[o]; }
  e(i, n);
  };
  }
  function pe(e) {
  for (var t, n, i = {}, o = 0; o < 7; o++) {
  var r = e[o] || {};
  if (r.enabled$bool) {
  t = [];
  n = r.periods;
  for (var s in n) { n.hasOwnProperty(s) && t.push({
  start: n[s].start$int,
  end: n[s].end$int
  }); }
  i[o] = ye(t);
  } else { i[o] = []; }
  }
  return i;
  }
  function me(e, t) {
  var n, i = {}, o = _e(e), r = ge(e, t);
  t.forEach(function(e) {
  var t = r[e];
  i[e] = {};
  for (n = 0; n < 7; n++) { i[e][n] = []; }
  t.forEach(function(t) {
  for (var n in o[t]) { o[t].hasOwnProperty(n) && Array.prototype.push.apply(i[e][n], o[t][n]); }
  });
  for (n = 0; n < 7; n++) {
  var s = i[e][n];
  s.length > 1 && (i[e][n] = ye(s));
  }
  });
  return i;
  }
  function ge(e, t) {
  var n, i = {};
  t.forEach(function(e) {
  i[e] = [];
  });
  for (var o in e) { if (e.hasOwnProperty(o)) {
  n = e[o];
  for (var r in n.departments) { if (n.departments.hasOwnProperty(r)) {
  if (!n.departments[r]) { continue; }
  var s = ae(r);
  if (!i[s]) { continue; }
  i[s].push(o);
  } }
  } }
  return i;
  }
  function _e(e) {
  var t, n, i = {};
  for (var o in e) { if (e.hasOwnProperty(o)) {
  n = e[o];
  if (n.hasOwnProperty("deleted_ts$int")) { continue; }
  if (!n.departments) { continue; }
  if (!n.enabled$bool) { continue; }
  t = {};
  for (var r = 0; r < 7; r++) {
  var s = n[r], a = [];
  if (s.enabled$bool && s.periods) {
  var c = s.periods;
  for (var u in c) { c.hasOwnProperty(u) && a.push({
  start: c[u].start$int,
  end: c[u].end$int
  }); }
  a.length && (t[r] = a);
  }
  }
  Object.keys(t).length && (i[o] = t);
  } }
  return i;
  }
  function ve(e, t) {
  for (var n in e) { if (e.hasOwnProperty(n)) {
  -1 !== t.indexOf(n) && (e[n] = oe(e[n], function(e) {
  return e;
  }));
  "object" == typeof e[n] && ve(e[n], t);
  } }
  }
  function ye(e) {
  if (e.length <= 1) { return e; }
  var t = [];
  e.forEach(function(e) {
  t[e.start] = void 0 !== t[e.start] ? t[e.start] + 1 : 1;
  t[e.end] = void 0 !== t[e.end] ? t[e.end] - 1 : -1;
  });
  return function(e) {
  var t, n = [], i = 0;
  e.forEach(function(e, o) {
  e > 0 && !t && (t = o);
  if (e) {
  i += e;
  if (0 === i) {
  n.push({
  start: t,
  end: o
  });
  t = void 0;
  }
  }
  });
  return n;
  }(t);
  }
  var we, be, $e, Ee, Te, ke, Ae = n(3), Le = n(5), Oe = n(0), xe = n(15), Se = n(1), De = n(14), Re = n(2), Ce = n(25), Ie = n(50), Ne = n(13), Pe = n(24), Me = n(4), Ue = n(49), Ve = n(6), je = n(18), ze = n(45), qe = n(44), Ke = n(43), Fe = n(31), He = n(29), Ge = n(16), Be = n(17), We = n(28), Ye = n(27), Xe = {
  init: o,
  reconnect: c,
  getFirehose: u,
  setVisitorInfo: h,
  getVisitorInfo: l,
  setVisitorDefaultDepartment: y,
  getVisitorDefaultDepartment: v,
  getAllDepartments: _,
  getDepartment: m,
  clearVisitorDefaultDepartment: w,
  addTag: b,
  removeTag: $,
  addTags: T,
  removeTags: k,
  sendChatMsg: d,
  sendFile: f,
  sendVisitorPath: L,
  sendChatComment: S,
  sendChatRating: x,
  getChatInfo: O,
  endChat: D,
  isChatting: R,
  getServingAgentsInfo: C,
  sendOfflineMsg: P,
  sendTyping: Pe.debounceExceptFirst(M, 300),
  sendEmailTranscript: U,
  getChatLog: H,
  getConnectionStatus: G,
  getAccountStatus: B,
  getOperatingHours: N,
  getQueuePosition: W,
  fetchChatHistory: Y,
  markAsRead: Pe.throttle(X, 2e3),
  logout: i,
  EMAIL_REGEX: Ne.email
  }, Ze = Oe.extend(Xe), Je = !1, Qe = Oe.extend({}), et = "web_sdk", tt = function() {}, nt = je, it = /[0-9]+/, ot = /^(https?|ftps?):\/\//i, rt = /\S/, st = nt.any([ nt.equal(""), nt.type("string").regex(it).maxLength(25) ]), at = nt.any([ nt.equal(void 0), nt.type("function") ]), ct = nt.predicate(function(e) {
  return -1 === e.indexOf(",");
  }, "not contain any comma character"), ut = {
  interval: 6e5,
  limit: 10,
  callback: function() {
  ue(new Error("Call has been ratelimted"), "reconnect");
  }
  }, lt = ze.rateLimit(a, ut), ht = [ "email$string", "phone$string", "display_name$string" ], dt = {
  connected: "connected",
  connecting: "connecting",
  closed: "closed"
  }, ft = {
  online: "online",
  offline: "offline",
  away: "away",
  invalid_account_key: null,
  banned: null
  }, pt = ne(dt), mt = ne(ft), gt = Z(ht), _t = Z([ "name$string", "status$string" ], "id", V), vt = Z([ "avatar_path$string", "display_name$string", "title$string" ], "nick"), yt = Z([ "typing$bool" ], "nick", j), wt = Z([ "typing$bool" ], "display_name", z), bt = Z([ "timestamp$int" ], null, F), $t = Z([ "timestamp$int" ], "nick", q), Et = ([ "on", "un", "fire", "unextendEvents", "init", "getFirehose", "getConnectionStatus" ]);
  for (var Tt in Ze) { Ze.hasOwnProperty(Tt) && -1 === Et.indexOf(Tt) && Re(Ze[Tt]) && (Ze[Tt] = function(e, t) {
  return function() {
  if (!1 !== Je) { return t.apply(null, arguments); }
  ue(new Error("Web SDK is not initialized yet. Please ensure that you call zChat.init() and wait for the connection to be established before calling this method"), e);
  };
  }(Tt, Ze[Tt])); }
  e.exports = Ze;
  }, function(e, t, n) {
  var i = n(51), o = i;
  e.exports = o;
  } ]);
  });

  });

  var zChat = unwrapExports(webSdk);
  var webSdk_1 = webSdk.zChat;

  /*
  |---------------------------------------------------
  |                  Core Configuration
  |---------------------------------------------------
  |
  | Custom application development, Please, be carefull
  | if you want to modify this section.
  |
  */

  // Check if conf file exists
  if (typeof window.inbChatbotAppSdk === 'undefined') {
    throw new ReferenceError('Inbenta Chatbot SDK couldn\'t be started, missing conf file. Please contact with support team for more information.');
  }

  // Retrieve configuration data
  var app = window.inbChatbotAppSdk;
  app.sdkConfig.adapters = (typeof app.sdkConfig.adapters !== 'undefined') ? app.sdkConfig.adapters : [];

  // Create an instance of the localStorage manager to use within the adapters
  var storageMgr = new StorageManager(app.sdkConfig.chatbotId);

  // Import & build SDK
  var sdkScript = getSDKScript(app.sdkIntegration);
  importScript(sdkScript, function () {
    app.sdkConfig.adapters.push(
      handleZendesk(app.appConfig.zopim, zChat, storageMgr),
      customMessage(),
      showSurvey$1(1)
    );
    window.InbentaChatbotSDK.buildWithDomainCredentials(app.sdkAuth, app.sdkConfig);
  });

})));
