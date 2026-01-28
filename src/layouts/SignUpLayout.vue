<template>
  <div class="auth">
    <!-- LEFT -->
    <aside class="left">
      <div class="left__inner">
        <!-- Logo -->
        <div class="brand">
          <img src="/logo.png" alt="logo" class="brand__logo" />
        </div>

        <!-- Steps -->
        <div class="steps">
          <div
            class="step"
            :class="{
              'step--active': activeStep === 0,
              'step--done': activeStep > 0,
            }"
          >
            <div class="step__dot"></div>
            <div class="step__content">
              <p class="step__title">Your details</p>
              <p class="step__subtitle">
                Please provide your details information.
              </p>
            </div>
          </div>

          <div
            class="step"
            :class="{
              'step--active': activeStep === 1,
              'step--done': activeStep > 1,
            }"
          >
            <div class="step__dot"></div>
            <div class="step__content">
              <p class="step__title">Check your inbox</p>
              <p class="step__subtitle">
                Verify codes delivered to your inbox.
              </p>
            </div>
          </div>

          <div
            class="step"
            :class="{
              'step--active': activeStep === 2,
              'step--done': activeStep > 2,
            }"
          >
            <div class="step__dot"></div>
            <div class="step__content">
              <p class="step__title">Your property</p>
              <p class="step__subtitle">
                Please provide your currently address.
              </p>
            </div>
          </div>

          <div
            class="step"
            :class="{
              'step--active': activeStep === 3,
              'step--done': activeStep > 3,
            }"
          >
            <div class="step__dot"></div>
            <div class="step__content">
              <p class="step__title">Choose a password</p>
              <p class="step__subtitle">Choose a secure password.</p>
            </div>
          </div>

          <div
            class="step"
            :class="{
              'step--active': activeStep === 4,
            }"
          >
            <div class="step__dot"></div>
            <div class="step__content">
              <p class="step__title">Successfully</p>
              <p class="step__subtitle">Go back to login into your account.</p>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="left__footer">
          <span class="footer__text">© Smart Delivery 2023</span>
          <span class="footer__text">help@deliveryv.com</span>
        </div>
      </div>
    </aside>

    <!-- RIGHT -->
    <main class="right">
      <Transition name="fade" mode="out-in">
        <router-view />
      </Transition>
    </main>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const activeStep = computed(() => {
  const map = {
    registration: 0,
    checkInbox: 1,
    property: 2,
    setPassword: 3,
    signUpSuccess: 4,
  };

  return map[route.name] ?? 0;
});
</script>

<style scoped>
/* ===== Layout shell ===== */
.auth {
  width: 100%;
  height: 100vh;
  display: flex;
  overflow: hidden;
  background: #fff;
}

.left,
.right {
  flex: 0 0 50%;
}

/* ===== LEFT ===== */
.left {
  position: relative;
  background: #fff;
  border-right: 1px solid rgba(15, 23, 42, 0.06);
}

.left__inner {
  height: 100%;
  max-width: 520px;
  margin: 0 auto;
  padding: 88px 84px 36px;
  display: flex;
  flex-direction: column;
}

/* logo */
.brand {
  display: flex;
  align-items: center;
  margin-bottom: 54px;
}

.brand__logo {
  width: 44px;
  height: 44px;
  object-fit: contain;
}

/* steps */
.steps {
  display: flex;
  flex-direction: column;
  gap: 26px;
}

.step {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.step__dot {
  width: 40px;
  height: 40px;
  border-radius: 999px;
  border: 2px solid rgba(15, 23, 42, 0.12);
  background: #fff;
  flex: 0 0 40px;
  position: relative;
}

.step__content {
  padding-top: 2px;
}

.step__title {
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  color: rgba(15, 23, 42, 0.45);
  letter-spacing: -0.01em;
}

.step__subtitle {
  margin: 4px 0 0;
  font-size: 13px;
  line-height: 1.35;
  color: rgba(15, 23, 42, 0.38);
  max-width: 270px;
}

/* Active step */
.step--active .step__dot {
  border-color: rgba(37, 99, 235, 0.35);
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
}

.step--active .step__title {
  color: rgba(15, 23, 42, 0.92);
}

.step--active .step__subtitle {
  color: rgba(15, 23, 42, 0.55);
}

/* Done step */
.step--done .step__dot {
  background: rgba(15, 23, 42, 0.02);
  border-color: rgba(15, 23, 42, 0.12);
}

.step--done .step__title {
  color: rgba(15, 23, 42, 0.7);
}

/* footer */
.left__footer {
  margin-top: auto;
  padding-top: 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.footer__text {
  font-size: 13px;
  color: rgba(15, 23, 42, 0.42);
  white-space: nowrap;
}

/* ===== RIGHT ===== */
.right {
  position: relative;
  background: #fff;
  overflow: hidden;
  display: flex;
  align-items: stretch;
}

/* ===== Transition fade (для <Transition name="fade">) ===== */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.18s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ===== Responsive ===== */
@media (max-width: 980px) {
  .left {
    display: none;
  }
  .right {
    flex: 1 1 auto;
  }

  /* если внутри страниц есть right__inner — центрируем красиво */
  .right :deep(.right__inner) {
    padding: 72px 24px;
    max-width: 560px;
    margin: 0 auto;
  }
}
</style>
