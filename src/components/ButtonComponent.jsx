import React from 'react'

export default function ButtonComponent(props) {

    const { text, type, background, onClick, padding } = props;

    return (
        <button type={type} onClick={onClick} style={{ background: background ? background : "#ffff", color: '#fff', borderRadius: 10, padding: padding ? padding : 5, border:'none' }}>
            {text}
        </button>
    )
}
