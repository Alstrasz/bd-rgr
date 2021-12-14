/* eslint-disable max-len */
import * as pg from 'pg';
import * as client from './client';
import * as commission from './commission';
import * as product from './product';
import * as transaction from './transaction';
import * as transport from './transport';
import * as warehouse from './warehouse';

export interface schema_def {
    [key: string]: {
        type: string,
        is_primary: boolean
    }
}

export interface db_config {
    host?: string, // 127.0.0.1
    database?: string, // db-rgr
    password?: string, // null
    port?: number, // 5432
}

const table_dict: { [key: string]: any } = {
    client: client,
    commission: commission,
    product: product,
    transaction: transaction,
    transport: transport,
    warehouse: warehouse,
};

export class db {
    pool: pg.Pool;

    constructor (
        public config: db_config,
    ) {
        this.pool = new pg.Pool( this.config );

        this.pool.query( 'SELECT NOW() as now' )
            .then( ( res ) => console.log( res.rows[0] ) )
            .catch( ( e ) => console.error( e.stack ) );
    }

    async create_tables () {
        const pl_client = await this.pool.connect();

        try {
            await pl_client.query( 'BEGIN' );

            warehouse.create_table( pl_client ).catch( ( err ) => {
                throw new Error( 'At warehouse: \n' + err );
            } );

            product.create_table( pl_client ).catch( ( err ) => {
                throw new Error( 'At product: \n' + err );
            } );

            commission.create_table( pl_client ).catch( ( err ) => {
                throw new Error( 'At commission: \n' + err );
            } );

            client.create_table( pl_client ).catch( ( err ) => {
                throw new Error( 'At client: \n' + err );
            } );

            transport.create_table( pl_client ).catch( ( err ) => {
                throw new Error( 'At transport: \n' + err );
            } );

            transaction.create_table( pl_client ).catch( ( err ) => {
                throw new Error( 'At transaction: \n' + err );
            } );

            await pl_client.query( 'COMMIT' );
        } catch ( e ) {
            await pl_client.query( 'ROLLBACK' );
            throw e;
        } finally {
            pl_client.release();
        }
    }

    async drop_tables () {
        const pl_client = await this.pool.connect();

        try {
            await pl_client.query( 'BEGIN' );

            transaction.drop_table( pl_client ).catch( ( err ) => {
                throw new Error( 'At transaction: \n' + err );
            } );

            warehouse.drop_table( pl_client ).catch( ( err ) => {
                throw new Error( 'At warehouse: \n' + err );
            } );

            product.drop_table( pl_client ).catch( ( err ) => {
                throw new Error( 'At product: \n' + err );
            } );

            commission.drop_table( pl_client ).catch( ( err ) => {
                throw new Error( 'At commission: \n' + err );
            } );

            client.drop_table( pl_client ).catch( ( err ) => {
                throw new Error( 'At client: \n' + err );
            } );

            transport.drop_table( pl_client ).catch( ( err ) => {
                throw new Error( 'At transport: \n' + err );
            } );

            await pl_client.query( 'COMMIT' );
        } catch ( e ) {
            await pl_client.query( 'ROLLBACK' );
            throw e;
        } finally {
            pl_client.release();
        }
    }

    async run_query ( table: string, query_type: string, args: any ) {
        switch ( query_type ) {
        case 'select':
            return table_dict[table].select( this.pool, args );
            break;
        case 'insert':
            return table_dict[table].insert( this.pool, args );
            break;
        case 'delete':
            return table_dict[table].del( this.pool, args );
            break;
        case 'update':
            return table_dict[table].update( this.pool, args );
            break;
        default:
            throw new Error( 'Unknown query type' );
            break;
        }
    }

    get_table_schema ( table: string ) {
        return table_dict[table].schema;
    }

    get_table_names () {
        return Object.keys( table_dict );
    }
}
