import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
} from '@chakra-ui/core';
import axiosWithAuth from '../api/axiosWithAuth';

const initialColorState = {
  color: '',
  code: {
    hex: '',
  },
};

const AddColor = ({ setColors }) => {
  const [color, setColor] = useState(initialColorState);

  const handleReset = () => {
    setColor(initialColorState);
  };

  const handleChange = (event) => {
    if (event.target.name === 'color-name') {
      setColor({ ...color, color: event.target.value });
    } else {
      setColor({ ...color, code: { hex: event.target.value } });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axiosWithAuth()
      .post('/api/colors', color)
      .then((response) => {
        setColors(response.data);
        handleReset();
      })
      .catch((error) => console.log(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Heading>Add a Color</Heading>
      <FormControl isRequired>
        <FormLabel htmlFor="color-name">Color Name</FormLabel>
        <Input
          id="color-name"
          type="text"
          name="color-name"
          value={color.color}
          onChange={handleChange}
          autoComplete="on"
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="hex-code">Hex Code</FormLabel>
        <Input
          id="hex-code"
          type="text"
          name="hex-code"
          value={color.code.hex}
          onChange={handleChange}
          autoComplete="on"
        />
      </FormControl>

      <Button type="submit" variantColor="blue" mr={3}>
        Submit
      </Button>
      <Button onClick={handleReset}>Cancel</Button>
    </form>
  );
};

export default AddColor;
