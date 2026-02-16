import { app, BrowserWindow } from 'electron';
import path from 'node:path';

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 820,
    webPreferences: {
      contextIsolation: true,
    },
  });

  win.loadFile(path.join(process.cwd(), 'index.html'));
}

app.whenReady().then(createWindow);
