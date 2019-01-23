import { ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { NodeDraggableService } from './node-draggable.service';
import { Tree } from '../tree';
export declare class NodeDraggableDirective implements OnDestroy, OnInit {
    element: ElementRef;
    private nodeDraggableService;
    private renderer;
    static DATA_TRANSFER_STUB_DATA: string;
    nodeDraggable: ElementRef;
    tree: Tree;
    private nodeNativeElement;
    private disposersForDragListeners;
    constructor(element: ElementRef, nodeDraggableService: NodeDraggableService, renderer: Renderer2);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private handleDragStart;
    private handleDragOver;
    private handleDragEnter;
    private handleDragLeave;
    private handleDrop;
    private isDropPossible;
    private handleDragEnd;
    private containsElementAt;
    private addClass;
    private removeClass;
    private notifyThatNodeWasDropped;
}