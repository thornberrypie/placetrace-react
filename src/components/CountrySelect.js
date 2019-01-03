import React, { Component } from 'react'
import Select from 'react-select';

class CountrySelect extends Component {
  getCountryList(data) {
    let selectData = []

    Object.keys(data).forEach(function(key) {
      var country = data[key]
      selectData.push({
        value: country.alpha3Code.toLowerCase(),
        label: country.name
      })
    })

    return selectData
  }

  render() {
    return (
      <Select
        value={this.props.value}
        //onChange={this.handleChange}
        options={this.getCountryList(this.props.countries)}
      />
    )
  }
}

export default CountrySelect;
