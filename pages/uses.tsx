import { GetStaticProps } from 'next';
import { VStack, Heading, Text, List, ListItem } from '@chakra-ui/react';

import Link from '@/components/link';
import { Tool } from '@/types/tool';
import ToolCard from '@/components/tool-card';
import { readData } from '@/utils/read-data';

type Props = {
  tools: { [key: string]: Tool[] };
  categories: string[];
};

const Uses = ({ tools, categories }: Props) => {
  return (
    <>
      <VStack spacing={3} alignItems='flex-start' w='full' as='section'>
        <Heading size='md'>Software tools.</Heading>
        <Text>
          This is my list of software tools that I use frequently. I do my best
          at updating it whenever a change occurs. To see my hardware, check out
          the <Link href='/gear'>Gear</Link> page.
        </Text>
      </VStack>
      <List spacing={12} alignItems='stretch' w='full'>
        {categories.map((category) => (
          <ListItem spacing={8} alignItems='flex-start' key={category}>
            <Heading size='md' textTransform='capitalize'>
              {category}.
            </Heading>
            <List alignItems='stretch' w='full'>
              {tools[category].map((tool) => (
                <ListItem key={tool.url}>
                  <ToolCard {...tool} />
                </ListItem>
              ))}
            </List>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { tools: toolsData } = await readData<{ tools: Tool[] }>(
    'data/software-tools.json'
  );

  const tools: { [key: string]: Tool[] } = {};

  toolsData.forEach((tool) => {
    if (!tools[tool.category]) {
      tools[tool.category] = [];
    }
    tools[tool.category] = [...tools[tool.category], tool];
  });

  const categories = Object.keys(tools);

  const props: Props = { tools, categories };

  return {
    props,
  };
};

export default Uses;
