<script setup>
import { ref, computed } from "vue";
import { RouterLink, useRouter } from "vue-router";

const router = useRouter();

const name = ref("");
const email = ref("");
const phoneCountry = ref("KH");
const phone = ref("+855 (555) 000-0000");
const occupation = ref("");

const occupations = ["Student", "Engineer", "Designer", "Manager", "Other"];

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

function onSubmit() {
  touchedEmail.value = true;

  if (!isEmailValid.value) return;

  router.push({ name: "checkInbox", query: { email: emailNormalized.value } });
}
</script>

<template>
  <section class="right">
    <div class="right__inner">
      <div class="card">
        <!-- иконка -->
        <div class="icon" aria-hidden="true">👤</div>

        <h1 class="title">Your details</h1>
        <p class="subtitle">Welcome Ya! Please set your information.</p>

        <form class="form" @submit.prevent="onSubmit" novalidate>
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
              :class="{ 'input--error': showEmailError }"
              type="email"
              placeholder="Enter your email"
              autocomplete="email"
              @blur="touchedEmail = true"
            />
            <span v-if="showEmailError" class="error">
              Enter a valid email address
            </span>
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
  max-width: 360px;
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
