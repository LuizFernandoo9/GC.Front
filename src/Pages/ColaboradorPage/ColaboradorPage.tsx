import { useEffect, useState } from "react";
import * as Yup from 'yup';
import { useFormik } from "formik";
import { ToastContainer } from "react-toastify";
import { TableColumn } from "react-data-table-component";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";


import IColaborador from "../../Interfaces/IColaborador";
import IRecuperaLista from "../../Interfaces/Basic/IRecuperaLista";
import FiltroPesquisa from "../../Interfaces/Basic/FiltroPesquisa";

import ColaboradorService from "../../Services/ColaboradorService";

import Grid from "../../Components/Tables/Grid";
import PageGridHeader from "../../Components/Layouts/Pageheader/PageGridHeader";
import { activeTostify, disabledTostify, errorTostify, successTostify } from "../../Components/Apps/Notification/Notification";
import AlertValidation from "../../Components/Forms/AlertValidation/AlertValidation";
import { Link } from "react-router-dom";
import moment from "moment";


const ColaboradorPage = () => {
    const [colaboradors, setColaboradors] = useState<IColaborador[]>([]);
    const [carregando, setCarregando] = useState(false);
    const [modal, setModal] = useState<boolean>(false);
    const [atualizar, setAtualizar] = useState<boolean>(false);
    const [filtrosPesquisa, setFiltrosPesquisa] = useState<any>({
        nome: '',
        status: 1,
        quantidade: 10,
        totalItems: 0,
        pagina: 1,
        sort: "id"
    });

    const initialValues: IColaborador = {
        id: 0,
        status: 1,
        nome: '',
        enderecoId: 2,
        documento: '',
        habilitacao: '',
        sexo: '',
        dataNascimento: null,
        telefone1: '',
        telefone2: '',
        email: '',
        nomeTitularConta: '',
        agencia: '',
        conta: '',
        pix: '',
    }

    const toggle = (): void => {
        setModal(!modal);
    }
    const quantidadePorPagina = async (currentRowsPerPage: number) => setFiltrosPesquisa(oldState => { return { ...oldState, quantidade: currentRowsPerPage } });

    const paginar = (page: number) => setFiltrosPesquisa(oldState => { return { ...oldState, pagina: page } });

    const colunas: TableColumn<IColaborador>[] = [
        {
            name: 'Código',
            sortField: 'id',
            selector: (row: IColaborador) => row.id,
            sortable: true,
            wrap: true,
            ignoreRowClick: true
        },
        {
            name: 'Nome',
            sortField: 'nome',
            selector: (row: IColaborador) => row.nome,
            sortable: true,
            wrap: true
        },
        {
            name: 'Credencial',
            sortField: 'documento',
            selector: (row: IColaborador) => row.documento,
            sortable: true,
            wrap: true
        },
        {
            name: 'Habilitação',
            sortField: 'habilitacao',
            selector: (row: IColaborador) => row.habilitacao,
            sortable: true,
            wrap: true
        },
        {
            name: 'Sexo',
            sortField: 'sexo',
            selector: (row: IColaborador) => row.sexo,
            sortable: true,
            wrap: true
        },
        {
            name: 'Data de Nascimento',
            sortField: 'dataNascimento',
            selector: (row: IColaborador) => row.dataNascimento,
            sortable: true,
            wrap: true
        },
        {
            name: 'Telefone 1',
            sortField: 'telefone1',
            selector: (row: IColaborador) => row.telefone1,
            sortable: true,
            wrap: true
        },
        {
            name: 'Telefone 2',
            sortField: 'telefone2',
            selector: (row: IColaborador) => row.telefone2,
            sortable: true,
            wrap: true
        },
        {
            name: 'E-mail',
            sortField: 'email',
            selector: (row: IColaborador) => row.email,
            sortable: true,
            wrap: true
        },
        {
            name: ' Titular da Conta',
            sortField: 'nomeTitularConta',
            selector: (row: IColaborador) => row.nomeTitularConta,
            sortable: true,
            wrap: true
        },
        {
            name: 'Conta',
            sortField: 'conta',
            selector: (row: IColaborador) => row.conta,
            sortable: true,
            wrap: true
        },
        {
            name: 'Agência',
            sortField: 'agencia',
            selector: (row: IColaborador) => row.agencia,
            sortable: true,
            wrap: true
        },
        {
            name: 'PIX',
            sortField: 'pix',
            selector: (row: IColaborador) => row.pix,
            sortable: true,
            wrap: true
        },
        {
            name: 'Status',
            cell: (row: IColaborador) => {
                return (row.status ? <Link className="btn btn-success btn-sm" to="#">Ativo</Link> : <Link className="btn btn-danger btn-sm" to="#">Inativo</Link>)
            },
        },
        {
            name: 'Editar?',
            cell: (colaborador: IColaborador) => {
                return (
                    <div>
                        <i onClick={() => {
                            formik.setValues(colaborador);
                            toggle()
                        }}
                            className="fa fa-edit">
                        </i>
                    </div>
                )
            },
            ignoreRowClick: true,
        },
        {
            name: '',
            cell: (colaborador: IColaborador) => {
                return (
                    <div>
                        {colaborador.status == 1 ?
                            <i onClick={() => inativar(colaborador.id)} className="fa fa-trash" />
                            :
                            <i onClick={() => ativar(colaborador.id)} className="fa fa-check" />
                        }
                    </div>
                )
            },
            ignoreRowClick: true,
        }
    ]

    useEffect(() => {
        setTimeout(() => {
            carregar(filtrosPesquisa);
        }, 1000);
    }, [filtrosPesquisa.pagina, filtrosPesquisa.quantidade, filtrosPesquisa.nome]);

    useEffect(() => {
        setTimeout(() => {
            if (atualizar) carregar(filtrosPesquisa);
        }, 1000);
    }, [atualizar]);

    const carregar = async (filtro: FiltroPesquisa) => {
        try {

            setCarregando(true);

            let resultado: IRecuperaLista<IColaborador>;

            resultado = await ColaboradorService.paginar(filtro);

            setFiltrosPesquisa(filtro => { return { ...filtro, totalItems: resultado.total } });

            setColaboradors(resultado.itens);

        } catch (error: any) {
            setColaboradors([]);
        }
        finally {
            setCarregando(false);
            setAtualizar(false);
        }
    }

    const schema = Yup.object().shape({
        nome: Yup.string()
            .min(3, 'Minimo 3 caracteres')
            .max(50, 'Máximo 50 caracteres')
            .required('Campo obrigatório'),    

            documento: Yup.string()
            .min(3, 'Minimo 3 caracteres')
            .max(50, 'Máximo 50 caracteres')
            .required('Campo obrigatório'),    

            nomeTitularConta : Yup.string()
            .min(3, 'Minimo 3 caracteres')
            .max(50, 'Máximo 50 caracteres')
            .required('Campo obrigatório'),    

            conta : Yup.string()
            .min(3, 'Minimo 3 caracteres')
            .max(50, 'Máximo 50 caracteres')
            .required('Campo obrigatório'),   

            agencia : Yup.string()
            .min(3, 'Minimo 3 caracteres')
            .max(50, 'Máximo 50 caracteres')
            .required('Campo obrigatório'),   

            telefone1 : Yup.string()
            .min(3, 'Minimo 3 caracteres')
            .max(50, 'Máximo 50 caracteres')
            .required('Campo obrigatório'),   

            email : Yup.string()
            .min(3, 'Minimo 3 caracteres')
            .max(50, 'Máximo 50 caracteres')
            .required('Campo obrigatório'),   

            dataNascimento: Yup.string()
            .required('Campo obrigatório')
            .test('valid-date', 'Data de nascimento inválida', function (value) {
              return moment(value, 'YYYY-MM-DD', true).isValid();
            })
            .typeError('Campo obrigatório'),
            
    })

    const formik = useFormik({
        initialValues,
        validationSchema: schema,
        onSubmit: async (values) => {
            try {

                setCarregando(true);

            values.enderecoId=2;
                await ColaboradorService.salvar(values);

                successTostify();

            } catch (error: any) {
                errorTostify(error?.response?.data);
            } finally {
                setCarregando(false);
                formik.resetForm();
                setAtualizar(true);
                toggle();
            }
        },
    });

    const ativar = async (id: number) => {
        try {

            setCarregando(true);

            await ColaboradorService.ativar(id);

            activeTostify();

        } catch (error: any) {
            errorTostify(error?.response?.data);
        }
        finally {
            setCarregando(false);
            setAtualizar(true);
        }
    }

    const inativar = async (id: number) => {
        try {

            setCarregando(true);

            await ColaboradorService.inativar(id);

            disabledTostify();

        } catch (error: any) {
            errorTostify(error?.response?.data);
        }
        finally {
            setCarregando(false);
            setAtualizar(true);
        }
    }

    return (<>
        <ToastContainer />
        <PageGridHeader
            titles="Cadastros"
            active="Colaborador"
            setModal={toggle}
            modal={modal}
            setAtualizarTabela={setAtualizar}
            atualizar={atualizar} />

        <Row className="row-sm">
            <Card>
                <Card.Header>
                    <Card.Title as='h3'>Colaboradors</Card.Title>
                </Card.Header>
                <Card.Body style={{ cursor: "pointer", height: "700px" }}>
                    <Form className="form">
                        <Col lg={2} className="">
                            <Form.Group>
                                <Form.Control
                                    value={filtrosPesquisa.nome}
                                    className="mb-3"
                                    type="text"
                                    placeholder="Filtro"
                                    onChange={(e) => setFiltrosPesquisa(oldState => { return { ...oldState, nome: e.target.value } })
                                    }>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Form>

                    {/* GRID =*/}
                    <Col lg={12} className="">
                        <Grid
                            progressPending={carregando}
                            limit={filtrosPesquisa.quantidade}
                            onChangePage={paginar}
                            onChangeRowsPerPage={quantidadePorPagina}
                            paginationServer={true}
                            paginationTotalRows={filtrosPesquisa.totalItems}
                            colunas={colunas}
                            itens={colaboradors} />
                    </Col>
                </Card.Body>
            </Card>
        </Row>

        {/* Modal =*/}
        <Modal size="xl" show={modal}>
            <Modal.Header>
                <Modal.Title>Colaborador</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>

                    <Row className="mb-3">
                        <Col xs={4} >
                            <Form.Group>
                                <Form.Label>Nome completo: </Form.Label>
                                <Form.Control isValid={formik.touched.nome && !formik.errors.nome} {...formik.getFieldProps('nome')} type="text" placeholder="Nome" />
                                <AlertValidation text={formik.errors.nome}></AlertValidation>
                            </Form.Group>
                        </Col>
                        <Col xs={2} >
                            <Form.Group>
                                <Form.Label>Data de Nascimento: </Form.Label>
                                <Form.Control isValid={formik.touched.dataNascimento && !formik.errors.dataNascimento} {...formik.getFieldProps('dataNascimento')} type="date" />
                                <AlertValidation text={formik.errors.dataNascimento}></AlertValidation>
                            </Form.Group>
                        </Col>
                        <Col xs={3} >
                            <Form.Group>
                                <Form.Label>Credencial: </Form.Label>
                                <Form.Control isValid={formik.touched.documento && !formik.errors.documento} {...formik.getFieldProps('documento')} type="text" placeholder="Documento" />
                                <AlertValidation text={formik.errors.documento}></AlertValidation>
                            </Form.Group>
                        </Col>
                        <Col xs={3} >
                            <Form.Group>
                                <Form.Label>Habilitação: </Form.Label>
                                <Form.Control isValid={formik.touched.habilitacao && !formik.errors.habilitacao} {...formik.getFieldProps('habilitacao')} type="text" placeholder="Habilitação" />
                                <AlertValidation text={formik.errors.habilitacao}></AlertValidation>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col xl={3} >
                            <Form.Group>
                                <Form.Label >Contato: </Form.Label>
                                <Form.Control isValid={formik.touched.telefone1 && !formik.errors.telefone1} {...formik.getFieldProps('telefone1')} type="text" placeholder="Contato" />
                                <AlertValidation text={formik.errors.telefone1}></AlertValidation>
                            </Form.Group>
                        </Col>
                        <Col xl={3} >
                            <Form.Group>
                                <Form.Label>Contato Opocional: </Form.Label>
                                <Form.Control isValid={formik.touched.telefone2 && !formik.errors.telefone2} {...formik.getFieldProps('telefone2')} type="text" placeholder="Opocional" />
                                <AlertValidation text={formik.errors.telefone2}></AlertValidation>
                            </Form.Group>
                        </Col>
                        <Col xl={3} >
                            <Form.Group>
                                <Form.Label>E-mail: </Form.Label>
                                <Form.Control isValid={formik.touched.email && !formik.errors.email} {...formik.getFieldProps('email')} type="text" placeholder="E-mail" />
                                <AlertValidation text={formik.errors.email}></AlertValidation>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col xl={3} >
                            <Form.Group>
                                <Form.Label>Titular da conta: </Form.Label>
                                <Form.Control isValid={formik.touched.nomeTitularConta && !formik.errors.nomeTitularConta} {...formik.getFieldProps('nomeTitularConta')} type="text" placeholder="Titular da conta" />
                                <AlertValidation text={formik.errors.nomeTitularConta}></AlertValidation>
                            </Form.Group>
                        </Col>
                        <Col xl={3} >
                            <Form.Group>
                                <Form.Label>Conta: </Form.Label>
                                <Form.Control isValid={formik.touched.conta && !formik.errors.conta} {...formik.getFieldProps('conta')} type="text" placeholder="Número da conta" />
                                <AlertValidation text={formik.errors.conta}></AlertValidation>
                            </Form.Group>
                        </Col>
                        <Col xl={3} >
                            <Form.Group>
                                <Form.Label>Agência: </Form.Label>
                                <Form.Control isValid={formik.touched.agencia && !formik.errors.agencia} {...formik.getFieldProps('agencia')} type="text" placeholder="Número da agência" />
                                <AlertValidation text={formik.errors.agencia}></AlertValidation>
                            </Form.Group>
                        </Col>
                        <Col xl={3} >
                            <Form.Group>
                                <Form.Label>PIX: </Form.Label>
                                <Form.Control isValid={formik.touched.pix && !formik.errors.pix} {...formik.getFieldProps('pix')} type="text" placeholder="Chave pix" />
                                <AlertValidation text={formik.errors.pix}></AlertValidation>
                            </Form.Group>
                        </Col>
                    </Row>

                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button disabled={formik.isSubmitting || !formik.isValid} className='ripple' variant="primary" onClick={() => formik.handleSubmit()} >Salvar</Button>
                <Button className='ripple' variant="secondary" onClick={toggle} >Fechar</Button>
            </Modal.Footer>
        </Modal>

    </>)
}

export default ColaboradorPage;