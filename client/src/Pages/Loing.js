import React, { useEffect, useState } from 'react'
import { Button, Form, Container, Col, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';

function Login() {

  const validEmailRegex = new RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    rememberMe: false
  })

  const [userInfoErrors, setUserInfoErrors] = useState({
    email: '',
    password: '',
  })

  const handleChange = async (event) => {
    const { id, value } = event.target
    setUserInfo({...userInfo, [id]: value})
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(JSON.stringify(userInfo))
    fetch("http://127.0.0.1:4000/login",{ 
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)})
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
  }

  useEffect(() => {
    if (validEmailRegex.test(userInfo.email) || userInfo.email === '') {
      setUserInfoErrors({...userInfoErrors, email:''})
    } else {
      setUserInfoErrors({...userInfoErrors, email:'Invalid Email adresse'})
    }
  }, [userInfo.email])

  useEffect(() => {
    if (userInfo.password.length > 7 || userInfo.password === '') {
      setUserInfoErrors({...userInfoErrors, password:''})
    } else {
      setUserInfoErrors({...userInfoErrors, password:'use a least 8 characteres'})
    }
  }, [userInfo.password])

  return (
    <>
      <Container className='align-self-center' style={{width: "350px"}}>
      <Form onSubmit={handleSubmit}>
      <Col  >
        <Row  className='justify-content-center my-4'>
          <Link style={{width:'100%'}} to={'/register'}>
            <Button style={{width:'100%'}} size='lg'> 
              Create A Free Account 
            </Button>
          </Link>
        </Row>

        <Row className='my-3'>
          <Form.Group className="mb-3">
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
            {userInfoErrors.email && 
            <span style={{color :'red'}}>{userInfoErrors.email}</span>}
          </Form.Group>
        </Row>
        
        <Row className='my-3'>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control 
            required
            id='password'
            size='lg' 
            type="password" 
            value={userInfo.password}
            onChange={handleChange}
            placeholder="Password"/>
          </Form.Group>
          {userInfoErrors.password &&
          <span style={{color :'red'}}>{userInfoErrors.password}</span> }
        </Row>

        <Row className='my-3'>
          <Form.Group className="mb-3 d-flex justify-content-between">
            <Form.Check 
              inline
              id='rememberMe'
              type="checkbox" 
              onChange={(e) => {setUserInfo({...userInfo, rememberMe: e.target.checked})}}
              label="Remember me" />
            <Link to='/password_reset' style={{textDecoration: 'none', color: 'grey'}}> Forgot Password?</Link>
          </Form.Group>
        </Row>

        <Row  className='justify-content-center'>
          <Button 
          style={{width:'90%'}} 
          variant="primary" 
          type="submit"
          disabled={(userInfo.email === '' 
          || userInfo.password ==='' 
          || userInfoErrors.email !== ''
          || userInfoErrors.password !== '')}>
            Connect
          </Button>
        </Row>
        </Col>
      </Form>
      </Container>
    </>
  )
}

export default Login
