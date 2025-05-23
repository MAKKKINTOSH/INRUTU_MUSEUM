import './theme/index.css';
import {AppRouter} from "./providers/AppRouter";
import {BrowserRouter} from "react-router-dom";
import { useState } from 'react';
import { AdminLoginModal } from '../shared/ui/AdminLoginModal/AdminLoginModal';

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAdminClick = (e) => {
        e.preventDefault();
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="App">
            <BrowserRouter>
                <AppRouter onAdminClick={handleAdminClick} />
                <AdminLoginModal 
                    isOpen={isModalOpen} 
                    onClose={handleModalClose} 
                />
            </BrowserRouter>
        </div>
    );
}

export default App;
