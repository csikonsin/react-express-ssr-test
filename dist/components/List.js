"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var getID = function getID() {
    return Math.floor(Math.random() * 1000000);
};

var List = function (_Component) {
    _inherits(List, _Component);

    function List(props) {
        _classCallCheck(this, List);

        var _this = _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).call(this, props));

        _this.state = {
            input: "",
            values: [{
                id: 10000,
                value: "Hallo my name a Jeff"
            }, {
                id: 10001,
                value: "This is a robbery"
            }, {
                id: 100002,
                value: "Note"
            }]
        };

        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleAdd = _this.handleAdd.bind(_this);
        _this.handleItemDeleted = _this.handleItemDeleted.bind(_this);
        _this.handleEditApply = _this.handleEditApply.bind(_this);
        return _this;
    }

    _createClass(List, [{
        key: "handleChange",
        value: function handleChange(e) {
            this.setState({
                input: e.target.value
            });
        }
    }, {
        key: "handleAdd",
        value: function handleAdd(e) {
            if (this.state.input === "") return;
            this.setState(function (prev) {
                return {
                    values: prev.values.concat({
                        value: prev.input,
                        id: getID()
                    }),
                    input: ""
                };
            });
        }
    }, {
        key: "handleItemDeleted",
        value: function handleItemDeleted(id) {
            this.setState(function (prev) {
                var newValues = prev.values;

                for (var i = 0; i < prev.values.length; i++) {
                    var element = newValues[i];
                    if (element.id === id) {
                        newValues.splice(i, 1);
                    }
                }

                return {
                    values: newValues
                };
            });
        }
    }, {
        key: "handleEditApply",
        value: function handleEditApply(id, value) {
            var newValues = this.state.values;
            for (var i = 0; i < this.state.values.length; i++) {
                var element = newValues[i];
                if (element.id === id) {
                    element.value = value;
                }
            }
            this.setState({
                values: newValues
            });

            return true;
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                "div",
                { className: "list" },
                _react2.default.createElement("input", { type: "text", onChange: this.handleChange, value: this.state.input }),
                _react2.default.createElement(
                    "button",
                    { onClick: this.handleAdd },
                    "Add"
                ),
                _react2.default.createElement(
                    "div",
                    { className: "list-items" },
                    this.state.values.map(function (item, index) {
                        return _react2.default.createElement(ListItem, { value: item.value, id: item.id, key: item.id, onEditApply: _this2.handleEditApply, onItemDeleted: _this2.handleItemDeleted });
                    })
                )
            );
        }
    }]);

    return List;
}(_react.Component);

exports.default = List;

var ListItem = function (_Component2) {
    _inherits(ListItem, _Component2);

    function ListItem(props) {
        _classCallCheck(this, ListItem);

        var _this3 = _possibleConstructorReturn(this, (ListItem.__proto__ || Object.getPrototypeOf(ListItem)).call(this, props));

        _this3.state = {
            isEdit: false
        };

        _this3.handleClick = _this3.handleClick.bind(_this3);
        _this3.handleEditValueChange = _this3.handleEditValueChange.bind(_this3);
        _this3.handleEditApply = _this3.handleEditApply.bind(_this3);
        return _this3;
    }

    _createClass(ListItem, [{
        key: "handleClick",
        value: function handleClick(e, id) {
            this.props.onItemDeleted(id);
            e.preventDefault();
        }
    }, {
        key: "handleEditToggle",
        value: function handleEditToggle() {

            var isEdit = !this.state.isEdit;

            this.setState({
                isEdit: isEdit,
                editValue: this.props.value
            });

            if (!isEdit) return;
        }
    }, {
        key: "handleEditValueChange",
        value: function handleEditValueChange(e) {
            this.setState({
                editValue: e.target.value
            });
        }
    }, {
        key: "handleEditApply",
        value: function handleEditApply() {
            if (!this.props.onEditApply(this.props.id, this.state.editValue)) {
                return;
            }

            this.setState({
                isEdit: false,
                editValue: ""
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this4 = this;

            var element = _react2.default.createElement(
                "div",
                null,
                this.props.value
            );
            if (this.state.isEdit) {
                element = _react2.default.createElement(
                    "div",
                    null,
                    _react2.default.createElement("input", { type: "text", value: this.state.editValue, onChange: this.handleEditValueChange }),
                    _react2.default.createElement(
                        "button",
                        { onClick: this.handleEditApply },
                        "Apply"
                    )
                );
            }

            return _react2.default.createElement(
                "div",
                { className: "list-item" },
                element,
                _react2.default.createElement(
                    "button",
                    { onClick: function onClick() {
                            return _this4.handleEditToggle(_this4.props.id);
                        } },
                    "Edit"
                ),
                _react2.default.createElement(
                    "button",
                    { onClick: function onClick(e) {
                            return _this4.handleClick(e, _this4.props.id);
                        } },
                    "X"
                )
            );
        }
    }]);

    return ListItem;
}(_react.Component);