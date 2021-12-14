/* eslint-disable max-len */
import * as pg from 'pg';
import { schema_def } from '.';

export const schema: schema_def = {
    id: {
        type: 'INT',
        is_primary: true,
    },
    receipt_date: {
        type: 'TIMESTAMP',
        is_primary: false,
    },
    expiration_date: {
        type: 'TIMESTAMP',
        is_primary: false,
    },
};

export async function create_table ( client: pg.Client | pg.Pool | pg.PoolClient ) {
    return await client.query(
        'CREATE TABLE IF NOT EXISTS commission ( \n' +
        'id INT PRIMARY KEY NOT NULL, \n' +
        'receipt_date TIMESTAMP, \n' +
        'expiration_date TIMESTAMP \n' +
        ');',
    );
}

export async function drop_table ( client: pg.Client | pg.Pool | pg.PoolClient ) {
    return await client.query( 'DROP TABLE IF EXISTS commission;' );
}

export async function select ( client: pg.Client | pg.Pool | pg.PoolClient, args: any ) {
    return await client.query( 'SELECT * FROM commission WHERE id = $1', [args.id] );
}

export async function insert ( client: pg.Client | pg.Pool | pg.PoolClient, args: any ) {
    return await client.query( 'INSERT INTO commission VALUES ($1, $2, $3)', [args.id, args.receipt_date, args.expiration_date] );
}

export async function update ( client: pg.Client | pg.Pool | pg.PoolClient, args: any ) {
    return await client.query( 'UPDATE commission SET receipt_date = $1, expiration_date = $2 WHERE id = $3;', [args.receipt_date, args.expiration_date, args.id] );
}

export async function del ( client: pg.Client | pg.Pool | pg.PoolClient, args: any ) {
    return await client.query( 'DELETE FROM commission WHERE id = $1;', [args.id] );
}
