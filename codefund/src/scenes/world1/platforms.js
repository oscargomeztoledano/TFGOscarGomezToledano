export function createPlatform({floor}) {
     // Crear plataformas
     floor.create(300, 550, 'platformL').setOrigin(0, 0).refreshBody();  
     floor.create(348, 550, 'floor1').setOrigin(0, 0).refreshBody();  
     floor.create(396, 550, 'floor3').setOrigin(0, 0).refreshBody();  
     floor.create(444, 550, 'platformR').setOrigin(0, 0).refreshBody();  

     floor.create(650, 450, 'platformL').setOrigin(0, 0).refreshBody();  
     floor.create(698, 450, 'floor2').setOrigin(0, 0).refreshBody();  
     floor.create(744, 450, 'floor5').setOrigin(0, 0).refreshBody();  
     floor.create(792, 450, 'platformR').setOrigin(0, 0).refreshBody();

     floor.create(204,350,'platformL').setOrigin(0, 0).refreshBody();
     floor.create(252,350,'floor3').setOrigin(0, 0).refreshBody();
     floor.create(300,350,'floor4').setOrigin(0, 0).refreshBody();
     floor.create(348,350,'platformR').setOrigin(0, 0).refreshBody();

     floor.create(602,250,'platformL').setOrigin(0, 0).refreshBody();
     floor.create(650,250,'floor1').setOrigin(0, 0).refreshBody();
     floor.create(698,250,'floor4').setOrigin(0, 0).refreshBody();
     floor.create(746,250,'floor5').setOrigin(0, 0).refreshBody();
     floor.create(794,250,'floor2').setOrigin(0, 0).refreshBody();
     floor.create(842,250,'platformR').setOrigin(0, 0).refreshBody();
}
