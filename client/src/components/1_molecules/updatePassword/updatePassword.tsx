import React, { useState, useEffect, useCallback } from 'react'
import { PwdForm, Button } from '../..'
import { Socket } from '../../../services'

export const UpdatePassword = () => {
  const [password, setPassword] = useState('')
  const [checkPassword, setCheckPassword] = useState('')
  const [pwdSame, setPwdSame] = useState(false)
  const [pwdValid, setPwdValid] = useState(false)

  useEffect(() => {
    return () => {
      Socket.off('update-password')
    }
  })

  const change = useCallback(
    (field: string, validInput: boolean) => (event: any) => {
      switch (field) {
        case 'password':
          setPassword(event.target.value)
          setPwdValid(validInput)
          break
        case 'checkPassword':
          setCheckPassword(event.target.value)
          setPwdSame(validInput)
          break
      }
    },
    []
  )

  const submitPassword = (event: any) => {
    event.preventDefault()
    Socket.fetch('update-password', {
      password: password
    })
      .then(() => {
        setPassword('')
        setCheckPassword('')
        setPwdSame(false)
        setPwdValid(false)
      })
      .catch((error: any) => {
        console.error(error)
      })
  }

  return (
    <form onSubmit={submitPassword}>
      <PwdForm
        change={change}
        password={password}
        checkPassword={checkPassword}
        pwdSame={pwdSame}
        pwdValid={pwdValid}
      />
      <div className="field is-grouped is-grouped-right">
        <Button
          type="submit"
          className="is-success"
          disabled={!pwdValid || !pwdSame}
        >
          Valider
        </Button>
      </div>
    </form>
  )
}