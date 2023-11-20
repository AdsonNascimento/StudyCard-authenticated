import React, { useState } from 'react';
import { Icon } from '../Icons/'
import './style.scss'

function ProgresiveInput({ legend, transmitValue }) {
  const initialResponse = [
    { id: 1, text: '', correctResponse: false },
    { id: 2, text: '', correctResponse: false },
  ]
  const [inputs, setInputs] = useState(initialResponse)

  const addResponse = () => {
    setInputs(prevResponse => {
      if (prevResponse.length < 5) {
        const newResponse = [
          ...prevResponse,
          { id: prevResponse.length + 1, text: '', correctResponse: false }
        ]

        transmitValue(newResponse)
        return newResponse
      } else {
        return prevResponse
      }
    })
  }

  const removeResponse = () => {
    setInputs(prevResponse => {
      if (prevResponse.length > 2) {
        let newArr = [...prevResponse]
        newArr.splice(-1, 1)

        transmitValue(newArr)
        return newArr
      } else {
        return prevResponse
      }
    })
  }

  const handleTextChange = (index, value = undefined) => {

    setInputs(prevText => {
      const updateText = [...prevText]
      updateText[index].text = value

      transmitValue(updateText)
      return updateText
    })
  }

  const handleCorrerctResponsesChange = (index) => {
    setInputs((prevCorrectResponses) => {
      const updateInputs = prevCorrectResponses.map((response, key) => {
        return {
          ...response,
          correctResponse: key === index ? true : false,
        }
      })

      transmitValue(updateInputs)
      return updateInputs
    })
  }

  return (
    <fieldset className='responses'>
      <div className='reponse-header'>
        <legend>{legend}</legend>

        <div className='response-nav'>
          <Icon.Minus onClick={removeResponse} />
          <Icon.Plus onClick={addResponse} />
        </div>
      </div>

      <div className='response-input'>

        {inputs.map((response, index) => (
          <label htmlFor={response.id} key={index}>
            <span>Opção {response.id}</span>

            <input
              type="text"
              placeholder={`Opção ${response.id}`}
              value={response.text}
              onChange={(event) => handleTextChange(index, event.target.value)}
            />

            <input
              type="radio"
              value={response.id}
              name="correct-response"
              checked={response.correctResponse}
              onChange={() => handleCorrerctResponsesChange(index)}
            />
          </label>
        ))}

      </div>
    </fieldset>
  );
}

export default ProgresiveInput;