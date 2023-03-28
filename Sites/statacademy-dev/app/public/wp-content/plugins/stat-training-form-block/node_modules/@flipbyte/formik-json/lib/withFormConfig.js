'use strict';

exports.__esModule = true;
exports.SchemaProvider = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SchemaContext = _react2.default.createContext({});
var SchemaProvider = exports.SchemaProvider = function SchemaProvider(_ref) {
    var value = _ref.value,
        children = _ref.children;
    return _react2.default.createElement(
        SchemaContext.Provider,
        { value: value },
        children
    );
};

var withFormConfig = function withFormConfig(WrappedComponent) {
    return function (props) {
        return _react2.default.createElement(
            SchemaContext.Consumer,
            null,
            function (config) {
                return _react2.default.createElement(WrappedComponent, _extends({}, props, config));
            }
        );
    };
};

exports.default = withFormConfig;