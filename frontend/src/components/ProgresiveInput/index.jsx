import React, { useState } from 'react';
import { Icon } from '../Icons/'
import './style.scss'

function ProgresiveInput({ matter, card, legend }) {
  const initialResponse = [
    { id: 1, text: '', correctResponse: false },
    { id: 2, text: '', correctResponse: false },
  ]
  const [inputs, setInputs] = useState(initialResponse)

  const addResponse = () => {
    setInputs(prevResponse => {
      if (prevResponse.length < 5) {

        return [
          ...prevResponse,
          { id: prevResponse.length + 1, text: '', correctResponse: false }
        ]

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

        return newArr
      } else {
        return prevResponse
      }
    })
  }

  const handleTextChange = (index, value) => {
    setInputs(prevText => {
      const updateText = [...prevText]
      updateText[index].text = value

      return updateText
    })
  }

  const handleCorrectResponseChange = (index, checked) => {
    setInputs((prevCorrectResponses) => {
      return prevCorrectResponses.map((response, key) => {
        return {
          ...response,
          correctResponse: key === index ? true : false,
        };
      });
    });
  };
  

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
          <label id={`response-${matter}-${card}-${response.id}`} htmlFor={response.id} key={index}>
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
              onChange={(event) => handleCorrectResponseChange(index, event.target.checked)}
            />
          </label>
        ))}

      </div>
    </fieldset>
  );
}

export default ProgresiveInput;