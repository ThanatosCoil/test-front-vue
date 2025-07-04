<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="home">
    <h1>Генератор форм на Vue 3 + TypeScript</h1>
    <p class="description">
      Демонстрация работы компонента-генератора форм с поддержкой различных
      типов полей, кастомизации через слоты и двустороннего связывания данных.
    </p>

    <div class="demo-links">
      <h2>Демонстрационные формы:</h2>
      <ul>
        <li>
          <RouterLink to="/contact-form">Контактная форма</RouterLink>
          <span class="description"
            >Простая форма обратной связи с текстовыми полями и textarea</span
          >
        </li>
        <li>
          <RouterLink to="/survey-form">Форма опроса</RouterLink>
          <span class="description"
            >Форма с различными типами полей, включая select и checkbox</span
          >
        </li>
        <li>
          <RouterLink to="/registration-form">Регистрационная форма</RouterLink>
          <span class="description"
            >Форма с кастомизированными полями через слоты</span
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px 20px;

  h1 {
    font-size: 2.2rem;
    color: #333;
    margin-bottom: 20px;
    font-weight: 600;
    position: relative;

    &:after {
      content: "";
      position: absolute;
      left: 0;
      bottom: -10px;
      width: 60px;
      height: 4px;
      background-color: var(--primary-color);
      border-radius: 2px;
    }
  }

  .description {
    font-size: 1.1rem;
    color: #666;
    line-height: 1.6;
    margin-bottom: 40px;
    max-width: 700px;
  }

  .demo-links {
    background-color: #f9f9f9;
    border-radius: 12px;
    padding: 30px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

    h2 {
      font-size: 1.5rem;
      margin-bottom: 25px;
      color: #333;
      font-weight: 600;
      position: relative;
      padding-left: 15px;

      &:before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 4px;
        background-color: var(--primary-color);
        border-radius: 2px;
      }
    }

    ul {
      list-style: none;
      padding: 0;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;

      li {
        margin-bottom: 0;
        padding: 0;
        background-color: white;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        transition: all 0.3s ease;
        overflow: hidden;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(74, 144, 226, 0.15);
        }

        a {
          display: block;
          font-size: 1.2rem;
          color: var(--primary-color);
          text-decoration: none;
          padding: 20px 20px 5px 20px;
          font-weight: 500;
          position: relative;

          &:hover {
            color: darken(#4a90e2, 10%);
          }

          &:after {
            content: "→";
            position: absolute;
            right: 20px;
            top: 20px;
            opacity: 0;
            transform: translateX(-10px);
            transition: all 0.3s ease;
          }

          &:hover:after {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .description {
          display: block;
          font-size: 0.9rem;
          color: #777;
          margin: 0;
          padding: 0 20px 20px 20px;
          line-height: 1.5;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .home {
    padding: 20px;

    h1 {
      font-size: 1.8rem;
    }

    .demo-links ul {
      grid-template-columns: 1fr;
    }
  }
}
</style>

}
