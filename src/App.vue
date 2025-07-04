<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <div class="app-wrapper">
    <header class="app-header">
      <div class="container">
        <div class="logo">
          <img alt="Vue logo" src="./assets/logo.svg" width="50" height="50" />
          <span>Vue Form Generator</span>
        </div>
      </div>
    </header>

    <main class="app-main">
      <div class="container"><RouterView /></div>
    </main>

    <footer class="app-footer">
      <div class="container">
        <p>&copy; {{ new Date().getFullYear() }} Vue Form Generator</p>
      </div>
    </footer>
  </div>
</template>

<style lang="scss">
/* Глобальные стили */
:root {
  --primary-color: #4a90e2;
  --primary-dark: #3a7bc8;
  --text-color: #333;
  --text-light: #666;
  --bg-color: #f5f7fa;
  --border-color: #ddd;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: var(--text-color);
  background-color: var(--bg-color);
  line-height: 1.6;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

a {
  color: var(--primary-color);
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: var(--primary-dark);
  }
}

button {
  cursor: pointer;
}

/* Стили компонента App */
.app-header {
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 10px 0;
  position: sticky;
  top: 0;
  z-index: 100;

  .logo {
    display: flex;
    align-items: center;

    img {
      margin-right: 12px;
      transition: transform 0.3s ease;

      &:hover {
        transform: rotate(360deg);
      }
    }

    span {
      font-size: 1.3rem;
      font-weight: 600;
      color: var(--primary-color);
      letter-spacing: 0.5px;

      &:hover {
        text-shadow: 0 0 10px rgba(74, 144, 226, 0.3);
      }
    }
  }
}

.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-main {
  flex: 1;
  padding: 10px 0;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  .container {
    background-color: #fff;
    border-radius: 8px;
    padding: 10px;
  }
}

.app-footer {
  background-color: #fff;
  padding: 10px 0;
  text-align: center;
  border-top: 1px solid var(--border-color);
  font-size: 0.9rem;
  color: var(--text-light);
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
}

/* Адаптивность */
@media (max-width: 768px) {
  .app-header {
    padding: 10px 0;

    .logo span {
      font-size: 1.1rem;
    }
  }

  .app-main {
    padding: 10px 0;

    .container {
      padding: 10px;
    }
  }
}
</style>
