import React from 'react'

import Currency from './Currency'

const Clues = ({ country, numGuesses, roundEnded }) => {
  const { capital, languages } = country
  const languagesText = Object.keys(languages).map((key) => languages[key]).join(', ')

  const clueRow = (label, value) => value ? (
    <li><span className="label">{label}: </span><span className="value">{value}</span></li>
  ) : null

  return (
    <ul>
      { clueRow('Region', country.region) }
      { clueRow('Sub-region', country.subregion) }
      { country.population && clueRow('Population', country.population.toLocaleString('en')) }
      { country.area && clueRow('Area', country.area.toLocaleString('en')) }
      { country.borders && clueRow('Borders', country.borders.join(', ')) }
      { numGuesses > 0 && <Currency country={country} roundEnded={roundEnded} />}
      { numGuesses > 1 && clueRow('Language', languagesText) }
      { numGuesses > 2 && clueRow('Capital City', capital.join(', ')) }
    </ul>
  )
}

export default Clues
