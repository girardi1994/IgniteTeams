import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION, PLAYER_COLLECTION } from "../storageConfig";
import { GroupsGetAll } from "./groupsGetAll";

export async function groupRemove(groupDeleted: string){
  try {
    const storedGroups = await GroupsGetAll();
    const groups = storedGroups.filter(group => group !== groupDeleted);

    await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(groups));
    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupDeleted}`);
    
  } catch (error) {
    throw error;
  }
}