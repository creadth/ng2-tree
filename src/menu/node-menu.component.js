import * as tslib_1 from "tslib";
import { Component, EventEmitter, Inject, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { NodeMenuService } from './node-menu.service';
import { NodeMenuAction, NodeMenuItemAction } from './menu.events';
import { isEscapePressed, isLeftButtonClicked } from '../utils/event.utils';
var NodeMenuComponent = /** @class */ (function () {
    function NodeMenuComponent(renderer, nodeMenuService) {
        this.renderer = renderer;
        this.nodeMenuService = nodeMenuService;
        this.menuItemSelected = new EventEmitter();
        this.availableMenuItems = [
            {
                name: 'New tag',
                action: NodeMenuItemAction.NewTag,
                cssClass: 'new-tag'
            },
            {
                name: 'New folder',
                action: NodeMenuItemAction.NewFolder,
                cssClass: 'new-folder'
            },
            {
                name: 'Rename',
                action: NodeMenuItemAction.Rename,
                cssClass: 'rename'
            },
            {
                name: 'Remove',
                action: NodeMenuItemAction.Remove,
                cssClass: 'remove'
            }
        ];
        this.disposersForGlobalListeners = [];
    }
    NodeMenuComponent.prototype.ngOnInit = function () {
        this.availableMenuItems = this.menuItems || this.availableMenuItems;
        this.disposersForGlobalListeners.push(this.renderer.listen('document', 'keyup', this.closeMenu.bind(this)));
        this.disposersForGlobalListeners.push(this.renderer.listen('document', 'mousedown', this.closeMenu.bind(this)));
    };
    NodeMenuComponent.prototype.ngOnDestroy = function () {
        this.disposersForGlobalListeners.forEach(function (dispose) { return dispose(); });
    };
    NodeMenuComponent.prototype.onMenuItemSelected = function (e, selectedMenuItem) {
        if (isLeftButtonClicked(e)) {
            this.menuItemSelected.emit({
                nodeMenuItemAction: selectedMenuItem.action,
                nodeMenuItemSelected: selectedMenuItem.name
            });
            this.nodeMenuService.fireMenuEvent(e.target, NodeMenuAction.Close);
        }
    };
    NodeMenuComponent.prototype.closeMenu = function (e) {
        var mouseClicked = e instanceof MouseEvent;
        // Check if the click is fired on an element inside a menu
        var containingTarget = this.menuContainer.nativeElement !== e.target && this.menuContainer.nativeElement.contains(e.target);
        if ((mouseClicked && !containingTarget) || isEscapePressed(e)) {
            this.nodeMenuService.fireMenuEvent(e.target, NodeMenuAction.Close);
        }
    };
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], NodeMenuComponent.prototype, "menuItemSelected", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], NodeMenuComponent.prototype, "menuItems", void 0);
    tslib_1.__decorate([
        ViewChild('menuContainer'),
        tslib_1.__metadata("design:type", Object)
    ], NodeMenuComponent.prototype, "menuContainer", void 0);
    NodeMenuComponent = tslib_1.__decorate([
        Component({
            selector: 'node-menu',
            template: "\n    <div class=\"node-menu\">\n      <ul class=\"node-menu-content\" #menuContainer>\n        <li class=\"node-menu-item\" *ngFor=\"let menuItem of availableMenuItems\"\n          (click)=\"onMenuItemSelected($event, menuItem)\">\n          <div class=\"node-menu-item-icon {{menuItem.cssClass}}\"></div>\n          <span class=\"node-menu-item-value\">{{menuItem.name}}</span>\n        </li>\n      </ul>\n    </div>\n  "
        }),
        tslib_1.__param(0, Inject(Renderer2)),
        tslib_1.__param(1, Inject(NodeMenuService)),
        tslib_1.__metadata("design:paramtypes", [Renderer2,
            NodeMenuService])
    ], NodeMenuComponent);
    return NodeMenuComponent;
}());
export { NodeMenuComponent };
//# sourceMappingURL=node-menu.component.js.map