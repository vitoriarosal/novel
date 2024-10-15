'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Pagina from "@/components/Pagina";
import { useRouter, useParams } from 'next/navigation'; // Hooks para redirecionar e pegar o ID da URL

export default function EditarCuriosidade() {
    const router = useRouter();
    const { id } = useParams(); // Pega o id da URL para editar a curiosidade
    const [formData, setFormData] = useState({
        descricao: '',
    });

    // Carrega os dados da curiosidade com base no ID da URL quando a página carrega
    useEffect(() => {
        const curiosidadesSalvas = JSON.parse(localStorage.getItem('curiosidades')) || [];
        const curiosidadeParaEditar = curiosidadesSalvas.find((curiosidade) => curiosidade.id === id);
        if (curiosidadeParaEditar) {
            setFormData(curiosidadeParaEditar); // Preenche o formulário com os dados da curiosidade para edição
        } else {
            alert('Curiosidade não encontrada');
            router.push('/novelas/curiosidades');
        }
    }, [id]);

    // Atualiza o estado do formulário conforme o usuário digita
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Recupera as curiosidades salvas no localStorage
        let curiosidadesSalvas = JSON.parse(localStorage.getItem('curiosidades')) || [];

        // Atualiza a curiosidade existente com base no ID
        curiosidadesSalvas = curiosidadesSalvas.map((curiosidade) => 
            curiosidade.id === id ? { ...curiosidade, ...formData } : curiosidade
        );

        // Salva o array atualizado de curiosidades no localStorage
        localStorage.setItem('curiosidades', JSON.stringify(curiosidadesSalvas));

        // Redireciona para a página de listagem de curiosidades
        router.push('/novelas/curiosidades');
    };

    return (
        <Pagina titulo="Editar Curiosidade">
            <Container>
                <Row className="justify-content-center">
                    <Col md={6}>
                        <h1 className="text-center mb-4">Editar Curiosidade</h1>
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
