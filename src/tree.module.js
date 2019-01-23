import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { TreeComponent } from './tree.component';
import { TreeInternalComponent } from './tree-internal.component';
import { CommonModule } from '@angular/common';
import { NodeDraggableDirective } from './draggable/node-draggable.directive';
import { NodeDraggableService } from './draggable/node-draggable.service';
import { NodeEditableDirective } from './editable/node-editable.directive';
import { NodeMenuComponent } from './menu/node-menu.component';
import { NodeMenuService } from './menu/node-menu.service';
import { TreeService } from './tree.service';
import { SafeHtmlPipe } from './utils/safe-html.pipe';
var TreeModule = /** @class */ (function () {
    function TreeModule() {
    }
    TreeModule = tslib_1.__decorate([
        NgModule({
            imports: [CommonModule],
            declarations: [
                NodeDraggableDirective,
                TreeComponent,
                NodeEditableDirective,
                NodeMenuComponent,
                TreeInternalComponent,
                SafeHtmlPipe
            ],
            exports: [TreeComponent],
            providers: [NodeDraggableService, NodeMenuService, TreeService]
        })
    ], TreeModule);
    return TreeModule;
}());
export { TreeModule };
//# sourceMappingURL=tree.module.js.map