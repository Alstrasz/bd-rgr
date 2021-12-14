/* eslint-disable max-len */
import * as pg from 'pg';
import { schema_def } from '.';

export const schema: schema_def = {
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
        'CREATE TABLE IF NOT EXISTS warehouse ( \n' +
        'address VARCHAR(256) PRIMARY KEY NOT NULL, \n' +
        'capacity INT \n' +
        ');',
    );
}

export async function drop_table ( client: pg.Client | pg.Pool | pg.PoolClient ) {
    return await client.query( 'DROP TABLE IF EXISTS warehouse;' );
}

export async function select ( client: pg.Client | pg.Pool | pg.PoolClient, args: any ) {
    return await client.query( 'SELECT * FROM warehouse WHERE name = $1;', [args.name] );
}

export async function insert ( client: pg.Client | pg.Pool | pg.PoolClient, args: any ) {
    return await client.query( 'INSERT INTO warehouse VALUES ($1, $2)', [args.name, args.capacity] );
}

export async function update ( client: pg.Client | pg.Pool | pg.PoolClient, args: any ) {
    return await client.query( 'UPDATE warehouse SET capacity = $2 WHERE name = $1;', [args.name, args.capacity] );
}

export async function del ( client: pg.Client | pg.Pool | pg.PoolClient, args: any ) {
    return await client.query( 'DELETE FROM warehouse WHERE name = $1;', [args.name] );
}
