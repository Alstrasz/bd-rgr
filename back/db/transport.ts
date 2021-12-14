/* eslint-disable max-len */
import * as pg from 'pg';
import { schema_def } from '.';

export const schema: schema_def = {
    type: {
        type: 'VARCHAR(256)',
        is_primary: true,
    },
    name: {
        type: 'VARCHAR(256)',
        is_primary: true,
    },
    capacity: {
        type: 'INT',
        is_primary: false,
    },
};

export async function create_table ( client: pg.Client | pg.Pool | pg.PoolClient ) {
    return await client.query(
        'CREATE TABLE IF NOT EXISTS transport ( \n' +
        'type VARCHAR(256) UNIQUE NOT NULL, \n' +
        'name VARCHAR(256) UNIQUE NOT NULL, \n' +
        'capacity INT, \n' +
        'UNIQUE ( type, name ),\n' +
        'PRIMARY KEY ( type, name )\n' +
        ');',
    );
}

export async function drop_table ( client: pg.Client | pg.Pool | pg.PoolClient ) {
    return await client.query( 'DROP TABLE IF EXISTS transport;' );
}

export async function select ( client: pg.Client | pg.Pool | pg.PoolClient, args: any ) {
    return await client.query( 'SELECT * FROM transport WHERE (type = $1 AND name = $2);', [args.type, args.name] );
}

export async function insert ( client: pg.Client | pg.Pool | pg.PoolClient, args: any ) {
    return await client.query( 'INSERT INTO transport VALUES ($1, $2, $3);', [args.type, args.name, args.capacity] );
}

export async function update ( client: pg.Client | pg.Pool | pg.PoolClient, args: any ) {
    return await client.query( 'UPDATE transport SET capacity = $3 WHERE (type = $1 AND name = $2);', [args.type, args.name, args.capacity] );
}

export async function del ( client: pg.Client | pg.Pool | pg.PoolClient, args: any ) {
    return await client.query( 'DELETE FROM transport WHERE (type = $1 AND name = $2);', [args.type, args.name] );
}
