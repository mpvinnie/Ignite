import { Box } from '@chakra-ui/react'
import SwiperCore, { Pagination } from 'swiper/core'
import { Swiper as SwiperContainer, SwiperSlide } from 'swiper/react'

import { SlideContent } from './SlideContent'

SwiperCore.use([Pagination])

export function Swiper(): JSX.Element {
  return (
    <Box height="450px" w="100%" maxW="1240px" my="8">
      <SwiperContainer
        slidesPerView={1}
        className="mySwiper"
        pagination={{
          dynamicBullets: true
        }}
      >
        <SwiperSlide>
          <SlideContent
            image_url="/images/europe.png"
            title="Europa"
            subtitle="O continente mais antigo."
          />
        </SwiperSlide>
        <SwiperSlide>
          <SlideContent
            image_url="/images/north-america.jpg"
            title="America do Norte"
            subtitle="Conheça Los Angeles, Miami ou o Canadá."
          />
        </SwiperSlide>
        <SwiperSlide>
          <SlideContent
            image_url="/images/south-america.jpg"
            title="America do Sul"
            subtitle="Conheça os montes e construções mais antigos do mundo."
          />
        </SwiperSlide>
        <SwiperSlide>
          <SlideContent
            image_url="/images/africa.jpeg"
            title="Africa"
            subtitle="Mergulhe nas águas das Ilhas Maurício."
          />
        </SwiperSlide>
        <SwiperSlide>
          <SlideContent
            image_url="/images/asia.jpg"
            title="Ásia"
            subtitle="Conheça o Taj Mahal e o Monte Fuji."
          />
        </SwiperSlide>
        <SwiperSlide>
          <SlideContent
            image_url="/images/oceania.jpg"
            title="Oceania"
            subtitle="Viage para a Sydney e conheça a Ópera e surfe na praia de Bondi."
          />
        </SwiperSlide>
      </SwiperContainer>
    </Box>
  )
}
