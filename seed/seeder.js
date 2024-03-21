import {exit} from 'node:process'

import categories from "./categories.js";

import db from "../config/db.js";

// Importamos los modelos con sus respectivas relaciones(1:1, 1:n, llaves foraneas...)
import {Categories} from '../models/index.js'; 

const importarDatos = async () => {
    try {
        // Autenticar
        await db.authenticate()

        // Generar las columnas
        await db.sync()

        // Insertamos los datos de forma paralela ya que no dependen el uno del otro
        await Promise.all([
            Categories.bulkCreate(categories)
            // ,Categories.bulkCreate(categories)
        ])

        console.log('*****Datos Importados Correctamente')
        exit() // exit(0) Finaliza y fue correcto

    } catch (error) {
        console.log(error)
        exit(1) // exit(1) Finaliza pero hubo un error
    }
}

if(process.argv[2] === "-i"){
    importarDatos();
}