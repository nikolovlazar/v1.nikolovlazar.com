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
      <VStack as="section" alignItems="flex-start" w="full" spacing={3}>
        <Heading size="md">Software tools.</Heading>
        <Text>
          This is my list of software tools that I use frequently. I do my best
          at updating it whenever a change occurs. To see my hardware, check out
          the <Link href="/gear">Gear</Link> page.
        </Text>
      </VStack>
      <List alignItems="stretch" w="full" spacing={12}>
        {categories.map((category) => (
          <ListItem key={category} alignItems="flex-start">
            <Heading textTransform="capitalize" size="md">
              {category}.
            </Heading>
            <List alignItems="stretch" w="full">
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
