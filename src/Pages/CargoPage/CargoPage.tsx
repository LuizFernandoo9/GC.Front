import { useEffect, useState } from "react";
import * as Yup from 'yup';
import { useFormik } from "formik";
import { ToastContainer } from "react-toastify";
import { TableColumn } from "react-data-table-component";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";


import ICargo from "../../Interfaces/ICargo";
import IRecuperaLista from "../../Interfaces/Basic/IRecuperaLista";
import FiltroPesquisa from "../../Interfaces/Basic/FiltroPesquisa";

import CargoService from "../../Services/CargoService";

import Grid from "../../Components/Tables/Grid";
import PageGridHeader from "../../Components/Layouts/Pageheader/PageGridHeader";
import { activeTostify, disabledTostify, errorTostify, successTostify } from "../../Components/Apps/Notification/Notification";
import AlertValidation from "../../Components/Forms/AlertValidation/AlertValidation";
import { Link } from "react-router-dom";


const CargoPage = () => {
    const [cargos, setCargos] = useState<ICargo[]>([]);
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

    const initialValues: ICargo = {
        id: 0,
        nome: '',
        status: 1,
    }

    const toggle = (): void => setModal(!modal);

    const quantidadePorPagina = async (currentRowsPerPage: number) => setFiltrosPesquisa(oldState => { return { ...oldState, quantidade: currentRowsPerPage } });

    const paginar = (page: number) => setFiltrosPesquisa(oldState => { return { ...oldState, pagina: page } });

    const colunas: TableColumn<ICargo>[] = [
        {
            name: 'Código',
            sortField: 'id',
            selector: (row: ICargo) => row.id,
            sortable: true,
            wrap: true,
            ignoreRowClick: true
        },
        {
            name: 'Nome',
            sortField: 'nome',
            selector: (row: ICargo) => row.nome,
            sortable: true,
            wrap: true
        },
        {
            name: 'Status',
            cell: (row: ICargo) => {
                return (row.status ? <Link className="btn btn-success btn-sm" to="#">Ativo</Link> : <Link className="btn btn-danger btn-sm" to="#">Inativo</Link>)
            },
        },
        {
            name: 'Editar?',
            cell: (cargo: ICargo) => {
                return (
                    <div>
                        <i onClick={() => {
                            formik.setValues(cargo);
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
            cell: (cargo: ICargo) => {
                return (
                    <div>
                        {cargo.status == 1 ?
                            <i onClick={() => inativar(cargo.id)} className="fa fa-trash" />
                            :
                            <i onClick={() => ativar(cargo.id)} className="fa fa-check" />
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

            let resultado: IRecuperaLista<ICargo>;

            resultado = await CargoService.paginar(filtro);

            setFiltrosPesquisa(filtro => { return { ...filtro, totalItems: resultado.total } });

            setCargos(resultado.itens);

        } catch (error: any) {
            setCargos([]);
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
            .required('Nome é obrigatório'),
    })

    const formik = useFormik({
        initialValues,
        validationSchema: schema,
        onSubmit: async (values) => {
            try {

                setCarregando(true);

                await CargoService.salvar(values);

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

            await CargoService.ativar(id);

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

            await CargoService.inativar(id);

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
            active="Cargo"
            setModal={toggle}
            modal={modal}
            setAtualizarTabela={setAtualizar}
            atualizar={atualizar} />

        <Row className="row-sm">
            <Card>
                <Card.Header>
                    <Card.Title as='h3'>Cargos</Card.Title>
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
                            itens={cargos} />
                    </Col>
                </Card.Body>
            </Card>
        </Row>

        {/* Modal =*/}
        <Modal size="lg" show={modal}>
            <Modal.Header>
                <Modal.Title>Cargo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Col lg={6} >

                        <Form.Group>
                            <Form.Label>Informe o nome do cargo: </Form.Label>
                            <Form.Control isValid={formik.touched.nome && !formik.errors.nome} {...formik.getFieldProps('nome')} type="text" placeholder="Nome" />
                            <AlertValidation text={formik.errors.nome}></AlertValidation>
                        </Form.Group>
                    </Col>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button disabled={formik.isSubmitting || !formik.isValid} className='ripple' variant="primary" onClick={() => formik.handleSubmit()} >Salvar</Button>
                <Button className='ripple' variant="secondary" onClick={toggle} >Fechar</Button>
            </Modal.Footer>
        </Modal>

    </>)
}

export default CargoPage;