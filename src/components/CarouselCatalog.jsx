// Ao trabalharmos com React, o Swiper nos oferece o módulo react, possuindo componentes próprios para uso no React.
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { slidesData } from '../utils/slidesData';

export function CarouselCatalog() {
	return (
		<div className="relative w-[510px] h-[280px] overflow-visible">
			{/* Iremos passar as configurações via props para o componente Swiper. */}
			<Swiper
				className="static w-full h-full"
				// Ao definirmos os modulos a serem utilizados pelo Swiper, esses serão criados automaticamente em nosso Slider.
				modules={[Navigation, Pagination]}
				loop={true}
				grabCursor={true}
				// Definindo as propriedades dos módulos a serem utilizados:
				navigation={true}
				pagination={{
					type: 'bullets',
					clickable: true,
					dynamicBullets: true,
				}}
			>
				{slidesData.map((data) => (
					// Os slides serão passados via componente SwiperSlide.
					<SwiperSlide key={data.title}>
						<div className="flex justify-center items-center h-full">
							<div className="flex flex-col items-center md:flex-row cursor-pointer">
								<img
									src={data.imgUrl}
									alt="Sobretudo Cinza Elegante"
									className="object-contain max-h-[280px]"
								/>
								<div className="flex flex-col justify-center mt-4 md:mt-0 md:ml-8 max-w-80 gap-y-6">
									<h2 className="text-lg md:text-xl font-mono border-b border-red-600">
										{data.title}
									</h2>
									<p className="text-sm">{data.descripton}</p>
									<button
										type="button"
										className="addItemBtn border border-black text-sm font-mono font-bold py-2 rounded-md hover:scale-105 transition"
									>
										Ver produto
									</button>
								</div>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}
