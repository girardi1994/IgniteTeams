import AsyncStorage from "@react-native-async-storage/async-storage";
import {AppError} from '../../Utils/appError';
import { GROUP_COLLECTION } from "../storageConfig";
import { GroupsGetAll } from "./groupsGetAll";

export async function GroupCreate(newGroup: string) {
  try {
    const storageGroups = await GroupsGetAll();

    const groupAlreadyExist = storageGroups.includes(newGroup);

    if(groupAlreadyExist){
      throw new AppError("Já existe um grupo cadastrado com esse nome.");
    }

    const storage =JSON.stringify([...storageGroups, newGroup]);
    await AsyncStorage.setItem(GROUP_COLLECTION, storage);

  } catch (error) {
    throw error;
  }
}