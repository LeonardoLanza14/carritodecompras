
export interface Guitar {
    id: number
    name: string
    image: string
    description: string
    price: number
}

//Asi se hereda el id, name, y price de guitar
{/*export type CartItem = Pick <Guitar, 'id' | 'name' | 'price'> &{
    quantity: number
} */} 

//Asi se heredan todos los datos de guitar
export type CartItem = Guitar &{
    quantity: number
}

//export type GuitarId = Pick <Guitar, 'id'> 
//Esto toma el id de guitarra y le da el tipo de dato dependiendo
//Si en guitar el id es numbres, aqui sera number, y si es string aqui tambien
//sera string

//El pick se usa para heredar tipos de datos de otros types o interfaces
