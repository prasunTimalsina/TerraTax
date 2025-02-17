import conf from "../conf/config";
import { Client, ID, Databases, Query } from "appwrite";

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
    landType,
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
          landType,
          taxAmount,
          paidStatus,
        }
      );
    } catch (error) {
      console.log("Appwrite serive :: AddProperty :: error", error);
    }
  }

  async getProperty(propertyId) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwritePropertiesCollectionId,
        propertyId
      );
    } catch (error) {
      console.log("Appwrite serive :: getProperty :: error", error);
    }
  }

  async getProperties(userId) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwritePropertiesCollectionId,
        [Query.equal("userId", userId)]
      );
    } catch (error) {
      console.log("Appwrite serive :: getProperties :: error", error);
      return false;
    }
  }

  async checkSimilarProperty(propertyId) {
    try {
      // Replace "YOUR_DATABASE_ID" and "YOUR_COLLECTION_ID" with your actual IDs.
      const response = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwritePropertiesCollectionId,
        [Query.equal("propertyId", propertyId)]
      );
      // If any document is returned, a similar property exists.
      return response.documents.length > 0;
    } catch (error) {
      console.error("Error checking for similar property:", error);
      throw error;
    }
  }

  async updatePayDate(documentId, newPayDate) {
    try {
      const updatedDocument = await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwritePropertiesCollectionId,
        documentId,
        { paidDate: newPayDate }
      );
      return updatedDocument;
    } catch (error) {
      console.error("Error updating payDate:", error);
      throw error; // Rethrow the error after logging it
    }
  }

  async addTransactionData({
    transactionId,
    propertyId,
    amount,
    paymentDate,
    userId,
    status,
  }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteTransactionsCollectionId,
        ID.unique(),
        {
          transactionId,
          propertyId,
          amount,
          paymentDate,
          userId,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite serive :: addTransactionData :: error", error);
    }
  }

  async getTransactions(userId) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteTransactionsCollectionId,
        [Query.equal("userId", userId)]
      );
    } catch (error) {
      console.log("Appwrite service :: getTransactions :: error", error);
      return false;
    }
  }
}

const appwriteService = new Service();
export default appwriteService;
