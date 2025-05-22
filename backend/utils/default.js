function defaultMundos(){
    const niveles = [
        {
            nombre: "nivel1_1",
            num: 1.1,
            desbloqueado: false,
            puntos: 0,
            estrellas: 0
        },
        {
            nombre: "nivel1_2",
            num: 1.2,
            desbloqueado: false,
            puntos: 0,
            estrellas: 0
        },
        {
            nombre: "nivel1_3",
            num: 1.3,
            desbloqueado: false,
            puntos: 0,
            estrellas: 0
        },
        {
            nombre: "nivel1_4",
            num: 1.4,
            desbloqueado: false,
            puntos: 0,
            estrellas: 0
        },
        {
            nombre: "nivel1_5",
            num: 1.5,
            desbloqueado: false,
            puntos: 0,
            estrellas: 0
        },
         {
            nombre: "nivel1_6",
            num: 1.6,
            desbloqueado: false,
            puntos: 0,
            estrellas: 0
        },
    ];
    const mundos =[]
    for (let i = 1; i <= 6; i++) {
        mundos.push({
            nombre: `mundo ${i}`,
            desbloqueado: false,
            niveles: niveles.map((nivel, idx) => ({
                ...nivel,
                desbloqueado: i === 1 && idx === 0 ? true : false
            })),
        })
    }
    return mundos
}   

module.exports = {
    defaultMundos
    
}