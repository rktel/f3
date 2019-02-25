<template>
  <section class="contenedor">
    <div class="itemOne">
      <v-toolbar flat class="pt-0 transparent" dense dark>
        <v-text-field label="Buscar usuario" prepend-icon="search" single-line></v-text-field>
      </v-toolbar>

      <div v-bar class="vuebar-element" :style="{height: heightList+'px' }">
        <v-list class="pt-0 transparent" dense dark>
          <v-divider></v-divider>

          <v-list-tile v-for="item in items" :key="item.index" @click>
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </div>
    </div>
    <div class="itemTwo">
        <h1>USER PROFILE</h1>
    </div>
  </section>
</template>

<script>
export default {
  name: "Users",
  computed: {
    heightList() {
      const { width, height } = this.$store.getters.appSize;
      if (width < 900) {
        //console.log(parseInt(height / 2));
        return parseInt(height / 2)-100;
      } else {
        //console.log(height);
        return height-100;
      }
    }
  },
  data: () => ({
    items: [
      { title: "Start", icon: "person" },
      { title: "Kim", icon: "person" },
      { title: "Kim", icon: "person" },
      { title: "Kim", icon: "person" },
      { title: "Kim", icon: "person" },
      { title: "Kim", icon: "person" },
      { title: "Kim", icon: "person" },
      { title: "Kim", icon: "person" },
      { title: "Kim", icon: "person" },
      { title: "Kim", icon: "person" },
      { title: "Kim", icon: "person" },
      { title: "Kim", icon: "person" },
      { title: "Kim", icon: "person" },
      { title: "Kim", icon: "person" },
      { title: "Kim", icon: "person" },
      { title: "Kim", icon: "person" },
      { title: "Kim", icon: "person" },
      { title: "Kim", icon: "person" },
      { title: "Kim", icon: "person" },
      { title: "Kim", icon: "person" },
      { title: "Kim", icon: "person" },
      { title: "Kim", icon: "person" },
      { title: "Kim", icon: "person" },
      { title: "Kim", icon: "person" },
      { title: "Kim", icon: "person" },
      { title: "Kim", icon: "person" },
      { title: "Kim", icon: "person" },
      { title: "Kim", icon: "person" },
      { title: "Kim", icon: "person" },
      { title: "Kim", icon: "person" },
      { title: "End", icon: "person" },
      
    ]
  })
};
</script>

<style scoped>
.vuebar-element {
  width: 100%;
}
.contenedor {
  background-color: #ff7700;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cpolygon fill='%23cc0000' points='957 450 539 900 1396 900'/%3E%3Cpolygon fill='%23aa0000' points='957 450 872.9 900 1396 900'/%3E%3Cpolygon fill='%23d6002b' points='-60 900 398 662 816 900'/%3E%3Cpolygon fill='%23b10022' points='337 900 398 662 816 900'/%3E%3Cpolygon fill='%23d9004b' points='1203 546 1552 900 876 900'/%3E%3Cpolygon fill='%23b2003d' points='1203 546 1552 900 1162 900'/%3E%3Cpolygon fill='%23d3006c' points='641 695 886 900 367 900'/%3E%3Cpolygon fill='%23ac0057' points='587 900 641 695 886 900'/%3E%3Cpolygon fill='%23c4008c' points='1710 900 1401 632 1096 900'/%3E%3Cpolygon fill='%239e0071' points='1710 900 1401 632 1365 900'/%3E%3Cpolygon fill='%23aa00aa' points='1210 900 971 687 725 900'/%3E%3Cpolygon fill='%23880088' points='943 900 1210 900 971 687'/%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: cover;

  display: flex;
  flex-direction: row;
  align-content: stretch;
  height: 100%;
}
.itemOne {
  flex: 3 1 auto;
  order: 0;
  align-self: stretch;
  border: 1px solid white;
}
.itemTwo {
  flex: 7 1 auto;
  order: 0;
  align-self: stretch;
  border: 1px solid white;
}
@media only screen and (max-width: 900px) {
  .contenedor {
    display: flex;
    flex-direction: column;
    align-content: stretch;
    height: 100%;
  }
  .itemOne {
    flex: 1 1;
    order: 0s;
    align-self: stretch;
    border: 1px dotted gray;
  }
  .itemTwo {
    flex: 1 1;
    order: 0;
    align-self: stretch;
    border: 1px dotted gray;
  }
}
</style>

