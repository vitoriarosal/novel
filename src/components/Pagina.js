'use client';

import { Container } from "react-bootstrap";
import Link from 'next/link'; // Importa o Link do Next.js para navegação interna
import '../app/globals.css';  // Certifique-se de que o CSS esteja corretamente importado
import Rodape from "@/components/Rodape";


export default function Pagina(props) {
    return (
        <>
            {/* Footer azul com o logo e os links */}
            <footer className="custom-footer">
                <Container className="d-flex align-items-center justify-content-between">
                    <div>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tlnovelas_2011_logo.svg/2560px-Tlnovelas_2011_logo.svg.png"  // Usando o caminho a partir da pasta 'public'
                            alt="Tele Novelas Logo"
                            style={{ height: "60px", width: "auto", verticalAlign: "middle" }}   // Ajuste o tamanho do logo conforme necessário
                        />
                    </div>
                    <div className="footer-links">
                        {/* Use Link do Next.js para navegação otimizada */}
                        <Link href="/" className="footer-link">Início</Link>
                        <Link href="/novelas" className="footer-link">Novelas</Link>
                        <Link href="/novelas/personagens" className="footer-link">Personagens</Link>
                        <Link href="/novelas/autores" className="footer-link">Autores</Link>
                        <Link href="/novelas/atores" className="footer-link">Atores</Link>
                        <Link href="/novelas/curiosidades" className="footer-link">Curiosidades</Link>
                        <Link href="/novelas/premiacoes" className="footer-link">Premiações</Link>
                        <Link href="/novelas/emissoras" className="footer-link">Emissoras</Link>
                    </div>
                </Container>
            </footer>

            {}
            <div className="spacer">
            </div>

            <Container className="my-3">
                {props.children}
            </Container>
        </>
    );
}
