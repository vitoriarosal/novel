'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Pagina from "@/components/Pagina";
import { useRouter } from 'next/navigation'; // Hook para redirecionar entre as páginas
import { useParams } from 'next/navigation'; // Hook para capturar os parâmetros da URL

export default function CriarEditarPremiacao() {
    const router = useRouter();
    const { id } = useParams(); // Pega o id da URL para edição
    const [formData, setFormData] = useState({
        titulo: '',
        ano: '',
        categoria: '',
        vencedor: false,
    });

    // Se estivermos editando, carrega os dados da premiação com base no ID
    useEffect(() => {
        if (id) {
            const premiacoesSalvas = JSON.parse(localStorage.getItem('premiacoes')) || [];
            const premiacaoParaEditar = premiacoesSalvas.find((premiacao) => premiacao.id === id);
            if (premiacaoParaEditar) {
                setFormData(premiacaoParaEditar); // Preenche o formulário com os dados da premiação para edição
            }
        }
    }, [id]);

    // Atualiza o estado do formulário conforme o usuário digita
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Recupera as premiações salvas no localStorage ou inicia com um array vazio
        let premiacoesSalvas = JSON.parse(localStorage.getItem('premiacoes')) || [];

        if (id) {
            // Se estamos editando, substituímos a premiação existente
            premiacoesSalvas = premiacoesSalvas.map((premiacao) => 
                premiacao.id === id ? { ...premiacao, ...formData } : premiacao
            );
        } else {
            // Se estamos criando uma nova premiação, adicionamos um novo id
            formData.id = new Date().getTime().toString(); // Gera um ID único
            premiacoesSalvas.push(formData);
        }

        // Salva o array atualizado de premiações no localStorage
        localStorage.setItem('premiacoes', JSON.stringify(premiacoesSalvas));

        // Redireciona para a página de listagem de premiações
        router.push('/novelas/premiacoes');
    };

    return (
        <Pagina titulo={id ? "Editar Premiação" : "Criar Premiação"}>
            <Container>
                <Row className="justify-content-center">
                    <Col md={6}>
                        <h1 className="text-center mb-4">{id ? "Editar Premiação" : "Criar Premiação"}</h1>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="titulo">
                                <Form.Label>Título</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="titulo"
                                    value={formData.titulo}
                                    onChange={handleChange}
                                    placeholder="Digite o título da premiação"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="ano">
                                <Form.Label>Ano</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="ano"
                                    value={formData.ano}
                                    onChange={handleChange}
                                    placeholder="Digite o ano da premiação"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="categoria">
                                <Form.Label>Categoria</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="categoria"
                                    value={formData.categoria}
                                    onChange={handleChange}
                                    placeholder="Digite a categoria da premiação"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="vencedor">
                                <Form.Check
                                    type="checkbox"
                                    name="vencedor"
                                    label="Vencedor"
                                    checked={formData.vencedor}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <div className="d-grid gap-2">
                                <Button variant="primary" type="submit">
                                    {id ? "Salvar Alterações" : "Enviar"}
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Pagina>
    );
}
