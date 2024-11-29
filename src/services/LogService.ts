import { addDoc, collection } from "firebase/firestore";
import { db } from "../database/firebase";

export class LogService {
  private constructor() {}

  private static instance: LogService;

  public static getInstance(): LogService {
    if (!LogService.instance) {
      LogService.instance = new LogService();
    }
    return LogService.instance;
  }

  public async addLog(log: any) {
    try {
      await addDoc(collection(db, "logs"), log);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
