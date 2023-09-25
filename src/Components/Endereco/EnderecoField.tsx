import { Col, Form, InputGroup, Row } from "react-bootstrap";
import InputMask from 'react-input-mask';
import Select from 'react-select';
import { CorreiosAPI } from "../../Services/CorreiosApi";
import { getCoordinatesFromAddress } from "../Maps/Map";

interface EnderecoType {
    formik: any;
}

const EnderecoField = ({ formik }: EnderecoType) => {

    const estados = [
        { value: "PE", label: "Pernambuco" },
        { value: "SP", label: "São Paulo" },
        { value: "RJ", label: "Rio de Janeiro" },
        { value: "BR", label: "Brasilia" }
    ];

    const onChange = (cep: string): void => {
        if (!cep.match(/_.*/)) {
            CorreiosAPI(cep)
                .then((resultado) => resultado.json())
                .then(async (resultado) => {
                    formik.setFieldValue("endereco.logradouro", resultado.logradouro);
                    formik.setFieldValue("endereco.bairro", resultado.bairro);
                    formik.setFieldValue("endereco.cidade", resultado.localidade);
                    formik.setFieldValue("endereco.uf", resultado.uf);
                    formik.setFieldValue("endereco.cep", resultado.cep);

                    // setar latitude e longitude do endereço.
                    let coordenadas = await getCoordinatesFromAddress(resultado.logradouro, resultado.localidade);
                    formik.setFieldValue("endereco.latitude", coordenadas?.lat.toString());
                    formik.setFieldValue("endereco.longitude", coordenadas?.lon.toString());
                });
        }
    }

    return (<>
        <Col md={12} xl={12} xs={12} sm={12}>
            <Row className="row-sm">
                <Col lg={3}>

                    <InputGroup className="mb-3">
                        <InputGroup.Text>
                            CEP:
                        </InputGroup.Text>
                        <InputMask className='form-control' mask="99999-999" defaultValue={formik.values.endereco.cep} placeholder="00000.000" onChange={(e: any) => onChange(e.target.value)} />
                    </InputGroup>

                </Col>
            </Row>

            <Row className="row-sm">
                <Col lg={3}>
                    <Form.Group>
                        <Form.Group className="mb-3">
                            <label className="form-label">Estado:</label>
                            <Select classNamePrefix="Select-sm" defaultValue={estados.filter(e => e.value == formik.values.endereco.uf)[0]} options={estados} placeholder='selecione' onChange={(e: any) => formik.setFieldValue("endereco.uf", e.value)} />
                        </Form.Group>
                    </Form.Group>
                </Col>
                <Col lg={3}>
                    <Form.Group className="mb-3">
                        <Form.Label>Cidade:</Form.Label>
                        <Form.Control isValid={formik.touched.cidade && !formik.errors.cidade} {...formik.getFieldProps('endereco.cidade')} type="text" placeholder="Cidade" />
                    </Form.Group>
                </Col>
                <Col lg={3}>
                    <Form.Group className="mb-3">
                        <Form.Label>Bairro:</Form.Label>
                        <Form.Control isValid={formik.touched.bairro && !formik.errors.bairro} {...formik.getFieldProps('endereco.bairro')} type="text" placeholder="Bairro" />
                    </Form.Group>
                </Col>
            </Row>

            <Row className="row-sm">
                <Col lg={3}>
                    <Form.Group className="mb-3">
                        <Form.Label>Número:</Form.Label>
                        <Form.Control isValid={formik.touched.numero && !formik.errors.numero} {...formik.getFieldProps('endereco.numero')} type="text" placeholder="Número" />
                    </Form.Group>
                </Col>
                <Col lg={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Rua/Avenida:</Form.Label>
                        <Form.Control isValid={formik.touched.logradouro && !formik.errors.logradouro} {...formik.getFieldProps('endereco.logradouro')} type="text" placeholder="Logradouro" />
                    </Form.Group>
                </Col>
            </Row>
            <Row className="row-sm">
                <Col lg={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Complemento:</Form.Label>
                        <Form.Control isValid={formik.touched.complemento && !formik.errors.complemento} {...formik.getFieldProps('endereco.complemento')} type="text" placeholder="Complemento" />
                    </Form.Group>
                </Col>
            </Row>
        </Col>
    </>)
}

export default EnderecoField;