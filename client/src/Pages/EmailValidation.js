import React, { useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'

function EmailValidation() {

    const [userInput,setUserInput] = useState(null)
    const [errorMSG, setErrorMSG] = useState(false)

    const handleChange = (event)=>{
        const {value} = event.target
        setUserInput(value)
    }

    const checkVerification = (event)=>{
      event.preventDefault()
      const objToSend = JSON.stringify({
        code : userInput,
        email: JSON.parse(window.localStorage.getItem('HealthCareUser')).email
      })
      fetch("http://127.0.0.1:4000/emailValidation",{ 
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: objToSend})
        .then((res) => res.text())
        .then(res => 
          {
            if(JSON.parse(res).validated){
              window.location.replace('/homepage')
            }else{
              setErrorMSG(true)
            }
          })
    }
  return (
    <>
    <Container className='my-4' style={{width: "500px", textAlign: 'Center'}}>
        <h1 className='my-2'>Email Verification</h1>
        <h6 className='my-3'>A verification email has been sent to you, Please check you email inbox and enter the code you got here</h6>
        {errorMSG && <h6 className='my-3'style={{color:'red'}} >The Code you just entered is not valid</h6>}
        <Form onSubmit={checkVerification}>
            <Form.Group>
                <Form.Control
                id='ev'
                type='number'
                value={userInput}
                onChange={handleChange}>
                </Form.Control>
                <Button className='my-3' style={{width: "300px"}} type='submit'>
                    Confirme your email
                </Button>
            </Form.Group>
        </Form>
        <h6>Haven't receive an email?  <a href=''>Send again</a> </h6>
        <h6><a href='/homepage'>Verfiy Later</a> </h6>
    </Container>
    </>
  )
}

export default EmailValidation