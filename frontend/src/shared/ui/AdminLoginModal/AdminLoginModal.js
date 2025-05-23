import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Styles from './AdminLoginModal.module.css';

export function AdminLoginModal({ isOpen, onClose }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Заменить на реальную аутентификацию
        if (username === 'admin' && password === 'admin') {
            // Сохраняем информацию о том, что пользователь вошел
            localStorage.setItem('isAdmin', 'true');
            onClose();
            // Перенаправляем на админ-панель
            navigate('/admin');
        } else {
            setError('Неверное имя пользователя или пароль');
        }
    };

    if (!isOpen) return null;

    return (
        <div className={Styles.modalOverlay}>
            <div className={Styles.modal}>
                <button className={Styles.closeButton} onClick={onClose}>×</button>
                <h2>Вход в систему</h2>
                <form onSubmit={handleSubmit} className={Styles.form}>
                    <div className={Styles.formGroup}>
                        <label htmlFor="username">Имя пользователя</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="Введите имя пользователя"
                        />
                    </div>
                    <div className={Styles.formGroup}>
                        <label htmlFor="password">Пароль</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Введите пароль"
                        />
                    </div>
                    {error && <p className={Styles.error}>{error}</p>}
                    <button type="submit" className={Styles.submitButton}>
                        Войти
                    </button>
                </form>
            </div>
        </div>
    );
} 