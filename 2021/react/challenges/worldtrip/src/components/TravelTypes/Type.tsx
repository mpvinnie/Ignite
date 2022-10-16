import { Flex, Text, Image } from '@chakra-ui/react'

type TypeProps = {
  src_image: string
  title: string
}

export function Type({ src_image, title }: TypeProps): JSX.Element {
  return (
    <Flex direction="column" align="center" justify="center">
      <Image src={src_image} pb="6" w="85px" />
      <Text fontWeight="semibold" color="gray.600">
        {title}
      </Text>
    </Flex>
  )
}
