import { CommandHelpSection, CommandList } from '../../components/commandHelp/CommandHelpStyles';

const CommandHelp: React.FC = () => {
  return (
    <CommandHelpSection>
      <p>Commands to use:</p>
      <CommandList>
        <li>PLACE X,Y,DIRECTION</li>
        <li>MOVE</li>
        <li>LEFT</li>
        <li>RIGHT</li>
        <li>REPORT</li>
      </CommandList>
    </CommandHelpSection>
  );
};

export { CommandHelp };