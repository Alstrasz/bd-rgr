import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';
import { init } from './init';

function createWindow () {
    // Create the browser window.
    const mainWindow = new BrowserWindow( {
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        // preload: path.join(__dirname, "preload.js"),
        },
        width: 800,
    } );

    // and load the index.html of the app.
    const index_path = '../mkp/index.html';

    mainWindow.loadURL( url.format( {
        pathname: path.join( __dirname, index_path ),
        protocol: 'file:',
        slashes: true,
        hash: '/base',
    } ) );

    // Open the DevTools.
    mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
app.on( 'ready', () => {
    createWindow();

    init();

    app.on( 'activate', function () {
        if ( BrowserWindow.getAllWindows().length === 0 ) createWindow();
    } );
} );

app.on( 'window-all-closed', () => {
    if ( process.platform !== 'darwin' ) {
        app.quit();
    }
} );

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.


// Test for communiction bentween front and back
ipcMain.on( 'ping', ( event, n ) => {
    console.log( 'ping', n );
    event.reply( 'pong', n + 1 );
} );
