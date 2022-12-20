import Link from '@/components/link';
import { VStack, Heading, Text } from '@chakra-ui/react';

const ColophonPage = () => {
  return (
    <>
      <VStack as='section' alignItems='flex-start' w='full' spacing={3}>
        <Heading size='md'>Colophon.</Heading>
        <Text>This website is designed and developed by Lazar Nikolov.</Text>
        <Text>
          The tech stack is{' '}
          <Link href='https://nextjs.org/' isExternal>
            NextJS
          </Link>{' '}
          (all pages statically generated),{' '}
          <Link href='https://mdxjs.com/' isExternal>
            MDX
          </Link>
          ,{' '}
          <Link href='https://chakra-ui.com' isExternal>
            Chakra UI
          </Link>
          ,{' '}
          <Link href='https://prisma.io/' isExternal>
            Prisma
          </Link>
          ,{' '}
          <Link href='https://planetscale.com/' isExternal>
            PlanetScale
          </Link>
          , <Link href='http://airtable.com/'>Airtable</Link>,{' '}
          <Link href='https://raindrop.io/'>Raindrop</Link>, and it’s deployed
          on{' '}
          <Link href='https://vercel.com/' isExternal>
            Vercel
          </Link>
          . It is designed using{' '}
          <Link href='https://figma.com/' isExternal>
            Figma
          </Link>
          .
        </Text>
        <Text>Everything is Open Source 💜</Text>
        <Text>
          The source code can be found on{' '}
          <Link
            href='https://github.com/nikolovlazar/personal-website'
            isExternal
          >
            GitHub
          </Link>
          . The UI Design can be found on{' '}
          <Link
            href='https://www.figma.com/community/file/1014838147356550908/Personal-Website'
            isExternal
          >
            Figma
          </Link>
          .
        </Text>
      </VStack>
    </>
  );
};

export default ColophonPage;
