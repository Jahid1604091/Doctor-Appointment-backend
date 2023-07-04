import React from 'react'

export default function MiniLoader() {
  return (
    <div className="spinner d-flex justify-content-center">
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
  )
}
