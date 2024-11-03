import React from 'react'
import Card03 from './Card03'

export default function Card02({text}) {
  return (
    <div>
      This is card 02: {text}

      <Card03 text={text} />
    </div>
  )
}
