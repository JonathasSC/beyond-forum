<template>
  <main class="homeview-main">
    <h1 class="homeview-main__title">Administração do Site</h1>
    <table class="homeview-main__table">
      <caption class="homeview-main__table__caption">
        Registros e Tabelas
      </caption>
      <tbody class="homeview-main__table__body">
        <tr class="homeview-main__table__row">
          <th align="left" scope="row" class="homeview-main__table__data">
            <router-link class="homeview-main__table__data__link" to="/user">
              <span>Usuários</span>
            </router-link>
          </th>
          <td align="right" class="homeview-main__table__data">
            <div class="homeview-main__table__data__div">
              <span class="homeview-main__table__data__div__span">+</span>
              <router-link
                class="homeview-main__table__data__link"
                to="/newuser"
              >
                <span>Adicionar</span>
              </router-link>
            </div>
          </td>
        </tr>
        <tr class="homeview-main__table__row">
          <th align="left" scope="row" class="homeview-main__table__data">
            <router-link class="homeview-main__table__data__link" to="/post">
              <span>Publicações</span>
            </router-link>
          </th>
          <td align="right" class="homeview-main__table__data">
            <div class="homeview-main__table__data__div">
              <span class="homeview-main__table__data__div__span">+</span>
              <router-link
                class="homeview-main__table__data__link"
                to="/newpost"
              >
                <span>Adicionar</span>
              </router-link>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<script>
export default {
  name: "Home",
  components: {},
};
</script>

<style>
.homeview-main {
  padding: 3rem;
}

.homeview-main__title {
  font-size: 1.3rem;
  color: var(--color-white);
  margin-bottom: 1rem;
}

.homeview-main__table__caption {
  text-align: start;
  padding: 0.5rem;
  text-transform: uppercase;
  color: var(--color-white);
  background-color: var(--color-blue-100);
}

.homeview-main__table__row th,
.homeview-main__table__row td {
  padding: 0.5rem;
}

.homeview-main__table__row th {
  width: 100%;
}

.homeview-main__table__data__link {
  text-decoration: none;
}

.homeview-main__table__data__link span {
  color: var(--color-white);
}

.homeview-main__table__data__link:hover span {
  color: var(--color-blue-50);
}

.homeview-main__table__data__link:nth-child(odd) span {
  font-weight: bold;
}

.homeview-main__table__data__div {
  display: flex;
  gap: 0.5rem;
}

.homeview-main__table__row:nth-child(even) {
  background-color: var(--color-gray-100);
}

.homeview-main__table__data__div__span {
  color: var(--color-white);
}
</style>
