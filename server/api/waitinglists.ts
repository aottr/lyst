import PocketBase from 'pocketbase';
const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  try {
    const pb = new PocketBase(config.pocketbaseHost);

    const authData = await pb.admins.authWithPassword(
      config.pocketbaseEmail,
      config.pocketbasePassword
    );

    const lists = (await pb.collection('waitinglists').getList()).items;
    pb.authStore.clear();

    return {
      data: lists,
    };
  } catch (error) {
    console.log(error);
  }
});
