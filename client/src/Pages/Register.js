import React, { useState } from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import PhoneInput from 'react-phone-number-input'


function Register() {
    const [errorMsg, setErrorMsg] = useState('')
    const validPass = new RegExp(/^(?=.*[A-Z])(?=.*[a-zA-Z])/)
    const validPhoneNumber = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)
    const validEmailRegex = new RegExp(
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      );

    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        password: ''
    })

    const handleChange = async (event) => {
        const { id, value } = event.target
        setUserInfo({...userInfo, [id]: value})
      }

      const handleSubmit = (event) => {
        event.preventDefault()
        fetch("http://127.0.0.1:4000/user",{ 
          method:'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userInfo)})
        .then(response => response.text())
        .then(result => JSON.parse(result))
        .then(res => { 
          switch (res.Code) {
            case 1:
              window.localStorage.setItem('HealthCareUser', JSON.stringify(res))
              fetch("http://127.0.0.1:4000/validationGenerator",{ 
              method:'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: window.localStorage.getItem('HealthCareUser')})
              window.location.replace('/emailValidation')
              break;
            case 2:
              setErrorMsg('Email Already Exists')
              break;
            case 3:
              setErrorMsg('500! Server error')
              break;
            default:
              break;
          }
        })
      }
  return (
    <>
    <Container className='align-self-center' style={{width: "500px"}}>
        <Form onSubmit={handleSubmit}>
        <Row style={{textAlign:'center'}} className='my-4'><h1>CREATE AN ACCOUNT</h1></Row>
        <Row style={{textAlign:'center', color:'red'}} className='my-2'><h6>{errorMsg}</h6></Row>
        <Row>
            <Col>
            <Form.Group className="mb-3">
                <Form.Label>Familly Name</Form.Label>
                <Form.Control 
                required
                className='mb-2'
                id='lastName'
                size='lg' 
                type="text" 
                value={userInfo.lastName}
                onChange={handleChange}
                placeholder="Family Name" />
            </Form.Group>
            </Col>
            <Col>
            <Form.Group className="mb-3">
                <Form.Label>Familly Name</Form.Label>
                <Form.Control 
                required
                className='mb-2'
                id='firstName'
                size='lg' 
                type="text" 
                value={userInfo.firstName}
                onChange={handleChange}
                placeholder="Name" />
            </Form.Group>
            </Col>
        </Row>

        <Row>
        <Form.Group  className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control 
            required
            className='mb-2'
            id='email'
            size='lg' 
            type="email" 
            value={userInfo.email}
            onChange={handleChange}
            placeholder="Emilia.Clark@GOT.hbo" />
            {validEmailRegex.test(userInfo.email) || userInfo.email === '' 
            ? ''
            : <h6 style={{color :'red'}}>Invalid  Email address</h6>}
          </Form.Group>
        </Row>

        <Row>
          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <PhoneInput
                placeholder="Enter phone number"
                value={userInfo.phoneNumber}
                className={'mb-2 form-control form-control-lg'}
                onChange={(v) => setUserInfo({...userInfo, phoneNumber: v})}/>
                {validPhoneNumber.test(userInfo.phoneNumber) || userInfo.phoneNumber === '' 
                ? ''
                : <h6 style={{color :'red'}}>Invalid  Phone Number</h6>}
          </Form.Group>
        </Row>

        <Row>
        <Form.Group  className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control 
            required
            className='mb-2'
            id='password'
            size='lg' 
            type="password" 
            value={userInfo.password}
            onChange={handleChange}
            placeholder="Password" />
            {userInfo.password.length>7 
            ? <span style={{color :'green'}}>At least 8 characters</span>
            : <span style={{color :'red'}}>At least 8 characters</span>
            }
            {validPass.test(userInfo.password) 
            ? <h6 style={{color :'green'}}>At least one uppercase letter</h6>
            : <h6 style={{color :'red'}}>At least one uppercase letter</h6>
            }
          </Form.Group>            
        </Row>
        
        <Row>
            <Button 
                style={{width:'90%'}} 
                variant="primary" 
                type="submit"
                disabled={userInfo.firstName.length < 1 
                    ||  userInfo.lastName.length < 1 
                    ||  !validEmailRegex.test(userInfo.email) 
                    ||  !validPass.test(userInfo.password)
                    ||  userInfo.password.length < 8
                    ||  !validPhoneNumber.test(userInfo.phoneNumber)}>
                CREATE
            </Button>
        </Row>
        <Row style={{textAlign:'center'}} className='my-3'>
            <Link style={{color:'grey'}} to={'/login'}> Already have and account? </Link>
        </Row>
        </Form>
    </Container>
    </>
  )
}

export default Register