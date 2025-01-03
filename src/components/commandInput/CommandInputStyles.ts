import styled from 'styled-components';


const InputLable = styled.label`
  display: block;
  margin-bottom: 20px;
  font-family: sans-serif;
`;

const InputField = styled.input`
  border: 2px solid grey;
  font-size: 16px;
  padding: 10px 10px;
  width: 200px;
`;

const EnterButton = styled.button`
  background: #FFED29;
  background: linear-gradient(45deg, #FFED29, #39d7ac);
  border: none;
  color: black;
  cursor: pointer;
  font-size: 16px;
  padding: 15px 25px;

  &:hover {
    background: linear-gradient(45deg, #FFED29, #4e9f3d);
  }
`;

const InputError = styled.p`
  color: red;
`;

export {
  EnterButton,
  InputError,
  InputField,
  InputLable
};
