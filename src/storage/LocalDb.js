import { AsyncStorage, Alert } from "react-native"
import Store from '../Stores'
class LocalDb {


    static async saveRememberMe(remember) {
        try {
            await AsyncStorage.setItem('remember', remember);
            // console.warn("Saved "+remember)
        }
        catch (error) {
            // console.warn(error.message);
        }
    }
    static async getRememberMe() {
        try {
            item = await AsyncStorage.getItem('remember') || 'no';
            if (item === "yes")
                return true;
            else
                return false;
        }
        catch (error) {
            // console.warn(error.message);
        }
    }

    static async saveProfile(data) {
        // console.log('saving profile in local db', data)
        try {
            await AsyncStorage.setItem('profile', JSON.stringify(data));

        } catch (error) {
            // Error retrieving data
            // console.warn(error.message);
        }
    }

    static async saveHomepage(data) {
        // console.log('saving homepage in local db', data)
        try {
            await AsyncStorage.setItem('homepage', JSON.stringify(data));

        } catch (error) {
            // Error retrieving data
            // console.warn(error.message);
        }
    }

    static async getHomepage() {
        let item = {};
        try {
            item = await AsyncStorage.getItem('homepage') || null;
            const userProfile = JSON.parse(item);
            //    console.log('getting profile in local db',userProfile)

            return userProfile;
        }
        catch (error) {

            //  console.warn(error.message);
        }
        return null;
    }

    static async getLaunchType() {
        try {
            item = await AsyncStorage.getItem('lauchType') || "first";
            return item;
        }
        catch (error) {
            console.log(error.message);
        }
    }
    static async setLaunchType() {
        try {
            await AsyncStorage.setItem('lauchType', "next");

        } catch (error) {
            // Error retrieving data
            console.log(error.message);
        }
    }

    static async getUserProfile() {
        let item = {};
        try {
            item = await AsyncStorage.getItem('profile') || null;
            const userProfile = JSON.parse(item);
            //    console.log('getting profile in local db',userProfile)

            return userProfile;
        }
        catch (error) {

            //  console.warn(error.message);
        }
        return null;
    }

    static async saveIsProfilePublic(isPublic) {
        try {
            await AsyncStorage.setItem('isPublic', isPublic);
        }
        catch (error) {
            // console.warn(error.message);
        }
    }
    static async isProfilePublic() {
        let { orderStore } = Store;
        const isPublic = await AsyncStorage.getItem('isPublic') || null;
        if (isPublic == '1') {
        orderStore.isPublicProfile = true;
            return true;
        }
        else {
        orderStore.isPublicProfile = true;
            return false;
        }
    }

}

export default LocalDb;