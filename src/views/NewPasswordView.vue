<template>
  <section class="auth-right">
    <div class="auth-card">
      <div class="icon" aria-hidden="true">🗨️</div>

      <h1 class="auth-title">Set new password</h1>
      <p class="auth-subtitle">
        Your new password must be different to<br />
        previously used passwords.
      </p>

      <form class="auth-form" @submit.prevent="onSubmit">
        <div v-for="f in fields" :key="f.key" class="field">
          <label class="label" :for="f.key">{{ f.label }}</label>

          <div class="inputWrap">
            <input
              :id="f.key"
              v-model="form[f.model]"
              class="input"
              :type="show[f.key] ? 'text' : 'password'"
              :autocomplete="f.autocomplete"
              :placeholder="f.placeholder"
            />

            <button
              v-if="f.key === 'password' || f.key === 'confirmPassword'"
              type="button"
              class="eyeBtn"
              :aria-label="show[f.key] ? 'Hide password' : 'Show password'"
              @click="toggleShow(f.key)"
            >
              <img
                class="eyeIcon"
                :src="show[f.key] ? '/openedEye.png' : '/closedEye.png'"
                alt=""
                aria-hidden="true"
              />
            </button>
          </div>

          <!-- уникальная ошибка только для confirm -->
          <p
            v-if="
              f.key === 'confirmPassword' &&
              touched &&
              form.confirmPassword &&
              !passwordsMatch
            "
            class="error"
          >
            Passwords do not match
          </p>
        </div>

        <ul class="password-rules">
          <li class="rule" :class="{ active: hasMinLen }">
            <span class="ruleIcon" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20 6L9 17l-5-5"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            Must be at least 8 characters
          </li>

          <li class="rule" :class="{ active: hasSpecial }">
            <span class="ruleIcon" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20 6L9 17l-5-5"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            Must contain one special character
          </li>
        </ul>

        <button class="auth-submit" type="submit" :disabled="isSubmitting">
          {{ isSubmitting ? "..." : "Reset password" }}
        </button>

        <button class="auth-back" type="button" @click="goLogin">
          <span class="backIcon" aria-hidden="true">←</span>
          Back to log in
        </button>
      </form>

      <div class="auth-dots" aria-hidden="true">
        <span></span><span></span><span class="active"></span><span></span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const show = reactive({
  password: false,
  confirmPassword: false,
});

function toggleShow(key) {
  show[key] = !show[key];
}

const form = reactive({
  password: "",
  confirmPassword: "",
});

const fields = [
  {
    key: "password",
    model: "password",
    label: "Password",
    type: "password",
    autocomplete: "new-password",
    placeholder: "Enter password",
  },
  {
    key: "confirmPassword",
    model: "confirmPassword",
    label: "Confirm password",
    type: "password",
    autocomplete: "new-password",
    placeholder: "Confirm password",
  },
];

const goLogin = () => router.push({ name: "login" });

const touched = ref(false); // чтобы не орать ошибкой сразу
const isSubmitting = ref(false);

const p = computed(() => form.password.trim());
const c = computed(() => form.confirmPassword.trim());

const passwordsMatch = computed(
  () => p.value && c.value && p.value === c.value,
);

const hasMinLen = computed(() => form.password.length >= 8);
const hasSpecial = computed(() => /[^A-Za-z0-9]/.test(form.password));

const isFormValid = computed(
  () => hasMinLen.value && hasSpecial.value && passwordsMatch.value,
);

async function onSubmit() {
  touched.value = true;

  console.log("submit", {
    valid: isFormValid.value,
    minLen: hasMinLen.value,
    special: hasSpecial.value,
    match: passwordsMatch.value,
    p: form.password,
    c: form.confirmPassword,
  });

  if (!isFormValid.value) return;

  isSubmitting.value = true;
  try {
    // ✅ правильный переход

    await router.replace({ name: "authSuccess" });
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<style scoped>
.eyeIcon {
  width: 20px;
  height: 20px;
  display: block;
}
.inputWrap {
  position: relative;
}

.input {
  padding-right: 44px; /* место под глазик */
}

.eyeBtn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  border: 0;
  background: transparent;
  cursor: pointer;
  padding: 6px;
  line-height: 1;
  color: inherit;
}

.auth-right {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  padding: 40px 24px;
}

.auth-card {
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.auth-icon {
  display: grid;
  place-items: center;
}

.auth-iconCircle {
  width: 44px;
  height: 44px;
  border-radius: 999px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  display: grid;
  place-items: center;
  color: rgba(15, 23, 42, 0.9);
}

.auth-title {
  margin: 16px 0 8px;
  font-size: 36px;
  line-height: 1.2;
  font-weight: 700;
  color: rgba(15, 23, 42, 0.95);
  text-align: center;
}

.auth-subtitle {
  margin: 0 0 28px;
  font-size: 14px;
  line-height: 1.5;
  color: rgba(100, 116, 139, 1);
  text-align: center;
}

.auth-form {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.field {
  margin-bottom: 16px;
}

.password-rules {
  margin: 2px 0 18px;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 13px;
  color: rgba(100, 116, 139, 1);
}

.rule {
  display: flex;
  align-items: center;
  gap: 10px;
}

.ruleIcon {
  width: 18px;
  height: 18px;
  border-radius: 999px;
  border: 1px solid rgba(203, 213, 225, 1);
  display: grid;
  place-items: center;
  color: transparent;
}

.rule.active {
  color: rgba(15, 23, 42, 0.9);
}

.rule.active .ruleIcon {
  border-color: rgba(47, 109, 246, 0.45);
  color: rgba(47, 109, 246, 1);
}

.auth-submit {
  width: 100%;
  height: 52px;
  border-radius: 999px;
  border: none;
  background: rgba(47, 109, 246, 1);
  color: #fff;
  font-weight: 700;
  cursor: pointer;
}

.auth-submit:active {
  transform: translateY(1px);
}

.auth-submit:disabled {
  opacity: 0.55;
  cursor: not-allowed;
  transform: none;
}

.auth-dots {
  margin-top: 40px;
  display: flex;
  gap: 10px;
  justify-content: center;
}

.auth-dots span {
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: rgba(226, 232, 240, 1);
}

.auth-dots .active {
  background: rgba(47, 109, 246, 1);
}
</style>

<!-- <style scoped>
/* такой же центрированный стиль, как в CheckEmail */
.np{
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-top: 110px;
}

.np__icon{
  width: 56px;
  height: 56px;
  border-radius: 999px;
  border: 1px solid #e5e7eb;
  display: grid;
  place-items: center;
  margin-bottom: 24px;
}

.np__title{
  font-size: 32px;
  font-weight: 800;
  margin: 0 0 10px;
  letter-spacing: -0.02em;
}

.np__sub{
  font-size: 15px;
  color: #6b7280;
  margin: 0 0 26px;
  max-width: 420px;
}

.np__form{
  width: 380px;
  max-width: calc(100% - 32px);
  text-align: left;
}

.field{ display:block; margin: 0 0 16px; }
.label{
  display:block;
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 800;
  color:#374151;
}

.input{
  width: 100%;
  height: 46px;
  border-radius: 999px;
  border: 1px solid #e5e7eb;
  padding: 0 18px;
  font-size: 14px;
  outline:none;
}
.input:focus{
  border-color: rgba(37,99,235,.55);
  box-shadow: 0 0 0 4px rgba(37,99,235,.10);
}

.rules{
  list-style: none;
  padding: 0;
  margin: 6px 0 18px;
  display: grid;
  gap: 10px;
  color: #6b7280;
  font-size: 13px;
}
.rules li{
  display: flex;
  align-items: center;
  gap: 10px;
}
.rules li::before{
  content: "○";
  width: 18px;
  display: inline-block;
  color: #cbd5e1;
  font-weight: 900;
}
.rules li.ok::before{
  content: "✓";
  color: #2563eb;
}

.btn{
  width: 100%;
  height: 48px;
  border-radius: 999px;
  border: 1px solid transparent;
  font-size: 14px;
  font-weight: 900;
  cursor:pointer;
}
.btn--primary{
  background:#2563eb;
  color:#fff;
  box-shadow: 0 18px 32px rgba(37,99,235,.22);
}
.btn--primary:disabled{
  opacity: .5;
  cursor: not-allowed;
  box-shadow: none;
}

.back{
  margin-top: 18px;
  background:none;
  border:none;
  font-weight:700;
  color:#374151;
  cursor:pointer;
}

.dots{
  margin-top: 44px;
  display:flex;
  gap:8px;
}
.dots span{
  width:6px;
  height:6px;
  border-radius:999px;
  background:#e5e7eb;
}
.dots .active{ background:#2563eb; }
</style> -->
