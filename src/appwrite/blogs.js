import { Client, Databases, Query, Storage, ID } from "appwrite"
import { conf } from "../config/conf";

export class Services {
    client = new Client();
    databases;
    storage;

    constructor() {
        this.client.setEndpoint(conf.appwriteURl).setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, userId, status, categoryId }) {
        try {
            console.log(conf.appwriteCollectionId)
            return await this.databases.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug,
                {
                    title,
                    content,
                    featuredImage,
                    userId,
                    status,
                    categoryId
                })
        } catch (error) {
            console.log(error)
            console.log("create post error :");
            return false;
        }
    }

    async updatePost(slug, { title, content, featuredImage, status, categoryId }) {
        try {
            return await this.databases.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, {
                title,
                content,
                featuredImage,
                status,
                categoryId
            });

        } catch (error) {
            console.log("error in update post:");
            return false;
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug);
        } catch (error) {
            console.log("erorr in delet post");
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug);
        } catch (error) {
            console.log("error in get post");
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, [Query.equal("status", "active")]);
        } catch (error) {
            console.log(error);
            console.log("eror in get posts by query");
            return false;
        }
    }

    async getUserPosts(userId) {
        try {
            return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, [Query.equal("userId", userId)]);
        } catch (error) {
            console.log(error);
            console.log("eror in get posts by query");
            return false;
        }
    }


    //file upload services

    async uploadFile(file) {
        try {
            console.log(file);
            console.log(this.storage)
            return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log(error);
            console.log("error in upload file");
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(conf.appwriteBucketId, fileId);
            return true;
        } catch (error) {
            console.log("error in delete file");
            return false;
        }
    }

    getFilePreview(fileId) {
        return this.storage.getFilePreview(conf.appwriteBucketId, fileId);

    }

}

const service = new Services();

export default service;
