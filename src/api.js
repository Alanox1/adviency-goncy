export const api = {
    gifts: () => new Promise((resolve, reject) => {
        try {
            const list = localStorage.getItem('todos')
            setTimeout(
                () => resolve({
                    status: 'ok',
                    data: list ? JSON.parse(list) : []
                }),
                1000
            )
        } catch (error) {
            reject({
                status: 'error',
                data: []
            })
        }
        
    })
    
}