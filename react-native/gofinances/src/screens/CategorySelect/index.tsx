import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { Button } from '../../components/Form/Button'

import { Header } from '../../components/Header'
import { categories } from '../../utils/categories'

import {
  Container,
  Category,
  Icon,
  Name,
  Separator,
  Footer
} from './styles'

type Category = {
  key: string
  name: string
}

interface CategorySelectProps {
  category: Category
  setCategory: (category: Category) => void
  closeSelectCategory: () => void
}

export function CategorySelect({
  category,
  setCategory,
  closeSelectCategory
}: CategorySelectProps) {
  function handleCategorySelect(category: Category) {
    setCategory(category)
  }

  return (
    <Container>
      <Header title="Categorias" />

      <FlatList
        data={categories}
        style={{ flex: 1, width: '100%' }}
        keyExtractor={( item ) => item.key}
        renderItem={({ item }) => (
          <Category
            onPress={() => handleCategorySelect(item)}
            isActive={category.key === item.key}
          >
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </Category>
        )}
        ItemSeparatorComponent={() => <Separator />}
      />

      <Footer>
        <Button
          title="Selecionar"
          onPress={closeSelectCategory}
        />
      </Footer>
    </Container>
  )
}