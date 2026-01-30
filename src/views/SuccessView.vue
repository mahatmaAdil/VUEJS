<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

function goLogin() {
  router.replace("/login");
}
</script>

<template>
  <section class="auth-right">
    <div class="auth-card">
      <div class="icon" aria-hidden="true">✔️</div>

      <h1 class="auth-title">Successfully</h1>
      <p class="auth-subtitle">
        Your password has been successfully reset.<br />
        Click below to log in magically.
      </p>
      <button type="button" class="auth-submit" @click="goLogin">
        Continue
      </button>
      <button type="button" class="auth-back" @click="goLogin">
        <span class="backIcon" aria-hidden="true">←</span>
        Back to log in
      </button>

      <div class="auth-dots" aria-hidden="true">
        <span></span><span></span><span></span><span class="active"></span>
      </div>
    </div>
  </section>
</template>

<style scoped>
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
  font-size: 44px;
  line-height: 1.1;
  font-weight: 800;
  color: rgba(15, 23, 42, 0.95);
  text-align: center;
}

.auth-subtitle {
  margin: 0 0 26px;
  font-size: 14px;
  line-height: 1.5;
  color: rgba(100, 116, 139, 1);
  text-align: center;
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

.auth-back {
  margin: 16px auto 0;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  border: none;
  background: transparent;
  color: rgba(71, 85, 105, 1);
  cursor: pointer;
  font-weight: 600;
}

.backIcon {
  font-size: 18px;
  line-height: 1;
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
