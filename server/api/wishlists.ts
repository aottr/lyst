import PocketBase from 'pocketbase';
const config = useRuntimeConfig();
export default defineEventHandler(async (event) => {
  const pb = new PocketBase(config.POCKETBASE_HOST);

  const authData = await pb.admins.authWithPassword(
    config.POCKETBASE_EMAIL,
    config.POCKETBASE_PASSWORD
  );

  const lists = (await pb.collection('waitinglists').getList()).items;
  pb.authStore.clear();

  return {
    data: lists,
  };
});
