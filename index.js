Vue.component('cards', {
  props: {
    cards: Array
  },
  methods: {
    removeCard(index) {
      this.$emit('card-removed', index);
    },
    hideSubtitle(card) {
      this.$emit('cardsubtitle-hidden', card);
    },
    showSubtitle(card) {
      this.$emit('cardsubtitle-shown', card);
    },
  },
  template: `
    <div class="row">
      <section v-for="(card, index) in cards" v-bind:key="card.id" class="column">
        <div class="bordered">
          <h4>{{ card.title }}</h4>
          <hr v-show="card.isShowSubtitle" />
          <span v-if="card.subtitle && card.isShowSubtitle">{{ card.subtitle }}</span>

          <div class="removeIcon" v-on:click="removeCard(index)" title="Remove this Card">+</div>
          <div class="hideSubtitle" title="Hide Subtitle" v-if="card.isShowSubtitle" v-on:click="hideSubtitle(card)">&uArr;</div>
          <div class="showSubtitle" title="Show Subtitle" v-if="card.subtitle && !card.isShowSubtitle" v-on:click="showSubtitle(card)">&dArr;</div>
        </div>
      </section>
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
