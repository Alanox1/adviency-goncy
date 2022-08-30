import { Text , Button ,Input,ListItem,OrderedList,Stack,Image} from "@chakra-ui/react"
import iconoRegalo from "../assets/icono_regalo.png"
const TodosList = ({todos,setTodos,setEditTodo,setVentanaModal2,ventanaModal2}) => {
    
    const handleDelete = ({id}) => {
        setTodos(todos.filter((todo) => todo.id !== id))
    }

    const handleEdit = ({id}) => {
        console.log(id)
       const findTodo = todos.find((todo) => todo.id === id)
     
       setEditTodo(findTodo)
       setVentanaModal2(!ventanaModal2)
    }
    
    return(
        <OrderedList>
            {todos.map((todo) => (
            
                <ListItem key={todo.id}
                            display="flex"
                            flexDirection="row"
                            alignItems="center"
                            justifyContent="space-between"
                            border="1px solid white"
                            margin="10px"
                            width="100%">
                    <Stack direction="row">
                   <Image width="40px" height="30px" src={todo.imagen ? todo.imagen : iconoRegalo} alt='Imagen del regalo'/>
    
                    <Stack direction="column">
                        <Text>{todo.title}</Text>
                        <Text>{todo.destinatario}</Text>
                    </Stack>
                   
                    <Text>{todo.cantidad}</Text>  
                    </Stack>
                    <Text>${todo.cantidad === 1 ? todo.precio : todo.precio * todo.cantidad}</Text>
                  
                    
                <Stack direction="row">
                   <Button colorScheme="red"
                 onClick={() => handleEdit(todo)}>E</Button>
                    <Button colorScheme="red" onClick={() => handleDelete(todo)}>X</Button>
                </Stack>
                  
                </ListItem>
            ))}
        </OrderedList>
    )
}

export default TodosList