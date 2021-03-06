// Accessible while the browser is running

/* Usually used in the rendering process to send information to the main process, 
and then process some things that the main process can handle (for example, changing the window, reading notifications)
*/

import { ipcRenderer } from 'electron'
import { Action } from '../actionTypes'

export function sendAsyncIpcRendererEvent(action: Action, message?: any) {
  ipcRenderer.send(action, message)
}

export function sendSyncIpcRendererEvent(action: Action, message?: any) {
  ipcRenderer.send(action, message)
}

export interface IpcRenderer {
  sendAsyncIpcRendererEvent: (action: Action, message?: any) => void
  sendSyncIpcRendererEvent: (action: Action, message?: any) => void
}
