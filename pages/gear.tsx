import { GetStaticProps } from 'next';
import { VStack, Heading, Text, List, ListItem } from '@chakra-ui/react';

import Link from '@/components/link';
import { Gear } from '@/types/gear';
import GearCard from '@/components/gear-card';
import { readData } from '@/utils/read-data';

type Props = {
  gear: { [key: string]: Gear[] };
  categories: string[];
};

const GearPage = ({ gear, categories }: Props) => {
  return (
    <>
      <VStack as='section' alignItems='flex-start' w='full' spacing={3}>
        <Heading size='md'>Gear.</Heading>
        <Text>
          This is my hardware list. <strong>Most are affiliate links</strong>.
          If you click and buy one of my gear a small ka-ching will happen in my
          bank account. To see my software tools, check out the{' '}
          <Link href='/uses'>Uses</Link> page.
        </Text>
      </VStack>
      <List alignItems='stretch' w='full' spacing={12}>
        {categories.map((category) => (
          <ListItem key={category} alignItems='flex-start'>
            <Heading textTransform='capitalize' size='md'>
              {category}.
            </Heading>
            <List alignItems='stretch' w='full'>
              {gear[category].map((gear) => (
                <ListItem key={gear.url}>
                  <GearCard {...gear} />
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
  const { gear: gearData } = await readData<{ gear: Gear[] }>('data/gear.json');

  const gear: { [key: string]: Gear[] } = {};

  gearData.forEach((tool) => {
    if (!gear[tool.category]) {
      gear[tool.category] = [];
    }
    gear[tool.category] = [...gear[tool.category], tool];
  });

  const categories = Object.keys(gear);

  const props: Props = { gear, categories };

  return {
    props,
  };
};

export default GearPage;
