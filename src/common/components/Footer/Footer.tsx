import { FC } from "react";
import { DiscordOutlined, RedditOutlined } from "@ant-design/icons";

const Footer: FC = () => {
  return (
    <footer className="bg-primary-dark text-white text-center py-2 sm:py-4 sm:px-4 mt-auto text-xs sm:text-base">
      <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-between px-4">
        {/* Iconos de redes */}
        <div className="flex gap-3 sm:gap-6 mt-1 sm:mt-0 sm:py-0">
          <a
            href="https://www.reddit.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Reddit"
            className="text-xl sm:text-3xl hover:text-red-300 transition-colors"
          >
            <RedditOutlined />
          </a>

          <a
            href="https://discord.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Discord"
            className="text-xl sm:text-3xl hover:text-red-300 transition-colors"
          >
            <DiscordOutlined />
          </a>
        </div>
        {/* Derechos reservados */}
        <div>
          <span className="block sm:hidden leading-tight">
            &copy; {new Date().getFullYear()} MatchMaker
            <br />
            Todos los derechos reservados
          </span>
          <span className="hidden sm:inline leading-normal">
            &copy; {new Date().getFullYear()} MatchMaker - Todos los derechos
            reservados
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
