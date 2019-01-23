import * as tslib_1 from "tslib";
import { Component, ContentChild, EventEmitter, Inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { TreeService } from './tree.service';
import * as TreeTypes from './tree.types';
import { Tree } from './tree';
var TreeComponent = /** @class */ (function () {
    function TreeComponent(treeService) {
        this.treeService = treeService;
        this.nodeCreated = new EventEmitter();
        this.nodeRemoved = new EventEmitter();
        this.nodeRenamed = new EventEmitter();
        this.nodeSelected = new EventEmitter();
        this.nodeUnselected = new EventEmitter();
        this.nodeMoved = new EventEmitter();
        this.nodeExpanded = new EventEmitter();
        this.nodeCollapsed = new EventEmitter();
        this.loadNextLevel = new EventEmitter();
        this.nodeChecked = new EventEmitter();
        this.nodeUnchecked = new EventEmitter();
        this.menuItemSelected = new EventEmitter();
        this.subscriptions = [];
    }
    TreeComponent_1 = TreeComponent;
    TreeComponent.prototype.ngOnChanges = function (changes) {
        if (!this.treeModel) {
            this.tree = TreeComponent_1.EMPTY_TREE;
        }
        else {
            this.tree = new Tree(this.treeModel);
        }
    };
    TreeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscriptions.push(this.treeService.nodeRemoved$.subscribe(function (e) {
            _this.nodeRemoved.emit(e);
        }));
        this.subscriptions.push(this.treeService.nodeRenamed$.subscribe(function (e) {
            _this.nodeRenamed.emit(e);
        }));
        this.subscriptions.push(this.treeService.nodeCreated$.subscribe(function (e) {
            _this.nodeCreated.emit(e);
        }));
        this.subscriptions.push(this.treeService.nodeSelected$.subscribe(function (e) {
            _this.nodeSelected.emit(e);
        }));
        this.subscriptions.push(this.treeService.nodeUnselected$.subscribe(function (e) {
            _this.nodeUnselected.emit(e);
        }));
        this.subscriptions.push(this.treeService.nodeMoved$.subscribe(function (e) {
            _this.nodeMoved.emit(e);
        }));
        this.subscriptions.push(this.treeService.nodeExpanded$.subscribe(function (e) {
            _this.nodeExpanded.emit(e);
        }));
        this.subscriptions.push(this.treeService.nodeCollapsed$.subscribe(function (e) {
            _this.nodeCollapsed.emit(e);
        }));
        this.subscriptions.push(this.treeService.menuItemSelected$.subscribe(function (e) {
            _this.menuItemSelected.emit(e);
        }));
        this.subscriptions.push(this.treeService.loadNextLevel$.subscribe(function (e) {
            _this.loadNextLevel.emit(e);
        }));
        this.subscriptions.push(this.treeService.nodeChecked$.subscribe(function (e) {
            _this.nodeChecked.emit(e);
        }));
        this.subscriptions.push(this.treeService.nodeUnchecked$.subscribe(function (e) {
            _this.nodeUnchecked.emit(e);
        }));
    };
    TreeComponent.prototype.getController = function () {
        return this.rootComponent.controller;
    };
    TreeComponent.prototype.getControllerByNodeId = function (id) {
        return this.treeService.getController(id);
    };
    TreeComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub && sub.unsubscribe(); });
    };
    var TreeComponent_1;
    TreeComponent.EMPTY_TREE = new Tree({ value: '' });
    tslib_1.__decorate([
        Input('tree'),
        tslib_1.__metadata("design:type", Object)
    ], TreeComponent.prototype, "treeModel", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", TreeTypes.Ng2TreeSettings)
    ], TreeComponent.prototype, "settings", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], TreeComponent.prototype, "nodeCreated", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], TreeComponent.prototype, "nodeRemoved", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], TreeComponent.prototype, "nodeRenamed", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], TreeComponent.prototype, "nodeSelected", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], TreeComponent.prototype, "nodeUnselected", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], TreeComponent.prototype, "nodeMoved", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], TreeComponent.prototype, "nodeExpanded", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], TreeComponent.prototype, "nodeCollapsed", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], TreeComponent.prototype, "loadNextLevel", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], TreeComponent.prototype, "nodeChecked", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], TreeComponent.prototype, "nodeUnchecked", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], TreeComponent.prototype, "menuItemSelected", void 0);
    tslib_1.__decorate([
        ViewChild('rootComponent'),
        tslib_1.__metadata("design:type", Object)
    ], TreeComponent.prototype, "rootComponent", void 0);
    tslib_1.__decorate([
        ContentChild(TemplateRef),
        tslib_1.__metadata("design:type", Object)
    ], TreeComponent.prototype, "template", void 0);
    TreeComponent = TreeComponent_1 = tslib_1.__decorate([
        Component({
            selector: 'tree',
            template: "\n    <tree-internal #rootComponent [tree]=\"tree\" [settings]=\"settings\" [template]=\"template\"></tree-internal>\n  ",
            providers: [TreeService]
        }),
        tslib_1.__param(0, Inject(TreeService)),
        tslib_1.__metadata("design:paramtypes", [TreeService])
    ], TreeComponent);
    return TreeComponent;
}());
export { TreeComponent };
//# sourceMappingURL=tree.component.js.map