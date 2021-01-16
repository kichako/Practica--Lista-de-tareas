import React, {useState, useEffect} from 'react';
import './App.css';
import FormularioTareas from './components/FormularioTareas';
import Header from './components/Header';
import ListaTareas from './components/ListaTareas';

const App = () => {
  // Obtenemos tareas para guardarlas en el LocalStorage
  const tareasGuardadas = 
  localStorage.getItem('tareas') ? 
  JSON.parse(localStorage.getItem('tareas')) : [];

  // Establecemos estado para las tareas.
  const [tareas, cambiarTareas] = useState(tareasGuardadas);

  // Establecemos el estado dentro del LocalStorage
  useEffect(() => {
    localStorage.setItem('tareas', JSON.stringify(tareas));
  }, [tareas]);


  // Entra a LocalStorage y comprueba si mostrarCompletadas es nulo.
  let configMostrarCompletadas = '';
  if(localStorage.getItem('mostrarCompletadas') === null){
    configMostrarCompletadas = true;
  } else {
    configMostrarCompletadas = localStorage.getItem('mostrarCompletadas') === 'true';
  }

  //Estado de mostrar las tareas completadas
  const [mostrarCompletadas, cambiarMostrarCompletadas] = useState(configMostrarCompletadas);
  useEffect(() => {
    localStorage.setItem('mostrarCompletadas', mostrarCompletadas.toString());
  }, [mostrarCompletadas])

  return (
    <div className="contenedor">
      <Header
        mostrarCompletadas={mostrarCompletadas}
        cambiarMostrarCompletadas={cambiarMostrarCompletadas} 
      />
      <FormularioTareas tareas={tareas} cambiarTareas={cambiarTareas}/>
      <ListaTareas
        tareas={tareas}
        cambiarTareas={cambiarTareas}
        mostrarCompletadas={mostrarCompletadas}
        />
    </div>
  );
}
 
export default App;