import React, { useState } from 'react';

function ProgresiveInput({ matter, legend }) {
    const [inputs, setInputs] = useState([])

    return (
        <fieldset>
            <legend>{legend}</legend>
            <div>


                <label>
                    <input
                        type="text"
                        // value={elemento.texto}
                        onChange={(e) => handleInputChange(elemento.id, e)}
                    />

                    <input
                        type="radio"
                        value="opcao1"
                    // checked={elemento.opcaoSelecionada === 'opcao1'}
                    // onChange={() => handleRadioChange(elemento.id, 'opcao1')}
                    />
                    Opção 1
                </label>
            </div>
        </fieldset>
    );
}

export default ProgresiveInput;