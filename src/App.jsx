import { useState,useEffect } from 'react'
import Form from './components/Form'
import TodosList from './components/TodosList'
import Modal from './components/Modal'
import {api} from './api';
import { Button,Box,Stack,Text,Image,Input } from '@chakra-ui/react'
import cancionNavidad from "./assets/sonidos/feliz-navidad.mp3"
import iconoSubirVolumen from "./assets/sonido.png"
import iconoBajarVolumen from "./assets/sin-sonido.png"
import Snowflakes from "magic-snowflakes"
import iconoRegalo from "./assets/icono_regalo.png"
import Titulo from './components/Titulo';
function App() {
  const [input,setInput] = useState("")
  const [todos,setTodos] = useState([])
  const [editTodo,setEditTodo] = useState(null)
  const [isLoading,setIsLoading] = useState(true)
 const [ventanaModal,setVentanaModal] = useState(false)
 const [ventanaModal2,setVentanaModal2] = useState(false)
 const [paused,setPaused] = useState(true)
 const [audio,setAudio] = useState({
  audio : new Audio(cancionNavidad)
})
  useEffect(() => {
    const snowflakes = new Snowflakes({
      color : "#fff",
      maxOpacity : 0.8,
      count : 50,
      zIndex : -10
    });
   snowflakes.start()
    api.gifts()
          .then(todos => setTodos(todos.data))
          .catch(console.log)
          .finally(() => setIsLoading(false)) 
  },[])
  
  
  
  useEffect(() => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }, [ todos ])
  
  const handleMusic = () => {
    if(paused === true){
      audio.audio.play()
      setPaused(false)
    }else{
     audio.audio.pause()
     setPaused(true)
    }
  }

const precioFinal = todos.reduce((acc,el) => acc + Number(el.precio * el.cantidad),0)

  return (
    <Box w="100vw" 
    height="100vh" 
    display="flex" 
    justifyContent="center" 
    alignItems="center"
    >
     <Stack 
             justifyContent="center"
             alignItems="center"
             bgColor="white"
            
             margin="0px auto"
             padding="20px"
             >
          <Stack direction="row" alignItems="center">
          <Titulo className="box">Regalos:</Titulo>
            <Image onClick={handleMusic} 
                   width="40px" 
                   height="40px" 
                   src={paused ? iconoSubirVolumen : iconoBajarVolumen}/>
          </Stack>
        

          <Text>Total : $ {precioFinal}</Text>
          <Button colorScheme="green" onClick={() => setVentanaModal2(!ventanaModal2)}>Agregar</Button>


          <Stack direction="column">
     {isLoading ? "Cargando" : <TodosList todos={todos} setTodos={setTodos} setEditTodo={setEditTodo} setVentanaModal2={setVentanaModal2} ventanaModal2={ventanaModal2} /> }
      <Modal ventanaModal={ventanaModal2} setVentanaModal={setVentanaModal2}>
      <Form 
          input={input}
          setInput={setInput}
          todos={todos}
          setTodos={setTodos}
          setEditTodo={setEditTodo}
          editTodo={editTodo}
          setVentanaModal={setVentanaModal}
          ventanaModal={ventanaModal}
          setVentanaModal2={setVentanaModal2}
          ventanaModal2={ventanaModal2}
      />
        
      </Modal>

      {todos.length > 0 
           ? <Box className='box' display="flex" justifyContent="space-between">
              <Button colorScheme="red"
                     onClick={() => setTodos([])}>
                      Borrar todo!
             </Button>
             <Button colorScheme="blue" 
                    onClick={() => setVentanaModal(!ventanaModal)}>Previsualisar</Button>
             
              </Box>
           : <Text>No hay Regalos!, agrega uno</Text>}
     </Stack>

      </Stack>


      <Modal ventanaModal={ventanaModal} setVentanaModal={setVentanaModal} >
      <Titulo className="box">Comprar:</Titulo>
            <Box> 
             {todos.map((todo) => (
                <Stack key={todo.id} direction="row" justifyContent="space-around" margin="10px">
                  <Image width="30px" height="30px" src={todo.imagen ? todo.imagen : iconoRegalo} alt='Imagen del regalo' /> 
                    <Stack direction="column">
                        <Text>{todo.title}</Text>
                        <Text>{todo.destinatario}</Text>
                    </Stack>
                    <Text>{todo.cantidad}</Text>
                </Stack>
             ))}
            </Box>
          
            <Button className='btn_print' 
                    colorScheme='blue' 
                    width="100%" 
                    color="black" 
                    onClick={window.print}>Imprimir</Button>
      </Modal> 
    
    </Box>
  )
}

export default App
