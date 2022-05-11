import './Estilos.css';

function MiComponente () {
    const Objeto = {
        titulo : 'Curso React 2022',
        descripcion: '¡Arrancó el curso de React 2022 en el Informatorio!',
    }
    
    const {titulo, descripcion} = Objeto    // desestructuración de objeto

    return (
        <div >
            <h1 className="titulos">Título del día: '{titulo}'</h1>
            <p className="descripciones"><b>Descripción:</b> {descripcion}</p>
        </div>
    )
}

export default MiComponente;