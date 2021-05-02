import { Flex, Image, Icon } from '@chakra-ui/react'
import { FiChevronLeft } from 'react-icons/fi'

export function Header(): JSX.Element {
  const isDetailPage = false

  return (
    <Flex as="header" w="100%" h="100px" align="center" justify="center">
      <Flex
        w="100%"
        maxW="1240px"
        h="100%"
        align="center"
        justify="center"
        position="relative"
      >
        {isDetailPage && (
          <Icon
            as={FiChevronLeft}
            fontSize="24"
            color="gray.600"
            position="absolute"
            left={0}
          />
        )}
        <Image src="/images/logo.svg" alignSelf="center" />
      </Flex>
    </Flex>
  )
}
