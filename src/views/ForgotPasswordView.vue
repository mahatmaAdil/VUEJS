<template>
  <div class="card">
    <div class="forgot">
      <div class="forgot__card">
        <h1 class="forgot__title">Forgot password?</h1>
        <p class="forgot__sub">
          No worries, we'll send you reset instructions.
        </p>

        <form @submit.prevent="onSubmit">
          <label class="field">
            <span class="label">Email</span>
            <input class="input" type="email" placeholder="Enter your email" />
          </label>

          <button class="btn btn--primary" type="submit">Reset password</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const onSubmit = () => {
  router.push({ name: "checkEmail" });
};
</script>

<style scoped>
.card {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
