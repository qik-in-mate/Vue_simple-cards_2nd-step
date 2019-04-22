const cardComponent = {
  template: `
    <section class="column" @click="$emit('click')">
      <div class="bordered">
        <h4>{{ card.title }}</h4>
        <hr v-show="card.isShowSubtitle" />
        <span v-if="card.subtitle && card.isShowSubtitle">{{ card.subtitle }}</span>

        <div class="removeIcon" @click="requestRemoveCard" title="Remove this Card">+</div>
        <div class="hideSubtitle" title="Hide Subtitle" v-if="card.isShowSubtitle" @click="requestHideSubtitle(card)">&uArr;</div>
        <div class="showSubtitle" title="Show Subtitle" v-if="card.subtitle && !card.isShowSubtitle" @click="requestShowSubtitle(card)">&dArr;</div>
        <div class="isFavorite" title="Add to Favorite" v-if="!card.isFavorite" @click="requestAddToFavorite(card)">&#9829;</div>
        <div class="isFavorite isFavorite--true" title="Delete From Favorite" v-if="card.isFavorite" @click="requestDeleteFromFavorite(card)">&#9829;</div>
      </div>
    </section>
  `,
  props: {
    card: {
      type: Object,
      default() {
        return {id: 100};
      }
    },
  },
  methods: {
    requestRemoveCard(card) {
      this.$emit('card-removed', card);
    },
    requestHideSubtitle(card) {
      this.$emit('cardsubtitle-hidden', card);
    },
    requestShowSubtitle(card) {
      this.$emit('cardsubtitle-shown', card);
    },
    requestAddToFavorite(card) {
      this.$emit('added-to-favorite', card);
    },
    requestDeleteFromFavorite(card) {
      this.$emit('deleted-from-favorite', card);
    }
  },
}

Vue.component('cards', {
  props: {
    cards: Array
  },
  components: {
    'card': cardComponent,
  },
  methods: {
    requestRemoveCard(card) {
      this.$emit('card-removed', card);
    },
    requestHideSubtitle(card) {
      this.$emit('cardsubtitle-hidden', card);
    },
    requestShowSubtitle(card) {
      this.$emit('cardsubtitle-shown', card);
    },
    requestAddToFavorite(card) {
      this.$emit('added-to-favorite', card);
    },
    requestDeleteFromFavorite(card) {
      this.$emit('deleted-from-favorite', card);
    }
  },
  template: `
    <div class="row">
      <card v-for="(card, index) in cards" 
        :key="card.id" 
        :card="card" 
        @card-removed="requestRemoveCard(card)" 
        @added-to-favorite="requestAddToFavorite(card)" 
        @deleted-from-favorite="requestDeleteFromFavorite" 
        @cardsubtitle-shown="requestShowSubtitle(card)" 
        @cardsubtitle-hidden="requestHideSubtitle(card)">
      </card>
    </div>
  `,
  data() {
    return {
    };
  }
})

new Vue({
  el: '#app',
  data: {
    cards: [
      {
        id: 1,
        title: 'Seitan polaroid flannel',
        subtitle: 'next level',
        isShowSubtitle: false,
        isFavorite: false,
      },
      { id: 2, 
        title: 'Street art swag',
        isFavorite: false,
      },
      {
        id: 3,
        title: 'Deep v selvage tousled',
        subtitle: 'tousled copper mug, gochujang crucifix try-hard tbh',
        isShowSubtitle: false,
        isFavorite: false,
      },
    ],
    title: '',
    subtitle: '',
    count: 3,
    inFavorites: [],
  },
  
  methods: {
    removeFirst() {
      this.cards.shift();
    },
    removeLast() {
      this.cards.pop();
    },
    removeCard(card) {
      this.cards.splice(this.cards.indexOf(card), 1);
      this.deleteFromFavorite(card);
    },
    hideSubtitle(card) {
      card.isShowSubtitle = false;
    },
    showSubtitle(card) {
      card.isShowSubtitle = true;
    },
    addCard() {
      this.count++;      
      this.cards.push({
        id: this.count,
        title: this.title,
        subtitle: this.subtitle,
        isShowSubtitle: false,
        isFavorite: false
      });
      this.title = '';
      this.subtitle = '';
    },
    addToFavorite(card) {
      if (this.inFavorites.includes(card.id) === true) {
        return;
      }
      this.inFavorites.push(card.id);
      card.isFavorite = true;
    },
    deleteFromFavorite(card) {
      if (this.inFavorites.includes(card.id) === false) {
        return;
      }
      this.inFavorites.splice(this.inFavorites.indexOf(card.id), 1);
      card.isFavorite = false;
    }
  },
});
