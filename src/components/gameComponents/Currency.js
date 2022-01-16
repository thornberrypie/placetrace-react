import React from 'react'

export default function Currency({ country, roundEnded }) {
  return (
    <li>
      <span className="label">Currency: </span>
      <span className="value">
        {
          Object.values(country.currencies).map((currency) => {
            return (
              <>
                <span className="currency" key={currency.name}>
                  <span className="symbol">{currency.symbol}</span>
                  <span className="currencyName">{currency.name}</span>
                </span>
                {roundEnded && <br />}
              </>
            )
          })
        }
      </span>
    </li>
  )
}

