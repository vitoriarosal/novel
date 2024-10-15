'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Pagina from "@/components/Pagina";
import { useRouter, useParams } from 'next/navigation'; // Hooks para redirecionar e pegar o ID da URL

export default function EditarAutor() {
    const router = useRouter();
    const { id } = useParams(); // Pega o id da URL para editar o autor
    const [formData, setFormData] = useState({
        nomeAutor: '',
        biografia: '',
        foto: '',
    });

    // Carrega os dados do autor com base no ID da URL quando a página carrega
    useEffect(() => {
        const autoresSalvos = JSON.parse(localStorage.getItem('autores')) || [];
        const autorParaEditar = autoresSalvos.find((autor) => autor.id === id);
        if (autorParaEditar) {
            setFormData(autorParaEditar); // Preenche o formulário com os dados do autor para edição
        } else {
            alert('Autor não encontrado');
            router.push('/novelas/autores');
        }
    }, [id]);

    // Atualiza o estado do formulário conforme o usuário digita
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Função para lidar com o upload de imagem
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        
        reader.onloadend = () => {
            setFormData({ ...formData, foto: reader.result }); // Salva a imagem como base64
        };
        if (file) {
            reader.readAsDataURL(file); // Converte a imagem para base64
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Recupera os autores salvos no localStorage
        let autoresSalvos = JSON.parse(localStorage.getItem('autores')) || [];

        // Atualiza o autor existente com base no ID
        autoresSalvos = autoresSalvos.map((autor) => 
            autor.id === id ? formData : autor
        );

        // Salva o array atualizado de autores no localStorage
        localStorage.setItem('autores', JSON.stringify(autoresSalvos));

        // Redireciona para a página de listagem de autores
        router.push('/novelas/autores');
    };

    return (
        <Pagina titulo="Editar Autor">
            <Container>
                <Row className="justify-content-center">
                    <Col md={6}>
                        <h1 className="text-center mb-4">Editar Autor</h1>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="nomeAutor">
                                <Form.Label>Nome do Autor</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nomeAutor"
                                    value={formData.nomeAutor}
                                    onChange={handleChange}
                                    placeholder="Digite o nome do autor"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="biografia">
                                <Form.Label>Biografia</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    name="biografia"
                                    value={formData.biografia}
                                    onChange={handleChange}
                                    placeholder="Escreva uma breve biografia"
                                    required
                                />
                            </Form.Group>

                            {/* Campo para upload de foto */}
                            <Form.Group className="mb-3" controlId="foto">
                                <Form.Label>Foto do Autor</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                                {formData.foto && <img src={formData.foto} alt="Foto do Autor" className="img-thumbnail mt-2" style={{ width: '100px' }} />}
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
