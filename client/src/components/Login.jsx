import React, { useEffect, useReducer, useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
} from '@chakra-ui/core';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const initialValidState = {
  username: false,
  password: false,
  validated: false,
};

const Login = () => {
  const history = useHistory();
  const [values, setValue] = useState({
    username: '',
    password: '',
  });

  const [valid, setValid] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    initialValidState
  );

  const handleChange = (event) => {
    setValid(initialValidState);

    setValue({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const validate = () => {
    if (values.username !== 'Lambda School') {
      setValid({ username: true });
    }

    if (values.password !== 'i<3Lambd4') {
      setValid({ password: true });
    }

    return true;
  };

  const login = (event) => {
    event.preventDefault();
    setValid({ validated: validate() });
  };

  useEffect(() => {
    if (!valid.username && !valid.password && valid.validated) {
      axios
        .post('http://localhost:5000/api/login', {
          username: values.username,
          password: values.password,
        })
        .then((response) => {
          localStorage.setItem('token', response.data.payload);
          history.push('/bubbles');
        })
        .catch((error) => console.log(error));
    }
  }, [
    history,
    valid.password,
    valid.username,
    valid.validated,
    values.password,
    values.username,
  ]);

  return (
    <form onSubmit={login}>
      <FormControl isRequired isInvalid={valid.username}>
        <FormLabel htmlFor="username">Username</FormLabel>
        <Input
          id="username"
          type="text"
          name="username"
          value={values.username}
          onChange={handleChange}
          autoComplete="on"
        />
        <FormErrorMessage>Incorrect username</FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={valid.password}>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          id="password"
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          autoComplete="on"
        />
        <FormErrorMessage>Incorrect password</FormErrorMessage>
      </FormControl>

      <Button type="submit" variantColor="blue" mr={3}>
        Submit
      </Button>
    </form>
  );
};

export default Login;
