const cardComponent = {
  template: `
    <section class="column" @click="$emit('click')">
      <div class="bordered">
        <h4>{{ card.title }}</h4>
        <hr v-show="card.isShowSubtitle" />
        <span v-if="card.subtitle && card.isShowSubtitle">{{ card.subtitle }}</span>

        <div class="removeIcon" v-on:click="requestRemoveCard(index)" title="Remove this Card">+</div>
        <div class="hideSubtitle" title="Hide Subtitle" v-if="card.isShowSubtitle" v-on:click="requestHideSubtitle(card)">&uArr;</div>
        <div class="showSubtitle" title="Show Subtitle" v-if="card.subtitle && !card.isShowSubtitle" v-on:click="requestShowSubtitle(card)">&dArr;</div>
      </div>
    </section>
  `,
  props: {
    card: {
      type: Object,
      default() {
        return {id: 100};
      }
    }
  }
}


Vue.component('cards', {
  props: {
    cards: Array
  },
  components: {
    'card': cardComponent,
  },
  methods: {
    requestRemoveCard(index) {
      this.$emit('card-removed', index);
    },
    requestHideSubtitle(card) {
      this.$emit('cardsubtitle-hidden', card);
    },
    requestShowSubtitle(card) {
      this.$emit('cardsubtitle-shown', card);
    },
  },
  template: `
    <div class="row">
      <card v-for="(card, index) in cards" :key="card.id" :card="card">

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
        isShowSubtitle: false
      },
      { id: 2, 
        title: 'Street art swag' 
      },
      {
        id: 3,
        title: 'Deep v selvage tousled',
        subtitle: 'tousled copper mug, gochujang crucifix try-hard tbh',
        isShowSubtitle: false
      },
    ],
    title: '',
    subtitle: '',
    count: 3,
  },
  
  methods: {
    removeFirst() {
      this.cards.shift();
    },
    removeLast() {
      this.cards.pop();
    },
    removeCard(index) {
      this.cards.splice(index, 1);
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
        isShowSubtitle: false
      });
      this.title = '';
      this.subtitle = '';
    }
  },
});
