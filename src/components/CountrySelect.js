import React, { Component } from 'react'
import Select from 'react-select';

class CountrySelect extends Component {
  getCountryList(data) {
    let selectData = []
    Object.keys(data).forEach(function(key) {
      var country = data[key]
      selectData.push({
        value: country.alpha2Code.toLowerCase(),
        label: country.name
      })
    })
    return selectData
  }

  handleCountryChange = event => {
    console.log(event.value)
  }

  render() {
    return (
      <Select
        value={this.props.value}
        onChange={this.handleCountryChange}
        options={this.getCountryList(this.props.countries)}
      />
    )
  }
}

export default CountrySelect;
