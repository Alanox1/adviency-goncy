import { useEffect , useState} from "react"
import { FormControl,Input,Button ,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,} from "@chakra-ui/react"
import {v4 as uuidv4} from "uuid"

const sorprendeme = ["Auto","Iphone","Pelota","Ropa","Mouse"]

const Form = ({input,setInput,todos,setTodos,editTodo,setEditTodo,setVentanaModal,ventanaModal,setVentanaModal2,ventanaModal2}) => {
    const [cantidad,setCantidad] = useState(1)
    const [destinatario,setDestinatario] = useState("")
    const [precio,setPrecio] = useState(0)
    const [imagen,setImagen] = useState("")
   const onInputChange = (e) => {
    setInput(e.target.value)
   }
 
  const updateTodo = (title,id,cantidad,destinatario,precio,imagen) => {
   
    const newTodo = todos.map((todo) => 
    
        todo.id === id ? {title : title,id : id,cantidad : cantidad,destinatario : destinatario,precio : precio,imagen:imagen} : todo
    ) 
    
    setTodos(newTodo)
    setEditTodo("")

    setVentanaModal2(!ventanaModal2)
  }
  
  useEffect(() => {
    if(editTodo){
        
        setInput(editTodo.title)
       
        setDestinatario(editTodo.destinatario)
        setPrecio(editTodo.precio)
        setImagen(editTodo.imagen)

        setCantidad(editTodo.cantidad)
    }else{
        setInput("")
    }
  },[setInput,editTodo,setCantidad,setDestinatario,setPrecio,setImagen])

   const onFormSubmit = (e) => {
    e.preventDefault();
    if(!editTodo){
        setTodos([...todos,{id : uuidv4(),title : input,cantidad : cantidad,destinatario : destinatario,precio: precio,imagen : imagen}])
        setInput("")
        setDestinatario("")
        setCantidad("")
        setImagen("")
        setPrecio("")
        setVentanaModal2(false)
    }else{
        updateTodo(input,editTodo.id,cantidad,destinatario,precio,imagen)
    }
   
   }


   const regaloSorpresa = (e) => {
    setInput(sorprendeme[Math.floor((Math.random() * (4 - 0 + 1)) + 0)])
   }
   
  




    return(
        <FormControl as="form" display="flex" flexDirection="column" justifyContent="space-between" gap={2} alignItems="center" padding="20px" onSubmit={onFormSubmit}>
            <Input type="text" placeholder="Regalo" value={input}  required onChange={onInputChange}/>
            <Button colorScheme="red" onClick={(e) => regaloSorpresa(e) }>Sorprendeme!</Button>
            <Input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)}/>
            <Input type="text" 
          placeholder="Destinatario"  
          value={destinatario}
          onChange={(e) => setDestinatario(e.target.value)} 
   />
            <NumberInput defaultValue={1} min={1}   onChange={(valueString) => setCantidad(valueString)}>
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
            <Input type="text" placeholder="agrega una imagen" value={imagen}  onChange={(e) => setImagen(e.target.value)} />
            <Button colorScheme="green" type="submit">Añadir</Button>
            
        </FormControl>
    )
}

export default Form