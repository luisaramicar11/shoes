import { ILoginRequest, ILoginResponse } from "@/app/core";
import { HttpClient } from "../utils/client-http";

export class AuthService {
    private clientHttp: HttpClient;
    private basePath : string = "auth";

    constructor(){
        this.clientHttp = new HttpClient();
    }

    async login(req: ILoginRequest): Promise<ILoginResponse>{
        return await this.clientHttp.post<ILoginResponse, ILoginRequest>(
            `${this.basePath}/login`,
            req
        )
    }
}