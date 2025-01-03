import styled from 'styled-components';

const CommandLine = styled.div`
`;

const InputLable = styled.label`
  display: block;
  margin-bottom: 20px;
`;

const InputField = styled.input`
  border: 2px solid grey;
  font-size: 16px;
  padding: 10px 10px;
  width: 200px;
`;

const EnterButton = styled.button`
  background: #FFED29;
  border: none;
  color: black;
  cursor: pointer;
  font-size: 16px;
  padding: 15px 25px;
`;

const InputError = styled.p`
  color: red;
`;

export {
  EnterButton,
  InputError,
  InputField,
  InputLable,
  CommandLine,
};
