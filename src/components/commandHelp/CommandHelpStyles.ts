import styled from 'styled-components';

const CommandHelpSection = styled.div`
  display: flex;
  background-color: #f4f4f9;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  margin: 10px auto;
  font-family: 'Roboto', sans-serif;
`;

const CommandList = styled.ul`
  list-style-type: none;
  margin-top: 5px;
  text-align: left;
  gap: 10px;
`;

export { CommandHelpSection, CommandList };