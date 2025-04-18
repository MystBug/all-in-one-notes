<script setup lang="ts">
// import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/stores/auth'
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { AuthValidation } from '~/types/auth';
const store = useAuthStore()

const { errors, handleSubmit, defineField, setFieldError } = useForm({
  validationSchema: yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
  }),
});

// const { credentials } = storeToRefs(store)
const formError = ref('')
const [email, emailAttrs] = defineField('email', {
  validateOnModelUpdate: false,
});
const [pwd, pwdAttrs] = defineField('password', {
  validateOnModelUpdate: false,
});

if (store.loggedIn) navigateTo("/");

const onSubmit = handleSubmit(async (values, { resetField, resetForm }) => {
  await store.fetchUser(values.email, pwd.value)?.then(() => {
    // credentials.value.email = values.email
    resetForm()
  }).catch(({ data: err }) => {
    resetField('password');
    if (err.data.code === AuthValidation.VALIDATION_FAILED) {
      formError.value = err.message
    } else {
      setFieldError('email', 'Incorrect credentials');
      setFieldError('password', 'Incorrect credentials');
    }
  })
});
</script>

<template>
  <form @submit="onSubmit">
    <UInput v-model="email" v-bind="emailAttrs" autofocus type="email" placeholder="Email" />
    <UInput v-model="pwd" v-bind="pwdAttrs" type="password" placeholder="Password" />

    <UButton type="submit">Login</UButton>
    <pre>errors: {{ errors }}</pre>
    <pre>formError: {{ formError }}</pre>
  </form>
</template>
