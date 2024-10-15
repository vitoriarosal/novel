'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Pagina from "@/components/Pagina";
import { useRouter } from 'next/navigation'; // Hook para redirecionar entre as páginas
import { useParams } from 'next/navigation'; // Hook para capturar os parâmetros da URL

export default function CriarEditarCuriosidade() {
    const router = useRouter();
    const { id } = useParams(); // Pega o id da URL para edição
    const [formData, setFormData] = useState({
        descricao: '',
    });

    // Se estivermos editando, carrega os dados da curiosidade com base no ID
    useEffect(() => {
        if (id) {
            const curiosidadesSalvas = JSON.parse(localStorage.getItem('curiosidades')) || [];
            const curiosidadeParaEditar = curiosidadesSalvas.find((curiosidade) => curiosidade.id === id);
            if (curiosidadeParaEditar) {
                setFormData(curiosidadeParaEditar); // Preenche o formulário com os dados da curiosidade para edição
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

        // Recupera as curiosidades salvas no localStorage ou inicia com um array vazio
        let curiosidadesSalvas = JSON.parse(localStorage.getItem('curiosidades')) || [];

        if (id) {
            // Se estamos editando, substituímos a curiosidade existente
            curiosidadesSalvas = curiosidadesSalvas.map((curiosidade) => 
                curiosidade.id === id ? formData : curiosidade
            );
        } else {
            // Se estamos criando uma nova curiosidade, adicionamos um novo id
            formData.id = new Date().getTime().toString(); // Gera um ID único
            curiosidadesSalvas.push(formData);
        }

        // Salva o array atualizado de curiosidades no localStorage
        localStorage.setItem('curiosidades', JSON.stringify(curiosidadesSalvas));

        // Redireciona para a página de listagem de curiosidades
        router.push('/novelas/curiosidades');
    };

    return (
        <Pagina titulo={id ? "Editar Curiosidade" : "Criar Curiosidade"}>
            <Container>
                <Row className="justify-content-center">
                    <Col md={6}>
                        <h1 className="text-center mb-4">{id ? "Editar Curiosidade" : "Criar Curiosidade"}</h1>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="descricao">
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    name="descricao"
                                    value={formData.descricao}
                                    onChange={handleChange}
                                    placeholder="Digite a descrição da curiosidade"
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
