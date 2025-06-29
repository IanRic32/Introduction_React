import React , {useEffect} from 'react';

function Planeta ({nombre}){

    useEffect(() => {
        console.log(`El planeta ${nombre} ha sido visitado`);
        
        return () => {
            console.log(`El planeta ${nombre} ya no está en órbita`);
        };
    }, [nombre]);

    return (
        <div className="planeta">
            <h2>🌍 {nombre}</h2>
            <p>Información sobre el planeta {nombre}...</p>
        </div>
    );

}


export default Planeta;