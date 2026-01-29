<template>
  <div class="card">
    <div class="forgot">
      <div class="forgot__card">
        <h1 class="forgot__title">Forgot password?</h1>
        <p class="forgot__sub">
          No worries, we'll send you reset instructions.
        </p>

        <form @submit.prevent="onSubmit" novalidate>
          <label class="field">
            <span class="label">Email</span>
            <input
              v-model="email"
              class="input"
              type="email"
              placeholder="Enter your email"
              :class="{ 'input--error': showEmailError }"
              @blur="touchedEmail = true"
            />
            <span v-if="showEmailError" class="error">
              Enter a valid email address
            </span>
          </label>

          <button class="btn btn--primary" type="submit">Reset password</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref, computed } from "vue";
const router = useRouter();
const email = ref("");
const touchedEmail = ref(false);

// нормализуем email
const emailNormalized = computed(() => email.value.trim().toLowerCase());

// простая и адекватная проверка email
const isEmailValid = computed(() =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailNormalized.value),
);

// показываем ошибку только если поле трогали
const showEmailError = computed(
  () => touchedEmail.value && !isEmailValid.value,
);

const onSubmit = () => {
  touchedEmail.value = true;

  if (!isEmailValid.value) return;
  router.push({ name: "checkEmail" });
};
</script>

<style scoped>
.card {
  display: flex;
  align-items: center;
  justify-content: center;
}

.input--error {
  border-color: #ef4444;
  box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.15);
}

.error {
  font-size: 12px;
  color: #ef4444;
  margin-top: 2px;
}
</style>
