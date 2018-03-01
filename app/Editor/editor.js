import { h } from 'hyperapp'
import { Link } from '@hyperapp/router'
import './editor.styl'

const Editor = () =>
  <div>
    <div class="title">Template Editor</div>

    {/* Template Name */}
    <div container="row #left @middle">
      <label>Name</label>
      <input  type="text"
              ng-model="$ctrl.template.name"
              ng-change="$ctrl.template.$save()"
              ng-model-options="$ctrl.updateOnBlur"
              cn-click-select />
    </div>

    {/* Tabs Buttons */}
    <div class="tabs" container="row #spaced @middle">

      <div  container="row #center @middle"
            ng-class="{ 'tab-label': $ctrl.ui.mode !== 'element' }"
            ng-click="$ctrl.ui.mode = 'element'">
        Elements
      </div>

      <div  container="row #center @middle"
            ng-class="{ 'tab-label': $ctrl.ui.mode !== 'preview' }"
            ng-click="$ctrl.ui.mode = 'preview'">
        Preview
      </div>

    </div>

    {/* ---------------------- */}
    {/* Element Properties Tab */}
    {/* ---------------------- */}

    <div class="properties" ng-if="$ctrl.ui.mode === 'element'">

      {/* Element Buttons */}
      <div container="row #spaced @middle">
        <button ng-click="$ctrl.addElement()">
          Add
        </button>

        <button ng-if="$ctrl.element"
                ng-click="$ctrl.deleteElement($ctrl.element)">
          Delete
        </button>
      </div>

      {/* Hint - No Element Selected */}
      <div  class="hint"
            ng-if="$ctrl.elements.length && !$ctrl.element">
        Click an element in the<br />
        card preview to select it.
      </div>

      {/* Hint - No Elements Exist */}
      <div  class="hint"
            ng-if="!$ctrl.elements.length">
        There are currently no elements for this<br />
        template. Click the button to add one.
      </div>

      {/* Element Name */}
      <div  container="column #top @left"
            ng-if="$ctrl.element">
        <label>Name</label>
        <input  type="text"
                ng-model="$ctrl.element.name"
                ng-change="$ctrl.template.$save()"
                ng-model-options="$ctrl.updateOnBlur"
                cn-click-select />
      </div>

      {/* Element Style */}
      <div  container="column #top @left"
            ng-if="$ctrl.element">
        <label>Style</label>
        <textarea ng-model="$ctrl.style"
                  ng-change="$ctrl.template.$save()"
                  ng-model-options="$ctrl.updateOnBlur">
        </textarea>
      </div>

    </div>

    {/* ------------- */}
    {/* Card Data Tab */}
    {/* ------------- */}

    <div class="properties" ng-if="$ctrl.ui.mode === 'preview'">
      <div container="row #spaced @middle">
        <button ng-click="$ctrl.addCard()">New Card</button>
      </div>

      <form name="cardForm">
        <div  container="column #top @left"
              ng-repeat="value in $ctrl.card.data track by $index">
          <label>$ctrl.elements[$index].name</label>
          <input  type="text"
                  ng-model="$ctrl.card.data[$index]"
                  ng-blur="cardForm.$dirty && $ctrl.card.$save(); cardForm.$setPristine()" />
        </div>
      </form>
    </div>

    <div flex></div>

    {/* Card Preview Scale */}
    <div container="row #left @middle">
      <label>Scale</label>
      <input  type="range"
              min="1.5" max="3.5" step="0.01"
              ng-model="$ctrl.ui.scale" />
    </div>
  </div>

export default Editor
