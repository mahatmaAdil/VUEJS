<script setup>
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";

const router = useRouter();

const name = ref("");
const email = ref("");
const phoneCountry = ref("KH");
const phone = ref("+855 (555) 000-0000");
const occupation = ref("");

const occupations = ["Student", "Engineer", "Designer", "Manager", "Other"];

function onSubmit() {
  // TODO: валидация + API
  // пример перехода на следующий шаг регистрации:
  router.push("/signup/checkInbox");
}
</script>

<template>
  <section class="right">
    <div class="right__inner">
      <!-- круги на фоне -->
      <div class="rings" aria-hidden="true"></div>

      <div class="card">
        <!-- иконка -->
        <div class="badge" aria-hidden="true">
          <svg class="badge__icon" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
            />
            <path
              d="M4.5 20c1.7-3.2 4.3-5 7.5-5s5.8 1.8 7.5 5"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
            />
          </svg>
        </div>

        <h1 class="title">Your details</h1>
        <p class="subtitle">Welcome Ya! Please set your information.</p>

        <form class="form" @submit.prevent="onSubmit">
          <label class="field">
            <span class="label">Name*</span>
            <input
              v-model="name"
              class="input"
              type="text"
              placeholder="Enter your name"
              autocomplete="name"
            />
          </label>

          <label class="field">
            <span class="label">Email*</span>
            <input
              v-model="email"
              class="input"
              type="email"
              placeholder="Enter your email"
              autocomplete="email"
            />
          </label>

          <label class="field">
            <span class="label">Phone number*</span>

            <div class="phone">
              <select
                v-model="phoneCountry"
                class="phone__country"
                aria-label="Country"
              >
                <option value="KH">KH</option>
                <option value="KZ">KZ</option>
                <option value="RU">RU</option>
                <option value="US">US</option>
              </select>

              <svg
                class="phone__chev"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M7 10l5 5 5-5"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>

              <input
                v-model="phone"
                class="phone__input"
                type="tel"
                placeholder="+855 (555) 000-0000"
                autocomplete="tel"
              />
            </div>
          </label>

          <label class="field">
            <span class="label">Occupation*</span>

            <div class="selectWrap">
              <select v-model="occupation" class="select">
                <option value="" disabled>Select your occupation</option>
                <option v-for="o in occupations" :key="o" :value="o">
                  {{ o }}
                </option>
              </select>

              <svg
                class="selectChev"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M7 10l5 5 5-5"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </div>
          </label>

          <button class="btn" type="submit">Continue</button>

          <p class="bottom">
            Already have an account?
            <RouterLink class="link" to="/auth/login">Sign in</RouterLink>
          </p>
        </form>

        <div class="dots" aria-hidden="true">
          <span class="dot dot--active"></span>
          <span class="dot"></span>
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
  flex: 0 0 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  overflow: hidden;
  position: relative;
}

.right__inner {
  width: 100%;
  max-width: 560px;
  padding: 86px 56px;
  position: relative;
}

.rings {
  position: absolute;
  left: 50%;
  top: 12px;
  transform: translateX(-50%);
  width: 680px;
  height: 680px;
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
  backdrop-filter: blur(2px);
}

.badge__icon {
  width: 22px;
  height: 22px;
  color: rgba(15, 23, 42, 0.65);
}

.title {
  font-size: 40px;
  line-height: 1.15;
  margin: 0 0 10px;
  letter-spacing: -0.02em;
  color: #0f172a;
  font-weight: 700;
}

.subtitle {
  margin: 0 0 26px;
  color: rgba(15, 23, 42, 0.62);
  font-size: 14.5px;
}

.form {
  width: 360px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: left;
}

.label {
  font-size: 13px;
  color: rgba(15, 23, 42, 0.82);
  font-weight: 600;
}

.input {
  height: 44px;
  border-radius: 999px;
  border: 1px solid rgba(15, 23, 42, 0.18);
  padding: 0 18px;
  outline: none;
  font-size: 14px;
  color: #0f172a;
  background: #fff;
}

.input::placeholder {
  color: rgba(15, 23, 42, 0.45);
}

.input:focus {
  border-color: rgba(37, 99, 235, 0.55);
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.12);
}

/* Phone */
.phone {
  height: 44px;
  border-radius: 999px;
  border: 1px solid rgba(15, 23, 42, 0.18);
  display: flex;
  align-items: center;
  overflow: hidden;
  background: #fff;
}

.phone__country {
  appearance: none;
  border: 0;
  outline: 0;
  height: 100%;
  padding: 0 34px 0 16px;
  font-size: 14px;
  color: #0f172a;
  background: transparent;
  width: 72px;
  cursor: pointer;
}

.phone__chev {
  width: 18px;
  height: 18px;
  margin-left: -26px;
  color: rgba(15, 23, 42, 0.55);
  pointer-events: none;
}

.phone__input {
  border: 0;
  outline: 0;
  height: 100%;
  padding: 0 18px 0 10px;
  font-size: 14px;
  flex: 1;
  color: #0f172a;
  background: transparent;
}

.phone:focus-within {
  border-color: rgba(37, 99, 235, 0.55);
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.12);
}

/* Select */
.selectWrap {
  position: relative;
}

.select {
  width: 100%;
  height: 44px;
  border-radius: 999px;
  border: 1px solid rgba(15, 23, 42, 0.18);
  padding: 0 44px 0 18px;
  outline: none;
  font-size: 14px;
  color: #0f172a;
  background: #fff;
  appearance: none;
  cursor: pointer;
}

.select:focus {
  border-color: rgba(37, 99, 235, 0.55);
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.12);
}

.selectChev {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  color: rgba(15, 23, 42, 0.55);
  pointer-events: none;
}

.btn {
  height: 46px;
  border: 0;
  border-radius: 999px;
  background: #2563eb;
  color: #fff;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  margin-top: 8px;
}

.btn:active {
  transform: translateY(1px);
}

.bottom {
  margin: 6px 0 0;
  font-size: 13px;
  color: rgba(15, 23, 42, 0.62);
  text-align: center;
}

.link {
  color: #2563eb;
  text-decoration: none;
  font-weight: 600;
  margin-left: 6px;
}

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
