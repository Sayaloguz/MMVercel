"use client";
import CustomCarousel from "@/common/components/CustomCarousel/Delivery";
import { useLatestJams } from "@/common/hooks/useLatestJams";
import { Image } from "antd";

export default function HomePage() {
	const { jams, loading } = useLatestJams();

	return (
		<div className="w-full px-4 py-10 space-y-8">
			<div className="max-w-6xl mx-auto">
				<div className="text-center space-y-4">
					<h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
						¡Bienvenido/a!
					</h1>
					<Image
						src="matchmaker_big_v2.png"
						preview={false}
						className="rounded-xl mx-auto shadow-lg w-full max-w-3xl"
						alt="Matchmaker banner"
					/>
					<p className="text-gray-300 text-lg">
						Inicia sesión con tu cuenta de Steam y busca grupos de juego o
						créalos tú mismo/a y diviértete jugando cuando, como y con quien
						quieras.
					</p>
				</div>

				<h2 className="text-2xl font-semibold mt-10">Últimas jams</h2>
				<div>
					{loading ? (
						<p className="text-center text-white">Cargando...</p>
					) : jams.length > 0 ? (
						<CustomCarousel items={jams} />
					) : (
						<p className="text-center text-white">No hay jams disponibles</p>
					)}
				</div>
			</div>
		</div>
	);
}
