<template>
  <main class="auth" role="main">
    <!-- LEFT — ОДИНАКОВАЯ ЧАСТЬ -->
    <section class="left" aria-label="Steps">
      <div class="left__inner">
        <div class="brand">
          <img class="brand__logo" :src="logo" alt="Logo" />
        </div>

        <!-- steps (статичны) -->
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
              <div class="step__sub">Please check your email to get reset link.</div>
            </div>
          </div>

          <div class="step" :class="{ 'step--active': activeStep === 2 }">
            <div class="step__icon">🔒</div>
            <div>
              <div class="step__title">Choose a password</div>
              <div class="step__sub">Choose a secure password.</div>
            </div>
          </div>

          <div class="step" :class="{ 'step--active': activeStep === 3}" >
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

    <!-- RIGHT — МЕНЯЕТСЯ -->
    <section class="right">
      <RouterView />
    </section>
  </main>
</template>

<script setup>
import { RouterView } from "vue-router";
import logo from "../assets/images/logo.png";
import { computed } from "vue";
import { useRoute } from "vue-router";
const activeStep = computed(() => {
    if (route.path === "/forgot/success") return 3;
  if (route.path.startsWith("/forgot/new-password")) return 2;
  if (route.path.startsWith("/forgot/check-email")) return 1;
  return 0;
});



const route = useRoute();

</script>

<style scoped>
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
  background: rgba(37,99,235,.1);
  border-color: rgba(37,99,235,.4);
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
