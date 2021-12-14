import { Component, Input, OnInit } from '@angular/core';
import { ipcRenderer } from 'electron';

@Component( {
    selector: 'app-delete',
    templateUrl: './delete.component.html',
    styleUrls: ['./delete.component.scss'],
} )
export class DeleteComponent implements OnInit {
    @Input() schema: { [key: string]: { type: string, is_primary: boolean } } = {};
    @Input() active_table: string = '';

    args: { [name: string]: string | number } = {};

    constructor () { }

    ngOnInit (): void {
    }

    send () {
        console.log( 'sending', {
            table: this.active_table,
            query_type: 'delete',
            args: this.args,
        } );
        ipcRenderer.send( 'query',
            {
                table: this.active_table,
                query_type: 'delete',
                args: this.args,
            } );
    }
}
