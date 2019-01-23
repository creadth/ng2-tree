import * as tslib_1 from "tslib";
import { Directive, ElementRef, Inject, Input, Renderer2 } from '@angular/core';
import { NodeDraggableService } from './node-draggable.service';
import { CapturedNode } from './captured-node';
import { Tree } from '../tree';
var NodeDraggableDirective = /** @class */ (function () {
    function NodeDraggableDirective(element, nodeDraggableService, renderer) {
        this.element = element;
        this.nodeDraggableService = nodeDraggableService;
        this.renderer = renderer;
        this.disposersForDragListeners = [];
        this.nodeNativeElement = element.nativeElement;
    }
    NodeDraggableDirective_1 = NodeDraggableDirective;
    NodeDraggableDirective.prototype.ngOnInit = function () {
        if (!this.tree.isStatic()) {
            this.renderer.setAttribute(this.nodeNativeElement, 'draggable', 'true');
            this.disposersForDragListeners.push(this.renderer.listen(this.nodeNativeElement, 'dragenter', this.handleDragEnter.bind(this)));
            this.disposersForDragListeners.push(this.renderer.listen(this.nodeNativeElement, 'dragover', this.handleDragOver.bind(this)));
            this.disposersForDragListeners.push(this.renderer.listen(this.nodeNativeElement, 'dragstart', this.handleDragStart.bind(this)));
            this.disposersForDragListeners.push(this.renderer.listen(this.nodeNativeElement, 'dragleave', this.handleDragLeave.bind(this)));
            this.disposersForDragListeners.push(this.renderer.listen(this.nodeNativeElement, 'drop', this.handleDrop.bind(this)));
            this.disposersForDragListeners.push(this.renderer.listen(this.nodeNativeElement, 'dragend', this.handleDragEnd.bind(this)));
        }
    };
    NodeDraggableDirective.prototype.ngOnDestroy = function () {
        /* tslint:disable:typedef */
        this.disposersForDragListeners.forEach(function (dispose) { return dispose(); });
        /* tslint:enable:typedef */
    };
    NodeDraggableDirective.prototype.handleDragStart = function (e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        }
        this.nodeDraggableService.captureNode(new CapturedNode(this.nodeDraggable, this.tree));
        e.dataTransfer.setData('text', NodeDraggableDirective_1.DATA_TRANSFER_STUB_DATA);
        e.dataTransfer.effectAllowed = 'move';
    };
    NodeDraggableDirective.prototype.handleDragOver = function (e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };
    NodeDraggableDirective.prototype.handleDragEnter = function (e) {
        e.preventDefault();
        if (this.containsElementAt(e)) {
            this.addClass('over-drop-target');
        }
    };
    NodeDraggableDirective.prototype.handleDragLeave = function (e) {
        if (!this.containsElementAt(e)) {
            this.removeClass('over-drop-target');
        }
    };
    NodeDraggableDirective.prototype.handleDrop = function (e) {
        e.preventDefault();
        if (e.stopPropagation) {
            e.stopPropagation();
        }
        this.removeClass('over-drop-target');
        if (!this.isDropPossible(e)) {
            return false;
        }
        if (this.nodeDraggableService.getCapturedNode()) {
            return this.notifyThatNodeWasDropped();
        }
    };
    NodeDraggableDirective.prototype.isDropPossible = function (e) {
        var capturedNode = this.nodeDraggableService.getCapturedNode();
        return capturedNode && capturedNode.canBeDroppedAt(this.nodeDraggable) && this.containsElementAt(e);
    };
    NodeDraggableDirective.prototype.handleDragEnd = function (e) {
        this.removeClass('over-drop-target');
        this.nodeDraggableService.releaseCapturedNode();
    };
    NodeDraggableDirective.prototype.containsElementAt = function (e) {
        var _a = e.x, x = _a === void 0 ? e.clientX : _a, _b = e.y, y = _b === void 0 ? e.clientY : _b;
        return this.nodeNativeElement.contains(document.elementFromPoint(x, y));
    };
    NodeDraggableDirective.prototype.addClass = function (className) {
        var classList = this.nodeNativeElement.classList;
        classList.add(className);
    };
    NodeDraggableDirective.prototype.removeClass = function (className) {
        var classList = this.nodeNativeElement.classList;
        classList.remove(className);
    };
    NodeDraggableDirective.prototype.notifyThatNodeWasDropped = function () {
        this.nodeDraggableService.fireNodeDragged(this.nodeDraggableService.getCapturedNode(), this.nodeDraggable);
    };
    var NodeDraggableDirective_1;
    NodeDraggableDirective.DATA_TRANSFER_STUB_DATA = 'some browsers enable drag-n-drop only when dataTransfer has data';
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", ElementRef)
    ], NodeDraggableDirective.prototype, "nodeDraggable", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Tree)
    ], NodeDraggableDirective.prototype, "tree", void 0);
    NodeDraggableDirective = NodeDraggableDirective_1 = tslib_1.__decorate([
        Directive({
            selector: '[nodeDraggable]'
        }),
        tslib_1.__param(0, Inject(ElementRef)),
        tslib_1.__param(1, Inject(NodeDraggableService)),
        tslib_1.__param(2, Inject(Renderer2)),
        tslib_1.__metadata("design:paramtypes", [ElementRef,
            NodeDraggableService,
            Renderer2])
    ], NodeDraggableDirective);
    return NodeDraggableDirective;
}());
export { NodeDraggableDirective };
//# sourceMappingURL=node-draggable.directive.js.map