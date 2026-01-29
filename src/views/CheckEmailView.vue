<template>
  <div class="check">
    <div class="check__icon">✉️</div>

    <h1 class="check__title">Check your email</h1>

    <p class="check__sub">
      We sent a password reset link to
      <strong>{{ email }}</strong>
    </p>

    <button class="btn btn--primary" type="button" @click="goNext">
      Open email app
    </button>

    <p class="check__hint">
      Didn’t receive the email?
      <button class="link" @click="resend">Click to resend</button>
    </p>

    <button class="back" @click="goLogin">← Back to log in</button>

    <div class="dots">
      <span></span>
      <span class="active"></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const email = "olivia@smartdelivery.com";

const goLogin = () => router.push("/login");
const resend = () => console.log("resend");
const goNext = () => router.push({ name: "newPassword" });
</script>

<style scoped>
.check {
  cursor: default;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-top: 120px;
}

.check__icon {
  width: 56px;
  height: 56px;
  border-radius: 999px;
  border: 1px solid #e5e7eb;
  display: grid;
  place-items: center;
  margin-bottom: 24px;
}

.check__title {
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 12px;
}

.check__sub {
  font-size: 15px;
  color: #6b7280;
  margin-bottom: 28px;
}

.btn {
  width: 320px;
  height: 48px;
  border-radius: 999px;
  background: #2563eb;
  color: #fff;
  font-weight: 700;
  border: none;
  margin-bottom: 18px;
}

.check__hint {
  font-size: 14px;
  color: #6b7280;
}

.link {
  background: none;
  border: none;
  color: #2563eb;
  font-weight: 700;
  cursor: pointer;
}

.back {
  margin-top: 22px;
  background: none;
  border: none;
  font-weight: 700;
  color: #374151;
  cursor: pointer;
}

.dots {
  margin-top: 40px;
  display: flex;
  gap: 8px;
}

.dots span {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: #e5e7eb;
}

.dots .active {
  background: #2563eb;
}
</style>
