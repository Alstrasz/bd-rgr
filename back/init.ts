import { ipcMain } from 'electron';
import { db, db_config } from './db/index';
// TODO FIX SERIALIZE ARG, README
export function init () {
    const db_instance_config: db_config = {
        host: '127.0.0.1',
        database: 'db-rgr',
        port: 5432,
    };
    const db_instance = new db( db_instance_config );

    ipcMain.on( 'query', ( event, args ) => {
        db_instance.run_query( args.table, args.query_type, args.args )
            .then( ( val ) => {
                console.log( val );
                if ( val == undefined ) {
                    event.reply( 'query_result', 'Finished' );
                } else {
                    event.reply( 'query_result', val );
                }
            } )
            .catch( ( err ) => {
                console.log( err );
                event.reply( 'query_result', `Error: \n${err}` );
            } );
    } );

    ipcMain.on( 'create_tables', ( event ) => {
        db_instance.create_tables()
            .then( ( val ) => {
                console.log( val );
                if ( val == undefined ) {
                    event.reply( 'query_result', 'Finished' );
                } else {
                    event.reply( 'query_result', val );
                }
            } )
            .catch( ( err ) => {
                console.log( err );
                event.reply( 'query_result', `Error: \n${err}` );
            } );
    } );

    ipcMain.on( 'drop_tables', ( event ) => {
        db_instance.drop_tables()
            .then( ( val ) => {
                console.log( val );
                if ( val == undefined ) {
                    event.reply( 'query_result', 'Finished' );
                } else {
                    event.reply( 'query_result', val );
                }
            } )
            .catch( ( err ) => {
                console.log( err );
                event.reply( 'query_result', `Error: \n${err}` );
            } );
    } );

    ipcMain.on( 'get_table_names', ( event ) => {
        event.reply( 'get_table_names', db_instance.get_table_names() );
    } );

    ipcMain.on( 'get_table_schema', ( event, args ) => {
        event.reply( 'get_table_schema', db_instance.get_table_schema( args.table ) );
    } );
}
