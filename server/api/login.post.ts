import { createClient } from "@supabase/supabase-js";

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);
  const { apiUrl, apiSecretKey } = useRuntimeConfig().public;
  const supabase = createClient(apiUrl, apiSecretKey);

  return await supabase.auth
    .signInWithPassword({ email, password })
    .then(async (data) => {
      const user = data.data.user;

      if (user?.aud) {
        // set the user session in the cookie
        // this server util is auto-imported by the auth-utils module
        await setUserSession(event, {
          user: {
            email: user.email!,
            name: user.email!,
          },
        });
      }
      if (data.error) {
        throw createError({
          statusCode: data.error?.status,
          message: "Login failed",
          data: { code: data.error?.code },
        });
      }
    })
    .catch((err) => {
      throw createError(err);
    });
});
