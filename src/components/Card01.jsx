import React from 'react'
import Card02 from './Card02'

export default function Card01({text}) {
  return (
    <div>
      This is card 01: {text}
      <Card02 text={text} />
    </div>
  )
}
