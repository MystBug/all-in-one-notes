import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  const {
    fetch: refreshSession,
    loggedIn: isLoggedIn,
    user,
  } = useUserSession();

  const initialState = {
    loggedIn: isLoggedIn.value || false,
    credentials: {
      email: user.value?.email || "",
    },
  };

  const loggedIn = ref(initialState.loggedIn);
  const credentials = ref({
    email: initialState.credentials.email,
  });

  const fetchUser = (email: string, pwd?: string) => {
    if (!isLoggedIn.value) {
      return $fetch("/api/login", {
        method: "POST",
        body: {
          email,
          password: pwd,
        },
      }).then(async () => {
        // Refresh the session on client-side and redirect to the home page
        await refreshSession().then(() => {
          loggedIn.value = true;
          credentials.value.email = email;
          navigateTo("/");
        });
      });
    } else {
      if (isLoggedIn.value) {
        credentials.value.email = user.value?.email || email;
        navigateTo("/");
      }
    }
  };

  const reset = () => {
    loggedIn.value = initialState.loggedIn;
    credentials.value.email = initialState.credentials.email;
  };

  return { fetchUser, reset, credentials, loggedIn };
});
