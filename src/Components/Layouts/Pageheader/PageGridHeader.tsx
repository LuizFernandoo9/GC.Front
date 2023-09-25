import { Button } from 'react-bootstrap';
import styles from './Pageheader.module.scss';

interface PageGridHeaderType {
  titles: string;
  active: string;

  setModal(isModal: boolean): void;
  modal?: boolean;

  setAtualizarTabela(isAtualiza: boolean): void;
  atualizar?: boolean;

  hideNew?: boolean;
  hideRefresh?: boolean;

}

const PageGridHeader = ({
  titles,
  active,
  setModal,
  modal,
  atualizar,
  setAtualizarTabela,
  hideNew,
  hideRefresh,
}: PageGridHeaderType) => {

  return (
    <div className={styles.Pageheader}>
      {/* <!-- breadcrumb --> */}
      <div className="breadcrumb-header justify-content-between">
        <div className="my-auto">
          <div className="d-flex">
            <h4 className="content-title mb-0 my-auto">{titles}</h4><span className="text-muted mt-1 tx-13 ms-2 mb-0">/ {active}</span>
          </div>
        </div>
        <div className="d-sm-flex">
          <div className="d-flex my-xl-auto right-content">
            <div className="pe-1 mb-xl-0">
              {!hideRefresh && <Button variant='warning' onClick={() => setAtualizarTabela(!atualizar)} className="btn-icon me-2"><i className="mdi mdi-refresh"></i></Button>}
            </div>
            <div className="pe-1 mb-xl-0">
              {!hideNew && <Button variant='primary' onClick={() => setModal(!modal)} className="btn-icon me-2"><i className="mdi mdi-plus"></i></Button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

PageGridHeader.defaultProps = {};

export default PageGridHeader;
