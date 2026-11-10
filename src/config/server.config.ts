import "reflect-metadata";
import { IServer } from "../server/Server";
import { container } from "./inversify.config";

container.get<IServer>("Server").start();
