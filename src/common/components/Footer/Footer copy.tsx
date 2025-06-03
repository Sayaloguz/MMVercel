import { FC } from "react";

const Footer: FC = () => {
	return (
		<footer className="bg-primary-dark text-white text-center py-4 mt-auto text-xs sm:text-base">
			{/* Versión móvil: salto de línea, sin guion */}
			<span className="block sm:hidden">
				&copy; {new Date().getFullYear()} MatchMaker
				<br />
				Todos los derechos reservados
			</span>

			{/* Versión escritorio: todo en una línea con guion */}
			<span className="hidden sm:inline">
				&copy; {new Date().getFullYear()} MatchMaker - Todos los derechos
				reservados
			</span>
		</footer>
	);
};

export default Footer;
