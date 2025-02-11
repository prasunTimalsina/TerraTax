const conf = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteUsersCollectionId: String(
    String(import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID)
  ),
  appwriteTransactionsCollectionId: String(
    String(import.meta.env.VITE_APPWRITE_TRANSACTIONS_COLLECTION_ID)
  ),
  appwritePropertiesCollectionId: String(
    String(import.meta.env.VITE_APPWRITE_PROPERTIES_COLLECTION_ID)
  ),
};

export default conf;
