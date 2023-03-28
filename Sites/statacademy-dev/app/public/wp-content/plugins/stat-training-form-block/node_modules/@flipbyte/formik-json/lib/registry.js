'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CONTAINER = exports.CONTAINER = 'container';
var FIELD = exports.FIELD = 'field';
var TEMPLATE = exports.TEMPLATE = 'template';

var Registry = function () {
    function Registry() {
        _classCallCheck(this, Registry);

        this.mapping = {};
    }

    Registry.prototype.get = function get(name) {
        var o = this.mapping[name];
        if (o == null) throw new Error('No object registered for: ' + name);
        return o;
    };

    Registry.prototype.register = function register(name, o) {
        this.mapping[name] = o;
    };

    return Registry;
}();

var fields = exports.fields = new Registry();
var registerField = exports.registerField = fields.register.bind(fields);

var containers = exports.containers = new Registry();
var registerContainer = exports.registerContainer = containers.register.bind(containers);

var templates = exports.templates = new Registry();
var registerTemplate = exports.registerTemplate = templates.register.bind(templates);

exports.default = Registry;