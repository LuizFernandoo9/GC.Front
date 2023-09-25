import { useEffect, useState } from 'react';
import styles from './Indexpage.module.scss';

import Storage from '../../utils/StorageUtils';
import IUsuarioAutenticacao from '../../Interfaces/IUsuarioAutenticacao';

const Indexpage = () => {
	const User = async () => setUser(await Storage.getUser() || user);
	const [user, setUser] = useState<IUsuarioAutenticacao>({
		email: "",
		empresaId: 0,
		id: 0,
		nome: "",
		permissao: 1,
		status: 0
	});

	useEffect(() => {
		User();
	}, []);

	return (
		<div className={styles.Indexpage}>
			<div className="breadcrumb-header justify-content-between">
				<div className="left-content">
					<div>
						<h2 className="main-content-title tx-24 mg-b-1 mg-b-lg-1">Olá, {user?.nome}</h2>
						<p className="mg-b-0">Seja bem vindo ao GC - Gestão de consultas mendicas</p>
					</div>
				</div>
			</div>
			
		</div>
	)
};

Indexpage.defaultProps = {};

export default Indexpage;
