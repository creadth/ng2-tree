import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { NodeDraggableEvent } from './draggable.events';
import { Subject } from 'rxjs';
var NodeDraggableService = /** @class */ (function () {
    function NodeDraggableService() {
        this.draggableNodeEvents$ = new Subject();
    }
    NodeDraggableService.prototype.fireNodeDragged = function (captured, target) {
        if (!captured.tree || captured.tree.isStatic()) {
            return;
        }
        this.draggableNodeEvents$.next(new NodeDraggableEvent(captured, target));
    };
    NodeDraggableService.prototype.captureNode = function (node) {
        this.capturedNode = node;
    };
    NodeDraggableService.prototype.getCapturedNode = function () {
        return this.capturedNode;
    };
    NodeDraggableService.prototype.releaseCapturedNode = function () {
        this.capturedNode = null;
    };
    NodeDraggableService = tslib_1.__decorate([
        Injectable()
    ], NodeDraggableService);
    return NodeDraggableService;
}());
export { NodeDraggableService };
//# sourceMappingURL=node-draggable.service.js.map