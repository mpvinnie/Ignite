import { ProductItem } from "./ProductItem";

interface SearchResultsProps {
  results: Array<{
    id: number
    price: number
    priceFormatted: string
    title: string
  }>
  totalPrice: number
  onAddToWishList: (id: number) => void
}

export function SearchResults({
  results,
  totalPrice,
  onAddToWishList
}: SearchResultsProps) {
  return (
    <div>
      <h2>{totalPrice}</h2>
      {results.map(product => (
        <ProductItem
          product={product}
          key={product.id}
          onAddToWishList={onAddToWishList}
        />
      ))}
    </div>
  )
}