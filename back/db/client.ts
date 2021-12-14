/* eslint-disable max-len */
import * as pg from 'pg';
import { schema_def } from '.';

export const schema: schema_def = {
    name: {
        type: 'VARCHAR(256)',
        is_primary: true,
    },
    is_company: {
        type: 'BOOL',
        is_primary: false,
    },
    address: {
        type: 'VARCHAR(256)',
        is_primary: false,
    },
};

export async function create_table ( client: pg.Client | pg.Pool | pg.PoolClient ) {
    return await client.query(
        'CREATE TABLE IF NOT EXISTS client ( \n' +
        'name VARCHAR(256) PRIMARY KEY NOT NULL, \n' +
        'is_company BOOL, \n' +
        'address VARCHAR(256) \n' +
        ');',
    );
}

export function drop_table ( client: pg.Client | pg.Pool | pg.PoolClient ) {
    return client.query( 'DROP TABLE IF EXISTS client;' );
}

export function select ( client: pg.Client | pg.Pool | pg.PoolClient, args: any ) {
    return client.query( 'SELECT * FROM client WHERE name = $1;', [args.name] );
}

export function insert ( client: pg.Client | pg.Pool | pg.PoolClient, args: any ) {
    return client.query( 'INSERT INTO client VALUES ($1, $2, $3);', [args.name, args.is_company, args.address] );
}

export function update ( client: pg.Client | pg.Pool | pg.PoolClient, args: any ) {
    return client.query( 'UPDATE client SET is_company = $1, address = $2 WHERE name = $3;', [args.is_company, args.address, args.name] );
}

export function del ( client: pg.Client | pg.Pool | pg.PoolClient, args: any ) {
    return client.query( 'DELETE FROM client WHERE name = $1;', [args.name] );
}


