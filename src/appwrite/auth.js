import { Client, Account, ID } from "appwrite";
import { conf } from "../config/conf";

export class AuthServices {
    client = new Client();
    account;

    constructor() {
        this.client.setEndpoint(conf.appwriteURl).setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(),email,password,name);
            if(userAccount){
                //login 
                return this.login({email,password});
            }
        } catch (error) { 
            console.log(error);
            throw error;
        }
    }

    async login({email,password}){
        try {
            return await this.account.createEmailSession(email,password);
        } catch (error) {
           console.log("Login Error : " + error);
           throw error;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("cant load current user :");
        }
        return null;
    }

    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("error in logout ");
        }
    }
}

const authservice = new AuthServices();

export default authservice;