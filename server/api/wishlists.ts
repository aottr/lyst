import PocketBase from 'pocketbase';
export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig();
    console.log(config);
    console.log(process.env);
    console.log('Host', config.pocketbaseHost, 'host-end');
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
