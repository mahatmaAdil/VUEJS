<template>
  <div class="shell">
    <aside class="sidebar">
      <div class="brand">
        <div class="logo">SD</div>
        <div class="brand__text">
          <div class="brand__name">Smart Delivery</div>
          <div class="brand__sub">Admin panel</div>
        </div>
      </div>

      <nav class="nav">
        <RouterLink class="nav__item" to="/app" end>
          <span class="dot" aria-hidden="true"></span>
          Dashboard
        </RouterLink>

        <RouterLink class="nav__item" to="/app/profile">
          <span class="dot" aria-hidden="true"></span>
          Profile
        </RouterLink>
      </nav>

      <div class="sidebar__footer">
        <button class="logout" type="button" @click="logout">Log out</button>
      </div>
    </aside>

    <div class="main">
      <header class="topbar">
        <div class="topbar__title">{{ title }}</div>
        <div class="topbar__right">
          <div class="user">
            <div class="avatar">A</div>
            <div class="user__meta">
              <div class="user__name">Adil</div>
              <div class="user__role">User</div>
            </div>
          </div>
        </div>
      </header>

      <main class="content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { RouterLink, RouterView, useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const logout = () => {
  localStorage.removeItem("auth");
  router.push("/login");
};

const title = computed(() => route.meta?.title ?? "Dashboard");
</script>

<style scoped>
/* tokens (под фигму обычно быстро подгоняются) */
.shell {
  --bg: #f8fafc;
  --panel: #ffffff;
  --text: #0f172a;
  --muted: #64748b;
  --border: #e5e7eb;
  --primary: #2563eb;

  height: 100vh;
  display: flex;
  background: var(--bg);
  color: var(--text);
}

/* Sidebar */
.sidebar {
  width: 280px;
  background: var(--panel);
  border-right: 1px solid var(--border);
  padding: 22px 18px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.brand {
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 6px 8px;
}

.logo {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  font-weight: 900;
  color: #fff;
  background: var(--primary);
  box-shadow: 0 12px 24px rgba(37, 99, 235, 0.22);
}

.brand__name {
  font-weight: 900;
  letter-spacing: -0.02em;
}

.brand__sub {
  margin-top: 2px;
  font-size: 12px;
  color: var(--muted);
  font-weight: 700;
}

/* Nav */
.nav {
  display: grid;
  gap: 8px;
}

.nav__item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 12px;
  border-radius: 14px;
  text-decoration: none;
  color: var(--text);
  font-weight: 800;
  border: 1px solid transparent;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: #cbd5e1;
}

.nav__item:hover {
  background: #f1f5f9;
}

.nav__item.router-link-active {
  background: rgba(37, 99, 235, 0.08);
  border-color: rgba(37, 99, 235, 0.18);
  color: var(--primary);
}

.nav__item.router-link-active .dot {
  background: var(--primary);
}

/* Footer */
.sidebar__footer {
  margin-top: auto;
  padding: 8px;
}

.logout {
  width: 100%;
  height: 42px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: #fff;
  font-weight: 900;
  cursor: pointer;
}

.logout:hover {
  transform: translateY(1px);
}

/* Main */
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.topbar {
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 22px;
  background: var(--panel);
  border-bottom: 1px solid var(--border);
}

.topbar__title {
  font-size: 18px;
  font-weight: 900;
  letter-spacing: -0.02em;
}

.user {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar {
  width: 38px;
  height: 38px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: #0f172a;
  color: #fff;
  font-weight: 900;
}

.user__name {
  font-weight: 900;
  font-size: 13px;
}
.user__role {
  font-size: 12px;
  color: var(--muted);
  font-weight: 700;
  margin-top: 2px;
}

.content {
  padding: 22px;
  overflow: auto;
}
</style>
