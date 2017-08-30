import server from '../src/server';
import {spawn} from 'child_process';

const app = server();
export const beforeAndAfter = (port = 3100) => {
  let expressServer;
  let cdnServer;

  before(() => new Promise(resolve => expressServer = app.listen(port, resolve)));

  after(() => expressServer.close());

  before(() => {
    cdnServer = spawn('node', ['./dist/test/browser/mock/cdn-server.js'], {stdio: 'inherit'});
  });

  after(() => {
    cdnServer.kill();
  });
};
