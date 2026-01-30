<script setup>
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";

const router = useRouter();

const dob = ref("");
const country = ref("");
const address = ref("");
const zip = ref("");

function onSubmit() {
  // TODO: validation + api
  router.push({ name: "setPassword" });
}
</script>

<template>
  <section class="right">
    <div class="right__inner">
      <div class="rings" aria-hidden="true"></div>

      <div class="card">
        <div class="badge" aria-hidden="true">
          <!-- map icon -->
          <svg class="badge__icon" viewBox="0 0 24 24" fill="none">
            <path
              d="M10 6l4-2 6 3v13l-6-3-4 2-6-3V3l6 3Z"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linejoin="round"
            />
            <path
              d="M10 6v13M14 4v13"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
            />
          </svg>
        </div>

        <h1 class="title">Your property</h1>
        <p class="subtitle">
          Tell us about your property and provide the<br />
          necessary details to get started
        </p>

        <form class="form" @submit.prevent="onSubmit">
          <label class="field">
            <span class="label">Date of Birth*</span>
            <div class="selectWrap">
              <select v-model="dob" class="select">
                <option value="" disabled>Select your date of birth</option>
                <option value="2000-01-01">01/01/2000</option>
                <option value="1999-01-01">01/01/1999</option>
                <option value="1998-01-01">01/01/1998</option>
              </select>
              <svg
                class="chev"
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

          <label class="field">
            <span class="label">Country*</span>
            <div class="selectWrap">
              <select v-model="country" class="select">
                <option value="" disabled>Select your country</option>
                <option value="KZ">Kazakhstan</option>
                <option value="KH">Cambodia</option>
                <option value="RU">Russia</option>
                <option value="US">United States</option>
              </select>
              <svg
                class="chev"
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

          <label class="field">
            <span class="label">Address*</span>
            <input
              v-model="address"
              class="input"
              type="text"
              placeholder="Enter your address"
              autocomplete="street-address"
            />
          </label>

          <label class="field">
            <span class="label">Zip / Post code*</span>
            <input
              v-model="zip"
              class="input"
              type="text"
              placeholder="Enter your zip/post code"
              autocomplete="postal-code"
            />
          </label>

          <button class="btn" type="submit">Continue</button>

          <p class="bottom">
            Already have an account?
            <RouterLink class="link" to="/auth/login">Sign in</RouterLink>
          </p>
        </form>

        <div class="dots" aria-hidden="true">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot dot--active"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* rings background */
.rings {
  position: absolute;
  left: 50%;
  top: 0px;
  transform: translateX(-50%);
  width: 720px;
  height: 720px;
  border-radius: 50%;
  background: radial-gradient(circle at center);
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

.form {
  width: 360px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 6px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: left;
}

/* select */
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

.chev {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  color: rgba(15, 23, 42, 0.55);
  pointer-events: none;
}

/* button */

.btn:active {
  transform: translateY(1px);
}

/* bottom link */

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
