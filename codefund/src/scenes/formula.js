export function crearFormula(scene){

    const tileSize = 32;
    const gap = 10;
    const y = 150;
    const startX = scene.scale.width / 2 - ((tileSize + gap) * scene.formulaLength) / 2;

    // Inicializar estructuras de datos
    scene.formula = new Array(scene.formulaLength).fill(null);
    scene.formulaTexts = [];

    for (let i = 0; i < scene.formulaLength; i++) {
        scene.add.image(startX + i * (tileSize + gap), y, 'tile2')
            .setOrigin(0.5)
            .setDisplaySize(tileSize, tileSize);

        scene.formulaTexts.push(null); // Espacio para el texto futuro
    }

    // Mostrar el resultado
    scene.add.text(
        startX + scene.formulaLength * (tileSize + gap) + 20,
        y,
        `= ${scene.formulaResult}`,
        {
            fontSize: '20px',
            fontFamily: 'Arial',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        }
    ).setOrigin(0.5);
}

export function generarComponente (scene){
    const componentes = scene.componentes

    componentes.forEach(componente => {
        scene.collection.add(scene.add.text(
            componente.x, 
            componente.y, 
            componente.value, 
            {
                fontFamily: 'Arial', 
                fontSize: 24, 
                color: '#ffffff',
                stroke: '#000000', 
                strokeThickness: 4
            }
        ).setOrigin(0, 1));
    });
}

export function checkformula(scene){
    const elements = scene.formula
    const expresion = elements.map(e => e ?? '').join(' ')

    try{
        const resultExpresion = eval(expresion)
        console.log(expresion, ' = ', resultExpresion)
        
        if (resultExpresion === scene.formulaResult) {
            console.log('ok')
            return true
        }
        else {
            console.log('nook')
            return false
        }
    }catch (error) {
        console.error('Error al evaluar la expresión:', expresion);
        return false;
    }
}