import Link from '@/components/link';
import {
  VStack,
  Heading,
  Text,
} from '@chakra-ui/react';

const ColophonPage = () => {
  return (
    <>
      <VStack spacing={3} alignItems='flex-start' w='full'>
        <Heading size='md'>Colophon.</Heading>
        <Text>
          This website is designed and developed by Lazar Nikolov.
        </Text>
        <Text>
          The tech stack is <Link href="https://nextjs.org/" isExternal>NextJS</Link>{' '}
          (all pages statically generated),{' '}
          <Link href="https://mdxjs.com/" isExternal>MDX</Link>,{' '}
          <Link href="https://chakra-ui.com" isExternal>Chakra UI</Link>,{' '}
          <Link href="https://prisma.io/" isExternal>Prisma</Link>,{' '}
          <Link href="https://planetscale.com/" isExternal>PlanetScale</Link>,{' '}
          <Link href="http://airtable.com/">Airtable</Link>,{' '}
          <Link href="https://raindrop.io/">Raindrop</Link>,{' '}
          and it’s deployed on{' '}
          <Link href="https://vercel.com/" isExternal>Vercel</Link>.{' '}
          It is designed using <Link href="https://figma.com/" isExternal>Figma</Link>.
        </Text>
        <Text>
          The source code is open source and can be found on <Link href="https://github.com/lazarnikolov94/personal-website" isExternal>GitHub</Link>.{' '}
          The UI Design can be found on <Link href="https://www.figma.com/community/file/1014838147356550908/Personal-Website" isExternal>Figma</Link>.
        </Text>
        <Text>
          This website uses <Link href="https://plausible.io/nikolovlazar.com" isExternal>Plausible Analytics</Link>,{' '}
          which is compatible with the different privacy regulations such as GDPR, CCPA and PECR out of the box.{' '}
          <Link href="https://plausible.io/blog/google-analytics-cookies" isExternal>It does not use cookies</Link>, and it does not collect any personal data from the visitors either.
        </Text>
      </VStack>
    </>
  );
};

export default ColophonPage;
