<template>
  <main class="auth" role="main">
    <!-- LEFT -->
    <section class="left" aria-label="Login form">
      <div class="left__inner">
        <div class="brand">
          <img class="brand__logo" :src="logo" alt="Logo" />
        </div>

        <h1 class="h1">Log in to your account</h1>
        <p class="sub">
          The login page prioritizes user security offering a seamless
          experience that ensures quick and convenient access to the system's
          array of benefits.
        </p>

        <form class="form" @submit.prevent="onSubmit">
          <label class="field">
            <span class="label">Email</span>
            <input
              v-model="email"
              type="email"
              class="input"
              placeholder="Enter your email"
              autocomplete="email"
              :class="{ 'input--error': touchedEmail && !isEmailValid }"
              @blur="touchedEmail = true"
            />
          </label>

          <label class="field">
            <span class="label">Password</span>
            <input
              class="input"
              type="password"
              placeholder="Enter your password"
            />
          </label>

          <div class="row">
            <label class="check">
              <input class="check__input" type="checkbox" />
              <span class="check__dot" aria-hidden="true"></span>
              <span class="check__text">Remember me</span>
            </label>

            <RouterLink class="link" to="/forgot">Forgot password</RouterLink>
          </div>

          <button class="btn btn--primary" type="submit">Sign in</button>

          <button class="btn btn--ghost" type="button">
            <img class="g" :src="googleIcon" alt="" />
            <span>Sign in with Google</span>
          </button>

          <p class="bottom">
            Don't have an account?
            <a class="link" href="#">Sign up</a>
          </p>
        </form>

        <footer class="copy">© Smart Delivery 2023</footer>
      </div>
    </section>

    <!-- RIGHT -->
    <section class="right" aria-label="Promo">
      <div class="hero">
        <img class="hero__img" :src="heroImg" alt="" />

        <div class="overlay">
          <div class="overlay__inner">
            <p class="quote">
              "Elevating access for modern needs - introducing Smart Lockers,
              where convenience meets security."
            </p>

            <div class="meta">
              <div class="who">
                <div class="name">Tanaka Hiroshi</div>
                <div class="role">Product Manager, Phnom Penh</div>
                <div class="org">Web Design Agency</div>
              </div>

              <div class="stars" aria-label="Rating 5 out of 5">
                <span>★</span><span>★</span><span>★</span><span>★</span
                ><span>★</span>
              </div>
            </div>

            <div class="nav" aria-hidden="true">
              <button class="circle" type="button">!</button>
              <button class="circle" type="button">></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
// import { RouterLink } from "vue-router";

// 1) положи картинки в src/assets/images/ (см. ниже)
import logo from "../assets/images/logo.png";
import googleIcon from "../assets/images/search.png";
import heroImg from "../assets/images/hero.png";
import { ref, computed } from "vue";
import { useRouter, RouterLink } from "vue-router";

const router = useRouter();

// const onSubmit = () => {
//   localStorage.setItem("auth", "true");
//   router.push("/app");
// };

const email = ref("");
const password = ref("");

const touchedEmail = ref(false);
const touchedPassword = ref(false);
const isSubmitting = ref(false);

// нормализуем email
const emailNormalized = computed(() => email.value.trim().toLowerCase());

// базовая и адекватная проверка email
const isEmailValid = computed(() =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailNormalized.value),
);

function onSubmit() {
  touchedEmail.value = true;
  touchedPassword.value = true;

  if (!isEmailValid.value || !password.value) return;

  isSubmitting.value = true;

  // тут позже будет реальный логин
  setTimeout(() => {
    router.replace("/app");
    isSubmitting.value = false;
  }, 600);
}
</script>
