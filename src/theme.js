import { extendTheme } from '@chakra-ui/react'
import background from "./assets/background.jpeg"

// const colors = {
//     brand: {
//       900: '#1a365d',
//       800: '#153e75',
//       700: '#2a69ac',
//     },
//   }
  
 export default extendTheme({
    styles: {
      global: {
        // styles for the `body`
        body: {
         maxHeight:"100vh",
         maxWidth:"100vw",
         backgroundImage : background,
         backgroundSize : "100vw 100vh"
         
        },
      },
    },
  })
  