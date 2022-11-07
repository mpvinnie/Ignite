import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsListContainer,
  TransactionsTable
} from "./styles";

export function Transactions() {
  return (
    <TransactionsContainer>
      <Header />
      <Summary />

      <TransactionsListContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            <tr>
              <td width="50%">Desenvolvimento de site</td>
              <td>
                <PriceHighlight variant="income">R$ 12.000,00</PriceHighlight>
              </td>
              <td>Venda</td>
              <td>06/11/2022</td>
            </tr>
            <tr>
              <td width="50%">Hamburguer</td>
              <td>
                <PriceHighlight variant="outcome">- R$ 50,00</PriceHighlight>
              </td>
              <td>Venda</td>
              <td>06/11/2022</td>
            </tr>
            <tr>
              <td width="50%">Alimentação</td>
              <td>
                <PriceHighlight variant="outcome">-R$ 500,00</PriceHighlight>
              </td>
              <td>Venda</td>
              <td>06/11/2022</td>
            </tr>
          </tbody>
        </TransactionsTable>
      </TransactionsListContainer>
    </TransactionsContainer>
  )
}