import { IApp } from "../../src/app/App";
import { IAppConfig } from "../../src/config/app.config";
import { IServer, Server } from "../../src/server/Server";

describe("Server", () => {
  let appMock: IApp;
  let server: IServer;
  let config: IAppConfig;
  let listenMock: jest.Mock;

  beforeEach(() => {
    listenMock = jest.fn();
    appMock = { getApp: jest.fn(() => ({ listen: listenMock })) } as unknown as IApp;
    config = { port: 3300 } as unknown as IAppConfig;
    server = new Server(appMock, config);
  });

  it("Should start server on port", () => {
    server.start();
    expect(appMock.getApp().listen).toHaveBeenCalled();
  });
});
