const cardComponent = {
  template: `
    <section class="column" @click="$emit('click')">
      <div class="bordered">
        <h4 class="card__title">{{ card.title }}</h4>
        <hr v-show="card.isShowSubtitle" />
        <span v-if="card.subtitle && card.isShowSubtitle">{{ card.subtitle }}</span>
        <div 
          class="removeIcon"
          title="Remove this Card"
          @click="requestRemoveCard"
        >+</div>
        <div 
          :class="{
            hideSubtitle: card.isShowSubtitle,
            showSubtitle: !card.isShowSubtitle
          }"
          :title="( card.isShowSubtitle ) ? 'Hide Subtitle' : 'Show Subtitle'"
          v-if="card.subtitle"
          @click="requestToggleShowSubtitle(card)"
        > {{ card.isShowSubtitle ? '&uArr;' : '&dArr;' }} </div>

        <div 
          :class="{
            isFavorite: true,
            'isFavorite--true': card.isFavorite
          }"
          :title="( card.isFavorite ) ? 'Delete From Favorite' : 'Add to Favorite'"
          @click="requestToggleFavorite(card)"
        >&#9829;</div>
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
    requestToggleShowSubtitle(card) {
      this.$emit(
        `${(card.isShowSubtitle) ? 'cardsubtitle-hidden' : 'cardsubtitle-shown'}`, card
      );
    },
    requestToggleFavorite(card) {
      this.$emit(
        `${(card.isFavorite) ? 'deleted-from-favorite' : 'added-to-favorite'}`, card
      );
    }
  },
}

Vue.component('cards', {
  template: `
    <div class="row">
      <card v-for="card in cards" 
        :key="card.id" 
        :card="card" 
        @card-removed="requestRemoveCard(card)" 
        @added-to-favorite="requestToggleFavorite(card)" 
        @deleted-from-favorite="requestToggleFavorite(card)" 
        @cardsubtitle-shown="requestToggleShowSubtitle(card)" 
        @cardsubtitle-hidden="requestToggleShowSubtitle(card)">
      </card>
    </div>
  `,
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
    requestToggleShowSubtitle(card) {
      this.$emit(
        `${card.isShowSubtitle ? 'cardsubtitle-hidden' : 'cardsubtitle-shown'}`, card
      );
    },
    requestToggleFavorite(card) {
      this.$emit(
        `${card.isFavorite ? 'deleted-from-favorite' : 'added-to-favorite'}`, card
      );
    }
  },

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
      { 
        id: 2, 
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
    isOnlyFavoritesShown: false,
  },

  computed: {
    inFavorites: function() {
      let inFavorites = [];
      for (let i = 0; i < this.cards.length; i++) {
        if (this.cards[i].isFavorite) {
          inFavorites.push(this.cards[i].id);
        }
      }
      return inFavorites;
    },
    cardsShown() {
      if (!this.isOnlyFavoritesShown) {
        return this.cards;
      } else if (this.isOnlyFavoritesShown) {
        return this.cards.filter(card => card.isFavorite);
      }
    }
  },
  methods: {
    removeFirst(card) {
      this.cards.shift(card);
    },
    removeLast(card) {
      this.cards.pop(card);
    },
    removeCard(card) {
      this.cards.splice(this.cards.indexOf(card), 1);
    },
    toggleSubtitle(card) {
      card.isShowSubtitle = !card.isShowSubtitle;
    },
    addCard() {
      this.count++;      
      this.cards.push({
        id: this.count,
        title: this.title,
        subtitle: this.subtitle,
        isShowSubtitle: false,
        isFavorite: false,
      });
      this.title = '';
      this.subtitle = '';
    },
    addToFavorite(card) {
      card.isFavorite = true;
    },
    deleteFromFavorite(card) {
      card.isFavorite = false;
    },
    showOnlyFavorites() {
      this.isOnlyFavoritesShown = true;
    },
    showAllCards() {
      this.isOnlyFavoritesShown = false;
    },
  },
});
