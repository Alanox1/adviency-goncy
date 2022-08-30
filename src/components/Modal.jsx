import { Box,Button,Stack, Text } from "@chakra-ui/react"

export default function Modal({children,ventanaModal,setVentanaModal}){
    
    return (

        <>
            {ventanaModal &&
        <Stack width="100vw" 
             height="100vh"
             position="fixed"
             top="0"
             left="0"
             bgColor="rgba(0,0,0,.5)"
             alignItems="center"
             justifyContent="center"
             padding="40px"
             zIndex="9999"
             >
            <Stack width="300px"
                             minHeight="100px"
                             background="#fff"
                             position="relative"
                             borderRadius="5px"
                             boxShadow="rgba(100,100,111,0.2) 0px 7px 29px 0px"
                             padding="20px"
                             color="black"
                            >
                               <Box>
                                 {children}
                               </Box>
                             <Button className="btn_print" 
                                     bgColor="red"
                                      onClick={() => setVentanaModal(!ventanaModal)}>Cerrar</Button> 
                             
            </Stack>
        </Stack>}
        </>
     
    )
}