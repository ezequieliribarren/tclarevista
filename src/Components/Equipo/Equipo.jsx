import React from 'react';
import equipoData from '../../equipo.json'; // Asegúrate de tener la ruta correcta al archivo JSON

const Equipo = () => {
    return (
        <section id='equipo'>
            <h2>El equipo</h2>
            <div className="container-fluid">
                <div className='section-equipo'>
                    {equipoData.map((miembro, index) => (
                        <div className='card-equipo ' key={index} style={{ backgroundColor: index === 0 ? '#444444' : '' }}>
                            <div className='card-equipo-description'>
                                <div className='card-equipo-name'><h3>{miembro.nombre}</h3></div>
                                <div><img src={miembro.img} alt={miembro.nombre} /></div>
                            </div>
                            <div className='card-equipo-rol' style={{ backgroundColor: index === 0 ? '#000' : '' }}>
                                <h4 style={{ color: index === 0 ? '#FE0' : '' }}>{miembro.rol}</h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
};

export default Equipo;
