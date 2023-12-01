import React from 'react';
import AdminAddRouteForm from '../components/Form/AdminAddRouteForm';
import Header from '../components/Header/Header';
import '../styles/global-styles.css'
import AdminSearchRouteForm from '../components/Form/AdminSearchRouteForm';

const AdminPanelPage = () => {
    return (
        <div>
            <Header/>
            <div className='form-admin-panel'>
                <AdminAddRouteForm/>
                <AdminSearchRouteForm/>
                
            </div>
        </div>
    );
};

export default AdminPanelPage;