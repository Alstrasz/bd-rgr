import { Component, Input, OnInit } from '@angular/core';
import { ipcRenderer } from 'electron';

@Component( {
    selector: 'app-insert',
    templateUrl: './insert.component.html',
    styleUrls: ['./insert.component.scss'],
} )
export class InsertComponent implements OnInit {
    @Input() schema: { [key: string]: { type: string, is_primary: boolean } } = {};
    @Input() active_table: string = '';

    args: { [name: string]: string | number } = {};

    constructor () { }

    ngOnInit (): void {
    }

    send () {
        console.log( 'sending', {
            table: this.active_table,
            query_type: 'insert',
            args: this.args,
        } );
        ipcRenderer.send( 'query',
            {
                table: this.active_table,
                query_type: 'insert',
                args: this.args,
            } );
    }

    number_only ( event: any ): boolean {
        const charCode = ( event.which ) ? event.which : event.keyCode;
        if ( charCode > 31 && ( charCode < 48 || charCode > 57 ) ) {
            return false;
        }
        return true;
    }
}
