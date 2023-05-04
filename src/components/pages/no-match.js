import React from 'react';
import { Link } from 'react-router-dom';

export default function() {
        return (
            <div>
                <h2>Pagina no encontrada</h2>
                <Link to="/">Volver a la pagina de inicio</Link>
            </div>
        );
}