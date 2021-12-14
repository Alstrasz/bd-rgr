import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ipcRenderer } from 'electron';

@Component( {
    selector: 'app-base',
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.scss'],
} )
export class BaseComponent implements OnInit {
    table_names: Array<string> = [];
    active_table: string = '';
    query_types = ['select', 'insert', 'delete', 'update'];
    active_query: string = 'select';
    schema: { [key: string]: { type: string, is_primary: boolean } } = {};
    str = '';

    query_result: string = '';

    constructor ( cd: ChangeDetectorRef ) {
        ipcRenderer.on( 'get_table_names', ( event, args ) => {
            this.table_names = args;
            this.active_table = this.table_names[0];
            ipcRenderer.send( 'get_table_schema', { table: this.active_table } );
        } );

        ipcRenderer.on( 'query_result', ( event, args ) => {
            this.query_result = JSON.stringify( args, null, 2 );
            cd.detectChanges();
        } );

        ipcRenderer.on( 'get_table_schema', ( event, args ) => {
            this.schema = args;
            console.log( args );
            cd.detectChanges();
        } );

        ipcRenderer.send( 'get_table_names' );
    }

    table_change () {
        ipcRenderer.send( 'get_table_schema', { table: this.active_table } );
    }

    create_tables () {
        ipcRenderer.send( 'create_tables' );
    }

    drop_tabels () {
        ipcRenderer.send( 'drop_tables' );
    }

    ngOnInit (): void {
    }
}
