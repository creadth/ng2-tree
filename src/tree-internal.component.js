import * as tslib_1 from "tslib";
import { Component, ElementRef, Input, TemplateRef, ViewChild } from '@angular/core';
import * as TreeTypes from './tree.types';
import { Ng2TreeSettings } from './tree.types';
import { Tree } from './tree';
import { TreeController } from './tree-controller';
import { NodeMenuService } from './menu/node-menu.service';
import { NodeMenuItemAction } from './menu/menu.events';
import { NodeEditableEventAction } from './editable/editable.events';
import { TreeService } from './tree.service';
import * as EventUtils from './utils/event.utils';
import { get, isNil } from './utils/fn.utils';
import { filter, merge } from 'rxjs/operators';
var TreeInternalComponent = /** @class */ (function () {
    function TreeInternalComponent(nodeMenuService, treeService, nodeElementRef) {
        this.nodeMenuService = nodeMenuService;
        this.treeService = treeService;
        this.nodeElementRef = nodeElementRef;
        this.isSelected = false;
        this.isRightMenuVisible = false;
        this.isLeftMenuVisible = false;
        this.isReadOnly = false;
        this.subscriptions = [];
    }
    TreeInternalComponent.prototype.ngAfterViewInit = function () {
        if (this.tree.checked && !this.tree.firstCheckedFired) {
            this.tree.firstCheckedFired = true;
            this.treeService.fireNodeChecked(this.tree);
        }
    };
    TreeInternalComponent.prototype.ngOnInit = function () {
        var _this = this;
        var nodeId = get(this.tree, 'node.id', '');
        if (nodeId) {
            this.controller = new TreeController(this);
            this.treeService.setController(nodeId, this.controller);
        }
        this.settings = this.settings || new Ng2TreeSettings();
        this.isReadOnly = !get(this.settings, 'enableCheckboxes', true);
        if (this.tree.isRoot() && this.settings.rootIsVisible === false) {
            this.tree.disableCollapseOnInit();
        }
        this.subscriptions.push(this.nodeMenuService.hideMenuStream(this.nodeElementRef).subscribe(function () {
            _this.isRightMenuVisible = false;
            _this.isLeftMenuVisible = false;
        }));
        this.subscriptions.push(this.treeService.unselectStream(this.tree).subscribe(function () { return (_this.isSelected = false); }));
        this.subscriptions.push(this.treeService.draggedStream(this.tree, this.nodeElementRef).subscribe(function (e) {
            if (_this.tree.hasSibling(e.captured.tree)) {
                _this.swapWithSibling(e.captured.tree, _this.tree);
            }
            else if (_this.tree.isBranch()) {
                _this.moveNodeToThisTreeAndRemoveFromPreviousOne(e, _this.tree);
            }
            else {
                _this.moveNodeToParentTreeAndRemoveFromPreviousOne(e, _this.tree);
            }
        }));
        this.subscriptions.push(this.treeService.nodeChecked$
            .pipe(merge(this.treeService.nodeUnchecked$), filter(function (e) { return _this.eventContainsId(e) && _this.tree.hasChild(e.node); }))
            .subscribe(function (e) { return _this.updateCheckboxState(); }));
    };
    TreeInternalComponent.prototype.ngOnChanges = function (changes) {
        this.controller = new TreeController(this);
    };
    TreeInternalComponent.prototype.ngOnDestroy = function () {
        if (get(this.tree, 'node.id', '')) {
            this.treeService.deleteController(this.tree.node.id);
        }
        this.subscriptions.forEach(function (sub) { return sub && sub.unsubscribe(); });
    };
    TreeInternalComponent.prototype.swapWithSibling = function (sibling, tree) {
        tree.swapWithSibling(sibling);
        this.treeService.fireNodeMoved(sibling, sibling.parent);
    };
    TreeInternalComponent.prototype.moveNodeToThisTreeAndRemoveFromPreviousOne = function (e, tree) {
        this.treeService.fireNodeRemoved(e.captured.tree);
        var addedChild = tree.addChild(e.captured.tree);
        this.treeService.fireNodeMoved(addedChild, e.captured.tree.parent);
    };
    TreeInternalComponent.prototype.moveNodeToParentTreeAndRemoveFromPreviousOne = function (e, tree) {
        this.treeService.fireNodeRemoved(e.captured.tree);
        var addedSibling = tree.addSibling(e.captured.tree, tree.positionInParent);
        this.treeService.fireNodeMoved(addedSibling, e.captured.tree.parent);
    };
    TreeInternalComponent.prototype.onNodeSelected = function (e) {
        if (!this.tree.selectionAllowed) {
            return;
        }
        if (EventUtils.isLeftButtonClicked(e)) {
            this.isSelected = true;
            this.treeService.fireNodeSelected(this.tree);
        }
    };
    TreeInternalComponent.prototype.onNodeUnselected = function (e) {
        if (!this.tree.selectionAllowed) {
            return;
        }
        if (EventUtils.isLeftButtonClicked(e)) {
            this.isSelected = false;
            this.treeService.fireNodeUnselected(this.tree);
        }
    };
    TreeInternalComponent.prototype.showRightMenu = function (e) {
        if (!this.tree.hasRightMenu()) {
            return;
        }
        if (EventUtils.isRightButtonClicked(e)) {
            this.isRightMenuVisible = !this.isRightMenuVisible;
            this.nodeMenuService.hideMenuForAllNodesExcept(this.nodeElementRef);
        }
        e.preventDefault();
    };
    TreeInternalComponent.prototype.showLeftMenu = function (e) {
        if (!this.tree.hasLeftMenu()) {
            return;
        }
        if (EventUtils.isLeftButtonClicked(e)) {
            this.isLeftMenuVisible = !this.isLeftMenuVisible;
            this.nodeMenuService.hideMenuForAllNodesExcept(this.nodeElementRef);
            if (this.isLeftMenuVisible) {
                e.preventDefault();
            }
        }
    };
    TreeInternalComponent.prototype.onMenuItemSelected = function (e) {
        switch (e.nodeMenuItemAction) {
            case NodeMenuItemAction.NewTag:
                this.onNewSelected(e);
                break;
            case NodeMenuItemAction.NewFolder:
                this.onNewSelected(e);
                break;
            case NodeMenuItemAction.Rename:
                this.onRenameSelected();
                break;
            case NodeMenuItemAction.Remove:
                this.onRemoveSelected();
                break;
            case NodeMenuItemAction.Custom:
                this.onCustomSelected();
                this.treeService.fireMenuItemSelected(this.tree, e.nodeMenuItemSelected);
                break;
            default:
                throw new Error("Chosen menu item doesn't exist");
        }
    };
    TreeInternalComponent.prototype.onNewSelected = function (e) {
        this.tree.createNode(e.nodeMenuItemAction === NodeMenuItemAction.NewFolder);
        this.isRightMenuVisible = false;
        this.isLeftMenuVisible = false;
    };
    TreeInternalComponent.prototype.onRenameSelected = function () {
        this.tree.markAsBeingRenamed();
        this.isRightMenuVisible = false;
        this.isLeftMenuVisible = false;
    };
    TreeInternalComponent.prototype.onRemoveSelected = function () {
        this.treeService.deleteController(get(this.tree, 'node.id', ''));
        this.treeService.fireNodeRemoved(this.tree);
    };
    TreeInternalComponent.prototype.onCustomSelected = function () {
        this.isRightMenuVisible = false;
        this.isLeftMenuVisible = false;
    };
    TreeInternalComponent.prototype.onSwitchFoldingType = function () {
        this.tree.switchFoldingType();
        this.treeService.fireNodeSwitchFoldingType(this.tree);
    };
    TreeInternalComponent.prototype.applyNewValue = function (e) {
        if ((e.action === NodeEditableEventAction.Cancel || this.tree.isNew()) && Tree.isValueEmpty(e.value)) {
            return this.treeService.fireNodeRemoved(this.tree);
        }
        if (this.tree.isNew()) {
            this.tree.value = e.value;
            this.treeService.fireNodeCreated(this.tree);
        }
        if (this.tree.isBeingRenamed()) {
            var oldValue = this.tree.value;
            this.tree.value = e.value;
            this.treeService.fireNodeRenamed(oldValue, this.tree);
        }
        this.tree.markAsModified();
    };
    TreeInternalComponent.prototype.shouldShowInputForTreeValue = function () {
        return this.tree.isNew() || this.tree.isBeingRenamed();
    };
    TreeInternalComponent.prototype.isRootHidden = function () {
        return this.tree.isRoot() && !this.settings.rootIsVisible;
    };
    TreeInternalComponent.prototype.hasCustomMenu = function () {
        return this.tree.hasCustomMenu();
    };
    TreeInternalComponent.prototype.switchNodeCheckStatus = function () {
        if (!this.tree.checked) {
            this.onNodeChecked();
        }
        else {
            this.onNodeUnchecked();
        }
    };
    TreeInternalComponent.prototype.onNodeChecked = function () {
        if (!this.checkboxElementRef) {
            return;
        }
        this.checkboxElementRef.nativeElement.indeterminate = false;
        this.treeService.fireNodeChecked(this.tree);
        this.executeOnChildController(function (controller) { return controller.check(); });
        this.tree.checked = true;
    };
    TreeInternalComponent.prototype.onNodeUnchecked = function () {
        if (!this.checkboxElementRef) {
            return;
        }
        this.checkboxElementRef.nativeElement.indeterminate = false;
        this.treeService.fireNodeUnchecked(this.tree);
        this.executeOnChildController(function (controller) { return controller.uncheck(); });
        this.tree.checked = false;
    };
    TreeInternalComponent.prototype.executeOnChildController = function (executor) {
        var _this = this;
        if (this.tree.hasLoadedChildern()) {
            this.tree.children.forEach(function (child) {
                var controller = _this.treeService.getController(child.id);
                if (!isNil(controller)) {
                    executor(controller);
                }
            });
        }
    };
    TreeInternalComponent.prototype.updateCheckboxState = function () {
        var _this = this;
        // Calling setTimeout so the value of isChecked will be updated and after that I'll check the children status.
        setTimeout(function () {
            var checkedChildrenAmount = _this.tree.checkedChildrenAmount();
            if (checkedChildrenAmount === 0) {
                _this.checkboxElementRef.nativeElement.indeterminate = false;
                _this.tree.checked = false;
                _this.treeService.fireNodeUnchecked(_this.tree);
            }
            else if (checkedChildrenAmount === _this.tree.loadedChildrenAmount()) {
                _this.checkboxElementRef.nativeElement.indeterminate = false;
                _this.tree.checked = true;
                _this.treeService.fireNodeChecked(_this.tree);
            }
            else {
                _this.tree.checked = false;
                _this.checkboxElementRef.nativeElement.indeterminate = true;
                _this.treeService.fireNodeIndetermined(_this.tree);
            }
        });
    };
    TreeInternalComponent.prototype.eventContainsId = function (event) {
        if (!event.node.id) {
            console.warn('"Node with checkbox" feature requires a unique id assigned to every node, please consider to add it.');
            return false;
        }
        return true;
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Tree)
    ], TreeInternalComponent.prototype, "tree", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", TreeTypes.Ng2TreeSettings)
    ], TreeInternalComponent.prototype, "settings", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", TemplateRef)
    ], TreeInternalComponent.prototype, "template", void 0);
    tslib_1.__decorate([
        ViewChild('checkbox'),
        tslib_1.__metadata("design:type", ElementRef)
    ], TreeInternalComponent.prototype, "checkboxElementRef", void 0);
    TreeInternalComponent = tslib_1.__decorate([
        Component({
            selector: 'tree-internal',
            template: "\n    <ul class=\"tree\" *ngIf=\"tree\" [ngClass]=\"{ rootless: isRootHidden() }\">\n      <li>\n        <div\n          class=\"value-container\"\n          [ngClass]=\"{ rootless: isRootHidden() }\"\n          [class.selected]=\"isSelected\"\n          (contextmenu)=\"showRightMenu($event)\"\n          [nodeDraggable]=\"nodeElementRef\"\n          [tree]=\"tree\"\n        >\n          <div class=\"folding\" (click)=\"onSwitchFoldingType()\" [ngClass]=\"tree.foldingCssClass\"></div>\n\n          <div class=\"node-checkbox\" *ngIf=\"settings.showCheckboxes\">\n            <input\n              checkbox\n              type=\"checkbox\"\n              [disabled]=\"isReadOnly\"\n              [checked]=\"this.tree.checked\"\n              (change)=\"switchNodeCheckStatus()\"\n              #checkbox\n            />\n          </div>\n\n          <div\n            class=\"node-value\"\n            *ngIf=\"!shouldShowInputForTreeValue()\"\n            [class.node-selected]=\"isSelected\"\n            (click)=\"onNodeSelected($event)\"\n          >\n            <div *ngIf=\"tree.nodeTemplate\" class=\"node-template\" [innerHTML]=\"tree.nodeTemplate | safeHtml\"></div>\n            <span *ngIf=\"!template\" class=\"node-name\" [innerHTML]=\"tree.value | safeHtml\"></span>\n            <span class=\"loading-children\" *ngIf=\"tree.childrenAreBeingLoaded()\"></span>\n            <ng-template\n              [ngTemplateOutlet]=\"template\"\n              [ngTemplateOutletContext]=\"{ $implicit: tree.node }\"\n            ></ng-template>\n          </div>\n\n          <input\n            type=\"text\"\n            class=\"node-value\"\n            *ngIf=\"shouldShowInputForTreeValue()\"\n            [nodeEditable]=\"tree.value\"\n            (valueChanged)=\"applyNewValue($event)\"\n          />\n\n          <div\n            class=\"node-left-menu\"\n            *ngIf=\"tree.hasLeftMenu()\"\n            (click)=\"showLeftMenu($event)\"\n            [innerHTML]=\"tree.leftMenuTemplate\"\n          ></div>\n          <node-menu\n            *ngIf=\"tree.hasLeftMenu() && isLeftMenuVisible && !hasCustomMenu()\"\n            (menuItemSelected)=\"onMenuItemSelected($event)\"\n          >\n          </node-menu>\n        </div>\n\n        <node-menu *ngIf=\"isRightMenuVisible && !hasCustomMenu()\" (menuItemSelected)=\"onMenuItemSelected($event)\">\n        </node-menu>\n\n        <node-menu\n          *ngIf=\"hasCustomMenu() && (isRightMenuVisible || isLeftMenuVisible)\"\n          [menuItems]=\"tree.menuItems\"\n          (menuItemSelected)=\"onMenuItemSelected($event)\"\n        >\n        </node-menu>\n\n        <div *ngIf=\"tree.keepNodesInDOM()\" [ngStyle]=\"{ display: tree.isNodeExpanded() ? 'block' : 'none' }\">\n          <tree-internal\n            *ngFor=\"let child of (tree.childrenAsync | async)\"\n            [tree]=\"child\"\n            [template]=\"template\"\n            [settings]=\"settings\"\n          ></tree-internal>\n        </div>\n        <ng-template [ngIf]=\"tree.isNodeExpanded() && !tree.keepNodesInDOM()\">\n          <tree-internal\n            *ngFor=\"let child of (tree.childrenAsync | async)\"\n            [tree]=\"child\"\n            [template]=\"template\"\n            [settings]=\"settings\"\n          ></tree-internal>\n        </ng-template>\n      </li>\n    </ul>\n  "
        }),
        tslib_1.__metadata("design:paramtypes", [NodeMenuService,
            TreeService,
            ElementRef])
    ], TreeInternalComponent);
    return TreeInternalComponent;
}());
export { TreeInternalComponent };
//# sourceMappingURL=tree-internal.component.js.map