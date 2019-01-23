import * as tslib_1 from "tslib";
var NodeEvent = /** @class */ (function () {
    function NodeEvent(node) {
        this.node = node;
    }
    return NodeEvent;
}());
export { NodeEvent };
var NodeSelectedEvent = /** @class */ (function (_super) {
    tslib_1.__extends(NodeSelectedEvent, _super);
    function NodeSelectedEvent(node) {
        return _super.call(this, node) || this;
    }
    return NodeSelectedEvent;
}(NodeEvent));
export { NodeSelectedEvent };
var NodeUnselectedEvent = /** @class */ (function (_super) {
    tslib_1.__extends(NodeUnselectedEvent, _super);
    function NodeUnselectedEvent(node) {
        return _super.call(this, node) || this;
    }
    return NodeUnselectedEvent;
}(NodeEvent));
export { NodeUnselectedEvent };
var NodeDestructiveEvent = /** @class */ (function (_super) {
    tslib_1.__extends(NodeDestructiveEvent, _super);
    function NodeDestructiveEvent(node) {
        return _super.call(this, node) || this;
    }
    return NodeDestructiveEvent;
}(NodeEvent));
export { NodeDestructiveEvent };
var NodeMovedEvent = /** @class */ (function (_super) {
    tslib_1.__extends(NodeMovedEvent, _super);
    function NodeMovedEvent(node, previousParent) {
        var _this = _super.call(this, node) || this;
        _this.previousParent = previousParent;
        return _this;
    }
    return NodeMovedEvent;
}(NodeDestructiveEvent));
export { NodeMovedEvent };
var NodeRemovedEvent = /** @class */ (function (_super) {
    tslib_1.__extends(NodeRemovedEvent, _super);
    function NodeRemovedEvent(node, lastIndex) {
        var _this = _super.call(this, node) || this;
        _this.lastIndex = lastIndex;
        return _this;
    }
    return NodeRemovedEvent;
}(NodeDestructiveEvent));
export { NodeRemovedEvent };
var NodeCreatedEvent = /** @class */ (function (_super) {
    tslib_1.__extends(NodeCreatedEvent, _super);
    function NodeCreatedEvent(node) {
        return _super.call(this, node) || this;
    }
    return NodeCreatedEvent;
}(NodeDestructiveEvent));
export { NodeCreatedEvent };
var NodeRenamedEvent = /** @class */ (function (_super) {
    tslib_1.__extends(NodeRenamedEvent, _super);
    function NodeRenamedEvent(node, oldValue, newValue) {
        var _this = _super.call(this, node) || this;
        _this.oldValue = oldValue;
        _this.newValue = newValue;
        return _this;
    }
    return NodeRenamedEvent;
}(NodeDestructiveEvent));
export { NodeRenamedEvent };
var NodeExpandedEvent = /** @class */ (function (_super) {
    tslib_1.__extends(NodeExpandedEvent, _super);
    function NodeExpandedEvent(node) {
        return _super.call(this, node) || this;
    }
    return NodeExpandedEvent;
}(NodeEvent));
export { NodeExpandedEvent };
var NodeCollapsedEvent = /** @class */ (function (_super) {
    tslib_1.__extends(NodeCollapsedEvent, _super);
    function NodeCollapsedEvent(node) {
        return _super.call(this, node) || this;
    }
    return NodeCollapsedEvent;
}(NodeEvent));
export { NodeCollapsedEvent };
var MenuItemSelectedEvent = /** @class */ (function (_super) {
    tslib_1.__extends(MenuItemSelectedEvent, _super);
    function MenuItemSelectedEvent(node, selectedItem) {
        var _this = _super.call(this, node) || this;
        _this.selectedItem = selectedItem;
        return _this;
    }
    return MenuItemSelectedEvent;
}(NodeEvent));
export { MenuItemSelectedEvent };
var LoadNextLevelEvent = /** @class */ (function (_super) {
    tslib_1.__extends(LoadNextLevelEvent, _super);
    function LoadNextLevelEvent(node) {
        return _super.call(this, node) || this;
    }
    return LoadNextLevelEvent;
}(NodeEvent));
export { LoadNextLevelEvent };
var NodeCheckedEvent = /** @class */ (function (_super) {
    tslib_1.__extends(NodeCheckedEvent, _super);
    function NodeCheckedEvent(node) {
        return _super.call(this, node) || this;
    }
    return NodeCheckedEvent;
}(NodeEvent));
export { NodeCheckedEvent };
var NodeUncheckedEvent = /** @class */ (function (_super) {
    tslib_1.__extends(NodeUncheckedEvent, _super);
    function NodeUncheckedEvent(node) {
        return _super.call(this, node) || this;
    }
    return NodeUncheckedEvent;
}(NodeEvent));
export { NodeUncheckedEvent };
var NodeIndeterminedEvent = /** @class */ (function (_super) {
    tslib_1.__extends(NodeIndeterminedEvent, _super);
    function NodeIndeterminedEvent(node) {
        return _super.call(this, node) || this;
    }
    return NodeIndeterminedEvent;
}(NodeEvent));
export { NodeIndeterminedEvent };
//# sourceMappingURL=tree.events.js.map