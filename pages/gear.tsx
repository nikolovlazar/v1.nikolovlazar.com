import { GetStaticProps } from 'next';
import { VStack, Heading, Text } from '@chakra-ui/react';

import Link from '@/components/link';
import { Gear } from '@/types/gear';
import GearCard from '@/components/gear-card';
import { readData } from '@/utils/read-data';

type Props = {
  gear: Gear[];
};

const GearPage = ({ gear }: Props) => {
  const data: Map<string, Gear[]> = new Map();

  gear.forEach((tool) => {
    if (!data.get(tool.category)) {
      data.set(tool.category, []);
    }
    data.set(tool.category, [...data.get(tool.category), tool]);
  });

  const categories = Array.from(data.keys());

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
              {data.get(category).map((gear) => (
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
  const { gear } = await readData<{ gear: Gear[] }>('data/gear.json');

  const props: Props = { gear };

  return {
    props,
  };
};

export default GearPage;
