import PocketBase from 'pocketbase';
const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  try {
    const pb = new PocketBase(config.pocketbaseHost);

    const authData = await pb.admins.authWithPassword(
      config.pocketbaseEmail,
      config.pocketbasePassword
    );

    const regions = (await pb.collection('regions').getList()).items;
    pb.authStore.clear();

    return {
      data: regions,
    };
  } catch (error) {
    console.log(error);
  }
});
