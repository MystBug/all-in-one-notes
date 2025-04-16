import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  const {
    fetch: refreshSession,
    loggedIn: isLoggedIn,
    user,
  } = useUserSession();
  const loggedIn = ref(false);
  const credentials = ref({
    email: "",
  });

  const fetchUser = (pwd?: string) => {
    if (!isLoggedIn.value) {
      console.log("actually fetching user");
      $fetch("/api/login", {
        method: "POST",
        body: {
          email: credentials.value.email,
          password: pwd,
        },
      })
        .then(async () => {
          // Refresh the session on client-side and redirect to the home page
          await refreshSession()
            .then(() => {
              loggedIn.value = true;
              navigateTo("/");
            })
            .catch((err: Error) => err);
        })
        .catch((err: Error) => err);
    } else {
      console.log("setting user", user.value);
      loggedIn.value = isLoggedIn.value;
      credentials.value.email = user.value?.email || "";
    }
  };

  return { fetchUser, credentials, loggedIn };
});
