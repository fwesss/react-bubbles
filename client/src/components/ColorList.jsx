import React, { useState } from 'react';
import axiosWithAuth from '../api/axiosWithAuth';
import AddColor from './AddColor';

const initialColor = {
  color: '',
  code: { hex: '' },
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then((response) => {
        const newColors = [...colors];
        newColors[colors.findIndex((color) => color.id === response.data.id)] =
          response.data;
        updateColors(newColors);
      })
      .catch((error) => console.log(error));
  };

  const deleteColor = ({ id }) => {
    axiosWithAuth()
      .delete(`/api/colors/${id}`)
      .then((response) => {
        updateColors(colors.filter((color) => color.id !== response.data));
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map((color) => (
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
          <li
            key={color.color}
            onClick={() => editColor(color)}
            onKeyPress={() => editColor(color)}
          >
            <span>
              {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
              <span
                className="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
                onKeyPress={(e) => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{' '}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label htmlFor="color-name">
            color name:
            <input
              id="color-name"
              onChange={(e) =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label htmlFor="hex-code">
            hex code:
            <input
              id="hex-code"
              onChange={(e) =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value },
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button type="button" onClick={() => setEditing(false)}>
              cancel
            </button>
          </div>
        </form>
      )}
      <div className="spacer" />
      <AddColor setColors={updateColors} />
    </div>
  );
};

export default ColorList;
