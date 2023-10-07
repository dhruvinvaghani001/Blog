import { Client, Databases, ID } from "appwrite";
import { conf } from "../config/conf";

class CategoryServices {
    client;
    databases;
    constructor() {
        this.client = new Client().setEndpoint(conf.appwriteURl).setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
    }

    async getCategories() {
        try {
            console.log(conf.appwriteCategoryCollectionId);
            return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCategoryCollectionId);
        } catch (error) {
            throw error;
        }
    }
    async getCategory(documentId) {
        try {
            return await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCategoryCollectionId, documentId);
        } catch (error) {
            throw error;
        }
    }
}


const categorySerive = new CategoryServices();

export default categorySerive;