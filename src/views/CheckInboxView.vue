<script setup>
import { ref, computed, nextTick } from "vue";
import { RouterLink, useRouter } from "vue-router";

const router = useRouter();
// если хочешь — подтягивай email из query/store, пока захардкодил
const email = ref("olivia@proadvisor.com");

const digits = ref(["", "", "", ""]);
const inputs = ref([]); // refs инпутов

const code = computed(() => digits.value.join(""));

function focusIndex(i) {
  nextTick(() => inputs.value?.[i]?.focus?.());
}

function onInput(e, i) {
  const v = e.target.value.replace(/\D/g, "").slice(-1);
  digits.value[i] = v;

  if (v && i < 3) focusIndex(i + 1);
}

function onKeydown(e, i) {
  if (e.key === "Backspace") {
    if (digits.value[i]) {
      digits.value[i] = "";
      return;
    }
    if (i > 0) focusIndex(i - 1);
  }

  if (e.key === "ArrowLeft" && i > 0) focusIndex(i - 1);
  if (e.key === "ArrowRight" && i < 3) focusIndex(i + 1);
}

function onPaste(e) {
  const text = (e.clipboardData?.getData("text") ?? "")
    .replace(/\D/g, "")
    .slice(0, 4);
  if (!text) return;

  e.preventDefault();
  digits.value = text.split("").concat(["", "", "", ""]).slice(0, 4);
  focusIndex(Math.min(text.length, 3));
}

function verify() {
  // TODO: тут проверка кода через API
  // пример перехода на следующий шаг:
  router.push({ name: "property" });
  console.log("verify code:", code.value);
}

function resend() {
  // TODO: resend code API
  console.log("resend to:", email.value);
}
</script>

<template>
  <section class="right">
    <div class="right__inner">
      <div class="rings" aria-hidden="true"></div>

      <div class="card">
        <div class="badge" aria-hidden="true">
          <!-- mail icon -->
          <svg class="badge__icon" viewBox="0 0 24 24" fill="none">
            <path
              d="M4.5 7.5h15v9h-15v-9Z"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linejoin="round"
            />
            <path
              d="M5 8l7 6 7-6"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>

        <h1 class="title">Check your inbox</h1>

        <p class="subtitle">
          We sent a verification codes to<br />
          <span class="subtitle__email">{{ email }}</span>
        </p>

        <!-- Code input circles -->
        <div class="otp" @paste="onPaste">
          <input
            v-for="(_, i) in 4"
            :key="i"
            :ref="(el) => (inputs[i] = el)"
            class="otp__cell"
            inputmode="numeric"
            autocomplete="one-time-code"
            maxlength="1"
            :value="digits[i]"
            @input="(e) => onInput(e, i)"
            @keydown="(e) => onKeydown(e, i)"
            aria-label="Verification digit"
          />
        </div>

        <button
          class="btn"
          type="button"
          :disabled="code.length !== 4"
          @click="verify"
        >
          Verify email
        </button>

        <p class="hint">
          Didn’t receive the email?
          <button class="linkBtn" type="button" @click="resend">
            Click to resend
          </button>
        </p>

        <RouterLink class="back" to="/auth/login">
          <span class="back__icon" aria-hidden="true">←</span>
          Back to log in
        </RouterLink>

        <div class="dots" aria-hidden="true">
          <span class="dot"></span>
          <span class="dot dot--active"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.right {
  position: relative;
  width: 100%;
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: stretch;
  background: #fff;
  overflow: hidden;
}

.right__inner {
  width: 100%;
  max-width: 560px;
  padding: 88px 56px;
  position: relative;
}

/* rings background */
.rings {
  position: absolute;
  left: 50%;
  top: 0px;
  transform: translateX(-50%);
  width: 720px;
  height: 720px;
  border-radius: 50%;
  background: radial-gradient(
    circle at center,
    transparent 0 18%,
    rgba(15, 23, 42, 0.05) 18% 18.2%,
    transparent 18.2% 28%,
    rgba(15, 23, 42, 0.05) 28% 28.2%,
    transparent 28.2% 38%,
    rgba(15, 23, 42, 0.05) 38% 38.2%,
    transparent 38.2% 48%,
    rgba(15, 23, 42, 0.05) 48% 48.2%,
    transparent 48.2% 58%,
    rgba(15, 23, 42, 0.05) 58% 58.2%,
    transparent 58.2% 68%,
    rgba(15, 23, 42, 0.05) 68% 68.2%,
    transparent 68.2% 100%
  );
  pointer-events: none;
  opacity: 0.9;
}

.card {
  position: relative;
  z-index: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.badge {
  width: 56px;
  height: 56px;
  border-radius: 999px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
  background: rgba(255, 255, 255, 0.85);
}

.badge__icon {
  width: 22px;
  height: 22px;
  color: rgba(15, 23, 42, 0.65);
}

.title {
  margin: 0 0 10px;
  font-size: 40px;
  line-height: 1.15;
  letter-spacing: -0.02em;
  font-weight: 800;
  color: #0f172a;
}

.subtitle {
  margin: 0 0 26px;
  font-size: 14.5px;
  color: rgba(15, 23, 42, 0.62);
  line-height: 1.5;
}

.subtitle__email {
  color: rgba(15, 23, 42, 0.82);
  font-weight: 700;
}

/* OTP circles */
.otp {
  width: 360px;
  display: flex;
  justify-content: center;
  gap: 16px;
  margin: 18px 0 22px;
}

.otp__cell {
  width: 76px;
  height: 76px;
  border-radius: 999px;
  border: 1px solid rgba(15, 23, 42, 0.18);
  background: #fff;
  text-align: center;
  font-size: 44px;
  font-weight: 700;
  color: rgba(15, 23, 42, 0.35);
  outline: none;
  caret-color: rgba(37, 99, 235, 0.9);
}

.otp__cell:focus {
  border-color: rgba(37, 99, 235, 0.55);
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.12);
  color: rgba(15, 23, 42, 0.6);
}

/* button */
.btn {
  width: 360px;
  height: 46px;
  border: 0;
  border-radius: 999px;
  background: #2563eb;
  color: #fff;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
}

.btn:active {
  transform: translateY(1px);
}

.btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
  transform: none;
}

/* resend line */
.hint {
  margin: 18px 0 26px;
  font-size: 13px;
  color: rgba(15, 23, 42, 0.62);
}

.linkBtn {
  border: 0;
  background: transparent;
  padding: 0;
  margin-left: 6px;
  color: #2563eb;
  font-weight: 700;
  cursor: pointer;
}

.linkBtn:hover {
  text-decoration: underline;
}

/* back link */
.back {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: rgba(15, 23, 42, 0.7);
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  margin-top: 2px;
}

.back__icon {
  font-size: 18px;
  line-height: 1;
  transform: translateY(-1px);
}

/* dots */
.dots {
  margin-top: 56px;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.1);
}

.dot--active {
  background: #2563eb;
}
</style>
