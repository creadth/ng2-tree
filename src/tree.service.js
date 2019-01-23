import * as tslib_1 from "tslib";
import { LoadNextLevelEvent, MenuItemSelectedEvent, NodeCheckedEvent, NodeCollapsedEvent, NodeCreatedEvent, NodeExpandedEvent, NodeIndeterminedEvent, NodeMovedEvent, NodeRemovedEvent, NodeRenamedEvent, NodeSelectedEvent, NodeUncheckedEvent, NodeUnselectedEvent } from './tree.events';
import { Subject } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { NodeDraggableService } from './draggable/node-draggable.service';
import { isEmpty } from './utils/fn.utils';
import { filter } from 'rxjs/operators';
var TreeService = /** @class */ (function () {
    function TreeService(nodeDraggableService) {
        this.nodeDraggableService = nodeDraggableService;
        this.nodeMoved$ = new Subject();
        this.nodeRemoved$ = new Subject();
        this.nodeRenamed$ = new Subject();
        this.nodeCreated$ = new Subject();
        this.nodeSelected$ = new Subject();
        this.nodeUnselected$ = new Subject();
        this.nodeExpanded$ = new Subject();
        this.nodeCollapsed$ = new Subject();
        this.menuItemSelected$ = new Subject();
        this.loadNextLevel$ = new Subject();
        this.nodeChecked$ = new Subject();
        this.nodeUnchecked$ = new Subject();
        this.nodeIndetermined$ = new Subject();
        this.controllers = new Map();
        this.nodeRemoved$.subscribe(function (e) { return e.node.removeItselfFromParent(); });
    }
    TreeService.prototype.unselectStream = function (tree) {
        return this.nodeSelected$.pipe(filter(function (e) { return tree !== e.node; }));
    };
    TreeService.prototype.fireNodeRemoved = function (tree) {
        this.nodeRemoved$.next(new NodeRemovedEvent(tree, tree.positionInParent));
    };
    TreeService.prototype.fireNodeCreated = function (tree) {
        this.nodeCreated$.next(new NodeCreatedEvent(tree));
    };
    TreeService.prototype.fireNodeSelected = function (tree) {
        this.nodeSelected$.next(new NodeSelectedEvent(tree));
    };
    TreeService.prototype.fireNodeUnselected = function (tree) {
        this.nodeUnselected$.next(new NodeUnselectedEvent(tree));
    };
    TreeService.prototype.fireNodeRenamed = function (oldValue, tree) {
        this.nodeRenamed$.next(new NodeRenamedEvent(tree, oldValue, tree.value));
    };
    TreeService.prototype.fireNodeMoved = function (tree, parent) {
        this.nodeMoved$.next(new NodeMovedEvent(tree, parent));
    };
    TreeService.prototype.fireMenuItemSelected = function (tree, selectedItem) {
        this.menuItemSelected$.next(new MenuItemSelectedEvent(tree, selectedItem));
    };
    TreeService.prototype.fireNodeSwitchFoldingType = function (tree) {
        if (tree.isNodeExpanded()) {
            this.fireNodeExpanded(tree);
            if (this.shouldFireLoadNextLevel(tree)) {
                this.fireLoadNextLevel(tree);
            }
        }
        else if (tree.isNodeCollapsed()) {
            this.fireNodeCollapsed(tree);
        }
    };
    TreeService.prototype.fireNodeExpanded = function (tree) {
        this.nodeExpanded$.next(new NodeExpandedEvent(tree));
    };
    TreeService.prototype.fireNodeCollapsed = function (tree) {
        this.nodeCollapsed$.next(new NodeCollapsedEvent(tree));
    };
    TreeService.prototype.fireLoadNextLevel = function (tree) {
        this.loadNextLevel$.next(new LoadNextLevelEvent(tree));
    };
    TreeService.prototype.fireNodeChecked = function (tree) {
        this.nodeChecked$.next(new NodeCheckedEvent(tree));
    };
    TreeService.prototype.fireNodeUnchecked = function (tree) {
        this.nodeUnchecked$.next(new NodeUncheckedEvent(tree));
    };
    TreeService.prototype.draggedStream = function (tree, element) {
        return this.nodeDraggableService.draggableNodeEvents$.pipe(filter(function (e) { return e.target === element; }), filter(function (e) { return !e.captured.tree.hasChild(tree); }));
    };
    TreeService.prototype.setController = function (id, controller) {
        this.controllers.set(id, controller);
    };
    TreeService.prototype.deleteController = function (id) {
        if (this.controllers.has(id)) {
            this.controllers.delete(id);
        }
    };
    TreeService.prototype.getController = function (id) {
        if (this.controllers.has(id)) {
            return this.controllers.get(id);
        }
        return null;
    };
    TreeService.prototype.hasController = function (id) {
        return this.controllers.has(id);
    };
    TreeService.prototype.shouldFireLoadNextLevel = function (tree) {
        var shouldLoadNextLevel = tree.node.emitLoadNextLevel &&
            !tree.node.loadChildren &&
            !tree.childrenAreBeingLoaded() &&
            isEmpty(tree.children);
        if (shouldLoadNextLevel) {
            tree.loadingChildrenRequested();
        }
        return shouldLoadNextLevel;
    };
    TreeService.prototype.fireNodeIndetermined = function (tree) {
        this.nodeIndetermined$.next(new NodeIndeterminedEvent(tree));
    };
    TreeService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__param(0, Inject(NodeDraggableService)),
        tslib_1.__metadata("design:paramtypes", [NodeDraggableService])
    ], TreeService);
    return TreeService;
}());
export { TreeService };
//# sourceMappingURL=tree.service.js.map