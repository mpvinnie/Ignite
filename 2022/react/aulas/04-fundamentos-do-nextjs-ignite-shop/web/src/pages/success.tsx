import Image from "next/legacy/image";
import Link from "next/link";
import { ImageContainer, SuccessContainer } from "../styles/pages/success";

export default function Success() {
  return (
    <SuccessContainer>
      <h1>Compra efetuada!</h1>

      <ImageContainer>
        <Image src='https://m.media-amazon.com/images/I/41+WlOYmpdL._AC_SX569_.jpg' width={130} height={145} />
      </ImageContainer>

      <p>
        Uhuul <strong>Vinicius Peres</strong>, sua <strong>Camiseta Beyond the Limits</strong> já está a caminho da sua casa.
      </p>

      <Link href='/'>
        Voltar ao catálogo
      </Link>
    </SuccessContainer>
  )
}