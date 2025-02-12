import conf from "../conf/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
  }

  async addUserData({ userId, name, phoneNumber, email, PANNumber }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteUsersCollectionId,
        userId,
        {
          userId,
          name,
          phoneNumber,
          email,
          PANNumber,
        }
      );
    } catch (error) {
      console.log("Appwrite serive :: addUserData :: error", error);
    }
  }

  async getUserData(userId) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteUsersCollectionId,
        userId
      );
    } catch (error) {
      console.log("Appwrite serive :: getUserData :: error", error);
    }
  }

  async addProperty({
    userId,
    propertyId,
    province,
    district,
    municipality,
    ward,
    assetValue,
    taxAmount,
    paidStatus,
  }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwritePropertiesCollectionId,
        ID.unique(),
        {
          userId,
          propertyId,
          province,
          district,
          municipality,
          ward,
          assetValue,
          taxAmount,
          paidStatus,
        }
      );
    } catch (error) {
      console.log("Appwrite serive :: AddProperty :: error", error);
    }
  }
}

const appwriteService = new Service();
export default appwriteService;
