<template>
  <section class="right">
    <div class="right__inner">
      <div class="rings" aria-hidden="true"></div>

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

              <button class="btn btn--primary" type="submit">
                Reset password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
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
  router.push({ name: "checkEmail", query: { email: emailNormalized.value } });
};
</script>

<style scoped>
template {
  display: flex;
}
.card {
  display: flex;
  align-items: center;
}

.forgot {
  flex: 1;
  cursor: default;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-top: 120px;
}
.forgot__card {
  width: 100%;
  max-width: 420px;
}

.forgot__title {
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 12px;
}

.forgot__sub {
  font-size: 15px;
  color: #6b7280;
  margin-bottom: 28px;
}
</style>
