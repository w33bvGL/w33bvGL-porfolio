<script setup lang="ts">


const contacts = [
  { icon: "lucide:mail", text: "w33bv.gl@gmail.com" },
  { icon: "lucide:map-pin", text: "Армения, Ереван" },
];
</script>

<template>
  <footer class="portfolio-footer">
    <div class="container container-auto">
      <div class="footer-content">
        <div class="footer-left">
          <h3 class="logo">vahe.dev</h3>
          <p class="description">
            Full-Stack Developer from Armenia, crafting modern web applications with a passion for detail.
          </p>
        </div>

        <div class="footer-right">
          <h4 class="contact-title">Связаться со мной</h4>
          <ul class="contact-list">
            <li v-for="(contact, index) in contacts" :key="index">
              <Icon :name="contact.icon" size="18" class="icon" />
              {{ contact.text }}
            </li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p>© {{ new Date().getFullYear() }} vahe.dev. Все права защищены.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.portfolio-footer {
  color: #f1f1f1;
  padding: 3rem 0;
  font-family: 'Inter', sans-serif;

  .footer-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 2rem;
    border-bottom: 1px solid #333;
    padding-bottom: 2rem;
  }

  .footer-left {
    flex: 1;

    .description {
      max-width: 40dvw;
      margin: 1dvw 0;
      line-height: 1.6;
      color: var(--color-neutral-500);
    }

    .social-links {
      display: flex;
      gap: 1rem;

      a {
        color: #ccc;
        transition: color 0.3s;

        &:hover {
          color: #00bfa5;
        }

        .nuxt-icon {
          vertical-align: middle;
        }
      }
    }
  }

  .footer-right {
    .contact-title {
      margin-bottom: 0.5dvw;
    }

    .contact-list {
      list-style: none;
      padding: 0;

      li {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
        font-size: 1.3dvw;
        color: #ccc;

        .icon {
          vertical-align: middle;
          width: 1.3dvw;
          height: 1.3dvw;
        }
      }
    }
  }

  .footer-bottom {
    margin-top: 2rem;
    font-size: 0.9rem;
    color: #888;
  }
}
</style>
