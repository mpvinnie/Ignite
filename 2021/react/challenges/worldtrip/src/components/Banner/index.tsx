import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react'

export function Banner(): JSX.Element {
  return (
    <Flex
      backgroundImage="url('/images/background.png')"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      h="335px"
      align="center"
      justify="center"
    >
      <Flex
        w="100%"
        maxW="1240px"
        direction="row"
        justify="space-between"
        align="center"
        position="relative"
        px="4"
      >
        <Box maxW="50%">
          <Heading color="gray.50" fontWeight="medium" lineHeight="54px" mb="5">
            5 Continentes, <br /> infinitas possibilidades.
          </Heading>
          <Text color="gray.300" fontSize="20px" lineHeight="30px">
            Chegou a hora de tirar do papel a viagem que você sempre sonhou.
          </Text>
        </Box>
        <Image
          src="/images/airplane.png"
          position="absolute"
          right={0}
          top={0}
        />
      </Flex>
    </Flex>
  )
}
