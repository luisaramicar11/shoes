//import { getServerSession } from "next-auth/next";
//import {authOptions}  from "../../api/auth/[...nextauth]/route";

const defaultBaseUrl = "http://localhost:5227/api/v1"

export class HttpClient {
  private baseUrl : string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || defaultBaseUrl;
  }

  private async getHeader() {
    //const session = await getServerSession(authOptions);
    const headers: { [key: string]: string} = {
      "Content-Type": "application/json",
      "accept": "*/*"
    }
    /* if (session){
      headers["Authorization"] = `Bearer ${session.user.jwt}`
    }  */
    return headers;
  }

  private async handleResponse(response: Response){
    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }
    return await response.json();
  }

  async get<T>(url: string): Promise<T> {
    const headers = await this.getHeader();
    const response = await fetch(`${this.baseUrl}/${url}`,{
      headers: headers,
      method: "GET",
      cache: "no-store"
    })
    return this.handleResponse(response)
  }

  async delete(url: string): Promise<void> {
    console.log("URL del cliente DELETE:", url);  
    const headers = await this.getHeader();
    await fetch(`${this.baseUrl}/${url}`, {
        headers,
        method: "DELETE",
    });
  }
  
  async post <T, B> (url: string, body: B): Promise<T>{
      const headers = await this.getHeader();
    const response = await fetch(`${this.baseUrl}/${url}`,{
      headers: headers,
      method: "POST",
      body: JSON.stringify(body),
    })
    return this.handleResponse(response);
  }

  async put <T, B> (url: string, body:B): Promise<T>{
    const headers = await this.getHeader();
    const response = await fetch(`${this.baseUrl}/${url}`,{
      headers: headers,
      method: "PUT",
      body : JSON.stringify(body),
    })
    return this.handleResponse(response);
  }
}