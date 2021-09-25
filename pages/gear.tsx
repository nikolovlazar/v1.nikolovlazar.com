import { GetStaticProps } from 'next';
import { VStack, Heading, Text } from '@chakra-ui/react';

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
    <VStack spacing={16} alignItems='stretch'>
      <VStack spacing={3} alignItems='flex-start'>
        <Heading size='md'>Gear.</Heading>
        <Text>
          This is my hardware list. <strong>Not affiliate links</strong>. To see
          my software tools, check out the <Link href='/uses'>Uses</Link> page.
        </Text>
      </VStack>
      <VStack spacing={12} alignItems='stretch' w='full'>
        {categories.map((category) => (
          <VStack spacing={8} alignItems='flex-start' key={category}>
            <Heading size='md' textTransform='capitalize'>
              {category}.
            </Heading>
            <VStack alignItems='stretch' w='full'>
              {gear[category].map((gear) => (
                <GearCard key={gear.url} {...gear} />
              ))}
            </VStack>
          </VStack>
        ))}
      </VStack>
    </VStack>
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
