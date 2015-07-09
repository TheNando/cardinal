(function() {
  'use strict';

  angular
    .module('cardinal')
    .controller('DeckController', DeckController);

  DeckController.$inject = ['$state', '$mdToast', 'DataService'];

  function DeckController ($state, $mdToast, DataService) {
    var vm = this;

    var Cards = DataService('cards');
    var Templates = DataService('templates');
    var cachedCards = {};

    vm.activateTemplate = activateTemplate;
    vm.cards = [];
    vm.createCard = createCard;
    vm.deck = DataService('decks').get({ id: $state.params.deckId });
    vm.newTemplate = newTemplate;
    vm.openTemplate = openTemplate;
    vm.templates = Templates.search({ deckId: $state.params.deckId });

    activate()

    function activate() {
      if ($state.params.msg) {
        $mdToast.notify($state.params.msg);
      }
    }

    function activateTemplate (template) {
      vm.activeTemplate = template;

      if (!cachedCards[template._id]) {
        cachedCards[template._id] = Cards.search({ templateId: template._id });
      }

      vm.cards = cachedCards[template._id];
    }

    function createCard (template) {
      if (!template._id) {
        // TODO: Throw 'No Template ID' error
        return;
      }
      Cards
        .save({ templateId: template._id, deckId: template.deckId })
        .$promise
        .then(function (card) {
          // TODO: Open card
          cachedCards[template._id] = Cards.search({ templateId: template._id });
          vm.cards = cachedCards[template._id]
        });
    }

    function newTemplate () {
      if (!vm.deck._id) {
        // TODO: Throw 'No Deck ID' error
        return;
      }
      Templates
        .save({ deckId: vm.deck._id })
        .$promise
        .then(function (template) {
          vm.templates.push(template);
          $state.go('template', { templateId: template._id });
        });
    }

    function openTemplate (template) {
      $state.go('template', { templateId: template._id });
    };

    // var originalDeck;
    // var result = { action: null, msg: null };

    // vm.selectedTab = 0;
    // vm.checked = [];
    // vm.disableSave = true;
    // vm.deck = deck;
    // vm.templates = DataService('templates').search({ deckId: deck._id });

    // originalDeck = _.cloneDeep(deck);

    // vm.checkDisableSave = function checkDisableSave () {
    //   // Check in evalAsync as vm.deck will not yet be updated otherwise
    //   vm.$evalAsync(function () {
    //     vm.disableSave = _.isEqual(originalDeck, vm.deck);
    //   });
    // };

    // // Create confirm button directive
    // vm.delete = function delete (evt) {
    //   deck.$delete();
    //   result.action = 'delete';
    //   result.msg = 'Deleted';
    //   $mdDialog.hide(result);
    // };

    // vm.cancel = function cancel () {
    //   if (isNew) {
    //     deck.$delete();
    //   }
    //   _.assign(deck, originalDeck);

    //   result.action = isNew ? 'delete' : 'cancel';
    //   result.msg = 'Cancelled';
    //   $mdDialog.hide(result);
    // };

    // vm.save = function save () {
    //   deck.$save()
    //     .then(function () {
    //       result.action = 'save';
    //       result.msg = 'Saved';
    //       $mdDialog.hide(result);
    //     }, function () {
    //       result.action = 'save';
    //       result.msg = 'Error saving deck';
    //       $mdDialog.hide(result);
    //     });
    // };

    // vm.newItem = function newItem () {
    //   var itemType = vm.selectedTab === 0 ? 'templates' : 'cards';
    //   DataService(itemType).save({ deckId: deck._id })
    //     .$promise
    //     .then(function (template) {
    //       vm.templates.push(template);
    //     });
    // };

    // vm.deleteItems = function deleteItems (items) {
    //   var ary = (vm.selectedTab === 0 ? vm.templates : vm.cards);
    //   _.forEach(items, function (item) {
    //     item
    //       .$delete()
    //       .then(function () {
    //          _.remove(ary, function (aryItem) {
    //           return aryItem._id === item._id;
    //         });
    //       });      
    //   });
    // };



    // vm.toggleCheck = function toggleCheck (item) {
    //   item.checked = !item.checked;

    //   var ary = (vm.selectedTab === 0 ? vm.templates : vm.cards);
    //   vm.checked.length = 0;

    //   // Rebuild checked array
    //   _.forEach(ary, function (aryItem) {
    //     if (aryItem.checked) {
    //       vm.checked.push(aryItem);
    //     }
    //   });
    // };
  }
})();