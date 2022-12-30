import PocketBase from 'pocketbase';
const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const { email, waitinglist } = await readBody(event);
  const pb = new PocketBase(config.POCKETBASE_HOST);

  const authData = await pb.admins.authWithPassword(
    config.POCKETBASE_EMAIL,
    config.POCKETBASE_PASSWORD
  );

  const entry = await pb.collection('entries').create({
    email: email,
    waitinglist: waitinglist,
  });
  pb.authStore.clear();
  return {
    dat: entry,
  };
});
