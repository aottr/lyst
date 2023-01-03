import PocketBase from 'pocketbase';
const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const { email, waitinglist } = await readBody(event);
  const pb = new PocketBase(config.pocketbaseHost);

  const authData = await pb.admins.authWithPassword(
    config.pocketbaseEmail,
    config.pocketbasePassword
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
