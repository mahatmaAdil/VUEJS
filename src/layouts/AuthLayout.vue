<template>
  <main class="auth" role="main">
    <section class="left" aria-label="Steps">
      <div class="left__inner">
        <div class="brand">
          <img class="brand__logo" src="/logo.png" alt="Logo" />
        </div>

        <div class="steps">
          <div class="step" :class="{ 'step--active': activeStep === 0 }">
            <div class="step__icon">👤</div>
            <div>
              <div class="step__title">Your details</div>
              <div class="step__sub">Please provide your name and email.</div>
            </div>
          </div>

          <div class="step" :class="{ 'step--active': activeStep === 1 }">
            <div class="step__icon">✉️</div>
            <div>
              <div class="step__title">Check your email</div>
              <div class="step__sub">
                Please check your email to get reset link.
              </div>
            </div>
          </div>

          <div class="step" :class="{ 'step--active': activeStep === 2 }">
            <div class="step__icon">🔒</div>
            <div>
              <div class="step__title">Choose a password</div>
              <div class="step__sub">Choose a secure password.</div>
            </div>
          </div>

          <div class="step" :class="{ 'step--active': activeStep === 3 }">
            <div class="step__icon">✅</div>
            <div>
              <div class="step__title">Successfully</div>
              <div class="step__sub">Go back to log in into your account.</div>
            </div>
          </div>
        </div>

        <footer class="copy">© Smart Delivery 2023</footer>
      </div>
    </section>

    <Transition name="fade" mode="out-in">
      <component :is="currentView" />
    </Transition>
  </main>
</template>

<script setup>
import { computed, markRaw } from "vue";
import { useRoute } from "vue-router";

import ForgotPasswordView from "../views/ForgotPasswordView.vue";
import CheckEmailView from "../views/CheckEmailView.vue";
import NewPasswordView from "../views/NewPasswordView.vue";
import SuccessView from "../views/SuccessView.vue";

const route = useRoute();
const activeStep = computed(() => {
  const map = {
    forgot: 0,
    checkEmail: 1,
    newPassword: 2,
    success: 3,
  };

  // если вдруг на лейаут попал неизвестный роут
  return map[route.name] ?? 0;
});

const viewsMap = {
  forgot: markRaw(ForgotPasswordView),
  checkEmail: markRaw(CheckEmailView),
  newPassword: markRaw(NewPasswordView),
  success: markRaw(SuccessView),
};

const currentView = computed(() => viewsMap[route.name]);
</script>

<style scoped>
.auth .right {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px;
  background: #fff;
}

.auth .right > * {
  width: 100%;
  max-width: 520px;
}

.steps {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.step {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  opacity: 0.45;
}
.step--active {
  opacity: 1;
}
.step__icon {
  width: 32px;
  height: 32px;
  border-radius: 999px;
  border: 1px solid #e5e7eb;
  display: grid;
  place-items: center;
  color: #2563eb;
}
.step--active .step__icon {
  background: rgba(37, 99, 235, 0.1);
  border-color: rgba(37, 99, 235, 0.4);
}
.step__title {
  font-weight: 700;
  font-size: 14px;
  color: #111827;
}
.step__sub {
  margin-top: 4px;
  font-size: 13px;
  color: #9ca3af;
}
</style>
