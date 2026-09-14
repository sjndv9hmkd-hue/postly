const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('postlyDesktop',{
  getSettings:()=>ipcRenderer.invoke('settings:get'),
  saveSettings:s=>ipcRenderer.invoke('settings:save',s),
  generate:p=>ipcRenderer.invoke('ai:generate',p),
  uploadImage:i=>ipcRenderer.invoke('github:upload',i),
  getQueue:()=>ipcRenderer.invoke('queue:get'),
  addQueue:p=>ipcRenderer.invoke('queue:add',p),
  retry:id=>ipcRenderer.invoke('queue:retry',id),
  openExternal:url=>ipcRenderer.invoke('external:open',url),
  onQueueUpdated:fn=>ipcRenderer.on('queue-updated',(_,q)=>fn(q))
});
