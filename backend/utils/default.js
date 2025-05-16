function defaultMundos(){
    const niveles = [
        {
            nombre: "nivel1",
            desbloqueado: true,
            puntos: 0,
            estrellas: 0
        },
        {
            nombre: "nivel2",
            desbloqueado: false,
            puntos: 0,
            estrellas: 0
        },
        {
            nombre: "nivel3",
            desbloqueado: false,
            puntos: 0,
            estrellas: 0
        }
    ];
    const mundos =[]
    for (let i = 1; i <= 3; i++) {
        mundos.push({
            nombre: `mundo ${i}`,
            desbloqueado: false,
            niveles: [...niveles]
        })
    }
    return mundos
}   

module.exports = {
    defaultMundos
    
}