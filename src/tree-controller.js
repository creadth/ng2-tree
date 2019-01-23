import { NodeMenuItemAction } from './menu/menu.events';
import { MouseButtons } from './utils/event.utils';
import { get } from './utils/fn.utils';
var TreeController = /** @class */ (function () {
    function TreeController(component) {
        this.component = component;
        this.tree = this.component.tree;
        this.treeService = this.component.treeService;
    }
    TreeController.prototype.select = function () {
        if (!this.isSelected()) {
            this.component.onNodeSelected({ button: MouseButtons.Left });
        }
    };
    TreeController.prototype.unselect = function () {
        if (this.isSelected()) {
            this.component.onNodeUnselected({ button: MouseButtons.Left });
        }
    };
    TreeController.prototype.isSelected = function () {
        return this.component.isSelected;
    };
    TreeController.prototype.expand = function () {
        if (this.isCollapsed()) {
            this.component.onSwitchFoldingType();
        }
    };
    TreeController.prototype.expandToParent = function (tree) {
        var _this = this;
        if (tree === void 0) { tree = this.tree; }
        if (tree) {
            var controller_1 = this.treeService.getController(tree.id);
            if (controller_1) {
                requestAnimationFrame(function () {
                    controller_1.expand();
                    _this.expandToParent(tree.parent);
                });
            }
        }
    };
    TreeController.prototype.isExpanded = function () {
        return this.tree.isNodeExpanded();
    };
    TreeController.prototype.collapse = function () {
        if (this.isExpanded()) {
            this.component.onSwitchFoldingType();
        }
    };
    TreeController.prototype.isCollapsed = function () {
        return this.tree.isNodeCollapsed();
    };
    TreeController.prototype.toTreeModel = function () {
        return this.tree.toTreeModel();
    };
    TreeController.prototype.rename = function (newValue) {
        this.tree.markAsBeingRenamed();
        this.component.applyNewValue({ type: 'keyup', value: newValue });
    };
    TreeController.prototype.remove = function () {
        this.component.onMenuItemSelected({ nodeMenuItemAction: NodeMenuItemAction.Remove });
    };
    TreeController.prototype.addChild = function (newNode) {
        if (this.tree.hasDeferredChildren() && !this.tree.childrenWereLoaded()) {
            return;
        }
        var newTree = this.tree.createNode(Array.isArray(newNode.children), newNode);
        this.treeService.fireNodeCreated(newTree);
    };
    TreeController.prototype.addChildAsync = function (newNode) {
        if (this.tree.hasDeferredChildren() && !this.tree.childrenWereLoaded()) {
            return Promise.reject(new Error('This node loads its children asynchronously, hence child cannot be added this way'));
        }
        var newTree = this.tree.createNode(Array.isArray(newNode.children), newNode);
        this.treeService.fireNodeCreated(newTree);
        // This will give TreeInternalComponent to set up a controller for the node
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve(newTree);
            });
        });
    };
    TreeController.prototype.changeNodeId = function (id) {
        if (!id) {
            throw Error('You should supply an id!');
        }
        if (this.treeService.hasController(id)) {
            throw Error("Controller already exists for the given id: " + id);
        }
        this.treeService.deleteController(this.tree.id);
        this.tree.id = id;
        this.treeService.setController(this.tree.id, this);
    };
    TreeController.prototype.reloadChildren = function () {
        this.tree.reloadChildren();
    };
    TreeController.prototype.setChildren = function (children) {
        if (!this.tree.isLeaf()) {
            this.tree.setChildren(children);
        }
    };
    TreeController.prototype.startRenaming = function () {
        this.tree.markAsBeingRenamed();
    };
    TreeController.prototype.check = function () {
        this.component.onNodeChecked();
    };
    TreeController.prototype.uncheck = function () {
        this.component.onNodeUnchecked();
    };
    TreeController.prototype.isChecked = function () {
        return this.tree.checked;
    };
    TreeController.prototype.isIndetermined = function () {
        return get(this.component, 'checkboxElementRef.nativeElement.indeterminate');
    };
    TreeController.prototype.allowSelection = function () {
        this.tree.selectionAllowed = true;
    };
    TreeController.prototype.forbidSelection = function () {
        this.tree.selectionAllowed = false;
    };
    TreeController.prototype.isSelectionAllowed = function () {
        return this.tree.selectionAllowed;
    };
    return TreeController;
}());
export { TreeController };
//# sourceMappingURL=tree-controller.js.map