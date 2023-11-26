import React, { useState } from 'react'
import { Icon } from '../Icons/'
import './style.scss'

function Modal({ isOpen, setOpenEditModal }) {

  if (isOpen) {
    return (
      <section className="cover" onClick={setOpenEditModal} >
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <Icon.Close className="modal-close" onClick={setOpenEditModal} />

        </div>
      </section>
    )
  }

  return null
}

export default Modal