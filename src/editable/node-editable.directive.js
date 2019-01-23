import * as tslib_1 from "tslib";
import { Directive, ElementRef, EventEmitter, HostListener, Inject, Input, Output, Renderer2 } from '@angular/core';
import { NodeEditableEventAction } from './editable.events';
var NodeEditableDirective = /** @class */ (function () {
    function NodeEditableDirective(renderer, elementRef) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        /* tslint:enable:no-input-rename */
        this.valueChanged = new EventEmitter(false);
    }
    NodeEditableDirective.prototype.ngOnInit = function () {
        var nativeElement = this.elementRef.nativeElement;
        if (nativeElement) {
            nativeElement.focus();
        }
        this.renderer.setProperty(nativeElement, 'value', this.nodeValue);
    };
    NodeEditableDirective.prototype.applyNewValue = function (newNodeValue) {
        this.valueChanged.emit({ type: 'keyup', value: newNodeValue });
    };
    NodeEditableDirective.prototype.applyNewValueByLoosingFocus = function (newNodeValue) {
        this.valueChanged.emit({ type: 'blur', value: newNodeValue });
    };
    NodeEditableDirective.prototype.cancelEditing = function () {
        this.valueChanged.emit({
            type: 'keyup',
            value: this.nodeValue,
            action: NodeEditableEventAction.Cancel
        });
    };
    tslib_1.__decorate([
        Input('nodeEditable'),
        tslib_1.__metadata("design:type", String)
    ], NodeEditableDirective.prototype, "nodeValue", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], NodeEditableDirective.prototype, "valueChanged", void 0);
    tslib_1.__decorate([
        HostListener('keyup.enter', ['$event.target.value']),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String]),
        tslib_1.__metadata("design:returntype", void 0)
    ], NodeEditableDirective.prototype, "applyNewValue", null);
    tslib_1.__decorate([
        HostListener('blur', ['$event.target.value']),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String]),
        tslib_1.__metadata("design:returntype", void 0)
    ], NodeEditableDirective.prototype, "applyNewValueByLoosingFocus", null);
    tslib_1.__decorate([
        HostListener('keyup.esc'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], NodeEditableDirective.prototype, "cancelEditing", null);
    NodeEditableDirective = tslib_1.__decorate([
        Directive({
            selector: '[nodeEditable]'
        }),
        tslib_1.__param(0, Inject(Renderer2)),
        tslib_1.__param(1, Inject(ElementRef)),
        tslib_1.__metadata("design:paramtypes", [Renderer2,
            ElementRef])
    ], NodeEditableDirective);
    return NodeEditableDirective;
}());
export { NodeEditableDirective };
//# sourceMappingURL=node-editable.directive.js.map