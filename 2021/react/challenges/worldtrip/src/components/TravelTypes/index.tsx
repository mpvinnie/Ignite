import { HStack } from '@chakra-ui/layout'

import { Type } from './Type'

export function TravelTypes(): JSX.Element {
  return (
    <HStack w="100%" alignItems="center" justify="space-between">
      <Type src_image="/icons/cocktail.png" title="vida noturna" />
      <Type src_image="/icons/surf.png" title="praia" />
      <Type src_image="/icons/building.png" title="moderno" />
      <Type src_image="/icons/museum.png" title="clássico" />
      <Type src_image="/icons/earth.png" title="e mais..." />
    </HStack>
  )
}
