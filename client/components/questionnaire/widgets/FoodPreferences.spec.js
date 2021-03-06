import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-15'

import {getMockField} from '../../../lib/test-helpers'
import FoodPreferences from './FoodPreferences'
import FoodSelector from './food-preferences/FoodSelector'

Enzyme.configure({adapter: new Adapter()})

describe('FoodPreferences', function() {
  it('renders', function() {
    const mockField = getMockField()

    FoodPreferences.__Rewire__('Field', mockField)
    const wrapper = shallow(<FoodPreferences />)
    FoodPreferences.__ResetDependency__('Field')

    expect(wrapper.find(mockField)).to.be.present().prop('name', 'foodPreferences')
  })

  it('renderFoodPreferences', function() {
    const renderFoodPreferences = FoodPreferences.__get__('renderFoodPreferences')
    const wrapper = shallow(renderFoodPreferences({
      input: {value: ['foo'], onChange: () => {}},
      selectCategory: () => {}
    }))

    expect(wrapper.find(FoodSelector)).to.have.prop('selectedItems').eql(['foo'])
  })
})
