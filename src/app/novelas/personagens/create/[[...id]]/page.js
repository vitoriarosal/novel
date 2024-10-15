'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Pagina from "@/components/Pagina";
import { useRouter } from 'next/navigation'; // Hook para redirecionar entre as páginas
import { useParams } from 'next/navigation'; // Hook para capturar os parâmetros da URL

export default function CriarEditarPersonagem() {
    const router = useRouter();
    const { id } = useParams(); // Pega o id da URL para edição
    const [formData, setFormData] = useState({
        nome: '',
        novelaId: '',
        atorId: '',
    });

    // Se estivermos editando, carrega os dados do personagem com base no ID
    useEffect(() => {
        if (id) {
            const personagensSalvos = JSON.parse(localStorage.getItem('personagens')) || [];
            const personagemParaEditar = personagensSalvos.find((personagem) => personagem.id === id);
            if (personagemParaEditar) {
                setFormData(personagemParaEditar); // Preenche o formulário com os dados do personagem para edição
            }
        }
    }, [id]);

    // Atualiza o estado do formulário conforme o usuário digita
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Recupera os personagens salvos no localStorage ou inicia com um array vazio
        let personagensSalvos = JSON.parse(localStorage.getItem('personagens')) || [];

        if (id) {
            // Se estamos editando, substituímos o personagem existente
            personagensSalvos = personagensSalvos.map((personagem) => 
                personagem.id === id ? { ...personagem, ...formData } : personagem
            );
        } else {
            // Se estamos criando um novo personagem, adicionamos um novo id
            formData.id = new Date().getTime().toString(); // Gera um ID único
            personagensSalvos.push(formData);
        }

        // Salva o array atualizado de personagens no localStorage
        localStorage.setItem('personagens', JSON.stringify(personagensSalvos));

        // Redireciona para a página de listagem de personagens
        router.push('/novelas/personagens');
    };

    return (
        <Pagina titulo={id ? "Editar Personagem" : "Criar Personagem"}>
            <Container>
                <Row className="justify-content-center">
                    <Col md={6}>
                        <h1 className="text-center mb-4">{id ? "Editar Personagem" : "Criar Personagem"}</h1>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="nome">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nome"
                                    value={formData.nome}
                                    onChange={handleChange}
                                    placeholder="Digite o nome do personagem"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="novelaId">
                                <Form.Label>ID da Novela</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="novelaId"
                                    value={formData.novelaId}
                                    onChange={handleChange}
                                    placeholder="Digite o ID da novela"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="atorId">
                                <Form.Label>ID do Ator</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="atorId"
                                    value={formData.atorId}
                                    onChange={handleChange}
                                    placeholder="Digite o ID do ator"
                                    required
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
