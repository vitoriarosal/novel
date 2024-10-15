'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Pagina from "@/components/Pagina";
import { useRouter, useParams } from 'next/navigation'; // Hooks para redirecionar e pegar o ID da URL

export default function EditarNovela() {
    const router = useRouter();
    const { id } = useParams(); // Pega o id da URL para editar a novela
    const [formData, setFormData] = useState({
        titulo: '',
        genero: '',
        anoLancamento: '',
    });

    // Carrega os dados da novela com base no ID da URL quando a página carrega
    useEffect(() => {
        const novelasSalvas = JSON.parse(localStorage.getItem('novelas')) || [];
        const novelaParaEditar = novelasSalvas.find((novela) => novela.id === id);
        if (novelaParaEditar) {
            setFormData(novelaParaEditar); // Preenche o formulário com os dados da novela para edição
        } else {
            alert('Novela não encontrada');
            router.push('/novelas/novelas');
        }
    }, [id]);

    // Atualiza o estado do formulário conforme o usuário digita
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Recupera as novelas salvas no localStorage
        let novelasSalvas = JSON.parse(localStorage.getItem('novelas')) || [];

        // Atualiza a novela existente com base no ID
        novelasSalvas = novelasSalvas.map((novela) => 
            novela.id === id ? { ...novela, ...formData } : novela
        );

        // Salva o array atualizado de novelas no localStorage
        localStorage.setItem('novelas', JSON.stringify(novelasSalvas));

        // Redireciona para a página de listagem de novelas
        router.push('/novelas/novelas');
    };

    return (
        <Pagina titulo="Editar Novela">
            <Container>
                <Row className="justify-content-center">
                    <Col md={6}>
                        <h1 className="text-center mb-4">Editar Novela</h1>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="titulo">
                                <Form.Label>Título</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="titulo"
                                    value={formData.titulo}
                                    onChange={handleChange}
                                    placeholder="Digite o título da novela"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="genero">
                                <Form.Label>Gênero</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="genero"
                                    value={formData.genero}
                                    onChange={handleChange}
                                    placeholder="Digite o gênero da novela"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="anoLancamento">
                                <Form.Label>Ano de Lançamento</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="anoLancamento"
                                    value={formData.anoLancamento}
                                    onChange={handleChange}
                                    placeholder="Digite o ano de lançamento"
                                    required
                                />
                            </Form.Group>
                            <div className="d-grid gap-2">
                                <Button variant="primary" type="submit">
                                    Salvar Alterações
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Pagina>
    );
}
