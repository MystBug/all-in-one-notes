import { createClient } from "@supabase/supabase-js";
import bodySchema from "~/zod/auth";

export default defineEventHandler(async (event) => {
  const { apiUrl, apiSecretKey } = useRuntimeConfig().public;
  const supabase = createClient(apiUrl, apiSecretKey);
  const { email, password } = await readValidatedBody(event, bodySchema.parse);

  await supabase.auth
    .signInWithPassword({ email, password })
    .then(async (data) => {
      const user = data.data.user;

      if (user?.id) {
        // set the user session in the cookie
        // this server util is auto-imported by the auth-utils module
        await setUserSession(event, {
          user: {
            email: user.email!,
            name: user.email!,
          },
        });
        return {};
      }
      throw createError({
        statusCode: 401,
        message: "Bad credentials",
      });
    })
    .catch((err) => {
      throw new Error(err);
    });
});
