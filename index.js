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
