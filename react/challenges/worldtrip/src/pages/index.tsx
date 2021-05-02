import { Divider, Flex, Heading } from '@chakra-ui/react'
import Head from 'next/head'

import { Banner } from '../components/Banner'
import { Header } from '../components/Header'
import { Swiper } from '../components/Swiper'
import { TravelTypes } from '../components/TravelTypes'

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>Home | Worldtrip</title>
      </Head>
      <Header />
      <Banner />

      <Flex
        as="main"
        width="100%"
        maxW="1240px"
        mt="20"
        mx="auto"
        py="8"
        px="4"
        direction="column"
        align="center"
      >
        <TravelTypes />

        <Divider w="90px" borderColor="gray.600" my="20" borderWidth="thin" />

        <Heading
          fontWeight="medium"
          textAlign="center"
          lineHeight="54px"
          color="gray.700"
        >
          Vamos nessa? <br />
          Então escolha seu continente
        </Heading>

        <Swiper />
      </Flex>
    </>
  )
}
