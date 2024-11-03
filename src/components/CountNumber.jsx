

import React, { useEffect, useMemo, useRef, useState } from 'react'
import ButtonComponent from './ButtonComponent'
import { Form } from "react-bootstrap"

export default function CountNumber() {
    const [count, setCount] = useState(0)
    const myRef = useRef()
    const [inputValue,  setInputValue] = useState()

    useEffect(() => {

        console.log("This is myRef:" , myRef)

        myRef.current.focus()

    }, [count])


    const calcullators = (num) => {
        return num * 2;
    }

    // function calcullators(num){
    //     return num * 2;
    // }

    const doubleCount = useMemo(() => calcullators(count), [count])

    return (
        <div >

            <p>result: {count}</p>

            <ButtonComponent onClick={() => setCount(count + 1)} text="count" type="button" background="green" padding={10} />

            <div >
                <p>This is useRef</p>
                <p>expensiveresult: {doubleCount}</p>
                <Form.Control ref={myRef} type='text' onChange={(e) => setInputValue(e?.target?.value)} value={inputValue} />
            </div>
        </div>
    )
}
