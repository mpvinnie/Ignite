import { Flex, Heading, Text } from '@chakra-ui/react'

type SlideContentProps = {
  image_url: string
  title: string
  subtitle: string
}

export function SlideContent({
  image_url,
  title,
  subtitle
}: SlideContentProps): JSX.Element {
  return (
    <Flex
      backgroundImage={`url('${image_url}')`}
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      align="center"
      justify="center"
      width="100%"
      height="450px"
      direction="column"
    >
      <Heading
        fontWeight="bold"
        fontSize="48px"
        color="gray.50"
        lineHeight="72px"
      >
        {title}
      </Heading>
      <Text fontWeight="bold" color="gray.100" fontSize="24px">
        {subtitle}
      </Text>
    </Flex>
  )
}
