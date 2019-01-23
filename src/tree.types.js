import { defaultsDeep, get, omit } from './utils/fn.utils';
var FoldingType = /** @class */ (function () {
    function FoldingType(_cssClass) {
        this._cssClass = _cssClass;
    }
    Object.defineProperty(FoldingType.prototype, "cssClass", {
        get: function () {
            return this._cssClass;
        },
        enumerable: true,
        configurable: true
    });
    FoldingType.Expanded = new FoldingType('node-expanded');
    FoldingType.Collapsed = new FoldingType('node-collapsed');
    FoldingType.Empty = new FoldingType('node-empty');
    FoldingType.Leaf = new FoldingType('node-leaf');
    return FoldingType;
}());
export { FoldingType };
var TreeModelSettings = /** @class */ (function () {
    function TreeModelSettings() {
    }
    TreeModelSettings.merge = function (child, parent) {
        var parentCascadingSettings = omit(get(parent, 'settings'), TreeModelSettings.NOT_CASCADING_SETTINGS);
        return defaultsDeep({}, get(child, 'settings'), parentCascadingSettings, {
            static: false,
            leftMenu: false,
            rightMenu: true,
            isCollapsedOnInit: false,
            checked: false,
            keepNodesInDOM: false,
            selectionAllowed: true
        });
    };
    TreeModelSettings.NOT_CASCADING_SETTINGS = ['selectionAllowed'];
    return TreeModelSettings;
}());
export { TreeModelSettings };
var Ng2TreeSettings = /** @class */ (function () {
    function Ng2TreeSettings() {
        /**
         * Indicates root visibility in the tree. When true - root is invisible.
         * @name Ng2TreeSettings#rootIsVisible
         * @type boolean
         */
        this.rootIsVisible = true;
        this.showCheckboxes = false;
        this.enableCheckboxes = true;
    }
    return Ng2TreeSettings;
}());
export { Ng2TreeSettings };
export var TreeStatus;
(function (TreeStatus) {
    TreeStatus[TreeStatus["New"] = 0] = "New";
    TreeStatus[TreeStatus["Modified"] = 1] = "Modified";
    TreeStatus[TreeStatus["IsBeingRenamed"] = 2] = "IsBeingRenamed";
})(TreeStatus || (TreeStatus = {}));
//# sourceMappingURL=tree.types.js.map