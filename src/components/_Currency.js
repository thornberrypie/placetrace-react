import React, { Component } from 'react'

class Currency extends Component {
  render() {
    return (
      <li>
        <span className="label">Currency: </span>
        <span className="value">
          <span className="symbol">{this.props.symbol}</span>
          {this.getCurrency()}
        </span>
      </li>
    )
  }

  getCurrency() {
    if(this.props.roundEnded) {
      return this.props.currency
    }

    let c = this.props.currency.toLowerCase
    if(c.indexOf(' afghani') !== -1) c = 'Afghani'
    if(c.indexOf(' ariary') !== -1) c = 'Ariary'
    if(c.indexOf(' baht') !== -1) c = 'Baht'
    if(c.indexOf(' balboa') !== -1) c = 'Balboa'
    if(c.indexOf(' birr') !== -1) c = 'Birr'
    if(c.indexOf(' bolívar') !== -1) c = 'Bolívar'
    if(c.indexOf(' boliviano') !== -1) c = 'Boliviano'
    if(c.indexOf(' cedi') !== -1) c = 'Cedi'
    if(c.indexOf(' colón') !== -1) c = 'Colón'
    if(c.indexOf(' córdoba') !== -1) c = 'Córdoba'
    if(c.indexOf(' dalasi') !== -1) c = 'Dalasi'
    if(c.indexOf(' denar') !== -1) c = 'Denar'
    if(c.indexOf(' dinar') !== -1) c = 'Dinar'
    if(c.indexOf(' dirham') !== -1) c = 'Dirham'
    if(c.indexOf(' dollar') !== -1) c = 'Dollar'
    if(c.indexOf(' đồng') !== -1) c = 'Dồng'
    if(c.indexOf(' dram') !== -1) c = 'Dram'
    if(c.indexOf(' escudo') !== -1) c = 'Escudo'
    if(c.indexOf(' florin') !== -1) c = 'Florin'
    if(c.indexOf(' forint') !== -1) c = 'Forint'
    if(c.indexOf(' franc') !== -1) c = 'Franc'
    if(c.indexOf(' guaraní') !== -1) c = 'Guaraní'
    if(c.indexOf(' gourde') !== -1) c = 'Gourde'
    if(c.indexOf(' guilder') !== -1) c = 'Guilder'
    if(c.indexOf(' hryvnia') !== -1) c = 'Hryvnia'
    if(c.indexOf(' kina') !== -1) c = 'Kina'
    if(c.indexOf(' kip') !== -1) c = 'Kip'
    if(c.indexOf(' koruna') !== -1) c = 'Koruna'
    if(c.indexOf(' króna') !== -1) c = 'Króna'
    if(c.indexOf(' krone') !== -1) c = 'Krone'
    if(c.indexOf(' kuna') !== -1) c = 'Kuna'
    if(c.indexOf(' kwacha') !== -1) c = 'Kwacha'
    if(c.indexOf(' kwanza') !== -1) c = 'Kwanza'
    if(c.indexOf(' kyat') !== -1) c = 'Kyat'
    if(c.indexOf(' lari') !== -1) c = 'Lari'
    if(c.indexOf(' lek') !== -1) c = 'Lek'
    if(c.indexOf(' lempira') !== -1) c = 'Lempira'
    if(c.indexOf(' leone') !== -1) c = 'Leone'
    if(c.indexOf(' leu') !== -1) c = 'Leu'
    if(c.indexOf(' lev') !== -1) c = 'Lev'
    if(c.indexOf(' lilangeni') !== -1) c = 'Lilangeni'
    if(c.indexOf(' lira') !== -1) c = 'Lira'
    if(c.indexOf(' loti') !== -1) c = 'Loti'
    if(c.indexOf(' manat') !== -1) c = 'Manat'
    if(c.indexOf(' mark') !== -1) c = 'Mark'
    if(c.indexOf(' metical') !== -1) c = 'Metical'
    if(c.indexOf(' naira') !== -1) c = 'Naira'
    if(c.indexOf(' nakfa') !== -1) c = 'Nakfa'
    if(c.indexOf(' ngultrum') !== -1) c = 'Ngultrum'
    if(c.indexOf(' ouguiya') !== -1) c = 'Ouguiya'
    if(c.indexOf(' paʻanga') !== -1) c = 'Paʻanga'
    if(c.indexOf(' pataca') !== -1) c = 'Pataca'
    if(c.indexOf(' peso') !== -1) c = 'Peso'
    if(c.indexOf(' pound') !== -1) c = 'Pound'
    if(c.indexOf(' pula') !== -1) c = 'Pula'
    if(c.indexOf(' quetzal') !== -1) c = 'Quetzal'
    if(c.indexOf(' rand') !== -1) c = 'Rand'
    if(c.indexOf(' real') !== -1) c = 'Real'
    if(c.indexOf(' rial') !== -1) c = 'Rial'
    if(c.indexOf(' riel') !== -1) c = 'Riel'
    if(c.indexOf(' ringgit') !== -1) c = 'Ringgit'
    if(c.indexOf(' riyal') !== -1) c = 'Riyal'
    if(c.indexOf(' ruble') !== -1) c = 'Ruble'
    if(c.indexOf(' rupee') !== -1) c = 'Rupee'
    if(c.indexOf(' rupiah') !== -1) c = 'Rupiah'
    if(c.indexOf(' rufiyaa') !== -1) c = 'Rufiyaa'
    if(c.indexOf(' shekel') !== -1) c = 'Shekel'
    if(c.indexOf(' sheqel') !== -1) c = 'Sheqel'
    if(c.indexOf(' shilling') !== -1) c = 'Shilling'
    if(c.indexOf(' sol') !== -1) c = 'Sol'
    if(c.indexOf(' so\'m') !== -1) c = 'so\'m'
    if(c.indexOf(' som') !== -1) c = 'Som'
    if(c.indexOf(' somoni') !== -1) c = 'Somoni'
    if(c.indexOf(' taka') !== -1) c = 'Taka'
    if(c.indexOf(' tālā') !== -1) c = 'Tālā'
    if(c.indexOf(' tenge') !== -1) c = 'Tenge'
    if(c.indexOf(' tögrög') !== -1) c = 'Tögrög'
    if(c.indexOf(' ruble') !== -1) c = 'Ruble'
    if(c.indexOf(' vatu') !== -1) c = 'Vatu'
    if(c.indexOf(' won') !== -1) c = 'Won'
    if(c.indexOf(' yen') !== -1) c = 'Yen'
    if(c.indexOf(' yuan') !== -1) c = 'Yuan'
    if(c.indexOf(' złoty') !== -1) c = 'Złoty'
    return c
  }
}

export default Currency;
