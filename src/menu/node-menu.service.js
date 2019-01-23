import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NodeMenuAction } from './menu.events';
import { filter } from 'rxjs/operators';
var NodeMenuService = /** @class */ (function () {
    function NodeMenuService() {
        this.nodeMenuEvents$ = new Subject();
    }
    NodeMenuService.prototype.fireMenuEvent = function (sender, action) {
        var nodeMenuEvent = { sender: sender, action: action };
        this.nodeMenuEvents$.next(nodeMenuEvent);
    };
    NodeMenuService.prototype.hideMenuStream = function (treeElementRef) {
        return this.nodeMenuEvents$.pipe(filter(function (e) { return treeElementRef.nativeElement !== e.sender; }), filter(function (e) { return e.action === NodeMenuAction.Close; }));
    };
    NodeMenuService.prototype.hideMenuForAllNodesExcept = function (treeElementRef) {
        this.nodeMenuEvents$.next({
            sender: treeElementRef.nativeElement,
            action: NodeMenuAction.Close
        });
    };
    NodeMenuService = tslib_1.__decorate([
        Injectable()
    ], NodeMenuService);
    return NodeMenuService;
}());
export { NodeMenuService };
//# sourceMappingURL=node-menu.service.js.map